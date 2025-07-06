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
import { BiEditAlt } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";
import { TbColorPicker } from "react-icons/tb";

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
        <DialogContent className="sm:max-w-[425px] p-0 bg-[#1e1f22] border-none text-gray-300">
          <DialogHeader className="pt-6 pl-6 pr-6">
            <DialogTitle className="text-gray-200 font-mono">Select Friends</DialogTitle>
            <DialogDescription className="text-gray-400 text-xs">
              You can add {friendCount} more friends.
            </DialogDescription>
              <Input className="rounded-md border bg-[#1e1f1f] border-zinc-700/90 text-gray-200" placeholder="Type the username of a friend" />
          </DialogHeader>
          <div className="grid gap-4 pl-6 pr-6 pb-6">
            <div className="grid gap-3">
              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-2 hover:bg-[#2b2d31] rounded-md"
                  onClick={() => handleFriendSelect(friend.id)} // Toggle selection on click
                  role="button"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${friend.username}&background=random`}
                      alt={friend.username}
                      className="w-8 h-8 rounded-full"
                    />
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
                    className="w-0 h-6 appearance-none bg-transparent border-gray-600 border rounded focus:ring-blue-500 focus:ring-2 checked:bg-blue-600 relative custom-checkbox" 
                  />
                </div>
            ))}
            </div>
          </div>
          <DialogFooter className="grid grid-cols-1 gap-4 mt-20 border-t-[1px] p-4 border-zinc-800">
            {selectedFriends.length > 1 && (
              <div className="rounded-md gap-3 flex items-center justify-between">
              <div>
                <Label htmlFor="file" className="h-20 w-20 relative flex items-center justify-center cursor-pointer bg-[#2b2d31] rounded-full text-gray-600 hover:text-gray-300 transition-colors">
                  <div>
                    <TbColorPicker size={32} className=" bg-[#2b2d31] border-[#1e1f22] p-0.5 border-4 rounded-full absolute top-0 right-0 " />
                    <MdPeopleAlt size={30} className=""/>
                  </div>
                </Label>
                <input type="file" name="file" id="file" className="hidden" accept="image/*" title="group image" />
              </div>
              <div className="flex-1 w-full">
                <p className="text-gray-400 text-xs">Group Name (optional)</p>
                <Input
                  className="rounded-md border bg-[#1e1f1f] border-zinc-700/90 text-gray-300 mt-2"
                  placeholder="Enter group name"
                />
              </div>
            </div>
            )}
            
            <Button className="flex items-center justify-center w-11/12 m-auto h-11  bg-[#5865f2] text-white" type="submit">{selectedFriends.length > 1 ? "Create Group DM" : "Create DM"}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateGroupChat;