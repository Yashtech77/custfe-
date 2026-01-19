
import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext(null);

const initialNotifications = [
  {
    id: 1,
    type: 'status_update',
    title: 'Case Status Updated',
    message: 'Case #CS-2024-0042 has moved to "DP Processing" stage',
    time: '5 min ago',
    read: false
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from Priya Patel (RM)',
    time: '1 hour ago',
    read: false
  },
  {
    id: 3,
    type: 'document',
    title: 'Document Uploaded',
    message: 'Your document "PAN Card.pdf" was uploaded successfully',
    time: '2 hours ago',
    read: true
  },
  {
    id: 4,
    type: 'sla_warning',
    title: 'SLA Warning',
    message: 'Case #CS-2024-0038 is approaching SLA deadline',
    time: '3 hours ago',
    read: true
  }
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead, markAllAsRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
