"use client";

import { useEffect, useRef, useState } from "react";
import FileUploader from "@/components/ui/fileuploader";
import TablePreview from "@/components/ui/tablepreview";
import VariableSelector from "@/components/ui/variableselector";
import ModelSelector from "@/components/ui/modelselector";
import ModelResult from "@/components/ui/modelresult";
import { usePreviewStore } from "@/lib/store";

const ModelGenerator = ({ email }) => {
  const scrollRef = useRef(null);
  const store = usePreviewStore();
  const preview = store(state => state.preview);
  const selectedOutcome = store(state => state.selectedOutcome);
  const selectedPredictors = store(state => state.selectedPredictors);
  const selectedModel = store(state => state.selectedModel);
  const [prevHeight, setPrevHeight] = useState(0);

  useEffect(
    () => {
      const scrollToBottom = () => {
        if (scrollRef.current) {
          const currentHeight = scrollRef.current.scrollHeight;
          if (currentHeight > prevHeight) {
            scrollRef.current.scrollTo({
              top: currentHeight,
              behavior: "smooth"
            });
            setPrevHeight(currentHeight);
          }
        }
      };

      // Use a timeout to ensure the DOM has updated
      const timeoutId = setTimeout(scrollToBottom, 100);

      return () => clearTimeout(timeoutId);
    },
    [preview, selectedOutcome, selectedPredictors, selectedModel, prevHeight]
  );

  return (
    <div className="w-full h-[100svh] relative flex flex-col">
      <FileUploader />
      <div
        ref={scrollRef}
        className="w-full h-[86svh] flex flex-col xl:place-items-center overflow-y-scroll pt-6 rounded-2xl"
      >
        <div className="xl:max-w-[55vw]">
          <div>
            <TablePreview />
          </div>
          <VariableSelector />
          <ModelSelector />
          <ModelResult email={email} />
        </div>
      </div>
    </div>
  );
};

export default ModelGenerator;
