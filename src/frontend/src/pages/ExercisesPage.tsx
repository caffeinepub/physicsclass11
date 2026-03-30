import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Exercise } from "../backend.d";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useGetAllExercises } from "../hooks/useQueries";

const MOCK_EXERCISES: Exercise[] = [
  {
    name: "Barbell Back Squat",
    muscleGroup: "Legs",
    difficulty: 3n,
    description:
      "The king of lower body exercises. Build massive quads, glutes, and hamstrings.",
  },
  {
    name: "Romanian Deadlift",
    muscleGroup: "Legs",
    difficulty: 2n,
    description:
      "Hip-hinge movement targeting hamstrings and glutes with excellent stretch.",
  },
  {
    name: "Leg Press",
    muscleGroup: "Legs",
    difficulty: 1n,
    description:
      "Machine-based quad dominant exercise, great for volume training.",
  },
  {
    name: "Bench Press",
    muscleGroup: "Chest",
    difficulty: 2n,
    description:
      "Classic horizontal push. Develops chest thickness and pressing strength.",
  },
  {
    name: "Incline Dumbbell Press",
    muscleGroup: "Chest",
    difficulty: 2n,
    description:
      "Targets the upper chest with a deeper stretch than barbell variation.",
  },
  {
    name: "Cable Flye",
    muscleGroup: "Chest",
    difficulty: 1n,
    description:
      "Isolation movement for chest, excellent for the squeeze at peak contraction.",
  },
  {
    name: "Pull-Up",
    muscleGroup: "Back",
    difficulty: 3n,
    description:
      "Upper body pulling foundation. Develops lat width and bicep strength.",
  },
  {
    name: "Barbell Row",
    muscleGroup: "Back",
    difficulty: 2n,
    description: "Compound rowing for back thickness, traps, and rear delts.",
  },
  {
    name: "Lat Pulldown",
    muscleGroup: "Back",
    difficulty: 1n,
    description: "Cable-based pull for lat development, ideal for beginners.",
  },
  {
    name: "Plank",
    muscleGroup: "Core",
    difficulty: 1n,
    description:
      "Anti-extension core stability exercise. Foundation of all core training.",
  },
  {
    name: "Cable Crunch",
    muscleGroup: "Core",
    difficulty: 1n,
    description: "Weighted crunch for direct abdominal hypertrophy.",
  },
  {
    name: "Ab Wheel Rollout",
    muscleGroup: "Core",
    difficulty: 3n,
    description:
      "Advanced anti-extension movement. Excellent for building strong abs.",
  },
  {
    name: "Overhead Press",
    muscleGroup: "Shoulders",
    difficulty: 2n,
    description:
      "Primary shoulder pressing movement. Develops deltoid mass and stability.",
  },
  {
    name: "Lateral Raise",
    muscleGroup: "Shoulders",
    difficulty: 1n,
    description: "Isolation for medial deltoid, essential for shoulder width.",
  },
  {
    name: "Barbell Curl",
    muscleGroup: "Arms",
    difficulty: 1n,
    description:
      "Classic bicep builder. Maximum loading for bicep peak development.",
  },
  {
    name: "Tricep Pushdown",
    muscleGroup: "Arms",
    difficulty: 1n,
    description: "Cable isolation for tricep development, safe and effective.",
  },
];

const MUSCLE_GROUPS = [
  "All",
  "Chest",
  "Back",
  "Legs",
  "Core",
  "Shoulders",
  "Arms",
];

const DIFFICULTY_LABELS: Record<string, string> = {
  "1": "Beginner",
  "2": "Intermediate",
  "3": "Advanced",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  "1": "bg-green-100 text-green-700",
  "2": "bg-yellow-100 text-yellow-700",
  "3": "bg-red-100 text-red-700",
};

export default function ExercisesPage() {
  const { data: backendExercises, isLoading } = useGetAllExercises();
  const exercises =
    backendExercises && backendExercises.length > 0
      ? backendExercises
      : MOCK_EXERCISES;
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");

  const filtered = exercises.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    const matchGroup = activeGroup === "All" || e.muscleGroup === activeGroup;
    return matchSearch && matchGroup;
  });

  return (
    <div className="min-h-screen bg-physi-light flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-physi-dark py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-white mb-2">
              Exercise Library
            </h1>
            <p className="text-gray-400">
              Browse {exercises.length}+ exercises across all muscle groups
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-physi-body" />
              <Input
                placeholder="Search exercises..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 rounded-full bg-white"
                data-ocid="exercises.search_input"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-physi-body shrink-0" />
              {MUSCLE_GROUPS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setActiveGroup(g)}
                  data-ocid="exercises.tab"
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeGroup === g
                      ? "bg-teal text-physi-dark"
                      : "bg-white text-physi-body hover:bg-teal/10 border border-border"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              data-ocid="exercises.loading_state"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                <Skeleton key={i} className="h-44 rounded-2xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-24"
              data-ocid="exercises.empty_state"
            >
              <svg
                className="w-12 h-12 text-physi-body mx-auto mb-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 5v14M18 5v14M2 9h4M18 9h4M2 15h4M18 15h4" />
              </svg>
              <p className="text-physi-body">
                No exercises found. Try a different search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((ex, i) => (
                <motion.div
                  key={ex.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl p-6 shadow-xs hover:shadow-card transition-shadow"
                  data-ocid={`exercises.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-teal text-xs font-bold uppercase tracking-wider">
                      {ex.muscleGroup}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        DIFFICULTY_COLORS[ex.difficulty.toString()] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {DIFFICULTY_LABELS[ex.difficulty.toString()] ?? "Unknown"}
                    </span>
                  </div>
                  <h3 className="text-physi-heading font-bold text-base mb-2">
                    {ex.name}
                  </h3>
                  <p className="text-physi-body text-sm leading-relaxed line-clamp-3">
                    {ex.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
