"use client"
import React,{useState, useEffect} from 'react'
import Link from 'next/link';
import { deleteFile, deleteFolder, moveMedia, renameMedia } from '@/lib/actions/storageActions';
const FolderFiles = ({pathFolders,setPathFolders,pos,setPos,lastPos,setLastPos,refetch,setRefetch, fileClick}) => {
    const [folders, setFolders] = useState(null);
  const [files, setFiles] = useState(null);
  const [media,setMedia]= useState([]);

  useEffect(() => {
    if (pos >= 0) {
    //   console.log(pathFolders)
    //   console.log(pos)
      fetch("/api/getfolders", {
        method: "POST",
        body: JSON.stringify({ folder: pathFolders[pos]._id }),
      })
        .then((d) => d.json())
        .then((d) => {
          setFolders(d.data);
        });
      fetch("/api/getfiles",{
        method:"POST",
        body:JSON.stringify({folder:pathFolders[pos]._id})
      }).then(d=>d.json()).then((d)=>{
        setFiles(d.data)
      })
    }
  }, [pos,refetch]);
  return (
    <>
    <br />
    <button onClick={async ()=>{
        console.log(media)
        const formData= new FormData();
        media.map((e)=>{
            if(e.folder){
                formData.append("folders",e.id)
            }
            else{
                formData.append("files",e.id)
            }
        })
        await moveMedia(formData,pathFolders[pos]._id)
        setRefetch((t)=>!t)
        setMedia([]);
    }}>here</button>
    <br />

    
<div>

{folders && folders.map((e,i) => {
    return <div key={e._id}><div  onClick={()=>{
        if(pos==lastPos){
            if(pathFolders[pos].parentfolder!==e.parentfolder){
                const newpathFolders=[...pathFolders,e]
                sessionStorage.setItem("pathFolders",JSON.stringify(newpathFolders));
                sessionStorage.setItem("pos",JSON.stringify(pos+1));
                sessionStorage.setItem("lastPos",JSON.stringify(lastPos+1));
                setPathFolders(newpathFolders);
                setPos((p)=>p+1);
                setLastPos((p)=>p+1);
            }
            
            
        }
        else{
            let slicePathFolders= pathFolders.slice(0,pos+1);
            slicePathFolders=[...slicePathFolders,e];
            sessionStorage.setItem("pathFolders",JSON.stringify(slicePathFolders));
            sessionStorage.setItem("pos",JSON.stringify(pos+1));
            sessionStorage.setItem("lastPos",JSON.stringify(pos+1));
            
            setPathFolders(slicePathFolders)
            setPos(()=>pos+1);
            setLastPos(()=>pos+1);
           
        }
        
      
    }}>{e.name}       

        </div>  
        <button onClick={async ()=>{
            deleteFolder(e._id)
        }}>delete</button>
        </div>;
  })}
  {files && 
    files.map((e)=>{
        
            return (
        <div key={e._id} className=' bg-slate-500' onClick={()=>{
          if(fileClick){
            fileClick();
          }
          else{
            alert("jsh")
          }
        }}>
        <Link href={e.file.file} className=' bg-red-500' target="_blank">{e.name?e.name:e.file.name}</Link>

        {/* <button onClick={()=>{
            setMedia([...media,{id:e._id,folder:false}])
        }}>move</button> */}
        <button onClick={()=>{
            deleteFile(e._id)
        }}>delete</button>
        </div>
      )
        
      
    })
  }</div>
    </>
    
  )
}

export default FolderFiles