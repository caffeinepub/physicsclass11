import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Zap } from "lucide-react";
import { useState } from "react";

const SOCIAL_LINKS = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Youtube, label: "Youtube" },
  { Icon: Facebook, label: "Facebook" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer className="bg-teal text-physi-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-physi-dark/20">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-physi-dark flex items-center justify-center">
                <Zap className="w-5 h-5 text-teal" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-physi-dark">
                Physiquick
              </span>
            </div>
            <p className="text-physi-dark/70 text-sm leading-relaxed max-w-xs">
              Your all-in-one fitness companion. Track workouts, browse
              exercises, and crush your goals every day.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-physi-dark mb-4 uppercase text-sm tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Workouts", href: "/workouts" },
                { label: "Exercises", href: "/exercises" },
                { label: "Tracking", href: "/tracking" },
                { label: "Profile", href: "/profile" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    data-ocid="nav.link"
                    className="text-physi-dark/70 hover:text-physi-dark text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-physi-dark mb-4 uppercase text-sm tracking-widest">
              Newsletter
            </h4>
            <p className="text-physi-dark/70 text-sm mb-3">
              Get fitness tips and updates straight to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-white/30 border-physi-dark/30 placeholder:text-physi-dark/50 text-physi-dark"
                data-ocid="footer.input"
              />
              <Button
                className="bg-physi-dark text-teal hover:bg-physi-heading shrink-0"
                data-ocid="footer.submit_button"
              >
                Subscribe
              </Button>
            </div>
            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://physiquick.app"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-physi-dark/20 hover:bg-physi-dark/40 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-physi-dark" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 text-center text-physi-dark/60 text-sm">
          &copy; {year}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-physi-dark transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
