import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import photos from "../../assets/images/photo.jpg";
import { CardComment } from "../CardComment";

export const Card = ({ dataPost, dataComments, onFormSubmit, dataUser }) => {
  const [comment, setComment] = useState("");
  const [id, setId] = useState(dataPost.id);

  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ comment, id });
    setComment("");
  };
  return (
    <div className="border border-gray-500 rounded-lg p-4 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex flex-col ml-2">
            <span className="font-semibold text-gray-500 text-lg">
              {dataPost.title}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-500 text-sm">{dataPost.body}</p>
      </div>
      <p className="mt-4">Comment</p>
      <hr className="my-3" />
      {dataUser?.name && (
        <div className="">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              id={`comment-${dataPost.id}`}
              type="text"
              value={comment}
              onChange={handleChange}
              placeholder="comment"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
            <button
              type="submit"
              disabled={comment === "" ? true : false}
              className=" self-center absolute right-4 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded disabled:cursor-default disabled:bg-blue-300 disabled:hover:bg-blue-300 disabled:hover:cursor-default"
            >
              <p>Send</p>
            </button>
          </form>
        </div>
      )}
      <div className="flex flex-col gap-2 mt-4">
        {dataComments.map((item) => (
          <React.Fragment key={item.id}>
            {item?.post_id === dataPost.id ? (
              <CardComment dataComment={item} postId={dataPost.id} />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
