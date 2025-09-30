import {createContext, useContext, useState, useEffect, type ReactNode} from "react";
import type {Person} from "@entities/person/person.types.ts";


interface AuthContextType {
    user: Person | null;
    login: (user: Person) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Person | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) {
            try {
                setUser(JSON.parse(saved));
            } catch {
                localStorage.removeItem("user");
            }
        }
    }, []);

    const login = (newUser: Person) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
        );
    };

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
};
