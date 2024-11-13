"use client";

import clsx from "clsx";
import { FilePlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { usePreviewStore } from "@/lib/store";

const FileUploader = () => {
  const [uploading, setUploading] = useState(false);
  const store = usePreviewStore();
  const preview = store((state) => state.preview);
  const setPreview = store((state) => state.setPreview);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const uploadFile = async (file) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://129.153.69.231:8011/upload-csv/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const previewResponse = await fetch(`http://129.153.69.231:8011/data-preview/`);
      if (!previewResponse.ok) throw new Error("Failed to fetch preview");

      const previewData = await previewResponse.json();
      setPreview(previewData);
      setIsOpen(false); // Close the dialog after successful upload
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile && uploadedFile.type === "text/csv") {
      uploadFile(uploadedFile);
      setError(null);
    } else {
      setError("Please upload a valid CSV file.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={clsx("absolute flex flex-row items-center justify-between w-full xl:w-[55vw] h-16 bg-surface-container-high dark:bg-surface-container-high-dark rounded-2xl pl-4 pr-2 select-none z-50", {
      "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2": preview.header.length === 0,
      "bottom-3 left-1/2 transform -translate-x-1/2": preview.header.length !== 0,
    })}>
      <div id="uploadLabelsContainer">
        <h2 className="font-cabin font-normal text-sm">To get started</h2>
        <h1 className="font-montserrat font-semibold">Upload your csv file</h1>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <div className="grid place-items-center bg-primary-container text-on-primary-container dark:text-on-primary-container-dark dark:bg-primary-container-dark w-12 h-12 rounded-lg">
            <FilePlusIcon className="w-7 h-auto" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex text-start">
            <DialogTitle className="text-on-surface dark:text-on-surface-dark">
              Upload a file
            </DialogTitle>
          </DialogHeader>
          <div
            {...getRootProps()}
            className={`mt-4 border-2 border-dashed rounded-md p-8 text-center cursor-pointer ${
              isDragActive ? "border-primary" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <p className="font-cabin text-on-surface/80 dark:text-on-surface-dark/80">
                Uploading...
              </p>
            ) : (
              <p className="font-cabin text-on-surface/80 dark:text-on-surface-dark/80">
                Drag &apos;n&apos; drop a CSV file here, or click to select one
              </p>
            )}
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileUploader;