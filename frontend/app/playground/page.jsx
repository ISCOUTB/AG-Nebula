import { redirect } from "next/navigation";
import ModelGenerator from "@/components/ui/modelgenerator";
import UserNavbar from "@/components/ui/userNavbar";
import {checkIsAuthenticated} from "@/lib/auth/checkIsAuthenticated";
import { auth } from "@/lib/auth/authConfig";

export default async function Page() {
  const isAuthenticated = await checkIsAuthenticated();
  const session = await auth();
  const email = session.user.email;

  if (!isAuthenticated) {
    redirect("/sign-in");
  } else {
    return (
      <div className="w-svw h-svh flex flex-col py-3 px-4 bg-background-material dark:bg-background-material-dark overflow-x-hidden">
        <main className="relative">
          {/*Mobile - File uploader*/}
          <UserNavbar />
          <div>
            <ModelGenerator email={email}/>
          </div>
        </main>
      </div>
    );
  }
}
