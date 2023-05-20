import { useGetComputerByMacAddressQuery } from '@renderer/generated/schemas'
import { useLocalStorage } from '@renderer/utils/tools'

const useComputer = () => {
  const { getLocalStorage } = useLocalStorage()
  const macAddress = getLocalStorage('macAddress')

  const { data } = useGetComputerByMacAddressQuery({
    variables: {
      macAddress
    },
    fetchPolicy: 'cache-and-network'
  })

  return {
    macAddress: macAddress,
    hostname: data?.getComputerByMacAddress.hostname,
    name: data?.getComputerByMacAddress.name,
    storagePath: data?.getComputerByMacAddress.storagePath
  }
}

export default useComputer
