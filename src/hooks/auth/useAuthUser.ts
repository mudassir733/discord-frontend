// hooks/useAuthUser.ts
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'


export interface JwtPayload {
    id: string;
    [key: string]: unknown;
}

export const useAuthUser = () => {
    const [userId, setUserId] = useState<string | null>(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const token = Cookies.get('access_token')
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token)
                setUserId(decoded.id)
            } catch (err) {
                console.error('Invalid token:', err)
            }
        }
        setIsReady(true)
    }, [])

    return { userId, isReady }
}
