import Image from "next/image";
import { MessageCircle } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';


// components
import { ActiveNow } from "@/features/channels/components/activeNow";


// assets
import friendicn from "@/assets/images/friend.svg"


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

const invoices = [
    {
        invoice: "INV001",
        icon: "/me.png",
        name: "Asmaa abasi",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },


]

export default function FriendsPage() {
    return (
        <>
            <div className="flex-1 bg-[#313338] py-4 h-full overflow-y-hidden">
                <div className="flex px-4 items-center gap-2 border-b-[1px] border-zinc-600/90 pb-2">
                    <Image src={friendicn} alt="friend" />
                    <h1 className="text-[#dadada] text-md font-semibold">Friends</h1>
                    <Tabs className="flex gap-3" defaultValue="online">
                        <TabsList className="flex gap-3 justify-around bg-transparent  px-3">
                            <TabsTrigger value="online" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-zinc-600/90 text-md cursor-pointer">
                                Online
                            </TabsTrigger>
                            <TabsTrigger value="all" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-zinc-600/90 text-md cursor-pointer">
                                All
                            </TabsTrigger>
                            <TabsTrigger value="pending" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-zinc-600/90 text-md cursor-pointer">
                                Pending
                            </TabsTrigger>
                            <TabsTrigger value="add" className="text-gray-400" asChild>
                                <Button variant={"blueBtn"} className="hover:bg-[#4752c4] transition-all duration-200 py-4 text-white text-md cursor-pointer">
                                    Add Friend
                                </Button>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>


                <div className="w-full px-6 pt-4">
                    <Input type="text" placeholder="Search" className="rounded-md placeholder:text-gray-400" />
                </div>

                <div className="px-5 mt-4  h-screen overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="!border-zinc-600/90">
                                <TableHead className="w-[100px]">Online - 3 </TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.invoice} className="!border-zinc-600/90 cursor-pointer group  hover:bg-zinc-700/90 hover:!border-zinc-700/90 ">
                                    <TableCell className="font-medium !py-4 px-3 flex flex-col">
                                        <div className="flex gap-2 relative items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Image src={invoice.icon} alt="me icon" width={30} height={30} className="rounded-full" />
                                                <h4>{invoice.name}</h4>

                                                <span className="absolute left-10 top-7 text-[12px]">Idle</span>
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
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <ActiveNow />
        </>
    );
}