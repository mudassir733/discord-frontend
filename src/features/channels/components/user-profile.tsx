
import React from 'react'

// assests

// ui components
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Headphones, Mic, Settings } from 'lucide-react'

function UserProfile() {
    return (

        <div className="p-3 bg-[#232428] rounded-lg w-full flex items-center gap-2" >
            <Avatar className='bg-[#6765D3] rounded-full w-10 h-10 flex items-center justify-center'>
                <AvatarImage src="/avatars/user.png" alt="User" />
                <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="text-white text-sm font-semibold">Mudassir Ali</p>
                <p className="text-gray-400 text-xs">Online</p>
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