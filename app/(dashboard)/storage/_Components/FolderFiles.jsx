"use client"
import React,{useState, useEffect} from 'react'
import Link from 'next/link';
const FolderFiles = ({pathFolders,setPathFolders,pos,setPos,lastPos,setLastPos,refetch}) => {
    const [folders, setFolders] = useState(null);
  const [files, setFiles] = useState(null);
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
    <div>{folders && folders.map((e,i) => {
        return <div key={e._id} onClick={()=>{
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
            
          
        }}>{e.name}</div>;
      })}
      {files && 
        files.map((e)=>{
          return (
            <div key={e._id}>
            <Link href={e.file.file} target="_blank">{e.file.name}</Link>
            </div>
          )
        })
      }</div>
  )
}

export default FolderFiles