import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (email, password) => {
        // Mock login
        // In a real app, this would make an API call
        if (email && password) {
            const mockUser = {
                id: '1',
                name: 'Test User',
                email: email
            };
            setUser(mockUser);
            return { success: true };
        }
        return { success: false, error: 'Invalid credentials' };
    };

    const signup = (name, email, password) => {
        // Mock signup
        if (email && password && name) {
            const mockUser = {
                id: '1',
                name: name,
                email: email
            };
            setUser(mockUser);
            return { success: true };
        }
        return { success: false, error: 'Please fill all fields' };
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
