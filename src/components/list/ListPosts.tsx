import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import DefaultModal from "../modal/DefaultModal";

import usePostStore from '@/store/postStore';

import { GET_post } from '@/http/fetchApi/postApi';
import FormPost from '../form/FormPost';
interface EditShowTypeProps {
  id: string;
  isPresented: "0" | "1";
}

const ListPosts = () => {
  const [curRowData, setCurRowData] = useState({
    id: "",
    title: "",
    content: "",
    postPw: "",
    userEmail: "",
    type: "",
    isPresented: "",
  })
  const [showEditModal, setShowEditModal] = useState(false)

  const { postList, setPostList } = usePostStore();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await GET_post();

      setPostList(response.data);
    }
    fetchPost();
  }, [])



  const onSwitchShowType = (changeData: EditShowTypeProps) => {
    let confirmAnswer = confirm("Are you sure to change the show type?")

    if (!!confirmAnswer) {
      // PATCH_productType(changeData.id, {
      //   isPresented: changeData.isPresented
      // }).then((_) =>
      //   updateProductTypeItem({ id: changeData.id, isPresented: changeData.isPresented })
      // )
    }
  }
  return (
    <>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Type(QNA | Notice)</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="w-[150px]">Show Type</TableHead>
            <TableHead className="w-[150px]">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            postList.map((post, idx: number) => {
              return (
                <TableRow key={post.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>{post.type === "0" ? "QNA" : "NOTICE"}</TableCell>
                  <TableCell>{post.userEmail}</TableCell>
                  <TableCell>
                    <Switch
                      checked={post.isPresented === "1" ? true : false}
                      onCheckedChange={() =>
                        onSwitchShowType({
                          id: post.id,
                          isPresented: post.isPresented === "1" ? "0" : "1"
                        })}
                    >
                      {post.isPresented}
                    </Switch>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => {
                      setCurRowData({ ...post })
                      setShowEditModal(true)
                    }}>
                      Edit: {post.title}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
      {/* {edit modal} */}
      <DefaultModal
        dialogTitle={"Edit Image"}
        conditionalProps={{ open: showEditModal, onOpenChange: setShowEditModal }}
      >
        <FormPost curData={curRowData} />
      </DefaultModal >
    </>
  )
}

export default ListPosts