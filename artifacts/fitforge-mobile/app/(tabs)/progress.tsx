import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useFitness } from '@/contexts/fitness';

export default function ProgressScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completed } = useFitness();
  return <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + 12 }]}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><Text style={[styles.eyebrow, { color: colors.primary }]}>KEEP SHOWING UP</Text><Text style={[styles.title, { color: colors.foreground }]}>Your progress</Text><Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Small wins stack into serious strength.</Text><View style={[styles.summary, { backgroundColor: colors.card, borderColor: colors.border }]}><View><Text style={{ color: colors.mutedForeground, fontSize: 12 }}>This month</Text><Text style={{ color: colors.foreground, fontSize: 34, fontWeight: '800', marginTop: 6 }}>{completed.length}</Text><Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>exercises completed</Text></View><View style={[styles.ring, { borderColor: colors.primary }]}><Text style={{ color: colors.primary, fontSize: 22, fontWeight: '800' }}>{Math.min(100, completed.length * 8)}%</Text><Text style={{ color: colors.mutedForeground, fontSize: 10 }}>goal</Text></View></View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Weekly consistency</Text><View style={[styles.chart, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={styles.chartLines}>{[0, 1, 2, 3].map((item) => <View key={item} style={{ borderTopWidth: 1, borderTopColor: colors.border, flex: 1 }} />)}</View><View style={styles.bars}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <View key={`${day}-${index}`} style={styles.barCol}><View style={[styles.bar, { height: [32, 56, 22, 72, 42, 12, 0][index], backgroundColor: index === 3 ? colors.primary : colors.secondary }]} /><Text style={{ color: colors.mutedForeground, fontSize: 10, marginTop: 10 }}>{day}</Text></View>)}</View></View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Body measurements</Text>{[['Body weight', '78.4 kg', '−0.8 kg'], ['Chest', '102 cm', '+2 cm'], ['Arms', '37 cm', '+1 cm'], ['Waist', '84 cm', '−1 cm']].map(([label, value, change]) => <Pressable key={label} style={[styles.measureRow, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.measureIcon, { backgroundColor: colors.accent }]}><Feather name={label === 'Body weight' ? 'activity' : 'maximize-2'} size={17} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={{ color: colors.foreground, fontWeight: '700', fontSize: 13 }}>{label}</Text><Text style={{ color: colors.mutedForeground, fontSize: 11, marginTop: 3 }}>Updated this week</Text></View><View style={{ alignItems: 'flex-end' }}><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: '800' }}>{value}</Text><Text style={{ color: colors.primary, fontSize: 11, fontWeight: '700', marginTop: 3 }}>{change}</Text></View><Ionicons name="chevron-forward" size={17} color={colors.mutedForeground} /></Pressable>)}</ScrollView></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 18, paddingBottom: 115 },
  eyebrow: { fontSize: 10, letterSpacing: 1.5, fontWeight: '800', marginBottom: 8 },
  title: { fontSize: 30, fontWeight: '800' },
  subtitle: { fontSize: 14, marginTop: 8, marginBottom: 24 },
  summary: { borderRadius: 23, borderWidth: 1, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ring: { width: 104, height: 104, borderRadius: 52, borderWidth: 8, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginTop: 28, marginBottom: 13 },
  chart: { height: 180, borderRadius: 20, borderWidth: 1, padding: 18, position: 'relative' },
  chartLines: { ...StyleSheet.absoluteFill, top: 23, bottom: 44, left: 18, right: 18, gap: 0 },
  bars: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%', paddingBottom: 0 },
  barCol: { alignItems: 'center', justifyContent: 'flex-end', height: '100%', width: 28 },
  bar: { width: 12, borderRadius: 6, minHeight: 4 },
  measureRow: { minHeight: 69, borderRadius: 17, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 11, marginBottom: 9 },
  measureIcon: { width: 37, height: 37, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
});