import { axiosClient } from './axios'

export const uploadFolderRestful = async (folder: FormData, folderID: string) => {
  return await axiosClient.post(`/folders/upload?folderID=${folderID}`, folder)
}
