import { useState } from "react";

export const FormPost = ({ onFormSubmit }) => {
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
      <label htmlFor="title">
        Title <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={handleTitle}
        placeholder="Title"
        className="border rounded-lg p-2 w-full"
      />
      <label htmlFor="post">
        Post <span className="text-red-500">*</span>
      </label>
      <textarea
        value={post}
        onChange={handlePost}
        name="post"
        id="post"
        rows="5"
        placeholder="Write here"
        className="border rounded-lg p-2 w-full"
      />
      <button
        disabled={post === "" || title === "" ? true : false}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end disabled:cursor-default disabled:bg-blue-300 disabled:hover:bg-blue-300 disabled:hover:cursor-default"
      >
        Submit
      </button>
    </form>
  );
};
