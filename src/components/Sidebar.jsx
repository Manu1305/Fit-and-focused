import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { USERS, CURRENT_STAGE, TOTAL_STAGES, DAYS_PER_STAGE } from '../data/stage1';

const linkClass = ({ isActive }) =>
  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
  }`;

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold text-white bg-linear-to-br from-indigo-500 to-violet-600 shrink-0">
        FF
      </span>
      <span className="text-base font-bold text-gray-900 dark:text-gray-100 leading-none">
        Fit &amp; Focused
      </span>
    </div>
  );
}

function NavLinks({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      <NavLink to="/" end className={linkClass} onClick={onNavigate}>
        Dashboard
      </NavLink>
      <NavLink to="/rules" className={linkClass} onClick={onNavigate}>
        Rules
      </NavLink>

      <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
        Participants
      </p>
      {USERS.map((user) => (
        <NavLink key={user.id} to={`/user/${user.id}`} className={linkClass} onClick={onNavigate}>
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: user.color }} />
          {user.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-[#12141a]/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div>
          <Logo />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Round {CURRENT_STAGE} of {TOTAL_STAGES} · {DAYS_PER_STAGE} days
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 mb-1" />
          <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 mb-1" />
          <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-300" />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-72 max-w-[80%] h-full bg-white dark:bg-[#12141a] p-4 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-1 text-gray-500 dark:text-gray-400 text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#12141a] p-4">
        <Logo />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-6">
          Round {CURRENT_STAGE} of {TOTAL_STAGES} · {DAYS_PER_STAGE} days
        </p>
        <NavLinks />
      </aside>
    </>
  );
}
