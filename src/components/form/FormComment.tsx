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

import { Button } from "@/components/ui/button"
import { POST_post, PostType } from "@/http/fetchApi/postApi"
import { Loader2 } from "lucide-react"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "../ui/input"
import { useState } from "react"
import usePostStore from "@/store/postStore"





const FormComment = ({ parentId }: { parentId: string }) => {
  const [loading, setLoading] = useState(false)

  const { addPost } = usePostStore()

  const formSchema = z.object(
    {
      // userEmail: z.string().min(2, {
      //   message: "Content must be at least 2 characters.",
      // }),
      userEmail: z.string().email({
        message: "Email must be valid type.",
      }),
      content: z.string().min(2, {
        message: "Content must be at least 2 characters.",
      }),
    }
  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
      content: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const postParam = {
      userEmail: values.userEmail,
      content: values.content,
      type: PostType.comment,
      parentPostId: parentId,
      isPresented: "1"
    }
    return POST_post(postParam).then((result) => {
      alert("Comment has been posted.")
      return window.location.reload()
    }).finally(() => {
      setLoading(false)
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      // className="space-y-8"
      >
        <FormField
          control={form.control}
          name="userEmail"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input  {...field}
                  // type="email" 
                  />
                </FormControl>
                <FormDescription>

                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
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

export default FormComment