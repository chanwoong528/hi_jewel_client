import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetProductType } from '@/http/service/queries'

interface ProductTypeParam {
  id: string;
  label: string;
  description: string;
}

const ListProductType = () => {

  const productTypeQuery = useGetProductType();

  if (productTypeQuery.isLoading) return <div>Loading...</div>

  return (
    <Table className='w-full'>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Id</TableHead>
          <TableHead>Label</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          productTypeQuery.data?.data.map((productType: ProductTypeParam, idx: number) => {
            return (
              <TableRow key={productType.id} onClick={() => console.log("!!")}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{productType.label}</TableCell>
                <TableCell>{productType.description}</TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

export default ListProductType