import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, Clock, Dumbbell, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { WorkoutPlan } from "../backend.d";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useGetAllWorkoutPlans } from "../hooks/useQueries";

const MOCK_PLANS: WorkoutPlan[] = [
  {
    name: "Full Body Strength Blast",
    exercises: [
      { exerciseId: 1n, sets: 4n, reps: 8n, weight: 80n },
      { exerciseId: 4n, sets: 4n, reps: 6n, weight: 100n },
      { exerciseId: 7n, sets: 3n, reps: 10n, weight: 0n },
    ],
  },
  {
    name: "Push Day Powerhouse",
    exercises: [
      { exerciseId: 4n, sets: 5n, reps: 5n, weight: 100n },
      { exerciseId: 5n, sets: 4n, reps: 10n, weight: 32n },
      { exerciseId: 13n, sets: 4n, reps: 8n, weight: 60n },
      { exerciseId: 6n, sets: 3n, reps: 15n, weight: 20n },
    ],
  },
  {
    name: "Pull Day Builder",
    exercises: [
      { exerciseId: 7n, sets: 4n, reps: 8n, weight: 0n },
      { exerciseId: 8n, sets: 4n, reps: 8n, weight: 80n },
      { exerciseId: 9n, sets: 3n, reps: 12n, weight: 60n },
      { exerciseId: 15n, sets: 3n, reps: 12n, weight: 35n },
    ],
  },
  {
    name: "Leg Day Annihilator",
    exercises: [
      { exerciseId: 1n, sets: 5n, reps: 5n, weight: 120n },
      { exerciseId: 2n, sets: 4n, reps: 10n, weight: 80n },
      { exerciseId: 3n, sets: 3n, reps: 15n, weight: 150n },
    ],
  },
  {
    name: "Core & Conditioning",
    exercises: [
      { exerciseId: 10n, sets: 3n, reps: 60n, weight: 0n },
      { exerciseId: 11n, sets: 4n, reps: 15n, weight: 50n },
      { exerciseId: 12n, sets: 3n, reps: 12n, weight: 0n },
    ],
  },
  {
    name: "Arm Sculpt",
    exercises: [
      { exerciseId: 15n, sets: 4n, reps: 12n, weight: 40n },
      { exerciseId: 16n, sets: 4n, reps: 12n, weight: 40n },
      { exerciseId: 14n, sets: 3n, reps: 15n, weight: 12n },
    ],
  },
];

function WorkoutCard({ plan, index }: { plan: WorkoutPlan; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl shadow-xs overflow-hidden"
      data-ocid={`workouts.item.${index + 1}`}
    >
      <button
        type="button"
        className="w-full text-left p-6 hover:bg-physi-light/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
        data-ocid={`workouts.toggle.${index + 1}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-teal" />
            </div>
            <div>
              <h3 className="text-physi-heading font-bold text-lg">
                {plan.name}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-physi-body text-sm flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  {plan.exercises.length} exercises
                </span>
                <span className="text-physi-body text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />~{plan.exercises.length * 12} min
                </span>
              </div>
            </div>
          </div>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-physi-body" />
          ) : (
            <ChevronDown className="w-5 h-5 text-physi-body" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-border">
              <div className="pt-4 space-y-3">
                {plan.exercises.map((ex, j) => (
                  <div
                    key={`${ex.exerciseId}-${j}`}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    data-ocid={`workouts.row.${j + 1}`}
                  >
                    <span className="text-physi-body text-sm">
                      Exercise #{ex.exerciseId.toString()}
                    </span>
                    <div className="flex gap-4 text-sm">
                      <Badge
                        variant="outline"
                        className="text-teal border-teal"
                      >
                        {ex.sets.toString()} sets
                      </Badge>
                      <Badge variant="outline">{ex.reps.toString()} reps</Badge>
                      {ex.weight > 0n && (
                        <Badge variant="outline">
                          {ex.weight.toString()} kg
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WorkoutsPage() {
  const { data: backendPlans, isLoading } = useGetAllWorkoutPlans();
  const plans =
    backendPlans && backendPlans.length > 0 ? backendPlans : MOCK_PLANS;

  return (
    <div className="min-h-screen bg-physi-light flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-physi-dark py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-white mb-2">
              Workout Plans
            </h1>
            <p className="text-gray-400">
              Expert-crafted training programs for every goal and fitness level
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {isLoading ? (
            <div className="space-y-4" data-ocid="workouts.loading_state">
              {Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                <Skeleton key={i} className="h-24 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {plans.map((plan, i) => (
                <WorkoutCard key={plan.name} plan={plan} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
