// import React from 'react'
import { useEffect, useState } from "react"
import useProductTypeStore from "@/store/productTypeStore"
import { Button } from "@/components/ui/button"
import ListProduct from "@/components/list/ListProduct"
import { useLocation } from "react-router-dom"


const PageProduct = () => {
  let location = useLocation();
  const [curTab, setCurTab] = useState("")
  const { productTypeList } = useProductTypeStore()

  useEffect(() => {
    if (!location.state?.tab) {
      setCurTab("")
    } else {
      setCurTab(location.state.tab)
    }
  }, [location.state?.tab])


  return (
    <>
      <ul className="flex gap-1 overflow-x-auto bg-blue-100 py-2 ">
        <li >
          <Button
            variant="link"
            className={`${curTab === "" ? "text-blue-700 font-black" : ""}`}
            onClick={() => setCurTab("")}
          >
            All
          </Button>
        </li>
        {productTypeList
          .filter(productType => productType.isPresented === "1")
          .map((productType) => {
            return (
              <li key={productType.id}>
                <Button
                  variant="link"
                  className={`${curTab === productType.label ? "text-blue-700 font-black" : ""}`}
                  onClick={(e) => {
                    setCurTab(productType.label)
                    e.currentTarget.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {productType.label}
                </Button>
              </li>)
          })}
      </ul>
      <main className="page">

        <ListProduct type="main" curTab={curTab} />

      </main>
    </>
  )
}

export default PageProduct