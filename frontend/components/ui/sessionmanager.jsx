import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import SignOutButton from "./signOutButton";

const SessionManager = async ({ session }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={session.user.image} />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-48 mr-4">
        <SignOutButton />
      </PopoverContent>
    </Popover>
  );
};

export default SessionManager;
