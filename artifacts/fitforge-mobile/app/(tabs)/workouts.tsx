import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { Equipment, exercises, getMuscle, MuscleId, muscleGroups } from '@/data/exercises';
import { useFitness } from '@/contexts/fitness';

const equipmentFilters: Array<'All' | Equipment> = ['All', 'Barbell', 'Dumbbells', 'Cable', 'Machine', 'Bodyweight'];

export default function WorkoutsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ muscle?: string }>();
  const { favorites, toggleFavorite } = useFitness();
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleId | null>((params.muscle as MuscleId) || null);
  const [query, setQuery] = useState('');
  const [equipment, setEquipment] = useState<'All' | Equipment>('All');

  const visibleExercises = useMemo(() => exercises.filter((exercise) => {
    const matchesMuscle = !selectedMuscle || exercise.muscle === selectedMuscle;
    const matchesEquipment = equipment === 'All' || exercise.equipment === equipment;
    const matchesQuery = !query.trim() || `${exercise.name} ${exercise.subtarget} ${exercise.equipment}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesMuscle && matchesEquipment && matchesQuery;
  }), [selectedMuscle, query, equipment]);

  const selectMuscle = async (id: MuscleId) => {
    await Haptics.selectionAsync();
    setSelectedMuscle(id);
    setEquipment('All');
    setQuery('');
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + 12 }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View><Text style={[styles.eyebrow, { color: colors.primary }]}>{selectedMuscle ? 'EXERCISE LIBRARY' : 'TRAIN SMARTER'}</Text><Text style={[styles.title, { color: colors.foreground }]}>{selectedMuscle ? getMuscle(selectedMuscle).label : 'Workouts'}</Text></View>
          {selectedMuscle ? <Pressable onPress={() => setSelectedMuscle(null)} style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }]}><Ionicons name="grid-outline" size={19} color={colors.foreground} /></Pressable> : <Pressable onPress={() => router.push('/active-workout')} style={[styles.iconButton, { backgroundColor: colors.primary }]}><Ionicons name="play" size={18} color={colors.primaryForeground} /></Pressable>}
        </View>

        {selectedMuscle ? <View style={[styles.selectedBanner, { backgroundColor: colors.accent, borderColor: colors.primary }]}><View style={[styles.bannerIcon, { backgroundColor: colors.primary }]}><MaterialCommunityIcons name={getMuscle(selectedMuscle).icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']} size={22} color={colors.primaryForeground} /></View><View style={{ flex: 1 }}><Text style={{ color: colors.accentForeground, fontWeight: '800', fontSize: 15 }}>{getMuscle(selectedMuscle).label} library</Text><Text style={{ color: colors.mutedForeground, marginTop: 3, fontSize: 12 }}>{getMuscle(selectedMuscle).subtitle} · {visibleExercises.length} exercises</Text></View></View> : <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Choose a muscle to see every exercise, variation, and setup in one place.</Text>}

        <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}><Feather name="search" size={18} color={colors.mutedForeground} /><TextInput value={query} onChangeText={setQuery} placeholder="Search exercises" placeholderTextColor={colors.mutedForeground} style={{ flex: 1, color: colors.foreground, fontSize: 14 }} /><Feather name="sliders" size={17} color={colors.mutedForeground} /></View>

        {!selectedMuscle ? <><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Muscle groups</Text><View style={styles.grid}>{muscleGroups.map((group) => <Pressable testID={`muscle-${group.id}`} key={group.id} onPress={() => selectMuscle(group.id)} style={({ pressed }) => [styles.muscleCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.8 : 1 }]}><View style={[styles.muscleIcon, { backgroundColor: `${group.accent}22` }]}><MaterialCommunityIcons name={group.icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']} size={24} color={group.accent} /></View><Text style={[styles.muscleName, { color: colors.foreground }]}>{group.label}</Text><Text style={[styles.muscleSubtitle, { color: colors.mutedForeground }]}>{group.subtitle}</Text><View style={styles.cardBottom}><Text style={{ color: group.accent, fontSize: 11, fontWeight: '800' }}>{exercises.filter((item) => item.muscle === group.id).length} moves</Text><Feather name="arrow-up-right" size={15} color={colors.mutedForeground} /></View></Pressable>)}</View></> : <><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 19 }}>{equipmentFilters.map((item) => <Pressable key={item} onPress={() => setEquipment(item)} style={[styles.filter, { backgroundColor: equipment === item ? colors.primary : colors.card, borderColor: equipment === item ? colors.primary : colors.border }]}><Text style={{ color: equipment === item ? colors.primaryForeground : colors.secondaryForeground, fontWeight: '700', fontSize: 12 }}>{item}</Text></Pressable>)}</ScrollView><Text style={[styles.sectionTitle, { color: colors.foreground }]}>{visibleExercises.length} exercises to explore</Text>{visibleExercises.map((exercise) => <ExerciseRow key={exercise.id} exercise={exercise} favorite={favorites.includes(exercise.id)} onFavorite={() => toggleFavorite(exercise.id)} colors={colors} />)}{visibleExercises.length === 0 ? <View style={styles.empty}><Feather name="search" size={27} color={colors.mutedForeground} /><Text style={{ color: colors.foreground, fontWeight: '700', marginTop: 12 }}>No exercises found</Text><Text style={{ color: colors.mutedForeground, fontSize: 13, marginTop: 5 }}>Try another name or equipment filter.</Text></View> : null}</>}
      </ScrollView>
    </View>
  );
}

function ExerciseRow({ exercise, favorite, onFavorite, colors }: { exercise: (typeof exercises)[number]; favorite: boolean; onFavorite: () => void; colors: ReturnType<typeof useColors> }) {
  return <Pressable onPress={() => router.push({ pathname: '/exercise/[id]', params: { id: exercise.id } })} style={({ pressed }) => [styles.exerciseCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.82 : 1 }]}><View style={[styles.exerciseGlyph, { backgroundColor: colors.accent }]}><MaterialCommunityIcons name={exercise.equipment === 'Bodyweight' || exercise.equipment === 'At home' ? 'human' : exercise.equipment === 'Cable' ? 'cable-data' : 'dumbbell'} size={23} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={{ color: colors.foreground, fontWeight: '800', fontSize: 14 }}>{exercise.name}</Text><Text style={{ color: colors.mutedForeground, fontSize: 12, marginTop: 5 }}>{exercise.subtarget} · {exercise.equipment}</Text><View style={styles.metaLine}><Text style={{ color: colors.primary, fontSize: 11, fontWeight: '700' }}>{exercise.sets} sets × {exercise.reps}</Text><Text style={{ color: colors.mutedForeground, fontSize: 11 }}>• {exercise.difficulty}</Text></View></View><Pressable hitSlop={10} onPress={(event) => { event.stopPropagation(); onFavorite(); }}><Ionicons name={favorite ? 'bookmark' : 'bookmark-outline'} size={20} color={favorite ? colors.primary : colors.mutedForeground} /></Pressable></Pressable>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 18, paddingBottom: 115 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  eyebrow: { fontSize: 10, letterSpacing: 1.5, fontWeight: '800', marginBottom: 7 },
  title: { fontSize: 29, fontWeight: '800', letterSpacing: -0.8 },
  subtitle: { fontSize: 14, lineHeight: 21, marginBottom: 17, maxWidth: 350 },
  iconButton: { width: 42, height: 42, borderRadius: 15, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  searchBox: { minHeight: 52, borderRadius: 16, borderWidth: 1, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginBottom: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  muscleCard: { width: '48.4%', minHeight: 157, borderRadius: 20, borderWidth: 1, padding: 14 },
  muscleIcon: { width: 43, height: 43, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  muscleName: { fontSize: 15, fontWeight: '800' },
  muscleSubtitle: { fontSize: 10, marginTop: 4, lineHeight: 14 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' },
  selectedBanner: { borderRadius: 20, borderWidth: 1, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  bannerIcon: { width: 43, height: 43, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  filter: { paddingHorizontal: 14, height: 36, borderRadius: 12, borderWidth: 1, justifyContent: 'center' },
  exerciseCard: { minHeight: 91, borderRadius: 19, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  exerciseGlyph: { width: 50, height: 58, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  metaLine: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 8 },
  empty: { alignItems: 'center', paddingVertical: 60 },
});