"use client"
import { useState } from "react";
import Image from "next/image";
import { MessageCircle } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';


// components
import { ActiveNow } from "@/features/channels/components/activeNow";
import StatusIndicator, { StatusType } from "@/components/status-indicator"


// assets
import friendicn from "@/assets/images/friend.svg"
import addFrnIcon from "@/assets/images/addFrnd.svg"


// ui components
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


interface Invoice {
    invoice: string;
    icon: string;
    name: string;
    username: string;
    status: StatusType;
}

const invoices: Invoice[] = [
    {
        invoice: "INV001",
        icon: "/me.png",
        name: "Asmaa abasi",
        username: "@asmaabasi",
        status: "Idle"
    },
    {
        invoice: "INV002",
        icon: "/me.png",
        name: "Mohsin gardezi",
        username: "@mohsin",
        status: "Online"
    },
    {
        invoice: "INV004",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam",
        status: "Online"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },

    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },
    {
        invoice: "INV009",
        icon: "/me.png",
        name: "Arsalan",
        username: "@arsalam2",
        status: "Pending"
    },

]

export default function FriendsPage() {
    const [activeTab, setActiveTab] = useState<"online" | "all" | "pending" | "idle" | "add">("online");
    const [searchQuery, setSearchQuery] = useState("")
    const [username, setUsername] = useState("")

    const filteredUsers = invoices.filter((invoice) => {
        const matchesTab =
            activeTab === "online"
                ? invoice.status === "Online"
                : activeTab === "pending"
                    ? invoice.status === "Pending"
                    : true;
        return matchesTab && invoice.name.toLowerCase().includes(searchQuery.toLowerCase())

    })

    const handleSearchResult = (e: any) => {
        setSearchQuery(e.target.value)

    }
    const headerText =
        activeTab === "online"
            ? `Online - ${filteredUsers.length}`
            : activeTab === "all"
                ? `All Friends - ${filteredUsers.length}`
                : `Sent - ${filteredUsers.length}`;

    return (
        <>
            <div className="flex-1 bg-[#1A1A1E] py-3 h-full overflow-y-hidden">
                <div className="flex px-4 items-center gap-2 border-b-[1px] border-zinc-600/90 pb-2">
                    <Image src={friendicn} alt="friend" />
                    <h1 className="text-[#dadada] text-md font-semibold">Friends</h1>
                    <Tabs className="flex gap-3" value={activeTab} onValueChange={(value) => setActiveTab(value as "online" | "all" | "pending" | "idle")}>
                        <TabsList className="flex gap-3 justify-around bg-transparent  px-3">
                            <TabsTrigger value="online" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-zinc-800/90 text-md cursor-pointer">
                                Online
                            </TabsTrigger>
                            <TabsTrigger value="all" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-zinc-800/90 text-md cursor-pointer">
                                All
                            </TabsTrigger>
                            <TabsTrigger value="pending" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-zinc-800/90 text-md cursor-pointer">
                                Pending
                            </TabsTrigger>
                            <TabsTrigger value="add" className="text-gray-400" asChild>
                                <Button variant={"blueBtn"} disabled={activeTab === "add"} className="hover:bg-[#4752c4] transition-all duration-200 py-4 text-white text-md cursor-pointer">
                                    Add Friend
                                </Button>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>


                {activeTab === "add" ? (
                    <div className="flex flex-col md:flex-row h-screen items-start justify-between w-full  mx-auto p-4 md:p-8">
                        <div className="flex flex-col w-full ">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <h1 className="text-2xl font-bold text-white mb-2">Add Friend</h1>
                                    <p className="text-[#B9BBBE] mb-4">You can add friends with their Discord username.</p>
                                </div>


                                <div className="hidden md:block md:w-2/5">
                                    <Image src={addFrnIcon} alt="Discord Wumpus" width={100} height={100} className="ml-auto" />
                                </div>
                            </div>

                            <div className="relative w-full">
                                <Input
                                    className="bg-[#1E1F22] w-full border-none text-[#DCDDDE] placeholder:text-[#4F5660] h-12 px-4 rounded-md focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="You can add friends with their Discord username."
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <div className="mt-4 absolute -top-3 right-1">
                                    <Button
                                        className="bg-[#5865F2] hover:bg-[#4752C4] cursor-pointer text-white font-medium px-4 py-2 h-10 rounded-md"
                                        disabled={!username.trim()}
                                    >
                                        Send Friend Request
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="w-full px-6 pt-4">
                            <Input type="text" placeholder="Search" onChange={handleSearchResult} value={searchQuery} className="rounded-md placeholder:text-gray-400" />
                        </div>

                        <div className="px-5 mt-4  h-screen overflow-y-auto custom-scrollbar">
                            <Table>
                                <TableHeader>

                                    <TableRow className="!border-zinc-700/90">
                                        <TableHead className="w-[100px]">{headerText}</TableHead>

                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredUsers.length <= 0 ? (
                                        <TableRow className="!border-zinc-700/9">
                                            <TableCell className="font-medium !py-4 px-3 text-gray-400 text-center">
                                                {activeTab === "online"
                                                    ? "No online friends right now."
                                                    : activeTab === "all"
                                                        ? "Friends not found :(."
                                                        : "No pending friend requests."}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredUsers.map((invoice) => (
                                            <TableRow key={invoice.invoice} className="!border-zinc-700/90 cursor-pointer group  hover:bg-zinc-800/90 hover:!border-zinc-700/90 ">
                                                <TableCell className="font-medium !py-4 px-3 flex flex-col">
                                                    <div className="flex gap-2 relative items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="relative">
                                                                <Image src={invoice.icon} alt="me icon" width={40} height={40} className="rounded-full" />
                                                                <StatusIndicator status={invoice.status} size="lg" className="absolute bottom-0 right-0" />
                                                            </div>
                                                            <h4>{invoice.name}</h4>

                                                            <span className="absolute left-12 top-7 text-[12px]">{activeTab === "pending" ? invoice.username : invoice.status}</span>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <div className="group-hover:bg-[#313338] p-2 rounded-full group">
                                                                <MessageCircle fill="#EDEDED" color="#EDEDED" size={18} />
                                                            </div>
                                                            <div className="group-hover:bg-[#313338] p-2 rounded-full">
                                                                <EllipsisVertical fill="#EDEDED" color="#EDEDED" size={18} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}

                                </TableBody>
                            </Table>



                        </div>
                    </>
                )}



            </div>
            <ActiveNow />
        </>
    );
}