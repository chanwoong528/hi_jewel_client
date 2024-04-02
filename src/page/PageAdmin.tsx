import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import ListProductType from '@/components/list/ListProductType'
import FormProductType from "@/components/form/FormProductType"
import ListProduct from "@/components/list/ListProduct"
import ListUsers from "@/components/list/ListUsers"
import DefaultModal from "@/components/modal/DefaultModal"


const PageAdmin = () => {

  return (
    <main className="page">
      <Tabs defaultValue="type-list" >
        <TabsList>
          <TabsTrigger value="type-list">Category Manager</TabsTrigger>
          <TabsTrigger value="item-list">Uploaded Item</TabsTrigger>
          <TabsTrigger value="user-list">User List</TabsTrigger>
        </TabsList>

        <TabsContent value="type-list">
          <header>
            <h3>{"CategoryList list"}</h3>
          </header>
          <DefaultModal
            dialogTitle={"Upload Image"}
            triggerTitle={"Add New Category"}
          >
            <FormProductType />
          </DefaultModal>
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
            <ListProduct />
          </DefaultModal>
        </TabsContent>

        <TabsContent value="user-list">
          <header>
            <h3>User list</h3>
          </header>
          <ListUsers />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default PageAdmin