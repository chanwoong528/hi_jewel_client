import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import FormComment from '@/components/form/FormComment';
import { Card, CardContent, CardDescription, CardHeader, } from '@/components/ui/card';
import { GET_post } from '@/http/fetchApi/postApi';





const PagePostDetail = () => {
  let location = useLocation();
  const [postContent, setPostContent] = useState({
    post: {
      id: "",
      title: "",
      content: "",
      userEmail: '',
      postPw: "",
      createdAt: ""
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
        <header>
          <h2>{postContent.post.title}</h2>
          <p>{postContent.post.userEmail}</p>
          <p>{postContent.post.createdAt}</p>
        </header>
        <div
          className='post-content'
          dangerouslySetInnerHTML={{ __html: postContent.post.content }}
        />
      </section>
      <div>
        {/* Comment post */}
        <FormComment parentId={location.state.postId} />

      </div>

      {/* comment list */}
      <ul className=' grid gap-4'>{
        postContent.comments.length > 0 ?
          postContent.comments.map((comment: any) => {
            return (
              <li key={comment.id} >
                <Card className="relative" >
                  <CardHeader>
                    <CardDescription>{comment.userEmail} {comment.createdAt}</CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <p dangerouslySetInnerHTML={{ __html: comment.content }} />
                  </CardContent>
                </Card>
              </li>
            )
          }) : null
      }</ul>

    </main >
  )
}

export default PagePostDetail