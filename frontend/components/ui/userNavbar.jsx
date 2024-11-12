import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SessionHistory from "@/components/ui/sessionhistory";
import { auth } from "@/lib/auth/authConfig";


const UserNavbar = async () => {
  const session = await auth();
  return (
    <div className="flex flex-row items-center justify-between w-full h-[5svh]">
      <div>
        <SessionHistory email={session.user.email}/>
      </div>
      <Avatar>
        <AvatarImage src={session.user.image} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserNavbar;
