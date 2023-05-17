import { axiosClient } from './axios'

export const uploadFileRestful = async (file: FormData, folderID: string) => {
  return await axiosClient.post(`/files/upload?folderID=${folderID}`, file)
}
