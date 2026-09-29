import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useFitness } from '@/contexts/fitness';

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { profile, favorites } = useFitness();
  const name = profile?.name || 'Athlete';
  return <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + 12 }]}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><View style={styles.header}><View style={[styles.avatar, { backgroundColor: colors.primary }]}><Text style={{ color: colors.primaryForeground, fontSize: 25, fontWeight: '800' }}>{name.slice(0, 1).toUpperCase()}</Text></View><Text style={[styles.title, { color: colors.foreground }]}>{name}</Text><Text style={{ color: colors.mutedForeground, fontSize: 13, marginTop: 5 }}>{profile?.goal || 'Build Muscle'} · {profile?.level || 'Beginner'}</Text></View><View style={styles.profileStats}><Stat label="Workouts" value="24" colors={colors} /><Stat label="Streak" value="8 days" colors={colors} /><Stat label="Saved" value={String(favorites.length)} colors={colors} /></View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Preferences</Text><SettingRow icon="bell" label="Notifications" detail="Workout reminders & updates" colors={colors} right={<Switch value onValueChange={() => undefined} trackColor={{ false: colors.secondary, true: colors.accent }} thumbColor={colors.primary} />} /><SettingRow icon="moon" label="Dark mode" detail="Easy on the eyes at night" colors={colors} right={<Switch value onValueChange={() => undefined} trackColor={{ false: colors.secondary, true: colors.accent }} thumbColor={colors.primary} />} /><SettingRow icon="sliders" label="Training preferences" detail={`${profile?.days || 4} days per week · ${profile?.experience || 'Less than 1 year'}`} colors={colors} right={<Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />} /><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Account</Text><SettingRow icon="help-circle" label="Help & safety" detail="Exercise guidance and support" colors={colors} right={<Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />} /><SettingRow icon="info" label="About FitForge" detail="Version 1.0.0" colors={colors} right={<Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />} /></ScrollView></View>;
}

function Stat({ label, value, colors }: { label: string; value: string; colors: ReturnType<typeof useColors> }) {
  return <View style={[styles.stat, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={{ color: colors.foreground, fontSize: 18, fontWeight: '800' }}>{value}</Text><Text style={{ color: colors.mutedForeground, fontSize: 10, marginTop: 5 }}>{label}</Text></View>;
}

function SettingRow({ icon, label, detail, right, colors }: { icon: React.ComponentProps<typeof Feather>['name']; label: string; detail: string; right: React.ReactNode; colors: ReturnType<typeof useColors> }) {
  return <Pressable style={[styles.setting, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.settingIcon, { backgroundColor: colors.accent }]}><Feather name={icon} size={17} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={{ color: colors.foreground, fontWeight: '700', fontSize: 13 }}>{label}</Text><Text style={{ color: colors.mutedForeground, fontSize: 11, marginTop: 4 }}>{detail}</Text></View>{right}</Pressable>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 18, paddingBottom: 115 },
  header: { alignItems: 'center', paddingVertical: 15 },
  avatar: { width: 82, height: 82, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  title: { fontSize: 27, fontWeight: '800' },
  profileStats: { flexDirection: 'row', gap: 9, marginTop: 16, marginBottom: 11 },
  stat: { flex: 1, minHeight: 80, borderRadius: 17, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginTop: 26, marginBottom: 13 },
  setting: { minHeight: 69, borderRadius: 17, borderWidth: 1, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 9 },
  settingIcon: { width: 38, height: 38, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
});