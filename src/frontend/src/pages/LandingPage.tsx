import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  ChevronRight,
  Dumbbell,
  Search,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const FEATURES = [
  {
    icon: Dumbbell,
    title: "500+ Exercises",
    desc: "Access a comprehensive library of exercises with detailed instructions, muscle targeting, and difficulty ratings.",
  },
  {
    icon: BarChart3,
    title: "Smart Tracking",
    desc: "Log every rep, set, and weight. Visualize your progress over time and stay motivated with detailed analytics.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Join thousands of athletes sharing workouts, tips, and motivation. Challenge friends and climb the leaderboard.",
  },
];

const EXERCISE_TILES = [
  {
    label: "Squat",
    image: "/assets/generated/exercise-squat.dim_600x400.jpg",
    muscle: "Legs",
  },
  {
    label: "Core Training",
    image: "/assets/generated/exercise-core.dim_600x400.jpg",
    muscle: "Core",
  },
  {
    label: "Bench Press",
    image: "/assets/generated/exercise-chest.dim_600x400.jpg",
    muscle: "Chest",
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus Webb",
    role: "Marathon Runner",
    avatar: "MW",
    rating: 5,
    quote:
      "Physiquick completely transformed my training. The progress tracking is intuitive and I've shaved 8 minutes off my marathon time in just 3 months.",
  },
  {
    name: "Priya Sharma",
    role: "Strength Athlete",
    avatar: "PS",
    rating: 5,
    quote:
      "The exercise library is incredible. Every movement has clear instructions and I finally understand the muscle activation behind each lift. Game-changer.",
  },
  {
    name: "James Calloway",
    role: "CrossFit Coach",
    avatar: "JC",
    rating: 5,
    quote:
      "I use Physiquick to program workouts for all my clients. The workout plan builder saves me hours every week and my athletes love the interface.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: 560 }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-gym.dim_1400x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-physi-dark/90 via-physi-dark/70 to-transparent" />
        <div
          className="absolute top-0 right-0 h-full w-1/2"
          style={{
            background: "oklch(0.76 0.14 184 / 0.18)",
            clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        />
        <div
          className="absolute top-0 right-0 h-full w-1/3"
          style={{
            background: "oklch(0.76 0.14 184 / 0.12)",
            clipPath: "polygon(50% 0, 100% 0, 100% 100%, 20% 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 bg-teal/20 border border-teal/40 text-teal rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <Activity className="w-4 h-4" />
              Your Fitness Journey Starts Here
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Train Smarter, <span className="text-teal">Not Harder</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Physiquick gives you a complete fitness platform &mdash;
              expert-curated workouts, a massive exercise library, and
              intelligent progress tracking to help you reach peak performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/workouts">
                <Button
                  className="bg-teal text-physi-dark font-bold text-base px-8 py-3 rounded-full hover:bg-teal-dark transition-colors"
                  data-ocid="hero.primary_button"
                >
                  Start Training <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/exercises">
                <Button
                  variant="outline"
                  className="border-white/40 text-white font-semibold text-base px-8 py-3 rounded-full hover:bg-white/10"
                  data-ocid="hero.secondary_button"
                >
                  Browse Exercises
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personal Fitness Journey */}
      <section className="bg-physi-dark py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-14">
            Your Personal <span className="text-teal">Fitness Journey</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-card"
                data-ocid={`features.card.${i + 1}`}
              >
                <div className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-5">
                  <f.icon className="w-7 h-7 text-teal" />
                </div>
                <h3 className="text-physi-heading font-bold text-xl mb-3">
                  {f.title}
                </h3>
                <p className="text-physi-body text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Exercise Library */}
      <section className="bg-physi-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-teal font-semibold text-sm uppercase tracking-widest mb-1">
                500+ Exercises
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-physi-heading">
                Explore Our Exercise Library
              </h2>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-physi-body" />
              <Input
                placeholder="Search exercises..."
                className="pl-10 rounded-full"
                data-ocid="exercises.search_input"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXERCISE_TILES.map((tile, i) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl overflow-hidden h-60 group cursor-pointer"
                data-ocid={`exercise_tiles.item.${i + 1}`}
              >
                <img
                  src={tile.image}
                  alt={tile.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-physi-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="bg-teal text-physi-dark text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                    {tile.muscle}
                  </span>
                  <p className="text-white font-bold text-lg mt-1">
                    {tile.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/exercises">
              <Button
                variant="outline"
                className="border-teal text-teal hover:bg-teal hover:text-physi-dark rounded-full px-8"
                data-ocid="exercises.primary_button"
              >
                View All Exercises <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* App Features */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-teal font-semibold text-sm uppercase tracking-widest mb-2">
                App Features
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-physi-heading mb-5">
                Everything You Need to Reach Your Goals
              </h2>
              <p className="text-physi-body leading-relaxed mb-6">
                From beginner-friendly routines to advanced programming,
                Physiquick adapts to your level. Log workouts in seconds,
                visualize strength gains, and never miss a training session.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Personalized workout plans",
                  "Real-time progress charts",
                  "Body metrics tracking",
                  "Community challenges",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-physi-body"
                  >
                    <div className="w-5 h-5 rounded-full bg-teal flex items-center justify-center shrink-0">
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 4l3 3 5-6"
                          stroke="#1F252B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/tracking">
                <Button
                  className="bg-teal text-physi-dark font-bold rounded-full px-8"
                  data-ocid="app_features.primary_button"
                >
                  Start Tracking <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "oklch(0.76 0.14 184 / 0.08)",
                  clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0% 100%)",
                  borderRadius: 24,
                }}
              />
              <img
                src="/assets/generated/app-mockup.dim_400x700.png"
                alt="Physiquick App"
                className="relative w-56 rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-physi-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-14">
            What Our <span className="text-teal">Members Say</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7"
                data-ocid={`testimonials.card.${i + 1}`}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }, (_, s) => s + 1).map(
                    (s) => (
                      <Star
                        key={`star-${t.name}-${s}`}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ),
                  )}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-physi-dark font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
