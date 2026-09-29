import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useFitness } from '@/contexts/fitness';
import { muscleGroups } from '@/data/exercises';

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { profile, completed } = useFitness();
  const name = profile?.name || 'Athlete';
  const workoutExercises = ['barbell-bench-press', 'barbell-row', 'back-squat'];
  const completion = Math.min(100, Math.round((completed.length / 12) * 100));

  const startWorkout = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/active-workout');
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + 12 }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.eyebrow, { color: colors.primary }]}>TUESDAY, SEPTEMBER 29</Text>
            <Text style={[styles.greeting, { color: colors.foreground }]}>Good morning, {name}</Text>
          </View>
          <Pressable onPress={() => router.push('/profile')} style={[styles.avatar, { backgroundColor: colors.accent }]}>
            <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 17 }}>{name.slice(0, 1).toUpperCase()}</Text>
          </Pressable>
        </View>

        <View style={[styles.heroCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.heroCopy}>
            <Text style={[styles.heroKicker, { color: colors.primary }]}>YOUR NEXT SESSION</Text>
            <Text style={[styles.heroTitle, { color: colors.foreground }]}>Upper body{"\n"}power</Text>
            <Text style={[styles.heroMeta, { color: colors.mutedForeground }]}>6 exercises · 48 min · {profile?.goal || 'Build Muscle'}</Text>
            <Pressable onPress={startWorkout} style={({ pressed }) => [styles.startButton, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}>
              <Ionicons name="play" size={15} color={colors.primaryForeground} />
              <Text style={{ color: colors.primaryForeground, fontWeight: '800', fontSize: 13 }}>Start workout</Text>
            </Pressable>
          </View>
          <View style={[styles.heroOrb, { borderColor: colors.primary }]}>
            <MaterialCommunityIcons name="lightning-bolt" size={46} color={colors.primary} />
            <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 11 }}>READY</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Your week</Text><Text style={[styles.sectionLink, { color: colors.primary }]}>This week</Text></View>
        <View style={styles.statsRow}>
          <StatCard value="3" label="sessions" icon="activity" colors={colors} />
          <StatCard value="4.2h" label="training time" icon="clock" colors={colors} />
          <StatCard value={`${completion}%`} label="complete" icon="check-circle" colors={colors} />
        </View>

        <View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Explore by muscle</Text><Pressable onPress={() => router.push('/workouts')}><Text style={[styles.sectionLink, { color: colors.primary }]}>See all</Text></Pressable></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingRight: 18 }}>
          {muscleGroups.slice(0, 6).map((group) => <Pressable key={group.id} onPress={() => router.push({ pathname: '/workouts', params: { muscle: group.id } })} style={[styles.musclePill, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.dot, { backgroundColor: group.accent }]} /><Text style={{ color: colors.secondaryForeground, fontWeight: '700', fontSize: 12 }}>{group.label}</Text></Pressable>)}
        </ScrollView>

        <View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Today’s focus</Text><Text style={[styles.sectionLink, { color: colors.mutedForeground }]}>3 moves</Text></View>
        {workoutExercises.map((id, index) => <Pressable key={id} onPress={() => router.push({ pathname: '/exercise/[id]', params: { id } })} style={[styles.exerciseRow, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.exerciseNumber, { backgroundColor: colors.accent }]}><Text style={{ color: colors.primary, fontWeight: '800' }}>{String(index + 1).padStart(2, '0')}</Text></View><View style={{ flex: 1 }}><Text style={{ color: colors.foreground, fontWeight: '700', fontSize: 14 }}>{id === 'barbell-bench-press' ? 'Barbell Bench Press' : id === 'barbell-row' ? 'Barbell Row' : 'Back Squat'}</Text><Text style={{ color: colors.mutedForeground, fontSize: 12, marginTop: 4 }}>{index === 0 ? 'Chest · 4 sets × 6–10 reps' : index === 1 ? 'Back · 4 sets × 6–10 reps' : 'Legs · 4 sets × 6–10 reps'}</Text></View><Feather name="chevron-right" size={18} color={colors.mutedForeground} /></Pressable>)}
      </ScrollView>
    </View>
  );
}

function StatCard({ value, label, icon, colors }: { value: string; label: string; icon: React.ComponentProps<typeof Feather>['name']; colors: ReturnType<typeof useColors> }) {
  return <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}><Feather name={icon} size={16} color={colors.primary} /><Text style={[styles.statValue, { color: colors.foreground }]}>{value}</Text><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 18, paddingBottom: 115 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  eyebrow: { fontSize: 10, letterSpacing: 1.4, fontWeight: '800', marginBottom: 8 },
  greeting: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  avatar: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  heroCard: { minHeight: 230, borderRadius: 26, borderWidth: 1, padding: 22, flexDirection: 'row', overflow: 'hidden' },
  heroCopy: { flex: 1 },
  heroKicker: { fontSize: 10, letterSpacing: 1.7, fontWeight: '800' },
  heroTitle: { fontSize: 31, lineHeight: 33, fontWeight: '800', marginTop: 10 },
  heroMeta: { fontSize: 12, marginTop: 12 },
  startButton: { height: 42, borderRadius: 13, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 18, width: 142 },
  heroOrb: { width: 95, height: 95, borderRadius: 48, borderWidth: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', opacity: 0.9 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 13 },
  sectionTitle: { fontSize: 17, fontWeight: '800' },
  sectionLink: { fontSize: 12, fontWeight: '700' },
  statsRow: { flexDirection: 'row', gap: 9 },
  statCard: { flex: 1, minHeight: 112, borderRadius: 18, borderWidth: 1, padding: 14 },
  statValue: { fontSize: 23, fontWeight: '800', marginTop: 13 },
  statLabel: { fontSize: 10, marginTop: 3 },
  musclePill: { height: 44, borderRadius: 15, borderWidth: 1, paddingHorizontal: 13, flexDirection: 'row', gap: 8, alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  exerciseRow: { minHeight: 72, borderRadius: 18, borderWidth: 1, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 9 },
  exerciseNumber: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
});