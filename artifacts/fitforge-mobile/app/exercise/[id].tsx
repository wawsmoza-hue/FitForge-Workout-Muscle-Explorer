import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { getExercise, getMuscle } from '@/data/exercises';
import { useFitness } from '@/contexts/fitness';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { favorites, toggleFavorite, completed, markCompleted } = useFitness();
  const exercise = getExercise(id);

  if (!exercise) return <View style={[styles.missing, { backgroundColor: colors.background }]}><Text style={{ color: colors.foreground }}>Exercise not found</Text></View>;
  const muscle = getMuscle(exercise.muscle);
  const isFavorite = favorites.includes(exercise.id);
  const isCompleted = completed.includes(exercise.id);

  const complete = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await markCompleted(exercise.id);
  };

  return <View style={[styles.screen, { backgroundColor: colors.background }]}>
    <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}><Pressable onPress={() => router.back()} style={[styles.back, { backgroundColor: colors.card, borderColor: colors.border }]}><Ionicons name="arrow-back" size={19} color={colors.foreground} /></Pressable><View style={{ flexDirection: 'row', gap: 10 }}><Pressable onPress={() => toggleFavorite(exercise.id)} style={[styles.back, { backgroundColor: colors.card, borderColor: colors.border }]}><Ionicons name={isFavorite ? 'bookmark' : 'bookmark-outline'} size={18} color={isFavorite ? colors.primary : colors.foreground} /></Pressable><Pressable style={[styles.back, { backgroundColor: colors.card, borderColor: colors.border }]}><Feather name="more-horizontal" size={19} color={colors.foreground} /></Pressable></View></View>
      <View style={[styles.visual, { backgroundColor: colors.accent, borderColor: colors.border }]}><MaterialCommunityIcons name={exercise.equipment === 'Bodyweight' || exercise.equipment === 'At home' ? 'human' : exercise.equipment === 'Cable' ? 'cable-data' : 'dumbbell'} size={76} color={colors.primary} /><View style={[styles.visualBadge, { backgroundColor: colors.primary }]}><Text style={{ color: colors.primaryForeground, fontSize: 11, fontWeight: '800' }}>{exercise.equipment.toUpperCase()}</Text></View></View>
      <Text style={[styles.kicker, { color: colors.primary }]}>{muscle.label.toUpperCase()} · {exercise.subtarget.toUpperCase()}</Text>
      <Text style={[styles.title, { color: colors.foreground }]}>{exercise.name}</Text>
      <Text style={[styles.description, { color: colors.mutedForeground }]}>A focused {exercise.difficulty.toLowerCase()} movement for your {muscle.label.toLowerCase()} session. Use the cues below to make every rep deliberate.</Text>
      <View style={styles.metrics}>{[['layers-outline', `${exercise.sets}`, 'sets'], ['repeat', exercise.reps, 'reps'], ['timer-outline', exercise.rest, 'rest']].map(([icon, value, label]) => <View key={label} style={[styles.metric, { backgroundColor: colors.card, borderColor: colors.border }]}><MaterialCommunityIcons name={icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']} size={18} color={colors.primary} /><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: '800', marginTop: 9 }}>{value}</Text><Text style={{ color: colors.mutedForeground, fontSize: 11, marginTop: 2 }}>{label}</Text></View>)}</View>
      <InfoSection title="How to do it" icon="list" colors={colors}>{exercise.instructions.map((item, index) => <View key={item} style={styles.bulletRow}><View style={[styles.bullet, { backgroundColor: colors.primary }]}><Text style={{ color: colors.primaryForeground, fontSize: 10, fontWeight: '800' }}>{index + 1}</Text></View><Text style={{ color: colors.secondaryForeground, flex: 1, fontSize: 13, lineHeight: 19 }}>{item}</Text></View>)}</InfoSection>
      <InfoSection title="Common mistakes" icon="alert-circle" colors={colors}>{exercise.mistakes.map((item) => <View key={item} style={styles.simpleRow}><Feather name="x" size={16} color={colors.destructive} /><Text style={{ color: colors.secondaryForeground, fontSize: 13, flex: 1 }}>{item}</Text></View>)}</InfoSection>
      <InfoSection title="Safety note" icon="shield" colors={colors}><Text style={{ color: colors.secondaryForeground, fontSize: 13, lineHeight: 20 }}>{exercise.safety}</Text></InfoSection>
      <Pressable onPress={complete} style={({ pressed }) => [styles.completeButton, { backgroundColor: isCompleted ? colors.secondary : colors.primary, opacity: pressed ? 0.8 : 1 }]}><Ionicons name={isCompleted ? 'checkmark-circle' : 'play'} size={19} color={isCompleted ? colors.primary : colors.primaryForeground} /><Text style={{ color: isCompleted ? colors.primary : colors.primaryForeground, fontWeight: '800' }}>{isCompleted ? 'Completed today' : 'Mark as completed'}</Text></Pressable>
    </ScrollView>
  </View>;
}

function InfoSection({ title, icon, children, colors }: { title: string; icon: React.ComponentProps<typeof Feather>['name']; children: React.ReactNode; colors: ReturnType<typeof useColors> }) {
  return <View style={[styles.infoSection, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={styles.infoHeader}><Feather name={icon} size={17} color={colors.primary} /><Text style={{ color: colors.foreground, fontWeight: '800', fontSize: 15 }}>{title}</Text></View>{children}</View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 18, paddingBottom: 40 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  back: { width: 42, height: 42, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  visual: { height: 220, borderRadius: 26, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 22, position: 'relative' },
  visualBadge: { position: 'absolute', left: 16, bottom: 16, borderRadius: 9, paddingHorizontal: 9, paddingVertical: 6 },
  kicker: { fontSize: 10, letterSpacing: 1.3, fontWeight: '800' },
  title: { fontSize: 30, lineHeight: 35, fontWeight: '800', marginTop: 8 },
  description: { fontSize: 14, lineHeight: 21, marginTop: 10 },
  metrics: { flexDirection: 'row', gap: 9, marginTop: 22 },
  metric: { flex: 1, minHeight: 91, borderRadius: 16, borderWidth: 1, padding: 12 },
  infoSection: { borderRadius: 18, borderWidth: 1, padding: 16, marginTop: 14 },
  infoHeader: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 15 },
  bulletRow: { flexDirection: 'row', gap: 11, alignItems: 'center', marginBottom: 12 },
  bullet: { width: 22, height: 22, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  simpleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 11 },
  completeButton: { minHeight: 55, borderRadius: 17, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9, marginTop: 20 },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});