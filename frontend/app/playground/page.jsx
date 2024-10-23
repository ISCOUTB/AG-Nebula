import example from "@/app/data/example.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilePlusIcon, UploadIcon } from "@radix-ui/react-icons";
import FileUploader from "@/components/ui/fileuploader";
import TablePreview from "@/components/ui/tablepreview";
import VariableSelector from "@/components/ui/variableselector";

export default function Page() {
  console.log(example);

  return (
    <div className="w-svw h-svh flex flex-col p-4 bg-background-material dark:bg-background-material-dark overflow-x-hidden">
      <main className="relative h-full">
        {/*Mobile - File uploader*/}
        <div className="flex flex-row w-full h-16 gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <FileUploader />
        </div>

        {/* Table preview component */}
        <TablePreview data={example}/>

        {/*Component for variable selection */}
        <VariableSelector data={example}/>
      </main>
    </div>
  );
}
