
import { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { useNotifications } from '../context/NotificationContext';
import { MenuIcon, BellIcon, ChevronDownIcon } from './Icons';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/cases': 'Cases',
  '/documents': 'Documents',
  '/messages': 'Messages',
  '/profile': 'Profile',
};

export default function Header() {
  const { user, logout } = useAuth();
  const { toggleMobile } = useSidebar();
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate breadcrumb
  const getBreadcrumb = () => {
    const path = location.pathname;
    const parts = path.split('/').filter(Boolean);

    return (
      <div className="flex items-center text-sm text-gray-500">
        <Link to="/dashboard" className="hover:text-primary-600">Home</Link>
        {parts.map((part, idx) => (
          <span key={idx} className="flex items-center">
            <span className="mx-2">/</span>
            <span className={idx === parts.length - 1 ? 'text-gray-800 font-medium' : ''}>
              {part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')}
            </span>
          </span>
        ))}
      </div>
    );
  };

  const currentTitle = pageTitles[location.pathname] || 'Page';

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'status_update':
        return '📋';
      case 'message':
        return '💬';
      case 'document':
        return '📄';
      case 'sla_warning':
        return '⚠️';
      default:
        return '🔔';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobile}
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          >
            <MenuIcon className="w-5 h-5 text-gray-600" />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-gray-800">{currentTitle}</h1>
            <div className="hidden md:block">{getBreadcrumb()}</div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <BellIcon className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notif.read ? 'bg-primary-50/50' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <span className="text-xl">{getNotificationIcon(notif.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${!notif.read ? 'font-medium' : ''} text-gray-800`}>
                              {notif.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                          </div>
                          {!notif.read && (
                            <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center font-medium text-sm">
                {user?.avatar || 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">Customer</p>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400 hidden md:block" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
