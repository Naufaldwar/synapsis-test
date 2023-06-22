import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import photos from "../../assets/images/photo.jpg";
import { CardComment } from "../CardComment";

const Props = {
  dataPost: Object,
  dataComments: Array,
};

export const Card = ({ dataPost, dataComments }) => {
  // console.log(dataComments);
  return (
    <div className="border border-gray-500 rounded-lg p-4 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* <Image
            alt="photo"
            width={40}
            height={40}
            src={photos}
            className="object-contain h-10 w-10 rounded-full"
          /> */}
          <div className="flex flex-col ml-2">
            {/* <span className="font-semibold text-gray-500 text-xs">
              {dataPost.user_id}
            </span> */}
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
      <div>
        <input
          type="text"
          placeholder="comment"
          className="border border-gray-500 rounded-lg p-2 w-full"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {dataComments.map((item) => (
          <>
            {item.post_id === dataPost.id && (
              <div key={item.id}>
                <CardComment dataComment={item} postId={dataPost.id} />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
