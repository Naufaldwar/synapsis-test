import { useState } from "react";

export const Form = ({ onFormSubmit }) => {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");

  const handlePost = (e) => {
    const post = e.target.value;
    setPost(post);
  };

  const handleTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ post, title });
    setPost("");
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border rounded-lg p-4 "
    >
      <input
        type="text"
        value={title}
        onChange={handleTitle}
        placeholder="Title"
        className="border rounded-lg p-2 w-full"
      />
      <textarea
        value={post}
        onChange={handlePost}
        name=""
        id=""
        rows="5"
        placeholder="Write here"
        className="border rounded-lg p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end"
      >
        Submit
      </button>
    </form>
  );
};
