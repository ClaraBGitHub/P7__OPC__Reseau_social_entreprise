import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './_style.scss'

const ModeratePostButton = ({ id }) => {
  const [data, setData] = useState([])
  const [moderatedPost, setModeratedPost] = useState(false)

  const user = localStorage.getItem('userId')
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
  const postToModerate = {
    moderated: 1,
  }
  const postToNotModerated = {
    moderated: 0,
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4200/api/auth/user/${user}`, config)
      .then((res) => {
        if (res.status == 200) {
          setData(res.data.user)
        }
      })
  }, [])

  const handleModerated = () => {
    if (moderatedPost == false) {
      axios
        .post(
          `http://localhost:4200/api/post/${id}/moderated`,
          postToModerate,
          config
        )
        .then((res) => {
          alert(
            'Vous avez annulé la moderation de ce post, il sera désormais visible des autres utilisateurs'
          )
          if (res.status == 200) setModeratedPost(true)
        })
    } else {
      axios
        .post(
          `http://localhost:4200/api/post/${id}/moderated`,
          postToNotModerated,
          config
        )
        .then((res) => {
          alert(
            'Vous avez modéré ce post, il ne sera plus visible des autres utilisateurs'
          )
          if (res.status == 200) setModeratedPost(false)
        })
    }
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4200/api/post/${id}/moderated`, config)
      .then((res) => {
        if (res.data.moderated == true) {
          setModeratedPost(true)
        } else {
          setModeratedPost(false)
        }
      })
  })
  return (
    <>
      {data.role == 'admin' && (
        <div className="footerModeration">
          <button
            style={{ backgroundColor: moderatedPost ? '#4E5166' : '#FD2D01' }}
            className="moderatedButton"
            onClick={handleModerated}
          >
            {' '}
            {moderatedPost ? ' Modérer le poste' : 'Annuler la modération'}
          </button>
        </div>
      )}
    </>
  )
}

export default ModeratePostButton
