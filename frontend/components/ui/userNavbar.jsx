import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InboxIcon } from "lucide-react";
import { auth } from "@/lib/auth/authConfig";

const UserNavbar = async () => {
  const session = await auth();

  return (
    <div className="flex flex-row items-center justify-between w-full h-[5svh]">
      <div>
        <InboxIcon className="text dark:text-on-surface-dark" />
      </div>
      <Avatar>
        <AvatarImage src={session.user.image} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserNavbar;
