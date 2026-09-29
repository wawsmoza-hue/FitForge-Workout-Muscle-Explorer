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
  videoUrl: string;
  videoSource: 'YouTube';
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
): Exercise => ({
  id,
  name,
  muscle,
  subtarget,
  equipment,
  difficulty,
  sets,
  reps,
  rest,
  ...base[muscle],
  videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} proper form`)}`,
  videoSource: 'YouTube',
});

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
  // Chest — additional barbell, dumbbell, cable, machine, band, and bodyweight variations.
  make('incline-barbell-bench', 'Incline Barbell Bench Press', 'chest', 'Upper chest', 'Barbell', 'Intermediate', 4, '6–10', '90 sec'),
  make('decline-barbell-bench', 'Decline Barbell Bench Press', 'chest', 'Lower chest', 'Barbell', 'Intermediate', 4, '6–10', '90 sec'),
  make('flat-dumbbell-press', 'Flat Dumbbell Press', 'chest', 'Mid chest', 'Dumbbells', 'Beginner', 4, '8–12', '90 sec'),
  make('incline-cable-fly', 'Incline Cable Fly', 'chest', 'Upper chest', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('low-to-high-cable-fly', 'Low-to-High Cable Fly', 'chest', 'Upper chest', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('high-to-low-cable-fly', 'High-to-Low Cable Fly', 'chest', 'Lower chest', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('pec-deck-fly', 'Pec Deck Fly', 'chest', 'Inner chest', 'Machine', 'Beginner', 3, '10–15', '60 sec'),
  make('smith-machine-bench', 'Smith Machine Bench Press', 'chest', 'Mid chest', 'Machine', 'Beginner', 4, '8–12', '90 sec'),
  make('dumbbell-pullover', 'Dumbbell Pullover', 'chest', 'Chest & serratus', 'Dumbbells', 'Intermediate', 3, '10–14', '75 sec'),
  make('landmine-chest-press', 'Landmine Chest Press', 'chest', 'Upper chest', 'Barbell', 'Intermediate', 3, '8–12', '75 sec'),
  make('assisted-chest-dip', 'Assisted Chest Dip', 'chest', 'Lower chest', 'Machine', 'Beginner', 3, '8–12', '75 sec'),
  make('chest-squeeze-press', 'Dumbbell Squeeze Press', 'chest', 'Inner chest', 'Dumbbells', 'Beginner', 3, '10–15', '60 sec'),
  make('band-chest-press', 'Resistance Band Chest Press', 'chest', 'Full chest', 'Bands', 'Beginner', 3, '12–20', '45 sec'),
  make('single-arm-cable-press', 'Single-Arm Cable Press', 'chest', 'Unilateral chest', 'Cable', 'Intermediate', 3, '10–12 / side', '60 sec'),
  // Back — vertical pulls, rows, spinal erectors, and trap-focused work.
  make('conventional-deadlift', 'Conventional Deadlift', 'back', 'Full posterior chain', 'Barbell', 'Advanced', 4, '3–6', '150 sec'),
  make('t-bar-row', 'T-Bar Row', 'back', 'Mid back', 'Barbell', 'Intermediate', 4, '8–12', '120 sec'),
  make('chest-supported-dumbbell-row', 'Chest-Supported Dumbbell Row', 'back', 'Mid back', 'Dumbbells', 'Beginner', 3, '10–14', '75 sec'),
  make('close-grip-lat-pulldown', 'Close-Grip Lat Pulldown', 'back', 'Lower lats', 'Machine', 'Beginner', 4, '8–12', '90 sec'),
  make('straight-arm-pulldown', 'Straight-Arm Pulldown', 'back', 'Lats', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('machine-high-row', 'Machine High Row', 'back', 'Upper lats', 'Machine', 'Beginner', 3, '10–14', '75 sec'),
  make('cable-pullover', 'Cable Pullover', 'back', 'Lats', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('dumbbell-shrug', 'Dumbbell Shrug', 'back', 'Upper traps', 'Dumbbells', 'Beginner', 4, '10–15', '60 sec'),
  make('barbell-shrug', 'Barbell Shrug', 'back', 'Upper traps', 'Barbell', 'Intermediate', 4, '8–12', '75 sec'),
  make('reverse-hyperextension', 'Reverse Hyperextension', 'back', 'Lower back', 'Machine', 'Intermediate', 3, '10–15', '75 sec'),
  make('inverted-row', 'Inverted Row', 'back', 'Mid back', 'Bodyweight', 'Beginner', 3, '8–15', '75 sec'),
  make('banded-lat-pulldown', 'Banded Lat Pulldown', 'back', 'Lats', 'Bands', 'Beginner', 3, '12–20', '45 sec'),
  // Shoulders — front, lateral, rear delts, and stable pressing patterns.
  make('arnold-press', 'Arnold Press', 'shoulders', 'Front & side delts', 'Dumbbells', 'Intermediate', 4, '8–12', '90 sec'),
  make('seated-dumbbell-press', 'Seated Dumbbell Shoulder Press', 'shoulders', 'Front delts', 'Dumbbells', 'Beginner', 4, '8–12', '90 sec'),
  make('front-raise', 'Dumbbell Front Raise', 'shoulders', 'Front delts', 'Dumbbells', 'Beginner', 3, '12–15', '60 sec'),
  make('cable-lateral-raise', 'Cable Lateral Raise', 'shoulders', 'Side delts', 'Cable', 'Beginner', 4, '12–20', '60 sec'),
  make('leaning-cable-lateral-raise', 'Leaning Cable Lateral Raise', 'shoulders', 'Side delts', 'Cable', 'Intermediate', 3, '12–15', '60 sec'),
  make('machine-shoulder-press', 'Machine Shoulder Press', 'shoulders', 'Front delts', 'Machine', 'Beginner', 4, '8–12', '90 sec'),
  make('cable-rear-delt-fly', 'Cable Rear Delt Fly', 'shoulders', 'Rear delts', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('dumbbell-y-raise', 'Dumbbell Y-Raise', 'shoulders', 'Lower traps & delts', 'Dumbbells', 'Beginner', 3, '10–15', '60 sec'),
  make('pike-push-up', 'Pike Push-up', 'shoulders', 'Front delts', 'Bodyweight', 'Intermediate', 3, '6–12', '75 sec'),
  make('band-pull-apart', 'Band Pull-Apart', 'shoulders', 'Rear delts', 'Bands', 'Beginner', 3, '15–25', '45 sec'),
  // Biceps — multiple grip, angle, and cable variations.
  make('alternating-dumbbell-curl', 'Alternating Dumbbell Curl', 'biceps', 'Biceps peak', 'Dumbbells', 'Beginner', 3, '10–14 / side', '60 sec'),
  make('concentration-curl', 'Concentration Curl', 'biceps', 'Short head', 'Dumbbells', 'Beginner', 3, '10–14 / side', '60 sec'),
  make('spider-curl', 'Spider Curl', 'biceps', 'Biceps peak', 'Dumbbells', 'Intermediate', 3, '10–14', '60 sec'),
  make('drag-curl', 'Barbell Drag Curl', 'biceps', 'Long head', 'Barbell', 'Intermediate', 3, '8–12', '75 sec'),
  make('zottman-curl', 'Zottman Curl', 'biceps', 'Biceps & forearms', 'Dumbbells', 'Intermediate', 3, '10–12', '60 sec'),
  make('cross-body-hammer-curl', 'Cross-Body Hammer Curl', 'biceps', 'Brachialis', 'Dumbbells', 'Beginner', 3, '10–14 / side', '60 sec'),
  make('cable-hammer-curl', 'Cable Rope Hammer Curl', 'biceps', 'Brachialis', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('band-curl', 'Resistance Band Curl', 'biceps', 'Full biceps', 'Bands', 'Beginner', 3, '15–20', '45 sec'),
  // Triceps — pressing, overhead, extension, and bodyweight work.
  make('single-arm-cable-pushdown', 'Single-Arm Cable Pushdown', 'triceps', 'Lateral head', 'Cable', 'Beginner', 3, '10–15 / side', '60 sec'),
  make('cable-kickback', 'Cable Triceps Kickback', 'triceps', 'Lateral head', 'Cable', 'Beginner', 3, '12–15 / side', '60 sec'),
  make('jm-press', 'JM Press', 'triceps', 'All heads', 'Barbell', 'Advanced', 3, '6–10', '90 sec'),
  make('bench-dip', 'Bench Dip', 'triceps', 'All heads', 'Bodyweight', 'Beginner', 3, '8–15', '60 sec'),
  make('close-grip-push-up', 'Close-Grip Push-up', 'triceps', 'Medial head', 'Bodyweight', 'Beginner', 3, 'AMRAP', '60 sec'),
  make('single-dumbbell-overhead-extension', 'Single Dumbbell Overhead Extension', 'triceps', 'Long head', 'Dumbbells', 'Beginner', 3, '10–15', '60 sec'),
  make('band-triceps-pressdown', 'Band Triceps Pressdown', 'triceps', 'All heads', 'Bands', 'Beginner', 3, '15–20', '45 sec'),
  make('tate-press', 'Tate Press', 'triceps', 'Lateral head', 'Dumbbells', 'Intermediate', 3, '10–14', '60 sec'),
  // Legs — quad, hamstring, adductor, and unilateral variations.
  make('front-squat', 'Front Squat', 'legs', 'Quads', 'Barbell', 'Advanced', 4, '5–8', '120 sec'),
  make('hack-squat', 'Hack Squat', 'legs', 'Quads', 'Machine', 'Intermediate', 4, '8–12', '120 sec'),
  make('goblet-squat', 'Goblet Squat', 'legs', 'Quads & glutes', 'Dumbbells', 'Beginner', 3, '10–15', '75 sec'),
  make('step-up', 'Dumbbell Step-up', 'legs', 'Quads & glutes', 'Dumbbells', 'Beginner', 3, '10 / side', '75 sec'),
  make('reverse-lunge', 'Reverse Lunge', 'legs', 'Quads & glutes', 'Bodyweight', 'Beginner', 3, '10 / side', '60 sec'),
  make('barbell-good-morning', 'Barbell Good Morning', 'legs', 'Hamstrings', 'Barbell', 'Advanced', 3, '8–12', '90 sec'),
  make('nordic-hamstring-curl', 'Nordic Hamstring Curl', 'legs', 'Hamstrings', 'Bodyweight', 'Advanced', 3, '5–8', '120 sec'),
  make('sissy-squat', 'Sissy Squat', 'legs', 'Quads', 'At home', 'Advanced', 3, '8–12', '75 sec'),
  make('cossack-squat', 'Cossack Squat', 'legs', 'Adductors & mobility', 'Bodyweight', 'Intermediate', 3, '8 / side', '60 sec'),
  make('banded-leg-curl', 'Banded Leg Curl', 'legs', 'Hamstrings', 'Bands', 'Beginner', 3, '15–20', '45 sec'),
  // Glutes — hip extension, abduction, and single-leg patterns.
  make('sumo-deadlift', 'Sumo Deadlift', 'glutes', 'Glutes & adductors', 'Barbell', 'Advanced', 4, '5–8', '120 sec'),
  make('cable-pull-through', 'Cable Pull-Through', 'glutes', 'Glute max', 'Cable', 'Beginner', 3, '12–15', '60 sec'),
  make('frog-pump', 'Frog Pump', 'glutes', 'Glute max', 'At home', 'Beginner', 3, '20–30', '45 sec'),
  make('single-leg-hip-thrust', 'Single-Leg Hip Thrust', 'glutes', 'Glute max', 'Bodyweight', 'Intermediate', 3, '10–15 / side', '60 sec'),
  make('glute-step-up', 'Glute-Biased Step-up', 'glutes', 'Glute max', 'Dumbbells', 'Intermediate', 3, '8–12 / side', '75 sec'),
  make('hip-abduction-machine', 'Hip Abduction Machine', 'glutes', 'Glute medius', 'Machine', 'Beginner', 3, '15–25', '60 sec'),
  make('banded-lateral-walk', 'Banded Lateral Walk', 'glutes', 'Glute medius', 'Bands', 'Beginner', 3, '12–20 / side', '45 sec'),
  make('quadruped-kickback', 'Quadruped Kickback', 'glutes', 'Glute max', 'At home', 'Beginner', 3, '12–20 / side', '45 sec'),
  // Calves — straight-knee, bent-knee, tibialis, and bodyweight options.
  make('donkey-calf-raise', 'Donkey Calf Raise', 'calves', 'Gastrocnemius', 'Machine', 'Intermediate', 4, '10–15', '60 sec'),
  make('leg-press-calf-raise', 'Leg Press Calf Raise', 'calves', 'Gastrocnemius', 'Machine', 'Beginner', 4, '12–20', '60 sec'),
  make('tibialis-raise', 'Tibialis Raise', 'calves', 'Tibialis anterior', 'At home', 'Beginner', 3, '15–25', '45 sec'),
  make('jump-rope-calf-pogo', 'Calf Pogo Hops', 'calves', 'Elastic strength', 'At home', 'Intermediate', 3, '20–30 sec', '45 sec'),
  make('weighted-single-leg-calf', 'Weighted Single-Leg Calf Raise', 'calves', 'Full calf', 'Dumbbells', 'Intermediate', 3, '12–18 / side', '60 sec'),
  make('band-calf-raise', 'Resistance Band Calf Raise', 'calves', 'Full calf', 'Bands', 'Beginner', 3, '15–25', '45 sec'),
  // Core — flexion, anti-extension, anti-rotation, and lateral stability.
  make('front-plank', 'Front Plank', 'core', 'Deep core', 'Bodyweight', 'Beginner', 3, '30–60 sec', '45 sec'),
  make('reverse-crunch', 'Reverse Crunch', 'core', 'Lower abs', 'Bodyweight', 'Beginner', 3, '12–20', '45 sec'),
  make('bicycle-crunch', 'Bicycle Crunch', 'core', 'Obliques', 'Bodyweight', 'Beginner', 3, '16–24 total', '45 sec'),
  make('pallof-press', 'Pallof Press', 'core', 'Anti-rotation', 'Cable', 'Beginner', 3, '10–15 / side', '45 sec'),
  make('dumbbell-russian-twist', 'Dumbbell Russian Twist', 'core', 'Obliques', 'Dumbbells', 'Intermediate', 3, '12–20 total', '60 sec'),
  make('mountain-climber', 'Mountain Climber', 'core', 'Full core', 'Bodyweight', 'Beginner', 3, '30–45 sec', '45 sec'),
  make('hollow-body-hold', 'Hollow Body Hold', 'core', 'Deep core', 'At home', 'Advanced', 3, '20–40 sec', '60 sec'),
  make('bird-dog', 'Bird Dog', 'core', 'Core control', 'At home', 'Beginner', 3, '10 / side', '45 sec'),
  make('suitcase-carry', 'Suitcase Carry', 'core', 'Anti-lateral flexion', 'Dumbbells', 'Intermediate', 3, '30–45 sec / side', '60 sec'),
  make('banded-dead-bug', 'Banded Dead Bug', 'core', 'Anti-extension', 'Bands', 'Intermediate', 3, '8–12 / side', '45 sec'),
  // Forearms — flexion, extension, pronation, and grip.
  make('reverse-barbell-curl', 'Reverse Barbell Curl', 'forearms', 'Brachioradialis', 'Barbell', 'Beginner', 3, '10–15', '60 sec'),
  make('wrist-roller', 'Wrist Roller', 'forearms', 'Forearm endurance', 'Cable', 'Intermediate', 3, '30–45 sec', '60 sec'),
  make('plate-pinch-hold', 'Plate Pinch Hold', 'forearms', 'Pinch grip', 'Dumbbells', 'Beginner', 3, '20–40 sec', '60 sec'),
  make('dead-hang', 'Dead Hang', 'forearms', 'Grip', 'Bodyweight', 'Beginner', 3, '20–60 sec', '75 sec'),
  make('grip-squeeze', 'Grip Squeeze', 'forearms', 'Crush grip', 'At home', 'Beginner', 3, '20–30', '30 sec'),
  make('dumbbell-pronation', 'Dumbbell Pronation & Supination', 'forearms', 'Rotators', 'Dumbbells', 'Beginner', 3, '12–15 / side', '45 sec'),
  make('band-wrist-extension', 'Band Wrist Extension', 'forearms', 'Wrist extensors', 'Bands', 'Beginner', 3, '15–20', '45 sec'),
  // Neck — gentle mobility and low-load isometrics only.
  make('band-neck-flexion', 'Band Neck Flexion', 'neck', 'Neck flexors', 'Bands', 'Beginner', 2, '10–15', '45 sec'),
  make('band-neck-extension', 'Band Neck Extension', 'neck', 'Neck extensors', 'Bands', 'Beginner', 2, '10–15', '45 sec'),
  make('band-neck-lateral-flexion', 'Band Neck Lateral Flexion', 'neck', 'Lateral neck', 'Bands', 'Beginner', 2, '10–15 / side', '45 sec'),
  make('neck-rotation-control', 'Controlled Neck Rotation', 'neck', 'Mobility', 'At home', 'Beginner', 2, '5–8 / side', '30 sec'),
  make('scapular-retraction-hold', 'Scapular Retraction Hold', 'neck', 'Upper neck support', 'Bands', 'Beginner', 3, '20–30 sec', '45 sec'),
  // Jaw & face — gentle awareness and relaxation, never forced resistance.
  make('controlled-jaw-lateral', 'Controlled Jaw Lateral Glide', 'jaw', 'Jaw mobility', 'At home', 'Beginner', 2, '6–8 / side', '30 sec'),
  make('jaw-relaxed-open-close', 'Relaxed Jaw Open & Close', 'jaw', 'Jaw control', 'At home', 'Beginner', 2, '8–10', '30 sec'),
  make('masseter-self-massage', 'Masseter Self-Massage', 'jaw', 'Facial relaxation', 'At home', 'Beginner', 2, '30 sec / side', '30 sec'),
  make('nasal-breathing-reset', 'Nasal Breathing Reset', 'jaw', 'Facial relaxation', 'At home', 'Beginner', 3, '5 breaths', '30 sec'),
];

export const getMuscle = (id: MuscleId) => muscleGroups.find((group) => group.id === id) ?? muscleGroups[0];
export const getExercise = (id: string) => exercises.find((exercise) => exercise.id === id);