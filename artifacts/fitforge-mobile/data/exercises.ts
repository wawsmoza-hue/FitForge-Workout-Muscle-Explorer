export type Equipment =
  | 'Barbell'
  | 'Dumbbells'
  | 'Cable'
  | 'Machine'
  | 'Bodyweight'
  | 'Bands'
  | 'At home';

export type MuscleId =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'legs'
  | 'glutes'
  | 'calves'
  | 'core'
  | 'forearms'
  | 'neck'
  | 'jaw';

export type Exercise = {
  id: string;
  name: string;
  muscle: MuscleId;
  subtarget: string;
  equipment: Equipment;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sets: number;
  reps: string;
  rest: string;
  instructions: string[];
  mistakes: string[];
  safety: string;
};

export type MuscleGroup = {
  id: MuscleId;
  label: string;
  subtitle: string;
  icon: string;
  accent: string;
};

export const muscleGroups: MuscleGroup[] = [
  { id: 'chest', label: 'Chest', subtitle: 'Upper, mid & lower', icon: 'dumbbell', accent: '#b8f23a' },
  { id: 'back', label: 'Back', subtitle: 'Lats, traps & lower back', icon: 'human-handsup', accent: '#67d7ff' },
  { id: 'shoulders', label: 'Shoulders', subtitle: 'Delts & stability', icon: 'arm-flex', accent: '#ffbd66' },
  { id: 'biceps', label: 'Biceps', subtitle: 'Curls & pulls', icon: 'arm-flex-outline', accent: '#e78aff' },
  { id: 'triceps', label: 'Triceps', subtitle: 'Pressing power', icon: 'arm-flex', accent: '#ff7e93' },
  { id: 'legs', label: 'Legs', subtitle: 'Quads & hamstrings', icon: 'human', accent: '#82f5b1' },
  { id: 'glutes', label: 'Glutes', subtitle: 'Power & shape', icon: 'human', accent: '#ff8d61' },
  { id: 'calves', label: 'Calves', subtitle: 'Lower-leg strength', icon: 'walk', accent: '#72b9ff' },
  { id: 'core', label: 'Core', subtitle: 'Abs & obliques', icon: 'meditation', accent: '#f5e56b' },
  { id: 'forearms', label: 'Forearms', subtitle: 'Grip & wrist control', icon: 'hand-back-right', accent: '#d7a77a' },
  { id: 'neck', label: 'Neck', subtitle: 'Mobility & isometrics', icon: 'head-outline', accent: '#9ee36f' },
  { id: 'jaw', label: 'Jaw & Face', subtitle: 'Gentle facial work', icon: 'face-man', accent: '#d3a3ff' },
];

const base = {
  chest: {
    instructions: ['Set your shoulder blades down and back.', 'Control the weight to the target position.', 'Drive through the intended muscle and keep your wrists stacked.'],
    mistakes: ['Bouncing the weight', 'Flaring the elbows', 'Losing control on the way down'],
    safety: 'Use a spotter for challenging barbell sets and stop if you feel sharp shoulder pain.',
  },
  back: {
    instructions: ['Brace your core and keep a neutral spine.', 'Lead the movement with your elbows.', 'Pause briefly when the target muscle is fully shortened.'],
    mistakes: ['Swinging the torso', 'Pulling only with the hands', 'Rounding the lower back'],
    safety: 'Keep the spine neutral and use a load that lets you control every rep.',
  },
  shoulders: {
    instructions: ['Stand tall with a light brace.', 'Move through a smooth, pain-free range.', 'Keep the neck relaxed and finish with control.'],
    mistakes: ['Using momentum', 'Shrugging toward the ears', 'Going heavier than your form allows'],
    safety: 'Shoulders are sensitive to poor control; choose quality reps over heavy weight.',
  },
  biceps: {
    instructions: ['Keep your upper arm still beside the body.', 'Curl by squeezing the biceps, not by swinging.', 'Lower slowly to a full comfortable stretch.'],
    mistakes: ['Leaning backward', 'Moving the elbows forward', 'Dropping the eccentric'],
    safety: 'Keep the wrist neutral and avoid forcing the bottom stretch.',
  },
  triceps: {
    instructions: ['Set your shoulders down and brace your ribs.', 'Keep the elbows pointed toward the floor or target.', 'Finish the extension without snapping the joint.'],
    mistakes: ['Flaring the elbows', 'Using the shoulders to move the load', 'Locking out aggressively'],
    safety: 'Use controlled elbow motion and stop if the joint feels irritated.',
  },
  legs: {
    instructions: ['Brace your core before each rep.', 'Track knees in line with the toes.', 'Drive evenly through the mid-foot and heel.'],
    mistakes: ['Knees collapsing inward', 'Losing the brace', 'Cutting the range of motion'],
    safety: 'Warm up gradually and keep a stable stance before adding load.',
  },
  glutes: {
    instructions: ['Set your feet for a stable base.', 'Keep the ribs stacked over the pelvis.', 'Finish by squeezing the glutes, not arching the back.'],
    mistakes: ['Overarching the lower back', 'Rushing the lockout', 'Letting the knees cave'],
    safety: 'Use a pad for loaded hip work and keep your neck neutral.',
  },
  calves: {
    instructions: ['Use a full comfortable range of motion.', 'Pause at the top and stretch at the bottom.', 'Keep pressure balanced across the foot.'],
    mistakes: ['Bouncing', 'Rolling the ankles', 'Using too much load'],
    safety: 'Progress slowly if your Achilles or ankle is sensitive.',
  },
  core: {
    instructions: ['Exhale gently as you brace.', 'Keep the ribs controlled over the pelvis.', 'Move slowly and stop before form breaks.'],
    mistakes: ['Pulling on the neck', 'Using momentum', 'Letting the lower back arch'],
    safety: 'Core work should feel controlled; stop if you feel lower-back pain.',
  },
  forearms: {
    instructions: ['Keep the wrist in the intended position.', 'Use a deliberate range of motion.', 'Relax the grip between sets.'],
    mistakes: ['Moving the whole arm', 'Over-gripping', 'Working through wrist pain'],
    safety: 'Use light loads at first and avoid sharp wrist discomfort.',
  },
  neck: {
    instructions: ['Sit or stand tall with the chin gently tucked.', 'Apply only light resistance.', 'Hold the position without holding your breath.'],
    mistakes: ['Jerking the head', 'Pushing into pain', 'Holding your breath'],
    safety: 'Neck training should be gentle. Stop immediately for dizziness, numbness, or pain.',
  },
  jaw: {
    instructions: ['Keep the tongue relaxed and breathe normally.', 'Use a very small, comfortable range.', 'Relax fully between repetitions.'],
    mistakes: ['Clenching hard', 'Forcing range of motion', 'Ignoring clicking or pain'],
    safety: 'Gentle facial exercises are not a treatment. Stop for pain, locking, or persistent clicking and consult a clinician.',
  },
} satisfies Record<MuscleId, Pick<Exercise, 'instructions' | 'mistakes' | 'safety'>>;

const make = (
  id: string,
  name: string,
  muscle: MuscleId,
  subtarget: string,
  equipment: Equipment,
  difficulty: Exercise['difficulty'],
  sets: number,
  reps: string,
  rest: string,
): Exercise => ({ id, name, muscle, subtarget, equipment, difficulty, sets, reps, rest, ...base[muscle] });

export const exercises: Exercise[] = [
  make('barbell-bench-press', 'Barbell Bench Press', 'chest', 'Mid chest', 'Barbell', 'Intermediate', 4, '6–10', '90 sec'),
  make('incline-dumbbell-press', 'Incline Dumbbell Press', 'chest', 'Upper chest', 'Dumbbells', 'Intermediate', 4, '8–12', '90 sec'),
  make('cable-chest-fly', 'Cable Chest Fly', 'chest', 'Inner chest', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('decline-machine-press', 'Decline Machine Press', 'chest', 'Lower chest', 'Machine', 'Beginner', 3, '10–14', '75 sec'),
  make('chest-dips', 'Chest Dips', 'chest', 'Lower chest', 'Bodyweight', 'Advanced', 3, '6–12', '90 sec'),
  make('push-ups', 'Push-ups', 'chest', 'Full chest', 'Bodyweight', 'Beginner', 3, 'AMRAP', '60 sec'),
  make('wide-grip-pull-up', 'Wide-Grip Pull-up', 'back', 'Lats', 'Bodyweight', 'Advanced', 4, '5–10', '120 sec'),
  make('lat-pulldown', 'Lat Pulldown', 'back', 'Lats', 'Machine', 'Beginner', 4, '8–12', '90 sec'),
  make('barbell-row', 'Barbell Row', 'back', 'Mid back', 'Barbell', 'Intermediate', 4, '6–10', '120 sec'),
  make('seated-cable-row', 'Seated Cable Row', 'back', 'Mid back', 'Cable', 'Beginner', 3, '10–14', '75 sec'),
  make('single-arm-dumbbell-row', 'Single-Arm Dumbbell Row', 'back', 'Lats', 'Dumbbells', 'Beginner', 3, '10–12 / side', '75 sec'),
  make('back-extension', 'Back Extension', 'back', 'Lower back', 'Bodyweight', 'Beginner', 3, '12–15', '60 sec'),
  make('overhead-press', 'Overhead Press', 'shoulders', 'Front delts', 'Barbell', 'Intermediate', 4, '6–10', '90 sec'),
  make('dumbbell-lateral-raise', 'Dumbbell Lateral Raise', 'shoulders', 'Side delts', 'Dumbbells', 'Beginner', 4, '12–20', '60 sec'),
  make('cable-face-pull', 'Cable Face Pull', 'shoulders', 'Rear delts', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('reverse-fly', 'Reverse Fly', 'shoulders', 'Rear delts', 'Machine', 'Beginner', 3, '12–15', '60 sec'),
  make('barbell-curl', 'Barbell Curl', 'biceps', 'Biceps peak', 'Barbell', 'Beginner', 4, '8–12', '75 sec'),
  make('incline-dumbbell-curl', 'Incline Dumbbell Curl', 'biceps', 'Long head', 'Dumbbells', 'Intermediate', 3, '10–12', '75 sec'),
  make('cable-curl', 'Cable Curl', 'biceps', 'Constant tension', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('hammer-curl', 'Hammer Curl', 'biceps', 'Brachialis', 'Dumbbells', 'Beginner', 3, '10–14', '60 sec'),
  make('preacher-curl', 'Preacher Curl', 'biceps', 'Short head', 'Machine', 'Beginner', 3, '10–14', '75 sec'),
  make('triceps-pushdown', 'Rope Triceps Pushdown', 'triceps', 'All heads', 'Cable', 'Beginner', 4, '10–15', '60 sec'),
  make('close-grip-bench', 'Close-Grip Bench Press', 'triceps', 'Lateral head', 'Barbell', 'Intermediate', 4, '6–10', '90 sec'),
  make('overhead-cable-extension', 'Overhead Cable Extension', 'triceps', 'Long head', 'Cable', 'Beginner', 3, '10–15', '60 sec'),
  make('dumbbell-skullcrusher', 'Dumbbell Skull Crusher', 'triceps', 'Long head', 'Dumbbells', 'Intermediate', 3, '8–12', '75 sec'),
  make('parallel-bar-dip', 'Parallel Bar Dip', 'triceps', 'All heads', 'Bodyweight', 'Advanced', 3, '6–12', '90 sec'),
  make('back-squat', 'Back Squat', 'legs', 'Quads & glutes', 'Barbell', 'Intermediate', 4, '6–10', '120 sec'),
  make('leg-press', 'Leg Press', 'legs', 'Quads', 'Machine', 'Beginner', 4, '10–15', '90 sec'),
  make('romanian-deadlift', 'Romanian Deadlift', 'legs', 'Hamstrings', 'Barbell', 'Intermediate', 4, '8–12', '120 sec'),
  make('walking-lunge', 'Walking Lunge', 'legs', 'Quads & glutes', 'Dumbbells', 'Beginner', 3, '10 / side', '75 sec'),
  make('leg-extension', 'Leg Extension', 'legs', 'Quads', 'Machine', 'Beginner', 3, '12–15', '60 sec'),
  make('seated-leg-curl', 'Seated Leg Curl', 'legs', 'Hamstrings', 'Machine', 'Beginner', 3, '10–15', '60 sec'),
  make('hip-thrust', 'Barbell Hip Thrust', 'glutes', 'Glute max', 'Barbell', 'Intermediate', 4, '8–12', '90 sec'),
  make('cable-kickback', 'Cable Glute Kickback', 'glutes', 'Glute max', 'Cable', 'Beginner', 3, '12–15 / side', '60 sec'),
  make('bulgarian-split-squat', 'Bulgarian Split Squat', 'glutes', 'Glutes & quads', 'Dumbbells', 'Advanced', 3, '8–12 / side', '90 sec'),
  make('bodyweight-glute-bridge', 'Glute Bridge', 'glutes', 'Glute activation', 'Bodyweight', 'Beginner', 3, '15–20', '45 sec'),
  make('standing-calf-raise', 'Standing Calf Raise', 'calves', 'Gastrocnemius', 'Machine', 'Beginner', 4, '10–15', '60 sec'),
  make('seated-calf-raise', 'Seated Calf Raise', 'calves', 'Soleus', 'Machine', 'Beginner', 4, '12–20', '60 sec'),
  make('single-leg-calf-raise', 'Single-Leg Calf Raise', 'calves', 'Full calf', 'Bodyweight', 'Beginner', 3, '15 / side', '45 sec'),
  make('cable-crunch', 'Cable Crunch', 'core', 'Rectus abdominis', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('hanging-knee-raise', 'Hanging Knee Raise', 'core', 'Lower abs', 'Bodyweight', 'Intermediate', 3, '8–15', '60 sec'),
  make('ab-wheel-rollout', 'Ab Wheel Rollout', 'core', 'Deep core', 'Bodyweight', 'Advanced', 3, '6–12', '75 sec'),
  make('side-plank', 'Side Plank', 'core', 'Obliques', 'Bodyweight', 'Beginner', 3, '30–45 sec / side', '45 sec'),
  make('dead-bug', 'Dead Bug', 'core', 'Core control', 'At home', 'Beginner', 3, '10 / side', '45 sec'),
  make('wrist-curl', 'Wrist Curl', 'forearms', 'Forearm flexors', 'Dumbbells', 'Beginner', 3, '15–20', '45 sec'),
  make('reverse-wrist-curl', 'Reverse Wrist Curl', 'forearms', 'Forearm extensors', 'Dumbbells', 'Beginner', 3, '15–20', '45 sec'),
  make('farmer-carry', 'Farmer Carry', 'forearms', 'Grip', 'Dumbbells', 'Intermediate', 4, '30–45 sec', '75 sec'),
  make('neck-isometric', 'Neck Isometric Hold', 'neck', 'Neck stability', 'At home', 'Beginner', 3, '15–20 sec / direction', '45 sec'),
  make('chin-tuck', 'Chin Tuck', 'neck', 'Deep neck flexors', 'At home', 'Beginner', 3, '10–12', '30 sec'),
  make('gentle-neck-mobility', 'Gentle Neck Mobility', 'neck', 'Mobility', 'At home', 'Beginner', 2, '5 / direction', '30 sec'),
  make('tongue-posture', 'Relaxed Tongue Posture', 'jaw', 'Jaw awareness', 'At home', 'Beginner', 3, '30 sec', '30 sec'),
  make('controlled-jaw-open', 'Controlled Jaw Opening', 'jaw', 'Jaw mobility', 'At home', 'Beginner', 2, '8–10', '30 sec'),
  make('masseter-relaxation', 'Masseter Relaxation', 'jaw', 'Facial relaxation', 'At home', 'Beginner', 2, '30 sec / side', '30 sec'),
];

export const getMuscle = (id: MuscleId) => muscleGroups.find((group) => group.id === id) ?? muscleGroups[0];
export const getExercise = (id: string) => exercises.find((exercise) => exercise.id === id);