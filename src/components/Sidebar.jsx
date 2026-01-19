
import { NavLink, useNavigate } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import {
  DashboardIcon,
  CasesIcon,
  DocumentsIcon,
  MessagesIcon,
  ProfileIcon,
  LogoutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon
} from './Icons';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { to: '/cases', label: 'Cases', icon: CasesIcon },
  { to: '/documents', label: 'Documents', icon: DocumentsIcon },
  { to: '/messages', label: 'Messages', icon: MessagesIcon },
  { to: '/profile', label: 'Profile', icon: ProfileIcon },
];

export default function Sidebar() {
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4 border-b border-gray-100`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
              CM
            </div>
            <div>
              <h1 className="font-bold text-gray-800">Case Portal</h1>
              <p className="text-xs text-gray-500">Customer Portal</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
            CM
          </div>
        )}
        {/* Mobile close button */}
        <button
          onClick={closeMobile}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Collapse toggle - desktop only */}
      <button
        onClick={toggleCollapse}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm hover:bg-gray-50 z-10"
      >
        {isCollapsed ? (
          <ChevronRightIcon className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronLeftIcon className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={closeMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              } ${isCollapsed ? 'justify-center' : ''}`
            }
            title={isCollapsed ? label : undefined}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogoutIcon className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 relative ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white w-64 transform transition-transform duration-300 md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
