import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Lock, Plus, Weight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { LogEntry } from "../backend.d";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerWorkoutHistory, useLogWorkout } from "../hooks/useQueries";

function LoginPrompt({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm"
        data-ocid="tracking.card"
      >
        <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-5">
          <Lock className="w-8 h-8 text-teal" />
        </div>
        <h2 className="text-2xl font-bold text-physi-heading mb-3">
          Login Required
        </h2>
        <p className="text-physi-body mb-6">
          Sign in to track your workouts and view your training history.
        </p>
        <Button
          onClick={onLogin}
          className="bg-teal text-physi-dark font-bold rounded-full px-8"
          data-ocid="tracking.primary_button"
        >
          Sign In to Track
        </Button>
      </motion.div>
    </div>
  );
}

function LogWorkoutDialog() {
  const { mutateAsync, isPending } = useLogWorkout();
  const [open, setOpen] = useState(false);
  const [planId, setPlanId] = useState("");
  const [exerciseId, setExerciseId] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async () => {
    if (!planId || !exerciseId || !sets || !reps) {
      toast.error("Please fill all required fields");
      return;
    }
    const log: LogEntry = {
      workoutPlanId: BigInt(planId),
      time: BigInt(Date.now()) * 1_000_000n,
      actualExercises: [
        {
          exerciseId: BigInt(exerciseId),
          sets: BigInt(sets),
          reps: BigInt(reps),
          weight: BigInt(weight || "0"),
        },
      ],
    };
    try {
      await mutateAsync(log);
      toast.success("Workout logged!");
      setOpen(false);
      setPlanId("");
      setExerciseId("");
      setSets("");
      setReps("");
      setWeight("");
    } catch {
      toast.error("Failed to log workout");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-teal text-physi-dark font-bold rounded-full"
          data-ocid="tracking.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-2" /> Log Workout
        </Button>
      </DialogTrigger>
      <DialogContent data-ocid="tracking.dialog">
        <DialogHeader>
          <DialogTitle>Log a Workout</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label>Workout Plan ID</Label>
            <Input
              placeholder="e.g. 1"
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
              data-ocid="tracking.input"
            />
          </div>
          <div>
            <Label>Exercise ID</Label>
            <Input
              placeholder="e.g. 1"
              value={exerciseId}
              onChange={(e) => setExerciseId(e.target.value)}
              data-ocid="tracking.input"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Sets</Label>
              <Input
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                placeholder="4"
                data-ocid="tracking.input"
              />
            </div>
            <div>
              <Label>Reps</Label>
              <Input
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="8"
                data-ocid="tracking.input"
              />
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="60"
                data-ocid="tracking.input"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="flex-1 bg-teal text-physi-dark font-bold"
              data-ocid="tracking.submit_button"
            >
              {isPending ? "Saving..." : "Save Workout"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="tracking.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TrackingPage() {
  const { identity, login } = useInternetIdentity();
  const { data: history, isLoading } = useGetCallerWorkoutHistory();

  return (
    <div className="min-h-screen bg-physi-light flex flex-col">
      <Navbar />
      {!identity ? (
        <LoginPrompt onLogin={login} />
      ) : (
        <main className="flex-1">
          <div className="bg-physi-dark py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-white mb-2">
                  Workout Tracking
                </h1>
                <p className="text-gray-400">
                  Log sessions and monitor your progress
                </p>
              </div>
              <LogWorkoutDialog />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {isLoading ? (
              <div className="space-y-4" data-ocid="tracking.loading_state">
                {Array.from({ length: 3 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                  <Skeleton key={i} className="h-20 rounded-2xl" />
                ))}
              </div>
            ) : !history || history.length === 0 ? (
              <div
                className="text-center py-24"
                data-ocid="tracking.empty_state"
              >
                <Calendar className="w-12 h-12 text-physi-body mx-auto mb-4" />
                <h3 className="text-physi-heading font-bold text-xl mb-2">
                  No Workouts Logged Yet
                </h3>
                <p className="text-physi-body mb-6">
                  Start logging your sessions to see your history here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((entry, i) => (
                  <motion.div
                    key={`${entry.workoutPlanId}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-2xl p-6 shadow-xs"
                    data-ocid={`tracking.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                          <Weight className="w-5 h-5 text-teal" />
                        </div>
                        <div>
                          <p className="font-bold text-physi-heading">
                            Plan #{entry.workoutPlanId.toString()}
                          </p>
                          <p className="text-physi-body text-sm">
                            {new Date(
                              Number(entry.time) / 1_000_000,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-teal font-semibold text-sm">
                        {entry.actualExercises.length} exercises
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {entry.actualExercises.map((ex, j) => (
                        <span
                          key={`${ex.exerciseId}-${j}`}
                          className="bg-physi-light text-physi-body text-xs px-3 py-1 rounded-full"
                        >
                          Ex #{ex.exerciseId.toString()} &middot;{" "}
                          {ex.sets.toString()}x{ex.reps.toString()} @{" "}
                          {ex.weight.toString()}kg
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}
