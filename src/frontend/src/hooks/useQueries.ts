import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Exercise,
  LogEntry,
  UserProfile,
  WorkoutPlan,
} from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllExercises() {
  const { actor, isFetching } = useActor();
  return useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllExercises();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllWorkoutPlans() {
  const { actor, isFetching } = useActor();
  return useQuery<WorkoutPlan[]>({
    queryKey: ["workoutPlans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWorkoutPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerWorkoutHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<LogEntry[]>({
    queryKey: ["workoutHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerWorkoutHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLogWorkout() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (log: LogEntry) => {
      if (!actor) throw new Error("Not connected");
      return actor.logWorkout(log);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workoutHistory"] }),
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userProfile"] }),
  });
}
