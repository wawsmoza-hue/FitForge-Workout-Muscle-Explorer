import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type FitnessProfile = {
  name: string;
  age: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Build Muscle' | 'Strength' | 'Lose Fat' | 'General Fitness';
  days: number;
  experience: string;
};

type FitnessContextValue = {
  hydrated: boolean;
  profile: FitnessProfile | null;
  favorites: string[];
  completed: string[];
  completeOnboarding: (profile: FitnessProfile) => Promise<void>;
  toggleFavorite: (exerciseId: string) => Promise<void>;
  markCompleted: (exerciseId: string) => Promise<void>;
};

const STORAGE_KEY = 'fitforge-state-v1';
const FitnessContext = createContext<FitnessContextValue | null>(null);

export function FitnessProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [profile, setProfile] = useState<FitnessProfile | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const stored = JSON.parse(raw) as Partial<{ profile: FitnessProfile; favorites: string[]; completed: string[] }>;
        setProfile(stored.profile ?? null);
        setFavorites(stored.favorites ?? []);
        setCompleted(stored.completed ?? []);
      })
      .catch(() => undefined)
      .finally(() => setHydrated(true));
  }, []);

  const persist = async (next: { profile?: FitnessProfile | null; favorites?: string[]; completed?: string[] }) => {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        profile: next.profile ?? profile,
        favorites: next.favorites ?? favorites,
        completed: next.completed ?? completed,
      }),
    );
  };

  const completeOnboarding = async (nextProfile: FitnessProfile) => {
    setProfile(nextProfile);
    await persist({ profile: nextProfile });
  };

  const toggleFavorite = async (exerciseId: string) => {
    const next = favorites.includes(exerciseId)
      ? favorites.filter((id) => id !== exerciseId)
      : [...favorites, exerciseId];
    setFavorites(next);
    await persist({ favorites: next });
  };

  const markCompleted = async (exerciseId: string) => {
    if (completed.includes(exerciseId)) return;
    const next = [...completed, exerciseId];
    setCompleted(next);
    await persist({ completed: next });
  };

  const value = useMemo(
    () => ({ hydrated, profile, favorites, completed, completeOnboarding, toggleFavorite, markCompleted }),
    [hydrated, profile, favorites, completed],
  );

  return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>;
}

export function useFitness() {
  const context = useContext(FitnessContext);
  if (!context) throw new Error('useFitness must be used inside FitnessProvider');
  return context;
}