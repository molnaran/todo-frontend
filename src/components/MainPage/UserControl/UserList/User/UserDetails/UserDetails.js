import React, { useEffect, useState, Fragment } from "react";
import styles from "./UserDetails.module.css";
import axiosinstance from "../../../../../../axios-todo";

const UserDetails = props => {
  const [avatar, setAvatar] = useState();
  const { name, email, avatarPath, handleAvatarChange } = props;

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
    <Fragment>
      <div className={styles.Details}>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
      </div>
      {avatar ? (
        <img className={styles.Avatar} src={avatar} />
      ) : (
        "Avatar not available!"
      )}
    </Fragment>
  );
};
export default UserDetails;
