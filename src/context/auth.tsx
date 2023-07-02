import React, {useContext, useEffect, useState} from 'react';
import apiClient from "@/lib/apiClient";
import {User} from "@/types";

interface AuthContextTypes {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthContext = React.createContext<AuthContextTypes>({
    user: null,
    login: () => {
    },
    logout: () => {
    }
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (!token) return;
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
        apiClient.get("/users/find").then((res) => {
            setUser(res.data.user)
        }).catch((err) => {
            alert(err.message)
            console.error(err)
        })
    }, []);


    const login = async (token: string) => {
        localStorage.setItem("auth_token", token);
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
        try {
            apiClient.get("/users/find").then((res) => {
                setUser(res.data.user)
            })
        } catch (error: any) {
            alert(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem("auth_token");
        delete apiClient.defaults.headers["Authorization"];
        setUser(null);
    }

    const value = {
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};