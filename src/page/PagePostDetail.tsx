import FormComment from '@/components/form/FormComment';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GET_post } from '@/http/fetchApi/postApi';
import { Post } from '@/store/postStore';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';



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
      setPostContent(response.data);
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
          postContent.comments.map((comment: Post) => {
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