import React from 'react'
import styles from "../Component.module.css"
const Path = ({pathFolders,setPathFolders,pos,setPos,setLastPos}) => {
  return (
    <div className={styles.path}>
      {pathFolders.map((e, i) => {
        if(i<=pos){
          return (
          <p
            key={e._id}
            onClick={() => {
              const newpathFolders=pathFolders.slice(0,i+1);
              sessionStorage.setItem("pathFolders",JSON.stringify(newpathFolders));
              sessionStorage.setItem("pos",JSON.stringify(i));
              sessionStorage.setItem("lastPos",JSON.stringify(i));
              setPathFolders(()=>newpathFolders);
              setPos((  )=>i);
              setLastPos(()=>i);
            }}
            
          >
            {e.name}
            {i==pos?"":<span>/</span>}
          </p>
        );
        }
        
      })}
      <br />
      </div>
  )
}

export default Path