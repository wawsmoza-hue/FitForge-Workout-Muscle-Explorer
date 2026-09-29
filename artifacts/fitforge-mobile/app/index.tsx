import { Feather, Ionicons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { FitnessProfile, useFitness } from '@/contexts/fitness';

const levels: FitnessProfile['level'][] = ['Beginner', 'Intermediate', 'Advanced'];
const goals: FitnessProfile['goal'][] = ['Build Muscle', 'Strength', 'Lose Fat', 'General Fitness'];

export default function OnboardingScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { hydrated, profile, completeOnboarding } = useFitness();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [level, setLevel] = useState<FitnessProfile['level']>('Beginner');
  const [goal, setGoal] = useState<FitnessProfile['goal']>('Build Muscle');
  const [days, setDays] = useState(4);
  const [experience, setExperience] = useState('Less than 1 year');

  const canContinue = useMemo(() => {
    if (step === 0) return name.trim().length > 1 && age.trim().length > 0;
    return true;
  }, [step, name, age]);

  if (!hydrated) return <View style={[styles.loading, { backgroundColor: colors.background }]} />;
  if (profile) return <Redirect href="/home" />;

  const next = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (step < 2) {
      setStep((current) => current + 1);
      return;
    }
    await completeOnboarding({ name: name.trim(), age, level, goal, days, experience });
    router.replace('/home');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 18 }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View style={styles.brandRow}>
            <View style={[styles.logo, { backgroundColor: colors.primary }]}>
              <Feather name="activity" size={20} color={colors.primaryForeground} />
            </View>
            <Text style={[styles.brand, { color: colors.foreground }]}>FITFORGE</Text>
          </View>
          <Text style={[styles.stepLabel, { color: colors.mutedForeground }]}>{step + 1} of 3</Text>
        </View>
        <View style={[styles.progressTrack, { backgroundColor: colors.muted }]}>
          <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${((step + 1) / 3) * 100}%` }]} />
        </View>

        <View style={styles.hero}>
          <Text style={[styles.kicker, { color: colors.primary }]}>BUILD YOUR EDGE</Text>
          <Text style={[styles.title, { color: colors.foreground }]}>
            {step === 0 ? 'Your training,\nyour way.' : step === 1 ? 'What are you\ntraining for?' : 'Make it a\nweekly habit.'}
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {step === 0 ? 'Tell us a little about yourself so FitForge can make every session count.' : step === 1 ? 'We will shape your workout recommendations around your goal and current level.' : 'Choose a rhythm you can keep. Consistency beats intensity every time.'}
          </Text>
        </View>

        {step === 0 ? (
          <View style={styles.form}>
            <Text style={[styles.label, { color: colors.secondaryForeground }]}>What should we call you?</Text>
            <TextInput testID="onboarding-name" value={name} onChangeText={setName} placeholder="Your first name" placeholderTextColor={colors.mutedForeground} style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]} />
            <Text style={[styles.label, { color: colors.secondaryForeground }]}>Your age</Text>
            <TextInput testID="onboarding-age" value={age} onChangeText={setAge} keyboardType="number-pad" placeholder="Age" placeholderTextColor={colors.mutedForeground} style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]} />
          </View>
        ) : null}

        {step === 1 ? (
          <View style={styles.form}>
            <Text style={[styles.label, { color: colors.secondaryForeground }]}>Current fitness level</Text>
            <View style={styles.chipWrap}>{levels.map((item) => <ChoiceChip key={item} label={item} selected={level === item} onPress={() => setLevel(item)} colors={colors} />)}</View>
            <Text style={[styles.label, { color: colors.secondaryForeground, marginTop: 26 }]}>Main goal</Text>
            <View style={styles.chipWrap}>{goals.map((item) => <ChoiceChip key={item} label={item} selected={goal === item} onPress={() => setGoal(item)} colors={colors} />)}</View>
          </View>
        ) : null}

        {step === 2 ? (
          <View style={styles.form}>
            <Text style={[styles.label, { color: colors.secondaryForeground }]}>Days per week</Text>
            <View style={styles.dayRow}>
              {[2, 3, 4, 5, 6].map((item) => <Pressable key={item} onPress={() => setDays(item)} style={[styles.dayOption, { backgroundColor: days === item ? colors.primary : colors.card, borderColor: days === item ? colors.primary : colors.border }]}><Text style={{ color: days === item ? colors.primaryForeground : colors.foreground, fontSize: 17, fontWeight: '700' }}>{item}</Text><Text style={{ color: days === item ? colors.primaryForeground : colors.mutedForeground, fontSize: 11 }}>days</Text></Pressable>)}
            </View>
            <Text style={[styles.label, { color: colors.secondaryForeground, marginTop: 26 }]}>Training experience</Text>
            <View style={styles.chipWrap}>{['Less than 1 year', '1–3 years', '3+ years'].map((item) => <ChoiceChip key={item} label={item} selected={experience === item} onPress={() => setExperience(item)} colors={colors} />)}</View>
          </View>
        ) : null}

        <Pressable testID="onboarding-continue" disabled={!canContinue} onPress={next} style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.primary, opacity: canContinue ? (pressed ? 0.78 : 1) : 0.45 }]}>
          <Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>{step === 2 ? 'Create my plan' : 'Continue'}</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.primaryForeground} />
        </Pressable>
        {step > 0 ? <Pressable onPress={() => setStep((current) => current - 1)} style={styles.backButton}><Text style={{ color: colors.mutedForeground, fontWeight: '600' }}>Back</Text></Pressable> : null}
      </ScrollView>
    </View>
  );
}

function ChoiceChip({ label, selected, onPress, colors }: { label: string; selected: boolean; onPress: () => void; colors: ReturnType<typeof useColors> }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.choiceChip, { backgroundColor: selected ? colors.accent : colors.card, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.8 : 1 }]}><Text style={{ color: selected ? colors.accentForeground : colors.secondaryForeground, fontWeight: '600', fontSize: 13 }}>{label}</Text>{selected ? <Ionicons name="checkmark-circle" size={16} color={colors.primary} /> : null}</Pressable>;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: { flex: 1 },
  scroll: { paddingHorizontal: 22, paddingBottom: 34 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 16, fontWeight: '800', letterSpacing: 2 },
  stepLabel: { fontSize: 12, fontWeight: '700' },
  progressTrack: { height: 4, borderRadius: 3, marginTop: 20, overflow: 'hidden' },
  progressFill: { height: 4, borderRadius: 3 },
  hero: { marginTop: 62, marginBottom: 32 },
  kicker: { fontSize: 12, letterSpacing: 2, fontWeight: '800', marginBottom: 14 },
  title: { fontSize: 42, lineHeight: 45, fontWeight: '800', letterSpacing: -1.4 },
  subtitle: { fontSize: 15, lineHeight: 23, marginTop: 18, maxWidth: 340 },
  form: { marginBottom: 32 },
  label: { fontSize: 13, fontWeight: '700', marginBottom: 10 },
  input: { height: 56, borderWidth: 1, borderRadius: 16, paddingHorizontal: 16, fontSize: 16, marginBottom: 22 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  choiceChip: { minHeight: 44, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  dayRow: { flexDirection: 'row', gap: 8 },
  dayOption: { flex: 1, minHeight: 68, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  primaryButton: { minHeight: 58, borderRadius: 18, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10 },
  primaryButtonText: { fontSize: 15, fontWeight: '800' },
  backButton: { alignItems: 'center', paddingVertical: 18 },
});