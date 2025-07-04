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

interface CreateGroupChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGroupChat = ({ isOpen, onClose }: CreateGroupChatProps) => {
    const [friends, setFriends] = useState([
        { id: '1', name: 'Pedro Duarte', username: '@peduarte' },
        { id: '2', name: 'Jane Doe', username: '@janedoe' },
        { id: '3', name: 'John Smith', username: '@johnsmith' },
        // Add more friends as needed
    ]);
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
    const friendCount = selectedFriends.length - 9;
    
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px] bg-[#1e1f22] text-gray-400">
          <DialogHeader>
            <DialogTitle className="text-white">Select Friends</DialogTitle>
            <DialogDescription className="text-gray-400 text-xs">
              You can add {friendCount} more friends.
            </DialogDescription>
              <Input className="rounded-md border border-zinc-700/90 text-gray-200" placeholder="Type the username of a friend" />
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-2 bg-[#2b2d31] rounded-md">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${friend.name}&background=random`}
                      alt={friend.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-white text-sm">{friend.name}</p>
                      <p className="text-gray-400 text-xs">{friend.username}</p>
                    </div>
                  </div>
                  {/* // Checkbox to select friend */}
                  <Input
                    id={`friend-${friend.id}`}
                    type="checkbox"
                    checked={selectedFriends.includes(friend.id)}
                    onChange={() => handleFriendSelect(friend.id)}
                    className="w-5 h-5 bg-transparent text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                  />
                </div>
            ))}
            </div>
          </div>
          <DialogFooter className="flex items-center justify-center mt-48">
            <Button className="flex items-center justify-center w-full bg-[#5865f2] text-white p-4" type="submit">Create DM</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateGroupChat;