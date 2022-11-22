import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../config/firebase';
import Home from '../pages';
import { LoadingOverlay } from '@mantine/core';

const AuthContext = createContext<any>({})
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                })
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsuscribe()
    }, [])

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }

    const createUser = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
        setUser(null)
        await signOut(auth)
    }

    const sendResetPassword = async (email: string) => {
        return sendPasswordResetEmail(auth, email)
    }
    return <AuthContext.Provider value={{ user, login, logout, createUser, sendResetPassword }}>{user === null ? (loading ? <LoadingOverlay visible={loading} overlayBlur={2} /> : <Home />) : children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)