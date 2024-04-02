import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "../ui/switch";

import { GET_Product, PATCH_product } from "@/http/fetchApi/productApi";
import useProductStore from "@/store/productStore";
import useProductTypeStore from "@/store/productTypeStore";
import DefaultModal from "../modal/DefaultModal";
import FormProduct from "../form/FormProduct";
import { Button } from "../ui/button";


interface EditShowTypeProps {
  id: string;
  isPresented: "0" | "1";
}

const ListProduct = () => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [curRowData, setCurRowData] = useState({
    id: "",
    title: "",
    description: "",
    imgSrc: "",
    productType: "",
  })

  const { productList, setProductList, updateProductItem } = useProductStore();
  const { getProductTypeById } = useProductTypeStore();

  useEffect(() => {
    const fetchProductType = async () => {
      const response = await GET_Product();
      setProductList(response.data);
    }
    fetchProductType();
  }, [])

  const onSwitchShowType = (changeData: EditShowTypeProps) => {
    let confirmAnswer = confirm("Are you sure to change the show type?")

    if (!!confirmAnswer) {
      PATCH_product(changeData.id, {
        isPresented: changeData.isPresented
      }).then((_) => {
        updateProductItem({ id: changeData.id, isPresented: changeData.isPresented })
      })
    }
  }



  return (
    <>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Id</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="w-[150px]">Show Type</TableHead>
            <TableHead className="w-[150px]">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            productList.map((product, idx: number) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{getProductTypeById(product.typeId)?.label}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell className="w-[400px] bg-slate-600">
                    <img src={product.imgSrc} alt="" />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={product.isPresented === "1" ? true : false}
                      onCheckedChange={() =>
                        onSwitchShowType({
                          id: product.id,
                          isPresented: product.isPresented === "1" ? "0" : "1"
                        })}
                    >
                      {product.isPresented}
                    </Switch>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => {
                      setCurRowData({
                        id: product.id,
                        title: product.title,
                        description: product.description,
                        imgSrc: product.imgSrc,
                        productType: product.typeId,
                      })
                      setShowEditModal(true)
                    }}>
                      Edit: {product.title}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
      {/* {edit modal} */}
      <DefaultModal
        dialogTitle={"Edit Image"}
        conditionalProps={{ open: showEditModal, onOpenChange: setShowEditModal }}
      >
        <FormProduct
          curData={curRowData}
        />
      </DefaultModal >
      {/* {edit modal} */}
    </>
  )
}

export default ListProduct