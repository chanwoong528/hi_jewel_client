import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GET_Product } from "@/http/fetchApi/productApi";
import useProductStore from "@/store/productStore";
import useProductTypeStore from "@/store/productTypeStore";


const ListProduct = () => {

  const { productList, setProductList } = useProductStore();
  const { getProductTypeById } = useProductTypeStore();

  useEffect(() => {
    const fetchProductType = async () => {
      const response = await GET_Product();
      setProductList(response.data);
    }
    fetchProductType();
  }, [])

  return (
    <Table className='w-full'>

      <TableHeader>
        <TableRow>

          <TableHead className="w-[150px]">Id</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Image</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          productList.map((product, idx: number) => {
            return (
              <TableRow key={product.id} onClick={() => console.log("!!")}>
                <TableCell>{idx + 1}</TableCell>

                <TableCell>{getProductTypeById(product.typeId)?.label}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="w-[400px] bg-slate-600"><img src={product.imgSrc} alt="" /></TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

export default ListProduct