import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { UsersRound, X } from 'lucide-react';
import { Pencil } from 'lucide-react';
import StatusIndicator, { StatusType } from "@/components/status-indicator";

interface CreateGroupChatProps {
  isOpen: boolean;
  onClose: () => void;
  friends: {
    id: string;
    username?: string;
    displayName?: string; // Optional display name
    avatar?: string; // Optional avatar URL
    status?: string; // Optional status
  }[];
}

const CreateGroupChat = ({ isOpen, onClose, friends }: CreateGroupChatProps) => {
    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

    const handleFriendSelect = (friendId: string) => {
        if (selectedFriends.includes(friendId)) {
            setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
        } else {
            setSelectedFriends([...selectedFriends, friendId]);
        }
    };
    // Calculate the number of friends that can still be added
    // Assuming the limit is 9 friends, you can adjust this as needed
    const friendCount = -selectedFriends.length + 9;
    
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className="sm:max-w-[435px] flex flex-col gap-0 justify-start p-0 h-[700px] bg-[#242429] border-[1px] border-zinc-700/90 text-gray-300">
          <DialogHeader className="pt-6 pl-6 pr-6">
            <DialogTitle className="text-gray-200 font-semibold">Select Friends</DialogTitle>
            <DialogDescription className="text-gray-400 text-[11px]">
              You can add {friendCount} more friends.
            </DialogDescription>
            <div className="flex flex-wrap gap-1 items-center border border-zinc-700/90 rounded-md p-0.5 bg-[#202025] min-h-[38px]">
              {friends.filter(friend => selectedFriends.includes(friend.id)).map(friend => (
            <div key={friend.id} className="flex items-center bg-[#2d2d33] cursor-pointer text-white px-2 py-1.5 text-sm rounded-md"
                onClick={() => handleFriendSelect(friend.id)} // Toggle selection on click
            >
              <span>{friend.displayName}</span>
              <button
              type="button"
              aria-label="Remove friend"
              className="ml-2 text-gray-400 cursor-pointer" 
              onClick={() => handleFriendSelect(friend.id)}
            >
                <X size={12} />
            </button>
          </div>
            ))}
            { selectedFriends.length < 1 && (
              <input 
              className="flex-1 bg-transparent text-sm pl-2 outline-none text-gray-200 placeholder:text-gray-500 placeholder:" 
              placeholder="Type the username of a friend" 
            />
            )}
            
          </div>
          </DialogHeader>
          <div className="flex flex-col h-[396px] gap-4 pl-4 pt-3 pr-4">
            <div className="flex flex-col justify-start h-full overflow-y-auto custom-scrollbar">
              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-2 hover:bg-[#2b2d31] rounded-md"
                  onClick={() => handleFriendSelect(friend.id)} // Toggle selection on click
                  role="button"
                >
                  <div className="relative flex items-center gap-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${friend.username}&background=random`}
                      alt={friend.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="absolute left-6 bottom-0">
                      <StatusIndicator status={friend.status as StatusType} size="md" />
                    </div>
                    <div>
                      <p className="text-gray-200 text-sm">{friend.displayName}</p>
                      <p className="text-gray-400 text-xs">{friend?.username}</p>
                    </div>
                  </div>
                  {/* // Checkbox to select friend */}
                  <Input
                    id={`friend-${friend.id}`}
                    type="checkbox"
                    checked={selectedFriends.includes(friend.id)}
                    onChange={() => handleFriendSelect(friend.id)}
                    className="w-6 h-6 px-0 appearance-none bg-transparent border-gray-600 border rounded-md focus:outline-none focus:ring-0 checked:bg-[#4752c4] relative custom-checkbox" 
                  />
                </div>
            ))}
            </div>
          </div>
          <DialogFooter className="grid grid-cols-1 h-[178px]">
            <div className={`flex flex-col gap-4 justify-end ${selectedFriends.length < 2 ? "" : "border-t-[1px] border-zinc-700/90"}`}>
            {selectedFriends.length > 1 && (
              <div className="rounded-md gap-3 flex items-center justify-between pl-6 pr-6 pt-2">
              <div>
                <Label htmlFor="file" className="h-20 w-20 relative flex items-center justify-center cursor-pointer bg-[#2b2d31] rounded-full text-gray-600 hover:text-gray-300 transition-colors">
                  <div>
                    <Pencil size={32} className=" bg-[#2b2d31] border-[#242429] p-1 border-4 rounded-full absolute top-[-5] right-0 " />
                    <UsersRound size={30} className=""/>
                  </div>
                </Label>
                <input type="file" name="file" id="file" className="hidden" accept="image/*" title="group image" />
              </div>
              <div className="flex-1 w-full">
                <p className="text-gray-400 text-xs">Group Name (optional)</p>
                <Input
                  className="rounded-md border bg-[#1e1f1fbd] border-zinc-700/90 text-gray-300 mt-2 placeholder:text-gray-500"
                  placeholder={`${selectedFriends.length < 1 ? "Group Name" : selectedFriends.map(id => friends.find(friend => friend.id === id)?.displayName || "Unknown").join(", ")}`}
                />
              </div>
            </div>
          )}
            <div className={`w-full pl-6 pr-6 pb-4 ${selectedFriends.length < 2 ? "pt-6 border-t-[1px] border-zinc-700/90" : ""}`}>
            <Button className="flex items-center justify-center w-full h-11 cursor-pointer bg-[#5865f2] text-white hover:bg-[#4752c4]" type="submit">{selectedFriends.length > 1 ? "Create Group DM" : "Create DM"}</Button>
            </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateGroupChat;