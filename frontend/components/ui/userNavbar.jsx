import SessionHistory from "@/components/ui/sessionhistory";
import SessionManager from "@/components/ui/sessionmanager";
import { auth } from "@/lib/auth/authConfig";


const UserNavbar = async () => {
  const session = await auth();
  return (
    <div className="absolute flex flex-row items-center justify-between w-full h-10 mt-3 px-8 z-50">
      <div>
        <SessionHistory email={session.user.email}/>
      </div>
      <SessionManager session={session}/>
    </div>
  );
};

export default UserNavbar;
