import React from "react";
import ProfileImage from "./ProfileImage";
import { useSelector } from "react-redux";
import { SlPicture } from "react-icons/sl";

function CreatePost({ onCreatePost, error }) {
  const { profilePhoto } = useSelector((state) => state.user.currentUser);
  const [body, setBody] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const createPost = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.set("body", body);
    if (image) {
      formData.set("image", image);
    }
    onCreatePost(formData);
    setBody("");
    setImage(null);
    setIsLoading(false);
  };

  return (
    <form
      action=""
      className="createPost"
      encType="multipart/form-data"
      onSubmit={createPost}
    >
      {error && <p className="createPost__error-message">{error}</p>}
      <div className="createPost__top">
        <ProfileImage image={profilePhoto} />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What's on your mind?"
          required
        ></textarea>
      </div>
      {image && (
        <div className="createPost__image-preview">
          <img src={URL.createObjectURL(image)} alt="Preview" />
          <button
            type="button"
            className="createPost__image-delete"
            onClick={() => setImage(null)}
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
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Posting...
              </>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
