import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './_style.scss'

const ModifyPost = ({ id }) => {
  const [postModify, setPostModify] = useState(false)
  let [postInfo, setpostInfo] = useState([])
  let [userInfo, setUserInfo] = useState([])
  const [title, setTitle] = useState('')
  //   const [date, setDate] = useState('')
  const [publication, setPublication] = useState('')
  const [selectedFile, setSelectedFile] = useState('')

  const userId = localStorage.getItem('userId')
  const config = {
    headers: {
      'Content-Type': 'application/json',
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

  const dateActuelle =
    new Date().getDate() +
    '/' +
    (new Date().getMonth() + 1) +
    '/' +
    new Date().getFullYear()

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleModifiePost = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('title', title)
    formData.append('author', userInfo.firstname)
    formData.append('publication', publication)
    formData.append('date', dateActuelle)
    formData.append('image', selectedFile)
    console.log(formData)
    // if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post?')) return
    // console.log(id)
    axios
      .put(`http://localhost:4200/api/post/${id}`, formData, config)
      .then((res) => {
        if (res.status == 200)
          setTimeout(function () {
            window.location.reload()
          }, 1000)
        setPostModify(true)
      })
  }

  return (
    <>
      {(postInfo.userId == userId || userInfo.role == 'admin') && (
        <Popup
          className="popup-modal"
          trigger={
            <div>
              {/* //   {(postInfo.userId == userId || userInfo.role == 'admin') && ( */}
              <div className="buttonModifyPost">
                <button className="triggerButton">Modifier</button>
              </div>
              {/* //   )} */}
            </div>
          }
          modal
        >
          <form
            className="cardContainer"
            onSubmit={handleModifiePost}
            encType="multipart/form-data"
          >
            <div className="cardContainer__header">
              <div>
                <label className="cardContainer__header__author">
                  Auteur : {userInfo.firstname}
                </label>
                vv
              </div>
              <label className="cardContainer__header__date">
                {' '}
                {dateActuelle}
              </label>
            </div>
            <div className="cardContainer__post">
              <label>Titre</label>
              <input
                className="cardContainer__post__title"
                name="title"
                defaultValue={postInfo.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Publication</label>
              <textarea
                className="cardContainer__post__publication"
                name="publication"
                defaultValue={postInfo.publication}
                placeholder="What's on your mind ?"
                onChange={(e) => setPublication(e.target.value)}
              />
              <input type="file" name="image" onChange={handleFileSelect} />
            </div>
            <button className="cardContainer__button">Pubier</button>
          </form>
        </Popup>
      )}
    </>
  )
}

export default ModifyPost
