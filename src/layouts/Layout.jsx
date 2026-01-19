
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { SidebarProvider } from '../context/SidebarContext';
import { NotificationProvider } from '../context/NotificationContext';

export default function Layout() {
  return (
    <SidebarProvider>
      <NotificationProvider>
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-white">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 p-4 md:p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </NotificationProvider>
    </SidebarProvider>
  );
}
