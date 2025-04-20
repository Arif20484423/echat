import React from 'react'

const Name = ({name,renameFlag}) => {
  return (
    <div>
        {renameFlag?<></>:<p>name</p>}
    </div>
  )
}

export default Name