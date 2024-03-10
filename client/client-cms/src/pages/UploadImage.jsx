import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config";
import Swal from "sweetalert2";

const UploadImage = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [upload, fileToUplad] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilPicture", upload);
    try {
      const { data } = await axios({
        method: "PATCH",
        url: `/profile`,
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      
      nav("/profile");
    } catch (error) {
      Swal.fire(`Unable to upload`, "???", "error");
    }
  }

  function handleOnChange(e) {
    fileToUplad(e.target.files[0]);
  }

  return (
    <>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleOnChange} />

        <input type="submit" value="Upload File" />
      </form>
    </>
  );
};

export default UploadImage;
