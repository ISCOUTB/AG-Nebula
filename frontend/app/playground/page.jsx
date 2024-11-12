import { redirect } from "next/navigation";
import ModelGenerator from "@/components/ui/modelgenerator";
import UserNavbar from "@/components/ui/userNavbar";
import {checkIsAuthenticated} from "@/lib/auth/checkIsAuthenticated";
import { auth } from "@/lib/auth/authConfig";

export default async function Page() {
  const isAuthenticated = await checkIsAuthenticated();
  const session = await auth();

  // Verifica si no hay sesión o usuario y redirige si es necesario
  if (!isAuthenticated || !session?.user) {
    redirect("/sign-in"); // Redirige a la página de inicio de sesión
    return null; // Devuelve null para evitar renderizar el componente
  }
  const email = session.user.email;
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
