import FormPost from "@/components/form/FormPost"
import ListPosts from "@/components/list/ListPosts"
import DefaultModal from "@/components/modal/DefaultModal"

const PageContact = () => {


  return (
    <main className="page">
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