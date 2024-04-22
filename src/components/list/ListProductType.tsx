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

import { GET_productType, PATCH_productType } from "@/http/fetchApi/productApi";

import useProductTypeStore from "@/store/productTypeStore";
import DefaultModal from "../modal/DefaultModal";
import FormProductType from "../form/FormProductType";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";


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

  const { productTypeList, setProductTypeList, updateProductTypeItem } = useProductTypeStore();

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
              productTypeList.map((productType, idx: number) => {
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
                    <TableCell>
                      <Button onClick={() => {
                        setCurRowData({
                          id: productType.id,
                          label: productType.label,
                          description: productType.description,
                          imgSrc: productType.imgSrc,
                        })
                        setShowEditModal(true)
                      }}>
                        Edit: {productType.label}
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

  return (
    <div className="flex flex-wrap gap-2 justify-between mt-14">
      {
        productTypeList
          .filter(item => item.isPresented === "1")
          .map((productType) => {
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
    </div>)

}

export default ListProductType