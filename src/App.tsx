import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const linkBase = "px-3 py-2 rounded-lg font-medium";
const linkIdle = "text-gray-700 hover:bg-gray-100";
const linkActive = "bg-blue-50 ring-2 ring-blue-300 text-blue-900";

export default function App() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on ESC or outside click
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (!open) return;
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? linkActive : linkIdle}`;

  return (
    <div className="app-shell bg-gradient-to-b from-indigo-50 to-white">
      {/* Sticky, blurred header */}
      <header className="sticky top-0 z-20 mb-4 sm:mb-6 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-xl">
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 ">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-blue-600 text-white grid place-items-center font-extrabold">
              Q
            </div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight">Quizzer</span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-2">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/start" className={linkClass}>
              Start
            </NavLink>
            <NavLink to="/quiz" className={linkClass}>
              Quiz
            </NavLink>
            <NavLink to="/results" className={linkClass}>
              Results
            </NavLink>
            <NavLink to="/leaderboard" className={linkClass}>
              Leaderboard
            </NavLink>
          </nav>

          {/* Mobile menu button */}
          <button
            ref={btnRef}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white w-10 h-10 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            {/* Hamburger / close icon */}
            <span className={`i ${open ? "hidden" : "block"}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className={`i ${open ? "block" : "hidden"}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        </div>

        {/* Mobile panel */}
        <div
          ref={panelRef}
          className={`sm:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-3 pb-3 grid gap-2 ">
            <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/start" className={linkClass} onClick={() => setOpen(false)}>
              Start
            </NavLink>
            <NavLink to="/quiz" className={linkClass} onClick={() => setOpen(false)}>
              Quiz
            </NavLink>
            <NavLink to="/results" className={linkClass} onClick={() => setOpen(false)}>
              Results
            </NavLink>
            <NavLink to="/leaderboard" className={linkClass} onClick={() => setOpen(false)}>
              Leaderboard
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
