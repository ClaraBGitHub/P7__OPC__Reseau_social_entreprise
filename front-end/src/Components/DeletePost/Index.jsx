import React, { useEffect } from 'react'
import axios from 'axios'
import { AlertTitle } from '@mui/material'
import { Alert } from '@mui/material'
import { useState } from 'react'
import './_style.scss'

const DeletePost = ({ id }) => {
  // const [sucessMessage, setSucessMessage] = useState(false)
  const [postDelete, setPostDelete] = useState(false)
  let [postInfo, setpostInfo] = useState([])
  let [userInfo, setUserInfo] = useState([])

  const userId = localStorage.getItem('userId')
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  useEffect(() => {
    axios.get(`http://localhost:4200/api/post/${id}`, config).then((res) => {
      setpostInfo(res.data)
    })
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:4200/api/auth/user/${userId}`, config)
      .then((res) => {
        setUserInfo(res.data.user)
      })
  }, [])

  const handleDeletePost = () => {
    // if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post?')) return
    // console.log(id)
    axios.delete(`http://localhost:4200/api/post/${id}`, config).then((res) => {
      if (res.status == 200)
        setTimeout(function () {
          window.location.reload()
        }, 1000)
      setPostDelete(true)
    })
  }

  return (
    <>
      {(postInfo.userId == userId || userInfo.role == 'admin') && (
        <div>
          <button onClick={() => handleDeletePost()}>Supprimer</button>
        </div>
      )}
    </>
  )
}

export default DeletePost
