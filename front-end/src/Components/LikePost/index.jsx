import React from 'react'
import axios from 'axios'
import { AiFillLike } from 'react-icons/ai'
import { useState } from 'react'
import { useEffect } from 'react'

const LikePost = ({ id }) => {
  const [postLiked, setPostLiked] = useState(false)
  const [nbOfLikes, setNbOfLikes] = useState(0)

  const userId = localStorage.getItem('userId')
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
  const likeData = {
    userId: userId,
    like: 1,
  }
  const dislikeData = {
    userId: userId,
    like: 0,
  }

  const handleLikePost = () => {
    if (postLiked == false) {
      axios
        .post(`http://localhost:4200/api/post/${id}/like`, likeData, config)
        .then((res) => {
          if (res.status == 200) setPostLiked(true)
        })
    } else {
      axios
        .post(`http://localhost:4200/api/post/${id}/like`, dislikeData, config)
        .then((res) => {
          if (res.status == 200) setPostLiked(false)
        })
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:4200/api/post/${id}`, config).then((res) => {
      const nbOfLikes = res.data.likes
      setNbOfLikes(nbOfLikes)
      if (res.data.usersLiked.includes(userId)) {
        setPostLiked(true)
      } else {
        setPostLiked(false)
      }
    })
  })

  return (
    <button onClick={handleLikePost} title="Like">
      {}
      <AiFillLike color={postLiked ? '#FD2D01' : 'gray'} />
      <span>{nbOfLikes}</span>
    </button>
  )
}
export default LikePost
