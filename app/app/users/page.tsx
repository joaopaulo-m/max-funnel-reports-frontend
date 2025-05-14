import { fetchUsersAction } from "@/actions/user/fetch"
import { refreshUserAction } from "@/actions/user/refresh"
import { UsersTable } from "./_components/users-table"

const UsersPage = async () => {
  const refreshUserResult = await refreshUserAction()

  if (refreshUserResult instanceof Error) {
    return <div>{refreshUserResult.message}</div>
  }

  const users = await fetchUsersAction(refreshUserResult.user.company_id)

  return (
    <UsersTable users={users} />
  )
}

export const dynamic = 'force-dynamic';
export default UsersPage
