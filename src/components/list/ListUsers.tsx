import { useEffect, useState } from "react";
import { GET_userList, PATCH_userRole } from "@/http/fetchApi/userApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface User {
  id: string;
  email: string;
  type: string;
  role: string;

}


const ListUsers = () => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserList = async () => {
      const response = await GET_userList();

      setUserList(response.data);

    }
    fetchUserList();
  }, [])


  const onChangeUserRole = (val: "admin" | "user", id: string) => {
    const confirmRoleChange = confirm("wish to change role?")
    if (confirmRoleChange) {
      PATCH_userRole(id, val).then((_) => {

      })
    }
  }

  return (
    <Table className='w-full'>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Id</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>role</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {
          userList.map((user, idx: number) => {
            return (
              <TableRow key={user.id} >
                <TableCell>{idx + 1}</TableCell>
                <TableCell >{user.email}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell >
                  <Select onValueChange={(val: "admin" | "user") => onChangeUserRole(val, user.id)} defaultValue={user.role}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>

                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="user">user</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

export default ListUsers