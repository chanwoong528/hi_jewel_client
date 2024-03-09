import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { GET_productType } from "@/http/fetchApi/productApi";

import useProductTypeStore from "@/store/productTypeStore";


const ListProductType = ({ type = "admin" }) => {

  const { productTypeList, setProductTypeList } = useProductTypeStore();
  useEffect(() => {
    const fetchProductType = async () => {
      const response = await GET_productType();
      setProductTypeList(response.data);
    }
    fetchProductType();
  }, [])


  if (type === "admin") {
    return (
      <Table className='w-full'>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Id</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[150px]">Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            productTypeList.map((productType, idx: number) => {
              return (
                <TableRow key={productType.id} onClick={() => console.log("!!")}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{productType.label}</TableCell>
                  <TableCell>{productType.description}</TableCell>
                  <TableCell>
                    <img src={productType.imgSrc} alt="" />
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }

  return <div className="flex flex-wrap gap-2 justify-between mt-14">
    {
      productTypeList.map((productType) => {
        return (

          <Card className="w-[350px] h-[350px] relative" key={productType.id}>
            <CardHeader className="flex justify-between w-full h-full absolute z-10" >
              <CardTitle>{productType.label}</CardTitle>
              <CardDescription>{productType.description}</CardDescription>
            </CardHeader>
            <CardContent className="absolute top-0 left-0 p-0 z-0 opacity-50">
              <img src={productType.imgSrc} alt="" />
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </Card>
        )
      })
    }

  </div>

}

export default ListProductType