import React, { useEffect, useState } from 'react'
import './_style.scss'
import axios from 'axios'
import DeletePost from './../DeletePost/Index'
import LikePost from '../LikePost/index'
// import SuccessAlert from '../SucessAlert/index'
import ModeratePostButton from '../ModeratePost/index'
import ModifyPost from '../ModifyPost/index'

const DisplayPosts = () => {
  const [Posts, SetPosts] = useState([])
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    // Accept: 'application/json',
  }
  useEffect(() => {
    axios
      .get('http://localhost:4200/api/post', config)
      .then((res) => {
        SetPosts(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const LikingPost = (id) => {
    axios.post(`api/post/${id}/like`, {
      // headers: { Authorization: `Bearer ${jwtToken}` },
    })
  }
  return (
    <div className="posts">
      {[...Posts].reverse().map((post) => (
        <article className="post" key={post._id}>
          <div className="post__header">
            <p className="post__author">{post.author}</p>
            <p className="post__date">{post.date}</p>
          </div>
          <div className="post__content">
            <p className="post__title">{post.title}</p>
            <p className="post__publication">{post.publication}</p>
          </div>
          {post.imageUrl != null && (
            <div className="post__image">
              <img
                src={post.imageUrl}
                alt="Publication img"
                className="image__post"
              />
            </div>
          )}
          <div className="footer">
            <DeletePost id={post._id} />
            <ModifyPost id={post._id} />
            <LikePost id={post._id} />
          </div>
          <ModeratePostButton id={post._id} />
        </article>
      ))}
    </div>
  )
}
export default DisplayPosts
