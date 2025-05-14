'use client'

import { useMemo, useState } from "react"

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import type { User } from "@/types/user"
import { CreateUserForm } from "./create-user-form"
import { UpdateUserForm } from "./update-user-form"
import { DeleteUserBtn } from "./delete-user-btn"

interface UsersTableProps {
  users: User[]
}

export const UsersTable = ({ users }: UsersTableProps) => {
  const [query, setQuery] = useState("")

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

  const filteredUsers = useMemo(() => {
    const normalizedQuery = normalize(query)
    return users.filter((user) =>
      normalize(user.name).includes(normalizedQuery)
    )
  }, [query, users])

  return (
    <div className="w-[75%] h-full min-h-full max-h-full flex flex-col gap-8">
      <div className="w-full h-fit flex flex-col items-center gap-8">
        <div className="w-full flex items-center gap-5">
          <Input
            placeholder="Pesquise colaborador pelo nome"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CreateUserForm />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NOME</TableHead>
              <TableHead>E-MAIL</TableHead>
              <TableHead>PERMISSÃO</TableHead>
              <TableHead className="text-right">AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.permission_type === "manager" && "Gerenciador"}
                  {user.permission_type === "owner" && "Dono"}
                </TableCell>
                <TableCell className="w-full flex justify-end items-center gap-8 text-right">
                  <DeleteUserBtn user={user} />
                  <UpdateUserForm user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
