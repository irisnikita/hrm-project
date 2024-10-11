// Libraries
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

// Services
import { uploadServices } from "@/services"

// Schemas
import { Media } from "@/schemas/Media"


interface useUploadFilesProps {
  options?: UseMutationOptions<Media[], Error, any>
} 

export const useUploadFiles = (props?: useUploadFilesProps) => {
  const {options} = props || {};

  return useMutation({
    mutationFn: uploadServices.uploadFiles,
    ...options
  })
}