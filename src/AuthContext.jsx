import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await buildUserObject(session.user);
      }
      setLoading(false);
    };

    restoreSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await buildUserObject(session.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const buildUserObject = async (authUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();               // ✅ returns null instead of throwing an error

      if (profile) {
        setIsAuthenticated(true);
        setUser(profile);
      } else {
        // Profile missing – build fallback from auth metadata
        console.warn('Profile not found – using fallback metadata');
        const fallbackUser = {
          id: authUser.id,
          email: authUser.email,
          username: authUser.user_metadata.username || '',
          first_name: authUser.user_metadata.first_name || '',
          last_name: authUser.user_metadata.last_name || '',
          phone: authUser.user_metadata.phone || '',
        };
        setIsAuthenticated(true);
        setUser(fallbackUser);
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
      // Still log the user in with minimal info
      const fallbackUser = {
        id: authUser.id,
        email: authUser.email,
        username: authUser.user_metadata.username || '',
        first_name: authUser.user_metadata.first_name || '',
        last_name: authUser.user_metadata.last_name || '',
        phone: authUser.user_metadata.phone || '',
      };
      setIsAuthenticated(true);
      setUser(fallbackUser);
    }
  };

  const login = (profile) => {
    setIsAuthenticated(true);
    setUser(profile);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;