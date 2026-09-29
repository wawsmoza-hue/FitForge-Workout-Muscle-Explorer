import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { DemoKey, Exercise } from '@/data/exercises';
import { useColors } from '@/hooks/useColors';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

const movementNames: Record<DemoKey, string> = {
  press: 'Controlled press',
  fly: 'Open and squeeze',
  pull: 'Pull to the body',
  row: 'Row with control',
  raise: 'Raise to shoulder height',
  curl: 'Curl and lower',
  extension: 'Extend without swinging',
  squat: 'Squat and stand',
  hinge: 'Hinge with a neutral spine',
  thrust: 'Drive the hips up',
  calf: 'Rise and pause',
  core: 'Brace and breathe',
  grip: 'Hold and walk tall',
  neck: 'Small, gentle range',
  jaw: 'Relaxed small range',
};

const iconNames: Record<DemoKey, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  press: 'dumbbell',
  fly: 'cable-data',
  pull: 'human-handsup',
  row: 'dumbbell',
  raise: 'arm-flex',
  curl: 'arm-flex-outline',
  extension: 'cable-data',
  squat: 'human',
  hinge: 'weight-lifter',
  thrust: 'human',
  calf: 'walk',
  core: 'meditation',
  grip: 'hand-back-right',
  neck: 'head-outline',
  jaw: 'face-man',
};

export function MotionDemo({ exercise }: { exercise: Exercise }) {
  const colors = useColors();
  const progress = useRef(new Animated.Value(0)).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const key = exercise.demoKey;

  const cycle = (rest: number, active: number) =>
    progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [rest, active, rest] });
  const cycleAngle = (rest: string, active: string) =>
    progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [rest, active, rest] } as never);

  const start = () => {
    animation.current?.stop();
    animation.current = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: Platform.OS !== 'web',
      }),
    );
    animation.current.start();
  };

  useEffect(() => {
    start();
    return () => animation.current?.stop();
  }, []);

  const togglePlaying = () => {
    if (isPlaying) {
      animation.current?.stop();
      setIsPlaying(false);
    } else {
      start();
      setIsPlaying(true);
    }
  };

  const bodyTransform =
    key === 'squat' || key === 'thrust'
      ? [{ translateY: cycle(0, key === 'squat' ? 14 : -12) }, { scaleY: cycle(1, key === 'squat' ? 0.88 : 1) }]
      : key === 'hinge'
        ? [{ rotate: cycleAngle('0deg', '7deg') }]
        : key === 'core'
          ? [{ scaleX: cycle(0.98, 1) }]
          : key === 'neck'
            ? [{ rotate: cycleAngle('-3deg', '3deg') }]
            : key === 'jaw'
              ? [{ scaleX: cycle(0.96, 1) }]
              : [{ translateY: cycle(6, -7) }];

  const equipmentTransform =
    key === 'fly'
      ? [{ scaleX: cycle(0.72, 1) }]
      : key === 'curl'
        ? [{ rotate: cycleAngle('0deg', '-32deg') }, { translateY: cycle(8, -6) }]
        : key === 'extension'
          ? [{ rotate: cycleAngle('0deg', '18deg') }]
          : key === 'pull' || key === 'raise'
            ? [{ translateY: cycle(12, -14) }]
            : key === 'row' || key === 'grip'
              ? [{ translateX: cycle(10, -10) }]
              : [{ translateY: cycle(5, -8) }];

  return (
    <View style={[styles.card, { backgroundColor: colors.accent, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.kicker, { color: colors.primary }]}>MOTION DEMO · 4 SEC</Text>
          <Text style={[styles.label, { color: colors.foreground }]}>{movementNames[key]}</Text>
        </View>
        <Pressable testID="motion-demo-toggle" onPress={togglePlaying} style={[styles.playButton, { backgroundColor: colors.primary }]}>
          <Feather name={isPlaying ? 'pause' : 'play'} size={14} color={colors.primaryForeground} />
        </Pressable>
      </View>
      <View style={styles.stage}>
        <View style={[styles.floor, { backgroundColor: colors.border }]} />
        <Animated.View style={[styles.body, { transform: bodyTransform }]}>
          <MaterialCommunityIcons name={iconNames[key]} size={74} color={colors.primary} />
        </Animated.View>
        <AnimatedIcon name={iconNames[key]} size={40} color={colors.foreground} style={[styles.equipment, { transform: equipmentTransform }]} />
      </View>
      <Text style={[styles.caption, { color: colors.mutedForeground }]}>Looped visual cue — slow and controlled</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { minHeight: 230, borderRadius: 26, borderWidth: 1, padding: 16, marginBottom: 20, overflow: 'hidden' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kicker: { fontSize: 10, fontWeight: '800', letterSpacing: 1.4 },
  label: { fontSize: 15, fontWeight: '800', marginTop: 5 },
  playButton: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stage: { height: 140, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  floor: { position: 'absolute', bottom: 16, width: 150, height: 2, opacity: 0.55 },
  body: { alignItems: 'center', justifyContent: 'center' },
  equipment: { position: 'absolute', opacity: 0.92 },
  caption: { fontSize: 11, textAlign: 'center', marginTop: 4 },
});