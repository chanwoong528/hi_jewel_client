// import React from 'react'
import { useState } from "react"
import useProductTypeStore from "@/store/productTypeStore"
import { Button } from "@/components/ui/button"
import ListProduct from "@/components/list/ListProduct"


const PageProduct = () => {
  const [curTab, setCurTab] = useState("")
  const { productTypeList } = useProductTypeStore()


  return (
    <main className="page">

      <ul className="flex gap-1">
        <li >
          <Button
            className={curTab === "" ? "" : "bg-gray-500"}

            onClick={() => setCurTab("")}
          >
            All
          </Button>
        </li>
        {productTypeList.map((productType) => {
          return (
            <li key={productType.id}>
              <Button
                className={curTab === productType.label ? "" : "bg-gray-500"}
                onClick={() => setCurTab(productType.label)}
              >
                {productType.label}
              </Button>
            </li>)

        })}
      </ul>
      <ListProduct type="main" curTab={curTab} />

    </main>
  )
}

export default PageProduct