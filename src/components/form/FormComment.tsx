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


import { Textarea } from "@/components/ui/textarea"
import { Input } from "../ui/input"





const FormComment = ({ parentId }: { parentId: string }) => {
  const formSchema = z.object(
    {
      userEmail: z.string().min(2, {
        message: "Content must be at least 2 characters.",
      }),
      // contact: z.string().email({
      //   message: "Email must be valid type.",
      // }),
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



    const postParam = {
      userEmail: values.userEmail,
      content: values.content,
      type: PostType.comment,
      parentPostId: parentId
    }
    console.log(postParam)
    return POST_post(postParam).then((result) => {
      console.log(result)
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
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} />
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

export default FormComment