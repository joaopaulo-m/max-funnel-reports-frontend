import { Suspense } from "react"

import { fetchUsersAction } from "@/actions/user/fetch"
import { refreshUserAction } from "@/actions/user/refresh"
import { UsersTable } from "./_components/users-table"
import { TableSkeleton } from "../_components/table-skeleton"

const UsersPage = async () => {
  const refreshUserResult = await refreshUserAction()

  if (refreshUserResult instanceof Error) {
    return <div>{refreshUserResult.message}</div>
  }

  const users = await fetchUsersAction(refreshUserResult.user.company_id)

  return (
    <Suspense fallback={<TableSkeleton />}>
      <UsersTable users={users} />
    </Suspense>
  )
}

export const dynamic = 'force-dynamic';
export default UsersPage
