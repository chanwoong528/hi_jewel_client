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

import { DELETE_productType, GET_productType, PATCH_productType } from "@/http/fetchApi/productApi";

import useProductTypeStore from "@/store/productTypeStore";
import DefaultModal from "../modal/DefaultModal";
import FormProductType from "../form/FormProductType";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { useNavigate } from "react-router-dom";


interface EditShowTypeProps {
  id: string;
  isPresented: "0" | "1";
}

const ListProductType = ({ type = "admin", }) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [curRowData, setCurRowData] = useState({
    id: "",
    label: "",
    description: "",
    imgSrc: "",
  })

  const { productTypeList, setProductTypeList, updateProductTypeItem, deleteProductTypeItem } = useProductTypeStore();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductType = async () => {
      const response = await GET_productType();
      setProductTypeList(response?.data);
    }
    fetchProductType();
  }, [])

  const onSwitchShowType = (changeData: EditShowTypeProps) => {
    let confirmAnswer = confirm("Are you sure to change the show type?")

    if (!!confirmAnswer) {
      PATCH_productType(changeData.id, {
        isPresented: changeData.isPresented
      }).then((_) =>
        updateProductTypeItem({ id: changeData.id, isPresented: changeData.isPresented })
      )
    }
  }

  const onClickDeleteProductType = (id: string) => {
    let confirmAnswer = confirm("Are you sure to delete this product type?")
    if (!!confirmAnswer) {
      DELETE_productType(id)
        .then((_) => deleteProductTypeItem(id))
        .catch(err => {
          if (err.response.status === 409) {
            return alert("This product type is used in product. Please delete related products first.")
          }
        })
    }
  }


  if (type === "admin") {
    return (
      <>
        <Table className='w-full '>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Id</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[150px]">Image</TableHead>
              <TableHead className="w-[150px]">Show Type</TableHead>
              <TableHead className="w-[150px]">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              productTypeList?.map((productType, idx: number) => {
                return (
                  <TableRow key={productType.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{productType.label}</TableCell>
                    <TableCell>{productType.description}</TableCell>
                    <TableCell>
                      <img src={productType.imgSrc} alt="" />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={productType.isPresented === "1" ? true : false}
                        onCheckedChange={() =>
                          onSwitchShowType({
                            id: productType.id,
                            isPresented: productType.isPresented === "1" ? "0" : "1"
                          })}
                      >
                        {productType.isPresented}
                      </Switch>
                    </TableCell>
                    <TableCell className='flex gap-1 items-center'>
                      <Button onClick={() => {
                        setCurRowData({
                          id: productType.id,
                          label: productType.label,
                          description: productType.description,
                          imgSrc: productType.imgSrc,
                        })
                        setShowEditModal(true)
                      }}>
                        Edit
                      </Button>
                      <Button className='bg-red-500 hover:bg-red-800'
                        onClick={() => onClickDeleteProductType(productType.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table >
        {/* {edit modal} */}
        <DefaultModal
          dialogTitle={"Edit Image"}
          conditionalProps={{ open: showEditModal, onOpenChange: setShowEditModal }}
        >
          <FormProductType
            curData={curRowData}
          />
        </DefaultModal >
        {/* {edit modal} */}
      </>
    )
  }

  const onClickProductType = (productTypeName: string) => {
    navigate("/product", { state: { tab: productTypeName } })
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 md:mt-14 mt-4 gap-4 justify-between"    >
      {
        productTypeList
          ?.filter(item => item.isPresented === "1")
          .length < 1 ?
          "No product type available. Please add one."
          : (productTypeList
            ?.filter(item => item.isPresented === "1")
            .map((productType) => {
              return (
                <Card
                  className="flex justify-center align-middle w-full max-w-[400px] aspect-square relative cursor-pointer overflow-hidden"
                  key={productType.id}
                  onClick={() => onClickProductType(productType.label)}
                >
                  <CardHeader className="flex justify-between w-full h-full absolute z-10  md:p-6 p-4" >
                    <CardTitle className="md:text-2xl text-base">{productType.label}</CardTitle>
                    {type === "main" ? null : <CardDescription className="md:text-base text-sm">{productType.description}</CardDescription>}
                  </CardHeader>
                  <CardContent className="absolute top-0 left-0 p-0 z-0 opacity-50">
                    <img src={productType.imgSrc} alt="" />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                  </CardFooter>
                </Card>
              )
            }))
      }
    </div>)

}

export default ListProductType