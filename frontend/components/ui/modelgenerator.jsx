import { usePreviewStore } from "@/lib/store";
import FileUploader from "@/components/ui/fileuploader";
import TablePreview from "@/components/ui/tablepreview";
import VariableSelector from "@/components/ui/variableselector";
import ModelSelector from "@/components/ui/modelselector";
import ModelResults from "@/components/ui/modelresults";
const ModelGenerator = () => {
  const preview = usePreviewStore((state) => state.preview);

  return (
    <div className="w-full h-[91svh] relative flex flex-col mt-3 gap-3">
      <div className="w-full h-full flex flex-col overflow-y-scroll rounded-2xl">
        <div>
          <TablePreview />
        </div>
        <VariableSelector />
        <ModelSelector />
        <ModelResults />
      </div>
      <div className="w-full h-fit">
        <FileUploader />
      </div>
    </div>
  );
};

export default ModelGenerator;