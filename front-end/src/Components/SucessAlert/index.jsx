import React from 'react'
import { AlertTitle } from '@mui/material'
import { Alert } from '@mui/material'
import './_style.scss'

// Need to use usercontext
const SuccessAlert = ({ id }) => {
  return (
    <span>
      {/* {sucessMessage && ( */}
      <Alert className="sucessAlert" severity="success">
        <AlertTitle>Supprimé</AlertTitle>
        Ce post a bien été — <strong>supprimé</strong>
      </Alert>
      {/* )} */}
    </span>
  )
}

export default SuccessAlert
