import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
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

import { DELETE_post, GET_post, PATCH_post, PostType } from '@/http/fetchApi/postApi';
import FormPost from '../form/FormPost';
interface EditShowTypeProps {
  id: string;
  isPresented: "0" | "1";
}

const ListPosts = ({ type = "" }) => {
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
  const { postList, setPostList, updatePostItem, deletePostItem } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await GET_post(undefined, type);
      setPostList(response.data);
    }
    fetchPost();
  }, [])


  const onSwitchShowType = (changeData: EditShowTypeProps) => {
    let confirmAnswer = confirm("Are you sure to change the show type?")
    if (!!confirmAnswer) {
      PATCH_post(changeData.id, {
        isPresented: changeData.isPresented
      }).then((_) =>
        updatePostItem({ id: changeData.id, isPresented: changeData.isPresented })
      )
    }
  }
  const onClickUserRow = (id: string) => {
    if (type !== "user") {
      return;
    }
    navigate(`/post`, { state: { postId: id } })
  }

  const onClickDeletePost = (id: string) => {
    let confirmAnswer = confirm("Are you sure to delete this post?")
    if (!!confirmAnswer) {
      DELETE_post(id).then((_) => {
        deletePostItem(id)
      })
    }
  }


  const renderPostType = (type: string) => {
    switch (type) {
      case PostType.qna:
        return "QNA";
      case PostType.notice:
        return "Notice";
      case PostType.comment:
        return "comment";
      default:
        return "Unknown";
    }
  }

  return (
    <>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            {type !== "user" &&
              <>
                <TableHead className="w-[150px]">Id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type(QNA | Notice)</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-[150px]">Show Type</TableHead>
                <TableHead className="w-[150px]">Edit</TableHead>
              </>
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            postList.length > 0 && postList?.map((post, idx: number) => {
              return (
                <TableRow
                  key={post.id}
                  className={
                    type === "user" ?
                      post.type === "1" ? "bg-slate-300 cursor-pointer hover:bg-gray-100"
                        : 'cursor-pointer hover:bg-gray-100'
                      : ""}
                  onClick={() => { onClickUserRow(post.id) }}
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  {/* <TableCell>{post.content}</TableCell> */}
                  <TableCell>{renderPostType(post.type)}</TableCell>
                  <TableCell>{post.userEmail}</TableCell>
                  <TableHead>{post.createdAt}</TableHead>
                  {type !== "user" && <>
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
                    <TableCell className='flex gap-1'>
                      {type !== "user" && post.type !== "2" ? <Button onClick={() => {
                        setCurRowData({ ...post })
                        setShowEditModal(true)
                      }}>
                        Edit
                      </Button> : null}
                      <Button className='bg-red-500 hover:bg-red-800'
                        onClick={() => onClickDeletePost(post.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </>}

                </TableRow>
              )
            })
          }
        </TableBody>
      </Table >
      {/* {edit modal} */}
      < DefaultModal
        dialogTitle={"Edit Image"}
        conditionalProps={{ open: showEditModal, onOpenChange: setShowEditModal }
        }
      >
        <FormPost curData={curRowData} type="" />
      </DefaultModal >
    </>
  )
}

export default ListPosts