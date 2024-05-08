// import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import EditorSun from "../EditorSun"
import { PATCH_post, POST_post, PostType } from "@/http/fetchApi/postApi"

import usePostStore from "@/store/postStore"
import useUserStore from "@/store/userStore"
import { useState } from "react"
import { Loader2 } from "lucide-react"


interface EditPostData {
  id?: string;
  title?: string;
  content?: string;
  postPw?: string;
  userEmail?: string;
  // type?: "0" | "1" | "2";
}


const FormPost = (
  { curData, type = "" }: { curData: EditPostData, type: string | undefined }) => {
  const [loading, setLoading] = useState(false)
  const { addPost, updatePostItem } = usePostStore();
  const { userInfo } = useUserStore()

  const formSchema = z.object(
    !curData?.id && !userInfo.userEmail ? {
      postTitle: z.string().min(2, {
        message: "Title must be at least 2 characters.",
      }),
      content: z.string().min(2, {
        message: "Description must be at least 2 characters.",
      }),
      contactEmail: z.string().email({
        message: "Must be a valid email.",
      }),
    } : !!userInfo.userEmail ? {
      postTitle: z.string().min(2, {
        message: "Title must be at least 2 characters.",
      }),
      content: z.string().min(2, {
        message: "Description must be at least 2 characters.",
      }),
    } : {
      postTitle: z.string().min(2, {
        message: "Title must be at least 2 characters.",
      }),
      content: z.string().min(2, {
        message: "Description must be at least 2 characters.",
      }),

    }

  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postTitle: curData?.title ? curData.title : "",
      content: curData?.content ? curData.content : "",

    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    if (curData?.id) {
      //edit
      return PATCH_post(curData.id, {
        title: values.postTitle,
        content: values.content,
      }).then((_) => {
        updatePostItem({ id: curData.id, title: values.postTitle, content: values.content })
        return alert("Post has been updated.")
      }).finally(() => {
        setLoading(false)
      })
    } else {
      //create
      // if (!userInfo.userEmail) return alert("Please login");

      const postParam = {
        title: values.postTitle,
        content: values.content,
        type: type === "user" ? PostType.qna : PostType.notice,
        isPresented: type === "user" ? "1" : "0",
        userEmail: userInfo.userEmail ? userInfo.userEmail : values.contactEmail,
      }
      return POST_post(postParam)
        .then((result) => {
          addPost(result.data)
          alert("Post has been posted.")
        }).finally(() => {
          setLoading(false)
        })
    }

  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="postTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type === "user" &&
            (<FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@exmaple.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />)
          }
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <EditorSun
                    onChangeContent={(content: string) => field.onChange(content)}
                    initialContent={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Title of Post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <Button type="submit">
          {!!loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>)
            :
            "Submit"
          }
        </Button>
      </form>
    </Form>
  )
}

export default FormPost