import { useEffect, useState } from "react";

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
import { Switch } from "../ui/switch";

import { DELETE_product, GET_Product, GET_productType, PATCH_product } from "@/http/fetchApi/productApi";
import useProductStore from "@/store/productStore";
import useProductTypeStore from "@/store/productTypeStore";
import DefaultModal from "../modal/DefaultModal";
import FormProduct from "../form/FormProduct";
import { Button } from "../ui/button";
import DetailModal from "../modal/DetailModal";


interface EditShowTypeProps {
  id: string;
  isPresented: "0" | "1";
}

const ListProduct = ({ type = "admin", curTab = "" }) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [curRowData, setCurRowData] = useState({
    id: "",
    title: "",
    description: "",
    imgSrc: "",
    productType: "",
  })

  const { productList, setProductList, updateProductItem, deleteProductItem } = useProductStore();
  const { getProductTypeById, productTypeList, setProductTypeList } = useProductTypeStore();

  useEffect(() => {
    const fetchProductType = async () => {
      if (productTypeList.length < 1) {
        const response = await GET_productType();
        setProductTypeList(response.data);
      }
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

  const onClickDeleteProduct = (id: string) => {
    let confirmAnswer = confirm("Are you sure to delete this product?")
    if (!!confirmAnswer) {
      DELETE_product(id).then((_) => deleteProductItem(id))
    }
  }



  if (type === "admin") {
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
                    <TableCell className="w-[150px] bg-slate-600">
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
                    <TableCell className='flex gap-1'>
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
                        Edit
                      </Button>
                      <Button className='bg-red-500 hover:bg-red-800'
                        onClick={() => onClickDeleteProduct(product.id)}>
                        Delete
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

  return (
    <div className="flex flex-wrap  justify-between md:mt-14 mt-4  md:gap-2 gap-1" >
      {
        productList
          ?.filter(item => item.isPresented === "1")
          ?.filter(item => {
            const productTypeLabel = getProductTypeById(item.typeId)?.label;
            return productTypeLabel === curTab || curTab === "";
          })
          ?.map((product) => {
            return (
              <DetailModal

                key={product.id}
                headerChild={
                  <Card className="w-full max-w-[150px] aspect-square relative cursor-pointer overflow-hidden">
                    <CardHeader className="flex justify-between w-full h-full absolute z-10 p-2 " >
                      <CardTitle>{product.title}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="absolute top-0 left-0 p-0 z-0 opacity-50">
                      <img src={product.imgSrc} alt="" />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                    </CardFooter>
                  </Card>
                }
                dialogTitle={product.title}
              >
                <img src={product.imgSrc} />
                <p>{product.description}</p>
              </DetailModal>
            )
          })
      }
    </div>)


}

export default ListProduct