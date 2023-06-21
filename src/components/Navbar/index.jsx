import Image from "next/image";
import photo from "../../assets/images/photo.jpg";

const Props = {
  dataUser: Object,
};
export const Navbar = ({ dataUser }) => {
  return (
    <nav className="bg-red-200 w-full flex justify-between items-center">
      <div>
        <a href="#" className="flex items-center py-4 px-2">
          <span className="font-semibold text-gray-500 text-lg">
            Synapsis Test
          </span>
        </a>
      </div>
      <div className="flex items-center gap-2">
        <p>Hi! , {dataUser.name}</p>
        <div className="hidden md:flex items-center justify-center border border-gray-500  rounded-full p-1">
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
