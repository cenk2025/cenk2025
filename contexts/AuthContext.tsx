// FIX: Add missing import for React
import React from 'react';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    register: (email: string, pass: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Fix: Refactored AuthProvider to use React.FC for more explicit and robust typing to resolve the 'missing children' error.
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
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