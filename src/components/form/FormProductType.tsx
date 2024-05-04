
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

import { PATCH_productType, POST_productType } from "@/http/fetchApi/productApi"
import useProductTypeStore from "@/store/productTypeStore"
import { useState } from "react"


interface FormProductTypeProps {
  curData?: EditCurData
}
interface EditCurData {
  id: string
  label?: string
  description?: string
  imgSrc?: string
}

const FormProductType = ({ curData }: FormProductTypeProps) => {
  const [curImgSrc, setCurImgSrc] = useState(curData?.imgSrc)

  const { addProductTypeItem, updateProductTypeItem } = useProductTypeStore();

  const formSchema = z.object(
    !curData?.id ? {
      label: z.string().min(2, {
        message: "Title must be at least 2 characters.",
      }),
      description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
      }),
      imgFile: z.instanceof(File, { message: "Please upload an image file." })
    } :
      {
        label: z.string().min(2, {
          message: "Title must be at least 2 characters.",
        }),
        description: z.string().min(2, {
          message: "Description must be at least 2 characters.",
        }),
        imgFileEdit: z.instanceof(File, { message: "Please upload an image file." }).optional()
      }
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: curData?.label ? curData.label : "",
      description: curData?.description ? curData.description : "",
      imgFile: undefined,

    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {

    if (!!curData?.id) {
      //edit
      return PATCH_productType(curData.id, {
        label: values.label,
        description: values.description,
        image: values.imgFileEdit,
      }).then((result) => {
        if (result.data.imgSrc) {
          setCurImgSrc(result.data.imgSrc);
        }
        updateProductTypeItem({
          id: curData.id,
          label: values.label,
          description: values.description,
          ...(!!result.data.imgSrc && { imgSrc: result.data.imgSrc })
        })
      })

    } else {
      //created
      return POST_productType({
        label: values.label,
        description: values.description,
        image: values.imgFile,
      }).then((result) =>
        addProductTypeItem(result.data)
      );
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>    Product Category Title</FormLabel>
              <FormControl>
                <Input placeholder="Product Category" {...field} />
              </FormControl>
              <FormDescription>
                Product Category Title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                Description of product Category
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={curData?.id ? "imgFileEdit" : "imgFile"}

          render={({ field }) => (
            <FormItem >
              <FormLabel>Image File</FormLabel>
              <FormControl>
                <Input
                  accept=".jpg, .jpeg, .png, .svg, .gif"
                  type="file"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  } />
              </FormControl>
              <FormDescription>
                {curData?.imgSrc ?
                  (<>
                    Current image
                    <img className="max-w-[200px]" src={curImgSrc} />
                  </>)
                  : "Image of picture"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default FormProductType