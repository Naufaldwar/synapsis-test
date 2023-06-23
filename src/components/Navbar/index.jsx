import Image from "next/image";
import photo from "../../assets/images/photo.jpg";
import { useState } from "react";
import Link from "next/link";

const Props = {
  dataUser: Object,
};
export const Navbar = ({ dataUser }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <nav className="bg-red-200 w-full flex justify-between items-center px-10">
      <div>
        <a href="/" className="flex items-center py-4 px-2">
          <span className="font-semibold text-gray-500 text-lg">
            Synapsis Test
          </span>
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          onClick={handleOpen}
          type="button"
          className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H11V18H4V16Z"
            ></path>
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden absolute lg:static right-4 rounded top-16 bg-slate-100 flex-col w-[30%] gap-4 h-fit py-4  px-4">
          <Link href="/">
            <button className="hover:text-slate-400 hover:underline py-2  w-full">
              Home
            </button>
          </Link>
          <Link href="/user">
            <button className="hover:text-slate-400 hover:underline py-2  w-full">
              User
            </button>
          </Link>
        </div>
      )}

      <div className="hidden lg:flex items-center gap-2">
        {dataUser?.name != null ? (
          <p className="hidden sm:flex">Hi! , {dataUser.name}</p>
        ) : (
          <p className="hidden sm:flex">Hi! , guest</p>
        )}
        <div className="flex items-center justify-center border border-gray-500  rounded-full p-1">
          <Image
            alt="photo"
            height={40}
            width={40}
            src={photo}
            className="object-contain h-10 w-10 rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};
