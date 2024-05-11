import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import ListProductType from '@/components/list/ListProductType'
import ListProduct from "@/components/list/ListProduct"
import ListUsers from "@/components/list/ListUsers"
import FormProductType from "@/components/form/FormProductType"
import FormProduct from "@/components/form/FormProduct"

import DefaultModal from "@/components/modal/DefaultModal"
import ListPosts from "@/components/list/ListPosts"
import FormPost from "@/components/form/FormPost"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import ListProductTypeOrder from "@/components/list/ListProductTypeOrder"


const PageAdmin = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate(`/`)
  }

  return (
    <main className="page">
      <Tabs defaultValue="dash-board" >
        <div className="w-full overflow-x-auto">
          <TabsList >
            <TabsTrigger value="dash-board">Dash Board</TabsTrigger>
            <TabsTrigger value="type-list">Category Manager</TabsTrigger>
            <TabsTrigger value="item-list">Uploaded Item</TabsTrigger>
            <TabsTrigger value="post-list">Manage Post</TabsTrigger>
            <TabsTrigger value="user-list">User List</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="dash-board">
          <header>
            <h3>{"Dash Board"}</h3>
          </header>
        </TabsContent>



        <TabsContent value="type-list">
          <header>
            <h3>{"CategoryList list"}</h3>
          </header>
          {/* add New Cate */}
          <div className="flex gap-2 overflow-y-auto">
            <DefaultModal
              dialogTitle={"New Category"}
              triggerTitle={"Add New Category"}
            >
              <FormProductType />
            </DefaultModal>
            {/* add New Cate */}
            {/* Order Modal*/}
            <DefaultModal
              dialogTitle={"Order of Category"}
              triggerTitle={"Set Order of Category"}
            >
              <ListProductTypeOrder />
            </DefaultModal>
          </div>
          {/* Order Modal*/}
          <ListProductType />
        </TabsContent>

        <TabsContent value="item-list" className='b-100'>
          <header>
            <h3>{"Product list"}</h3>
          </header>
          <DefaultModal
            dialogTitle={"Upload Image"}
            triggerTitle={"Add New Product"}
          >
            <FormProduct />
          </DefaultModal>
          <ListProduct />
        </TabsContent>
        <TabsContent value="post-list">
          <header>
            <h3>Post list</h3>
          </header>
          <DefaultModal
            dialogTitle={"Upload Notice"}
            triggerTitle={"Add New Notice"}
          >
            <FormPost curData={{}} type="" />
          </DefaultModal>
          <ListPosts />

        </TabsContent>

        <TabsContent value="user-list">
          <header>
            <h3>User list</h3>
          </header>
          <ListUsers />
        </TabsContent>
      </Tabs>
      <Button className="max-w-[150px]" onClick={onClickLogout}>Logout</Button>
    </main>
  )
}

export default PageAdmin