import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    register: (email: string, pass: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved user session on initial load
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, pass: string) => {
        // --- This is a mock authentication function ---
        // In a real app, you would make an API call here.
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (email === 'user@example.com' && pass === 'password123') {
                    const userData: User = { email };
                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);
                    resolve();
                } else {
                    reject(new Error('Sähköposti tai salasana on virheellinen.'));
                }
            }, 1000);
        });
    };

    const register = async (email: string, pass: string) => {
        // --- This is a mock registration function ---
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (email && pass) {
                    console.log(`Mock registration for: ${email}`);
                    resolve(); // Always resolve successfully for the demo
                } else {
                    reject(new Error('Sähköposti ja salasana vaaditaan.'));
                }
            }, 1000);
        });
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};