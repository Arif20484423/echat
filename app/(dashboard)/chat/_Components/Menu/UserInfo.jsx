"use client";
import CenterComp from "@/app/_UIComponents/CenterComp";
import FunctionButton from "../../../../_UIComponents/FunctionButton";
import styles from "./Menu.module.css";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const UserInfo = ({ setUserinfo, name_, email_, image_, desc_ }) => {
  const router = useRouter();
  const ref = useRef(null);
  const imageRef = useRef(null);
  const [name, setName] = useState(name_);
  const [nameSaving, setNameSaving] = useState(false);
  const [desc, setDesc] = useState(desc_);
  const [descSaving, setDescSaving] = useState(false);
  const [image, setImage] = useState(image_);
  const [imageUploading, setImageUploading] = useState(false);
  const [nameedit, setNameedit] = useState(false);
  const [descedit, setDescedit] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current != null && !ref.current.contains(e.target)) {
        setUserinfo((t) => !t);
      }
    });
  }, []);
  return (
    // <Popup>
    <div className={styles.profilewrapper}>
      <CenterComp>
        <div className={styles.userinfo} ref={ref}>
          <div className={styles.image}>
            {imageUploading ? (
              <img src="/imageloader2.gif" alt="Profile picture" />
            ) : (
              <img src={image} alt="Profile picture" />
            )}
            <input
              type="file"
              ref={imageRef}
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
              onChange={async (e) => {
                setImageUploading(true);
                const formData = new FormData();
                formData.append("image", e.target.files[0]);
                const res = await fetch("/api/user/image", {
                  method: "POST",
                  body: formData,
                });
                if (res.redirected) {
                  redirect("/user/signin");
                }
                const data = await res.json();
                if (data.success) {
                  setImage(data.link);
                } else {
                  alert("Error Uploading image");
                }
                setImageUploading(false);
              }}
            />
            <svg
              onClick={() => {
                imageRef.current.click();
              }}
              className={styles.imageedit}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#00000"
            >
              <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
            </svg>
          </div>

          {/* <label htmlFor="">Name</label> */}

          <div>
            <div className={styles.info}>
              <label htmlFor="name">Name</label>
              <svg
                className={styles.edit}
                onClick={() => {
                  setNameedit((t) => !t);
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#00000"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(() => e.target.value);
                }}
                disabled={!nameedit}
              />
              {nameedit && (
                <FunctionButton
                disabled={nameSaving}
                  onClick={async () => {
                    setNameSaving(true)
                    const res = await fetch("/api/user/name", {
                      method: "POST",
                      body: JSON.stringify({ name: name }),
                    });
                    if (res.redirected) {
                      redirect(res.url);
                    }
                    const data = await res.json();
                    setNameSaving(false);
                    setNameedit(() => false);
                    
                  }}
                >
                  Save
                </FunctionButton>
              )}
            </div>

            <div className={styles.info}>
              <label htmlFor="">Description</label>
              <svg
                className={styles.edit}
                onClick={() => {
                  setDescedit((t) => !t);
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#00000"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
              <input
                type="text"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                disabled={!descedit}
              />
              {descedit && (
                <FunctionButton
                disabled={descSaving}
                  onClick={async () => {
                    setDescSaving(true)
                    const res = await fetch("/api/user/description", {
                      method: "POST",
                      body: JSON.stringify({ description: desc }),
                    });
                    if (res.redirected) {
                      redirect(res.url);
                    }
                    const data = await res.json();
                    setDescSaving(false);
                    setDescedit(() => false);
                  }}
                >
                  Save
                </FunctionButton>
              )}
            </div>

            <div className={styles.info}>
              {" "}
              <label htmlFor="">Email</label>
              <input type="text" value={email_} disabled />
            </div>

            <FunctionButton
              onClick={() => {
                // redirect("/chat")
                window.location.reload();
              }}
            >
              Close
            </FunctionButton>
            <FunctionButton
              onClick={() => {
                router.push("/user/password");
              }}
            >
              Reset Password
            </FunctionButton>
          </div>
        </div>
      </CenterComp>
    </div>
    // </Popup>
  );
};

export default UserInfo;
