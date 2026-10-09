import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Headphones,
  Home,
  Layers,
  Menu,
  ScanLine,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Desk", icon: Home },
  { to: "/listen", label: "Listen", icon: Headphones },
  { to: "/method", label: "Method", icon: ScanLine },
  { to: "/modules", label: "Modules", icon: BookOpen },
  { to: "/cases", label: "Unknowns", icon: Activity },
  { to: "/boards", label: "Q-bank", icon: ClipboardList },
  { to: "/flashcards", label: "Cards", icon: Layers },
  { to: "/exam", label: "Exam", icon: GraduationCap },
];

function Wordmark({ compact }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 no-underline">
      <span className="flex size-8 items-center justify-center rounded-lg bg-ink text-paper">
        <svg viewBox="0 0 24 16" className="h-3.5 w-5" aria-hidden>
          <polyline
            points="0,9 4,9 5.5,4 7.2,14 8.4,2 10,9 24,9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="font-display text-lg tracking-tight">Caliper</span>
        {compact ? null : (
          <span className="ml-2 hidden text-xs uppercase tracking-[0.16em] text-stone sm:inline">
            Boards
          </span>
        )}
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Wordmark />
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm transition-colors duration-150",
                    active ? "bg-paper-2 text-ink" : "text-stone hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-xl lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <div className="border-t border-line bg-paper px-4 py-3 lg:hidden">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm hover:bg-paper-2"
                >
                  <item.icon className="size-4 text-stone" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>
      <main className="mx-auto w-full min-w-0 max-w-6xl overflow-x-clip px-4 pb-24 pt-8 sm:pt-10">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-sm lg:hidden">
        <div className="grid grid-cols-5">
          {NAV.filter((item) =>
            ["/", "/listen", "/modules", "/cases", "/boards"].includes(item.to),
          ).map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px]",
                  active ? "text-ink" : "text-stone",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
