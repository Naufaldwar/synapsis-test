import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import photos from "../../assets/images/photo.jpg";

const Props = {
  dataPost: Object,
};

export const Card = ({ dataPost }) => {
  return (
    <div className="border border-gray-500 rounded-lg p-4 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            alt="photo"
            width={40}
            height={40}
            src={photos}
            className="object-contain h-10 w-10 rounded-full"
          />
          <div className="flex flex-col ml-2">
            <span className="font-semibold text-gray-500 text-xs">
              {dataPost.user_id}
            </span>
            <span className="font-semibold text-gray-500 text-lg">
              {dataPost.title}
            </span>
          </div>
        </div>
        <p>edit</p>
      </div>
      <div className="mt-4">
        <p className="text-gray-500 text-sm">{dataPost.body}</p>
      </div>
    </div>
  );
};
