/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import ProfileImage from "./ProfileImage";
import { useSelector } from "react-redux";
import { SlPicture } from "react-icons/sl";

function CreatePost({ onCreatePost }) {
  const { profilePhoto } = useSelector((state) => state.user.currentUser);
  const formRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  function formAction(formData) {
    onCreatePost(formData);
    formRef.current.reset();
    // Clear image preview after submission
    setSelectedImage(null);
    setImagePreview(null);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    // Clear the file input
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";
  };

  return (
    <form action={formAction} className="createPost" ref={formRef}>
      <div className="createPost__top">
        <ProfileImage image={profilePhoto} />
        <textarea
          name="body"
          placeholder="What's on your mind?"
          required
        ></textarea>
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="createPost__image-preview">
          <img src={imagePreview} alt="Preview" />
          <button
            type="button"
            className="createPost__image-delete"
            onClick={removeImage}
            aria-label="Remove image"
          >
            ×
          </button>
        </div>
      )}

      <div className="createPost__bottom">
        <div className="createPost__actions">
          <label htmlFor="image">
            <SlPicture />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
