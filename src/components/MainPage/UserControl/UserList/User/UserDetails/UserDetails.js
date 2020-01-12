import React, { useEffect, useState } from "react";
import styles from "./UserDetails.module.css";
import axiosinstance from "../../../../../../axios-todo";

const UserDetails = props => {
  const [avatar, setAvatar] = useState();
  const { name, email, avatarPath, handleAvatarChange } = props;
  useEffect(() => {
    console.log("UserDetails rendering...");
  });

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        let result = await axiosinstance.get("/api/avatar/" + avatarPath, {
          responseType: "arraybuffer"
        });

        const base64 = btoa(
          new Uint8Array(result.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setAvatar("data:;base64," + base64);
      } catch (e) {}
    };

    fetchAvatar();
  }, [handleAvatarChange, avatarPath]);

  return (
    <div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      {avatar ? (
        <img className={styles.Avatar} src={avatar} />
      ) : (
        "Avatar not available!"
      )}
    </div>
  );
};
export default UserDetails;
