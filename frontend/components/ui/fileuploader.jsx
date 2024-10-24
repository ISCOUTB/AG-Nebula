'use client'

import { FilePlusIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

const FileUploader = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0]
    if (uploadedFile && uploadedFile.type === "text/csv") {
      setFile(uploadedFile)
      setError(null)
    } else {
      setError("Please upload a valid CSV file.")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const uploadFile = async () => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/upload-csv/', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const previewResponse = await fetch('/data-preview/')
      if (!previewResponse.ok) throw new Error('Failed to fetch preview')

      const previewData = await previewResponse.json()
      setPreview(previewData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-row items-center justify-between w-full h-full bg-surface-container-high dark:bg-surface-container-high-dark rounded-2xl pl-4 pr-2">
      <div id="uploadLabelsContainer">
        <h2 className="font-cabin font-normal text-sm">To get started</h2>
        <h1 className="font-montserrat font-semibold">Upload your csv file</h1>
      </div>
      <Dialog>
        <DialogTrigger>
          <div className="grid place-items-center bg-primary-container text-on-primary-container dark:text-on-primary-container-dark dark:bg-primary-container-dark w-12 h-12 rounded-lg">
            <FilePlusIcon className="w-7 h-auto" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex text-start">
            <DialogTitle className="text-on-surface dark:text-on-surface-dark">Upload a file</DialogTitle>
          </DialogHeader>
          <div 
            {...getRootProps()} 
            className={`mt-4 border-2 border-dashed rounded-md p-8 text-center cursor-pointer ${
              isDragActive ? 'border-primary' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <p>Selected file: {file.name}</p>
            ) : (
              <p className="font-cabin text-on-surface/80 dark:text-on-surface-dark/80">Drag &apos;n&apos; drop a CSV file here, or click to select one</p>
            )}
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Button 
            onClick={uploadFile} 
            disabled={!file || uploading} 
            className="mt-4"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
          {preview && (
            <div className="mt-4">
              <h3 className="font-semibold">File Preview:</h3>
              <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto max-h-40">
                {JSON.stringify(preview, null, 2)}
              </pre>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FileUploader