export enum ExerciseName {
  SQUAT = 'SQUAT',
  BENCH = 'BENCH',
  DEADLIFT = 'DEADLIFT',
}

export interface Exercise {
  id: string;
  name: string;
  userId: string;
}
