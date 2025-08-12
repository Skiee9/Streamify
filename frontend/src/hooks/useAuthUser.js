import React from 'react'

const useAuthUser = () => {
const authUser= useQuery({
  queryKey:["authUser"],
  queryFn: getAuthUser,
  retry: false, // Disable retry on failure
})

return { isLoading: authUser.isLoading, authUser: authUser.data?.user }
}

export default useAuthUser
