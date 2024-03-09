
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import FormImageUpload from '@/components/form/FormImageUpload'
import ListProductType from '@/components/list/ListProductType'
import FormProductType from "@/components/form/FormProductType"
import ListProduct from "@/components/list/ListProduct"
import ListUsers from "@/components/list/ListUsers"


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
          <Dialog>
            <header>
              <h3>CategoryList list</h3>
              <DialogTrigger>Open</DialogTrigger>
            </header>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Image</DialogTitle>
                <FormProductType />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <ListProductType />
        </TabsContent>

        <TabsContent value="item-list" className='b-100'>
          <Dialog>
            <header>
              <h3>Product list</h3>
              <DialogTrigger>Open</DialogTrigger>
            </header>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Image</DialogTitle>
                <FormImageUpload />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <ListProduct />
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