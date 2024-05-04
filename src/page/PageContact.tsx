import FormPost from "@/components/form/FormPost"
import ListPosts from "@/components/list/ListPosts"
import DefaultModal from "@/components/modal/DefaultModal"

const PageContact = () => {


  return (
    <main className="page">
      <header className="flex flex-col text-center my-4">
        <h2 className="font-medium text-2xl mb-4">CONTACT</h2>
        <p>If you have any questions, please leave them on our board and we will respond quickly.</p>
      </header>

      <DefaultModal
        dialogTitle={"Leave Inquiry"}
        triggerTitle={"Leave Inquiry"}
      >
        <FormPost type="user" curData={{}} />
      </DefaultModal>
      <ListPosts type="user" />

    </main>
  )
}

export default PageContact