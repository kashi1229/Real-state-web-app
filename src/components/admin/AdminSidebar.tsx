import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Home,
  MessageSquare,
  BarChart3,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/listings', icon: Home, label: 'Listings' },
  { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-30 flex h-full flex-col bg-forest-950 text-white transition-all duration-300',
        isOpen ? 'w-64' : 'w-16',
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-forest-800 px-4">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-brass">
              <span className="text-xs font-bold text-forest-950">HR</span>
            </div>
            <span className="text-sm font-semibold">Admin Panel</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn('rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-forest-800 hover:text-white', !isOpen && 'mx-auto')}
        >
          {isOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brass/20 text-brass'
                  : 'text-gray-400 hover:bg-forest-800 hover:text-white',
                !isOpen && 'justify-center px-2',
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {isOpen && (
        <div className="border-t border-forest-800 p-4">
          <NavLink
            to="/"
            className="text-xs text-gray-500 transition-colors hover:text-gray-300"
          >
            &larr; Back to Website
          </NavLink>
        </div>
      )}
    </aside>
  );
}
