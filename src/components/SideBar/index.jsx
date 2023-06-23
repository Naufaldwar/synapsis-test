import Link from "next/link";

export const SideBar = () => {
  return (
    <div className="hidden lg:flex absolute md:static bottom-0 bg-white flex-col w-full lg:w-[30%] gap-4 h-full py-4  px-4">
      <Link href="/">
        <button className="border py-2 rounded-full w-full">Home</button>
      </Link>
      <Link href="/user">
        <button className="border py-2 rounded-full w-full">User</button>
      </Link>
    </div>
  );
};
