"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
// hooks
import { useFetchUserById } from '@/hooks/users/useFetchUserById'

// assests

// ui components
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Headphones, Mic, Settings } from 'lucide-react'


interface JwtPayload {
    id: string;
    [key: string]: unknown;
}

function UserProfile() {
    const [userId, setUserId] = useState<string>("")
    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            try {
                const decodedToken = jwtDecode<JwtPayload>(token);
                setUserId(decodedToken.id);
            } catch (error) {
                console.error("Failed to decode token:", error);
                setUserId("");
            }
        }
    }, []);

    const { data, isLoading, error } = useFetchUserById(userId)


    // const firstLetter = data?.displayName.split(" ")[0].charAt(0).toUpperCase()
    // const lastLetter = data?.displayName.split(" ")[1].charAt(0).toUpperCase()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>


    return (

        <div className="p-3 bg-[#232428] rounded-lg w-full flex items-center gap-2" >
            <Avatar className='bg-[#6765D3] rounded-full w-10 h-10 flex items-center justify-center'>
                <AvatarImage src={`https://ui-avatars.com/api/?name=${data?.username}&background=random`} alt="User"
                    width={80}
                    height={80}
                    className="w-10 h-10 rounded-full border-[#232428] object-cover"
                />
                {/* this fallback is not working and i think this is not a good method that's why i commented it and i find a better way to do it. */}
                {/* <AvatarFallback>
                    {firstLetter}{lastLetter}
                        </AvatarFallback> */}
            </Avatar>
            <div className="flex-1">
                <p className="text-white text-sm font-semibold">{data?.displayName}</p>
                <p className="text-gray-400 text-xs">{data?.status}</p>
            </div>
            <div className="flex gap-2">
                <Mic className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Headphones className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Settings className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
        </ div>
    )
}

export default UserProfile