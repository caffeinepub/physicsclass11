import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Exercise {
    difficulty: bigint;
    name: string;
    description: string;
    muscleGroup: string;
}
export interface WorkoutPlan {
    name: string;
    exercises: Array<WorkoutExercise>;
}
export type Time = bigint;
export interface LogEntry {
    actualExercises: Array<WorkoutExercise>;
    time: Time;
    workoutPlanId: bigint;
}
export interface WorkoutExercise {
    weight: bigint;
    exerciseId: bigint;
    reps: bigint;
    sets: bigint;
}
export interface UserProfile {
    weight: bigint;
    height: bigint;
    fitnessGoal: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addExercise(exercise: Exercise): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createWorkoutPlan(plan: WorkoutPlan): Promise<bigint>;
    getAllExercises(): Promise<Array<Exercise>>;
    getAllWorkoutPlans(): Promise<Array<WorkoutPlan>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCallerWorkoutHistory(): Promise<Array<LogEntry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWorkoutHistory(user: Principal): Promise<Array<LogEntry>>;
    isCallerAdmin(): Promise<boolean>;
    logWorkout(log: LogEntry): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
