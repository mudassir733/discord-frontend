"use client"
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MessageCircle, EllipsisVertical, Check, X } from 'lucide-react';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";


// store
import { RootState } from "@/store/store";

// components
import { ActiveNow } from "@/features/channels/components/activeNow";
import StatusIndicator, { StatusType } from "@/components/status-indicator"

// hooks
import { useFriends } from "@/hooks/users/getFriends";
import { useAddFriend } from "@/hooks/users/useAddFriends";
import { useNotificationSocket } from "@/hooks/users/useNotifications";
import { usePendingFriendRequests } from "@/hooks/users/usePendingFriendRequest";
import { useAcceptFriendRequest } from "@/hooks/users/useAcceptFriendRequest";
import { useRejectFriendRequest } from "@/hooks/users/useRejectFriendRequest";
import { useFetchFriendRequests } from "@/hooks/users/useFetchFriendRequest"


// service
import { getSearchUserByUserName } from "@/lib/service/user.service";




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
import { cn } from "@/lib/utils";



interface FriendRequest {
    id: string;
    senderId: string;
    senderUsername: string;
    senderDisplayName: string;
    senderProfilePicture: string;
    status: "pending";
    createdAt: string;
}

interface JwtPayload {
    id: string;
    [key: string]: any;
}

interface Friend {
    id: string;
    username: string;
    status?: StatusType;
}

export default function FriendsPage() {
    const [activeTab, setActiveTab] = useState<"online" | "all" | "pending" | "idle" | "add">("online");
    const [searchQuery, setSearchQuery] = useState("");
    const [username, setUsername] = useState("");
    const [addFriendMessage, setAddFriendMessage] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [pendingCount, setPendingCount] = useState(0);
    const [debounceValue, setDebouncedValue] = useState<string>("");
    // const [receivedRequests, setReceivedRequests] = useState<FriendRequest[]>([]);

    const debouncedSearch = useMemo(() =>
        debounce((value: string) => {
            setDebouncedValue(value);
        }, 400), []
    );
    // cleanup on unmount
    useEffect(() => {
        debouncedSearch(searchQuery);
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchQuery, debouncedSearch]);

    const statuses = useSelector((state: RootState) => state.status.statuses);


    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            try {
                const decodedToken = jwtDecode<JwtPayload>(token);
                setUserId(decodedToken.id);
            } catch (error) {
                console.error("Failed to decode token:", error);
                setUserId(null);
            }
        }
    }, []);

    // use hooks
    const { data: invoices = [], isLoading: isLoadingInvoices, error: isErrorInvoices } = useFriends({
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
    });
    const { mutate: addFriend, isPending: isAddingFriend, error: addFriendError } = useAddFriend();
    const { data: pendingRequests = [], refetch, isLoading: isLoadingRequests, error: requestsError } = usePendingFriendRequests({
        enabled: !!userId,
    });


    const { mutate: acceptRequest } = useAcceptFriendRequest();
    const { mutate: rejectRequest } = useRejectFriendRequest();
    const { data: fetchFriendRequest = [], isLoading: isFetchingRequests, error: fetchSendRequestsError } = useFetchFriendRequests();
    useNotificationSocket(userId || "");
    const { data: isSearchData, isLoading: isSearchLoading, error: isSearchError } = useQuery({
        queryKey: ["searchUserByUserName", debounceValue],
        queryFn: () => getSearchUserByUserName(debounceValue),
        enabled: !!debounceValue,
        retry: 1,

    })
    const receivedRequests = pendingRequests.filter((request) => request.status === "pending");



    useEffect(() => {
        // setReceivedRequests(pendingRequests);
        setPendingCount(pendingRequests.length);
    }, [pendingRequests]);

    const filteredUsers = useMemo(() => {
        return invoices.map((invoice) => ({
            ...invoice,
            status: statuses[invoice.id] || invoice.status || "offline", // Default to "offline" if no status
        })).filter((invoice) => {
            const matchesTab =
                activeTab === "online"
                    ? invoice.status === "online"
                    : activeTab === "idle"
                        ? invoice.status === "idle"
                        : true;
            return matchesTab && invoice.username.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [invoices, statuses, searchQuery, activeTab]);

    // conditional rendering data
    const filteredSearchUser = searchQuery ? isSearchData ?? [] : filteredUsers ?? []


    const handleSearchResult = (e: any) => {
        setSearchQuery(e.target.value);
        debouncedSearch(e.target.value)
    };

    const handleAddFriend = () => {
        setAddFriendMessage(null);
        addFriend(
            { receiverUsername: username },
            {
                onSuccess: () => {
                    refetch()
                    setAddFriendMessage(`Friend request sent to ${username}!`);
                    setUsername("");
                },
                onError: (error) => {
                    setAddFriendMessage(
                        error.message.includes("401")
                            ? "Please log in to send a friend request."
                            : `${error.message}`
                    );
                },
            }
        );
    };



    const headerText =
        activeTab === "online"
            ? `Online - ${filteredSearchUser.length}`
            : activeTab === "all"
                ? `All Friends - ${filteredSearchUser.length}`
                : `Sent - ${fetchFriendRequest.length}`;

    return (
        <>
            <div className="flex-1 bg-[#1A1A1E] py-3 h-full overflow-y-hidden">
                <div className="flex px-4 items-center gap-2 border-b-[1px] border-zinc-600/90 pb-2">
                    <Image src={friendicn} alt="friend" />
                    <h1 className="text-[#dadada] text-md font-semibold">Friends</h1>
                    <Tabs
                        className="flex gap-3"
                        value={activeTab}
                        onValueChange={(value) => setActiveTab(value as "online" | "all" | "pending" | "idle" | "add")}
                    >
                        <TabsList className="flex gap-3 justify-around bg-transparent px-3">
                            <TabsTrigger
                                value="online"
                                className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-zinc-800/90 text-md cursor-pointer"
                            >
                                Online
                            </TabsTrigger>
                            <TabsTrigger
                                value="all"
                                className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-zinc-800/90 text-md cursor-pointer"
                            >
                                All
                            </TabsTrigger>
                            <TabsTrigger
                                value="pending"
                                className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-zinc-800/90 text-md cursor-pointer relative"
                            >
                                Pending
                                {pendingCount > 0 && (
                                    <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {pendingCount}
                                    </span>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="add" className="text-gray-400" asChild>
                                <Button
                                    variant={"blueBtn"}
                                    disabled={activeTab === "add"}
                                    className="hover:bg-[#4752c4] transition-all duration-200 py-4 text-white text-md cursor-pointer"
                                >
                                    Add Friend
                                </Button>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {activeTab === "add" ? (
                    <div className="flex flex-col md:flex-row h-screen items-start justify-between w-full mx-auto p-4 md:p-8">
                        <div className="flex flex-col w-full">
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
                                    className={cn(
                                        "bg-[#1E1F22] w-full border text-[#DCDDDE] placeholder:text-[#4F5660] h-12 px-4 rounded-md focus-visible:ring-0 focus-visible:ring-offset-0",
                                        addFriendMessage
                                            ? addFriendError
                                                ? "border-red-500"
                                                : "border-[#3F9E43]"
                                            : "border-none"
                                    )}
                                    placeholder="You can add friends with their Discord username."
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <div className="mt-4 absolute -top-3 right-1">
                                    <Button
                                        className="bg-[#5865F2] hover:bg-[#4752C4] cursor-pointer text-white font-medium px-4 py-2 h-10 rounded-md"
                                        disabled={!username.trim() || isAddingFriend}
                                        onClick={handleAddFriend}
                                    >
                                        Send Friend Request
                                    </Button>
                                </div>
                                {addFriendMessage && (
                                    <p className={`mt-2 text-sm ${addFriendError ? "text-red-400" : "text-[#3F9E43]"}`}>
                                        {addFriendMessage}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="w-full px-6 pt-4">
                            <Input
                                type="text"
                                placeholder="Search"
                                onChange={handleSearchResult}
                                value={searchQuery}
                                className="rounded-md placeholder:text-gray-400 mb-4"
                            />

                            {activeTab === "pending" && (
                                <>
                                    {
                                        receivedRequests.length > 0 && (
                                            <Table className="mb-4">
                                                <TableHeader>
                                                    <TableRow className="!border-zinc-700/90">
                                                        <TableHead className="w-[100px]">requests - {receivedRequests.length}</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {receivedRequests.map((request) => (
                                                        <TableRow key={request.id} className="!border-zinc-700/90 cursor-pointer group hover:bg-zinc-800/90 hover:!border-zinc-700/90">
                                                            <TableCell className="font-medium !py-4 px-3 flex flex-col">
                                                                <div className="flex gap-2 relative items-center justify-between">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="relative bg-[#6866D4] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                                                            <h4 className="font-bold">{request.senderUsername.charAt(0)}</h4>

                                                                        </div>
                                                                        <h4>{request.senderUsername}</h4>

                                                                    </div>

                                                                    <div >

                                                                        <p className="!text-[11px] text-gray-400">{new Date(request.createdAt).toLocaleString()}</p>

                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <div className="group-hover:bg-[#313338] p-2 rounded-full group">
                                                                            <Check color="#EDEDED" size={18} onClick={() => acceptRequest(request.id)} />
                                                                        </div>
                                                                        <div className="group-hover:bg-[#313338] p-2 rounded-full">
                                                                            <X fill="#EDEDED" color="#EDEDED" size={18} onClick={() => rejectRequest(request.id)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        )
                                    }
                                </>
                            )}


                        </div>

                        <div className="px-5 mt-4 h-screen overflow-y-auto custom-scrollbar">
                            <Table>
                                <TableHeader>
                                    <TableRow className="!border-zinc-700/90">
                                        <TableHead className="w-[100px]">{headerText}</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {activeTab === "pending"
                                        ? (fetchFriendRequest.length <= 0 ? (
                                            <TableRow className="!border-zinc-700/9">
                                                <TableCell className="font-medium !py-4 px-3 text-gray-400 text-center">
                                                    No pending requests found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            fetchFriendRequest.map((request) => (
                                                <TableRow key={request.id} className="!border-zinc-700/90 cursor-pointer group hover:bg-zinc-800/90 hover:!border-zinc-700/90">
                                                    <TableCell className="font-medium !py-4 px-3 flex flex-col">
                                                        <div className="flex gap-2 relative items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <div className="relative bg-[#6866D4] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                                                    <h4 className="font-bold">{request.receiverUsername.charAt(0)}</h4>
                                                                </div>
                                                                <h4>{request.receiverDisplayName}</h4>
                                                                <span className="absolute left-12 top-7 text-[12px]">{request.receiverUsername}</span>


                                                                <div className="flex items-center justify-center">
                                                                    <p className="!text-[11px] text-gray-400">{new Date(request.createdAt).toLocaleTimeString()}</p>
                                                                </div>
                                                            </div>


                                                            <div className="flex gap-2">
                                                                <div className="group-hover:bg-[#313338] p-2 rounded-full">
                                                                    <X fill="#EDEDED" color="#EDEDED" size={18} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ))
                                        : (filteredSearchUser.length <= 0 ? (
                                            <TableRow className="!border-zinc-700/9">
                                                <TableCell className="font-medium !py-4 px-3 text-gray-400 text-center">
                                                    {activeTab === "online"
                                                        ? "No online friends right now."
                                                        : "Friends not found :(."}
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredSearchUser.map((invoice: any) => (
                                                <TableRow key={invoice.id} className="!border-zinc-700/90 cursor-pointer group hover:bg-zinc-800/90 hover:!border-zinc-700/90">
                                                    <TableCell className="font-medium !py-4 px-3 flex flex-col">
                                                        <div className="flex gap-2 relative items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <div className="relative bg-[#6866D4] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                                                    <h4 className="font-bold">{invoice.username.charAt(0)}</h4>
                                                                    <StatusIndicator status={statuses[invoice.id] || invoice.status} size="lg" className="absolute bottom-0 right-0" />


                                                                </div>

                                                                <h4>{invoice.username}</h4>
                                                                <span className="absolute left-12 top-7 text-[12px]">{invoice.status}</span>
                                                            </div>

                                                            <div className="w-full flex items-center justify-between">
                                                                {invoice.status === "offline" && (
                                                                    <p className=" text-[10px] text-gray-400 left-[20%]">{new Date(invoice.lastActive).toLocaleTimeString()}</p>
                                                                )}
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
                                        ))}
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