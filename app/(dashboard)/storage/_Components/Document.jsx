import React from 'react'

const Document = ({src,name,type}) => {
    if(type=="pdf"){
        return (
            <div className=' bg-slate-600'>
            <img src="/pdf.png" alt="pdf" />
            <p>{name}</p>
            </div>
          )
    }
    else{
        return <>hello</>
    }
  
}

export default Document