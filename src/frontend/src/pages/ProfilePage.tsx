import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock, Ruler, Save, Target, User, Weight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
} from "../hooks/useQueries";

const FITNESS_GOALS = [
  "Lose Weight",
  "Build Muscle",
  "Improve Endurance",
  "Increase Strength",
  "General Fitness",
  "Athletic Performance",
];

function LoginPrompt({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm"
        data-ocid="profile.card"
      >
        <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-5">
          <Lock className="w-8 h-8 text-teal" />
        </div>
        <h2 className="text-2xl font-bold text-physi-heading mb-3">
          Login Required
        </h2>
        <p className="text-physi-body mb-6">
          Sign in to view and update your fitness profile.
        </p>
        <Button
          onClick={onLogin}
          className="bg-teal text-physi-dark font-bold rounded-full px-8"
          data-ocid="profile.primary_button"
        >
          Sign In
        </Button>
      </motion.div>
    </div>
  );
}

export default function ProfilePage() {
  const { identity, login } = useInternetIdentity();
  const { data: profile, isLoading } = useGetCallerUserProfile();
  const { mutateAsync, isPending } = useSaveCallerUserProfile();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    if (profile) {
      setHeight(profile.height.toString());
      setWeight(profile.weight.toString());
      setGoal(profile.fitnessGoal);
    }
  }, [profile]);

  const handleSave = async () => {
    if (!height || !weight || !goal) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await mutateAsync({
        height: BigInt(height),
        weight: BigInt(weight),
        fitnessGoal: goal,
      });
      toast.success("Profile saved!");
    } catch {
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="min-h-screen bg-physi-light flex flex-col">
      <Navbar />
      {!identity ? (
        <LoginPrompt onLogin={login} />
      ) : (
        <main className="flex-1">
          <div className="bg-physi-dark py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-extrabold text-white mb-2">
                My Profile
              </h1>
              <p className="text-gray-400">
                Manage your personal fitness metrics and goals
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {isLoading ? (
              <div className="space-y-4" data-ocid="profile.loading_state">
                {Array.from({ length: 4 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                  <Skeleton key={i} className="h-14 rounded-xl" />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-card"
                data-ocid="profile.card"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-20 h-20 rounded-full bg-teal flex items-center justify-center">
                    <User className="w-10 h-10 text-physi-dark" />
                  </div>
                  <div>
                    <p className="font-bold text-physi-heading text-xl">
                      Your Profile
                    </p>
                    <p className="text-physi-body text-sm">
                      {identity.getPrincipal().toText().slice(0, 16)}...
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label className="flex items-center gap-2 mb-1">
                      <Ruler className="w-4 h-4 text-teal" />
                      Height (cm)
                    </Label>
                    <Input
                      type="number"
                      placeholder="175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      data-ocid="profile.input"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-1">
                      <Weight className="w-4 h-4 text-teal" />
                      Weight (kg)
                    </Label>
                    <Input
                      type="number"
                      placeholder="75"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      data-ocid="profile.input"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-teal" />
                      Fitness Goal
                    </Label>
                    <Select value={goal} onValueChange={setGoal}>
                      <SelectTrigger data-ocid="profile.select">
                        <SelectValue placeholder="Select a goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {FITNESS_GOALS.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleSave}
                    disabled={isPending}
                    className="w-full bg-teal text-physi-dark font-bold rounded-full mt-2"
                    data-ocid="profile.save_button"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isPending ? "Saving..." : "Save Profile"}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}
