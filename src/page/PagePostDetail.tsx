import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import FormComment from '@/components/form/FormComment';
import { Card, CardContent, CardDescription, CardHeader, } from '@/components/ui/card';
import { GET_post, PostType } from '@/http/fetchApi/postApi';
import { convertToDateString } from '@/utils/utilsFunction';
import { Button } from '@/components/ui/button';





const PagePostDetail = () => {
  let location = useLocation();

  const [postContent, setPostContent] = useState({
    post: {
      id: "",
      title: "",
      content: "",
      userEmail: '',
      postPw: "",
      createdAt: "",
      type: ""
    },
    comments: []
  });

  useEffect(() => {
    const fetchSinglePost = async () => {
      const response = await GET_post(location.state.postId);

      setPostContent({
        ...response.data,
        comments: response.data.comments
          .filter((comments: { id: string; }) => comments.id !== location.state.postId)
      });
    }
    fetchSinglePost();
  }, [location.state.postId])


  return (
    <main className="page">
      <section>
        <Button
          className='px-0'
          variant="link"
          onClick={() => { window.history.back() }}
        >{"<"} Go back to Inquires
        </Button>
        <header className='flex justify-between'>
          <h3 className='font-normal text-xl'>Title: {postContent.post.title}</h3>
          <div className='text-end'>
            <p>
              {postContent.post.type === PostType.notice ? 'Admin' :
                postContent.post.userEmail}
            </p>
            <p>Posted: {convertToDateString(postContent.post.createdAt)}</p>
          </div>
        </header>
        <div
          className='post-content min-h-[50vh] border-2 p-4 rounded-lg mt-4'
          dangerouslySetInnerHTML={{ __html: postContent.post.content }}
        />
      </section>
      <div className='mt-4'>
        <p>Post Comment</p>
        <FormComment parentId={location.state.postId} />
      </div>

      {/* comment list */}
      <section className='mt-4'>
        <h4>Comments</h4>
        <ul className='mt-4 grid gap-4 max-w-[500px]'>{
          postContent.comments.length > 0 ?
            postContent.comments
              ?.filter((comment: any) => comment.isPresented === "1")
              .map((comment: any) => {
                return (
                  <li key={comment.id} >
                    <Card className="relative p-2" >
                      <CardHeader className='p-0 pb-2 border-b '>
                        <CardDescription className='flex justify-between '>
                          <span> {comment.userEmail}</span>
                          <span> {convertToDateString(comment.createdAt)}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className='p-0'>
                        <p dangerouslySetInnerHTML={{ __html: comment.content }} />
                      </CardContent>
                    </Card>
                  </li>
                )
              }) : null
        }</ul>
      </section>
    </main >
  )
}

export default PagePostDetail