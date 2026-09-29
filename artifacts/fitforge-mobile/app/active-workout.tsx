import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useFitness } from '@/contexts/fitness';

const session = [
  { name: 'Barbell Bench Press', detail: 'Chest · 4 sets × 6–10 reps', icon: 'dumbbell' as const },
  { name: 'Lat Pulldown', detail: 'Back · 4 sets × 8–12 reps', icon: 'cable-data' as const },
  { name: 'Back Squat', detail: 'Legs · 4 sets × 6–10 reps', icon: 'weight-lifter' as const },
];

export default function ActiveWorkoutScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { markCompleted } = useFitness();
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [paused]);

  const completeCurrent = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const next = done.includes(current) ? done : [...done, current];
    setDone(next);
    await markCompleted(['barbell-bench-press', 'lat-pulldown', 'back-squat'][current]);
    if (current < session.length - 1) setCurrent(current + 1);
  };

  const time = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const progress = done.length / session.length;

  return <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + 12 }]}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><View style={styles.topBar}><Pressable onPress={() => router.back()} style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }]}><Ionicons name="close" size={20} color={colors.foreground} /></Pressable><Text style={{ color: colors.foreground, fontWeight: '800', fontSize: 15 }}>Upper body power</Text><Pressable onPress={() => setPaused((value) => !value)} style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }]}><Ionicons name={paused ? 'play' : 'pause'} size={18} color={colors.primary} /></Pressable></View>
    <View style={[styles.timerCard, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.eyebrow, { color: colors.primary }]}>{paused ? 'PAUSED' : 'SESSION IN PROGRESS'}</Text><Text style={[styles.timer, { color: colors.foreground }]}>{time}</Text><Text style={{ color: colors.mutedForeground, fontSize: 13 }}>{done.length} of {session.length} exercises completed</Text><View style={[styles.progressTrack, { backgroundColor: colors.muted }]}><View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${Math.max(4, progress * 100)}%` }]} /></View></View>
    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Your session</Text>
    {session.map((item, index) => <Pressable key={item.name} onPress={() => setCurrent(index)} style={[styles.exerciseRow, { backgroundColor: index === current ? colors.accent : colors.card, borderColor: index === current ? colors.primary : colors.border }]}><View style={[styles.number, { backgroundColor: index === current ? colors.primary : colors.secondary }]}>{done.includes(index) ? <Ionicons name="checkmark" size={18} color={colors.primaryForeground} /> : <Text style={{ color: index === current ? colors.primaryForeground : colors.mutedForeground, fontWeight: '800' }}>{index + 1}</Text>}</View><View style={{ flex: 1 }}><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: '800' }}>{item.name}</Text><Text style={{ color: colors.mutedForeground, fontSize: 12, marginTop: 5 }}>{item.detail}</Text></View><MaterialCommunityIcons name={item.icon} size={21} color={index === current ? colors.primary : colors.mutedForeground} /></Pressable>)}
    <View style={[styles.tip, { backgroundColor: colors.card, borderColor: colors.border }]}><Feather name="info" size={17} color={colors.primary} /><Text style={{ flex: 1, color: colors.mutedForeground, fontSize: 12, lineHeight: 18 }}>Take the full rest time between sets. Quality reps are the goal.</Text></View>
    <Pressable disabled={done.length === session.length} onPress={completeCurrent} style={({ pressed }) => [styles.completeButton, { backgroundColor: colors.primary, opacity: done.length === session.length ? 0.45 : pressed ? 0.8 : 1 }]}><Text style={{ color: colors.primaryForeground, fontWeight: '800' }}>{done.length === session.length ? 'Workout complete' : `Complete ${session[current].name}`}</Text><Ionicons name="arrow-forward" size={18} color={colors.primaryForeground} /></Pressable>
    {done.length === session.length ? <Pressable onPress={() => router.replace('/home')} style={styles.finishLink}><Text style={{ color: colors.primary, fontWeight: '800' }}>Back to dashboard</Text></Pressable> : null}
  </ScrollView></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 18, paddingBottom: 38 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  iconButton: { width: 42, height: 42, borderRadius: 14, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  timerCard: { borderRadius: 25, borderWidth: 1, padding: 22, alignItems: 'center', marginBottom: 28 },
  eyebrow: { fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
  timer: { fontSize: 58, fontWeight: '800', letterSpacing: -2, marginTop: 14 },
  progressTrack: { height: 5, borderRadius: 3, width: '100%', marginTop: 20, overflow: 'hidden' },
  progressFill: { height: 5, borderRadius: 3 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 13 },
  exerciseRow: { minHeight: 78, borderRadius: 18, borderWidth: 1, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  number: { width: 37, height: 37, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tip: { borderRadius: 16, borderWidth: 1, padding: 14, flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 },
  completeButton: { minHeight: 56, borderRadius: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 20 },
  finishLink: { alignItems: 'center', paddingVertical: 18 },
});