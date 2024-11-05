import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InboxIcon } from "lucide-react";
import ModelGenerator from "@/components/ui/modelgenerator";

export default function Page() {
  return (
    <div className="w-svw h-svh flex flex-col py-3 px-4 bg-background-material dark:bg-background-material-dark overflow-x-hidden">
      <main className="relative">
        {/*Mobile - File uploader*/}
        <div className="flex flex-row items-center justify-between w-full h-[5svh]">
          <div>
            <InboxIcon className="text dark:text-on-surface-dark" />
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <ModelGenerator />
        </div>
      </main>
    </div>
  );
}
