import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // Add a small delay to ensure session is set
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const response = await fetch('http://127.0.0.1:5000/api/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setUser(data.user);
        } else {
          setUser(null);
          localStorage.removeItem('authToken');
        }
      } else {
        setUser(null);
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if we have a token or are coming from auth
    const hasToken = localStorage.getItem('authToken');
    const isAuthPage = window.location.pathname === '/auth/success';
    
    if (hasToken || isAuthPage) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = () => {
    window.location.href = 'http://127.0.0.1:5000/login';
  };

  const logout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        localStorage.removeItem('authToken');
        setUser(null);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user and redirect even if request fails
      localStorage.removeItem('authToken');
      setUser(null);
      window.location.href = '/';
    }
  };

  return { user, loading, login, logout, refetchUser: fetchUser };
};