import React, { Fragment, useState } from "react";
import axiosinstance from "../../../../../../axios-todo";

const UploadAvatar = props => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Select a new Avatar!");

  const handleChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      let result = await axiosinstance.post(
        "api/user/" + props.userId + "/avatar/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      props.onAvatarChange(result.data);
    } catch (err) {}
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <input type="file" name="avatar" id="avatar" onChange={handleChange} />
        <input type="submit" value="Upload" />
      </form>
    </Fragment>
  );
};
export default UploadAvatar;
