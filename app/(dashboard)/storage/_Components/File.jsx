import React from 'react'
import Folder from "./Folder"
import Image from "./Image"
import Video from "./Video"
import Document from "./Document"
const File = ({type,src,name}) => {
  if(type==="image"){
    return <Image src={src} name={name}/>
  }
  else if(type==="video"){
    return <Video src={src} name={name}/>
  }
  else if(type==='folder'){
    return <Folder src={src} name={name}/>
  }
  else{
    if(type=="pdf"){
      return <Document src={src} name={name} type={type}/>
    }
    return (
      <div>
        hellow
      </div>
    )
  }
  
}

export default File