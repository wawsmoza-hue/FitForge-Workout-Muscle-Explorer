import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

export default function NutritionScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + 12 }]}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><Text style={[styles.eyebrow, { color: colors.primary }]}>FUEL THE WORK</Text><Text style={[styles.title, { color: colors.foreground }]}>Nutrition</Text><Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Simple targets for stronger sessions.</Text><View style={[styles.calorieCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View><Text style={{ color: colors.mutedForeground, fontSize: 12 }}>Daily calories</Text><Text style={{ color: colors.foreground, fontSize: 34, fontWeight: '800', marginTop: 6 }}>2,380</Text><Text style={{ color: colors.mutedForeground, fontSize: 12, marginTop: 4 }}>of 2,650 kcal</Text></View><View style={[styles.calorieRing, { borderColor: colors.primary }]}><Text style={{ color: colors.primary, fontSize: 19, fontWeight: '800' }}>90%</Text></View></View><View style={styles.macroRow}><Macro label="Protein" value="142g" target="180g" color={colors.primary} colors={colors} /><Macro label="Carbs" value="218g" target="300g" color="#67d7ff" colors={colors} /><Macro label="Fats" value="61g" target="75g" color="#ffbd66" colors={colors} /></View><View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Today's meals</Text><Pressable><Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>See plan</Text></Pressable></View>{[['Breakfast', 'Greek yogurt, oats & berries', '520 kcal', 'coffee'], ['Lunch', 'Chicken rice power bowl', '680 kcal', 'restaurant'], ['Snack', 'Protein shake & banana', '320 kcal', 'cup-straw'], ['Dinner', 'Salmon, potatoes & greens', '740 kcal', 'food-variant']].map(([meal, name, calories, icon]) => <Pressable key={meal} style={[styles.mealRow, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.mealIcon, { backgroundColor: colors.accent }]}><MaterialCommunityIcons name={icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']} size={20} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={{ color: colors.mutedForeground, fontSize: 10, fontWeight: '800', letterSpacing: 1 }}>{meal.toUpperCase()}</Text><Text style={{ color: colors.foreground, fontWeight: '700', fontSize: 13, marginTop: 5 }}>{name}</Text></View><Text style={{ color: colors.mutedForeground, fontSize: 11 }}>{calories}</Text><Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} /></Pressable>)}<View style={[styles.waterCard, { backgroundColor: colors.accent, borderColor: colors.border }]}><Feather name="droplet" size={20} color={colors.primary} /><View style={{ flex: 1, marginLeft: 12 }}><Text style={{ color: colors.foreground, fontWeight: '800' }}>Hydration</Text><Text style={{ color: colors.mutedForeground, fontSize: 12, marginTop: 3 }}>5 of 8 glasses today</Text></View><Text style={{ color: colors.primary, fontWeight: '800' }}>+ Add</Text></View></ScrollView></View>;
}

function Macro({ label, value, target, color, colors }: { label: string; value: string; target: string; color: string; colors: ReturnType<typeof useColors> }) {
  return <View style={[styles.macro, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.macroDot, { backgroundColor: color }]} /><Text style={{ color: colors.foreground, fontWeight: '800', fontSize: 13 }}>{value}</Text><Text style={{ color: colors.mutedForeground, fontSize: 10, marginTop: 3 }}>{label}</Text><Text style={{ color: colors.mutedForeground, fontSize: 10, marginTop: 5 }}>of {target}</Text></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 18, paddingBottom: 115 },
  eyebrow: { fontSize: 10, letterSpacing: 1.5, fontWeight: '800', marginBottom: 8 },
  title: { fontSize: 30, fontWeight: '800' },
  subtitle: { fontSize: 14, marginTop: 8, marginBottom: 24 },
  calorieCard: { borderRadius: 23, borderWidth: 1, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  calorieRing: { width: 88, height: 88, borderRadius: 44, borderWidth: 7, justifyContent: 'center', alignItems: 'center' },
  macroRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  macro: { flex: 1, minHeight: 106, borderRadius: 17, borderWidth: 1, padding: 12 },
  macroDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 13 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 13 },
  sectionTitle: { fontSize: 17, fontWeight: '800' },
  mealRow: { minHeight: 72, borderRadius: 17, borderWidth: 1, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 9 },
  mealIcon: { width: 40, height: 40, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  waterCard: { minHeight: 65, borderRadius: 17, borderWidth: 1, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', marginTop: 8 },
});