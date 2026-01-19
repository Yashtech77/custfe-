
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('casePortalUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication
    const mockUser = {
      id: 'CUST001',
      name: 'Rajesh Sharma',
      email: email,
      phone: '+91 98765 43210',
      avatar: 'RS',
      role: 'customer',
      assignedRM: {
        name: 'Priya Patel',
        email: 'priya.patel@company.com',
        phone: '+91 98765 12345'
      }
    };
    setUser(mockUser);
    localStorage.setItem('casePortalUser', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('casePortalUser');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
