import React, { useEffect, useState } from 'react'
import './_style.scss'
import axios from 'axios'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const Card = () => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [publication, setPublication] = useState('')
  const [selectedFile, setSelectedFile] = useState('')

  // get User informations
  const [Userdata, setUserdata] = useState([])
  const user = localStorage.getItem('userId')
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    // Accept: 'application/json',
  }

  useEffect(() => {
    const UserInfo = axios
      .get(`http://localhost:4200/api/auth/user/${user}`, config)
      .then((res) => {
        if (res.status == 200) {
          setUserdata(res.data.user)
        }
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

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('userId', user)
    formData.append('title', title)
    formData.append('author', Userdata.firstname)
    formData.append('publication', publication)
    formData.append('date', dateActuelle)
    formData.append('image', selectedFile)
    console.log(formData)
    axios
      .post('http://localhost:4200/api/post', formData, config)
      .then((res) => {
        if (res.status == 200) {
          console.log(res)
        }
        setTimeout(function () {
          window.location.reload()
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Popup
      className="popup-modal"
      trigger={
        <div className="buttonCreatePost">
          <button className="popup-modal__triggerButton">
            Partager du contenu
          </button>
        </div>
      }
      modal
    >
      <form
        className="cardContainer"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <div className="cardContainer__header">
          <div>
            <label className="cardContainer__header__author">
              Auteur : {Userdata.firstname}
            </label>
          </div>
          <label className="cardContainer__header__date"> {dateActuelle}</label>
        </div>
        <div className="cardContainer__post">
          <label>Titre</label>
          <input
            className="cardContainer__post__title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Publication</label>
          <textarea
            className="cardContainer__post__publication"
            name="publication"
            placeholder="What's on your mind ?"
            onChange={(e) => setPublication(e.target.value)}
          />
          <input type="file" name="image" onChange={handleFileSelect} />
        </div>
        <button className="cardContainer__button">Pubier</button>
      </form>
    </Popup>
  )
}
// }
export default Card
