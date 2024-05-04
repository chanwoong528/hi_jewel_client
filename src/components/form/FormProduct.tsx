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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import useProductTypeStore from "@/store/productTypeStore"
import { PATCH_product, POST_Product } from "@/http/fetchApi/productApi"
import useProductStore from "@/store/productStore"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface FormProductProps {
  curData?: EditProductData
}

interface EditProductData {
  id: string;
  title?: string;
  description?: string;
  imgSrc?: string;
  productType?: string;
}


const FormProduct = ({ curData }: FormProductProps) => {
  const [loading, setLoading] = useState(false)

  const [curImgSrc, setCurImgSrc] = useState(curData?.imgSrc)

  const { productTypeList } = useProductTypeStore();
  const { addProductItem, updateProductItem } = useProductStore();

  const formSchema = z.object(
    !curData?.id ? {
      productTitle: z.string().min(2, {
        message: "Title must be at least 2 characters.",
      }),
      description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
      }),
      imgFile: z.instanceof(File, {
        message: "Please upload an image file.",
      }),
      productType: z.string().refine(val => productTypeList.some(productType => productType.id === val), {
        message: "Description must be at least 2 characters.",
      }),
    } : {
      productTitle: z.string().min(2, {
        message: "Title must be at least 2 characters.",
      }),
      description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
      }),
      imgFileEdit: z.instanceof(File, { message: "Please upload an image file." }).optional(),
      productType: z.string().refine(val => productTypeList.some(productType => productType.id === val), {
        message: "Description must be at least 2 characters.",
      }),
    }

  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productTitle: curData?.title ? curData.title : "",
      description: curData?.description ? curData.description : "",
      productType: curData?.productType ? curData.productType : "",
      imgFile: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    if (curData?.id) {
      //edit
      return PATCH_product(curData.id, {
        title: values.productTitle,
        description: values.description,
        image: values.imgFile,
        typeId: values.productType
      }).then((result) => {
        if (result.data.imgSrc) {
          setCurImgSrc(result.data.imgSrc);
        }
        updateProductItem({
          id: curData.id,
          title: values.productTitle,
          description: values.description,
          typeId: values.productType,
          ...(!!result.data.imgSrc && { imgSrc: result.data.imgSrc })
        })
        alert("Product has been updated.");
      }).finally(() => {
        setLoading(false)
      })
    } else {
      POST_Product({
        title: values.productTitle,
        description: values.description,
        image: values.imgFile,
        typeId: values.productType
      }).then((result) => {
        addProductItem(result.data);
        alert("Product has been posted.");
      }).finally(() => {
        setLoading(false)
      })
    }

  }



  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Title of product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Product Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypeList.map((productType) => {
                      return (
                        <SelectItem
                          key={productType.id}
                          value={productType.id}
                        >
                          {productType.label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Product Type
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
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Description of product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imgFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>imgFile</FormLabel>
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
    </Form >
  )
}

export default FormProduct