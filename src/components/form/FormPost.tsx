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
import { POST_post, PostType } from "@/http/fetchApi/postApi"

import usePostStore from "@/store/postStore"
import useUserStore from "@/store/userStore"

interface FormPostProps {
  curData?: EditPostData
}

interface EditPostData {
  id?: string;
  title?: string;
  content?: string;
  postPw?: string;
  userEmail?: string;
  // type?: "0" | "1" | "2";
}


const FormPost = ({ curData }: FormPostProps) => {

  const { addPost } = usePostStore();
  const { userInfo } = useUserStore()

  const formSchema = z.object(
    !curData?.id ? {
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

    if (curData?.id) {
      //edit
      return


    } else {
      //create
      if (!userInfo.userEmail) return alert("Please login");

      const postParam = {
        title: values.postTitle,
        content: values.content,
        type: PostType.notice,
        userEmail: userInfo.userEmail
      }
      return POST_post(postParam).then((result) => addPost(result.data))
    }

  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="postTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Title of Post
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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


        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default FormPost