import { useGetMeQuery } from '../generated/schemas'

const useCurrentUser = () => {
  const { data, loading } = useGetMeQuery({
    fetchPolicy: 'cache-and-network'
  })

  return {
    ID: data?.getMe.ID,
    name: data?.getMe.name,
    email: data?.getMe.email,
    rootFolder: data?.getMe.rootFolder,
    rootFolderID: data?.getMe?.rootFolder?.ID,
    avatar: data?.getMe.avatar,
    maxStorage: data?.getMe.currentPackage.maxStorage,
    storageUsed: data?.getMe.storageUsed,
    currentPackageID: data?.getMe.currentPackage.ID,
    stripeCustomerID: data?.getMe.stripeCustomerID,
    currentPackage: data?.getMe.currentPackage,
    loading
  }
}

export default useCurrentUser
