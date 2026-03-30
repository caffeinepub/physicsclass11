import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Workouts", href: "/workouts" },
  { label: "Exercises", href: "/exercises" },
  { label: "Tracking", href: "/tracking" },
  { label: "Profile", href: "/profile" },
];

export default function Navbar() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-physi-dark shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-9 h-9 rounded-lg bg-teal flex items-center justify-center">
            <Zap className="w-5 h-5 text-physi-dark" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Physiquick
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                data-ocid="nav.link"
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  pathname === link.href
                    ? "text-teal font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {identity ? (
            <Button
              size="sm"
              variant="outline"
              onClick={clear}
              className="border-teal text-teal hover:bg-teal hover:text-physi-dark"
              data-ocid="nav.secondary_button"
            >
              Log out
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
              className="bg-teal text-physi-dark font-semibold hover:bg-teal-dark rounded-full px-5"
              data-ocid="nav.primary_button"
            >
              {isLoggingIn ? "Signing in..." : "Get Started"}
            </Button>
          )}
        </div>

        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          data-ocid="nav.toggle"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-physi-dark border-t border-white/10 px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  data-ocid="nav.link"
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 text-sm rounded-md ${
                    pathname === link.href
                      ? "text-teal font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            {identity ? (
              <Button
                size="sm"
                variant="outline"
                onClick={clear}
                className="w-full border-teal text-teal"
              >
                Log out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isLoggingIn}
                className="w-full bg-teal text-physi-dark font-semibold"
              >
                {isLoggingIn ? "Signing in..." : "Get Started"}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
