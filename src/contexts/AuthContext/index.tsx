import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
    email: string;
    uid: string;
}

interface AuthContextType {
    user: User | null;
    signUp: (email: string, password: string) => void;
    signIn: (email: string, password: string) => void;
    logOut: () => void;
    isAuthenticated: () => boolean;
}

interface AuthProviderProps {
    children: React.ReactNode
}

interface jwtPayload {
    user_id: string;
    email: string;
}

export const AuthContext = createContext<AuthContextType | null>(null)

const apiKey = String(import.meta.env.VITE_FIREBASE_API_KEY);

const AuthProvider = ({children} : AuthProviderProps) => {
    const [user, setUser]= useState<User | null>(null);

    const signUp = async (email: string, password: string) => {
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,{
                email: email,
                password: password,
                returnSecureToken: true,
            })

            const { idToken } = response.data;
            const decodeToken: jwtPayload = jwtDecode(idToken);
            const uid = decodeToken.user_id;

            Cookies.set("Access_Token", idToken)
            setUser({email, uid})
        } catch (error) {
            console.log(error);
        }
    }
    const signIn = async (email: string, password: string) => {
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,{
                email: email,
                password: password,
                returnSecureToken: true,
            })

            const { idToken } = response.data;
            const decodeToken: jwtPayload = jwtDecode(idToken);
            const uid = decodeToken.user_id;

            Cookies.set("Access_Token", idToken)
            setUser({email, uid})
        } catch (error) {
            console.log(error);
        }
    }

    const logOut = () => {
        Cookies.remove('Access_Token');
        setUser(null);
    }

    const isAuthenticated = () => user !== null;

    useEffect(() => {
        const token = Cookies.get('Access_Token');

        if(token){
            try {
                const decodeToken: jwtPayload = jwtDecode(token)
                const uid = decodeToken.user_id
                const email = decodeToken.email
                setUser({email, uid})
            } catch (error) {
                console.log("failed to login", error)
                logOut
            }
        }
    }, [])

    return(
        <AuthContext.Provider value={{user, signUp, signIn, logOut, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw new Error("out of context");
    }
    
    return context
}

