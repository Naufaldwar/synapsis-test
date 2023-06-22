import Link from "next/link";

export const SideBar = () => {
  return (
    <div className="flex flex-col w-80 gap-4 h-full bg-white py-4 px-4">
      <Link href="/">
        <button className="border py-2 rounded-full w-full">Home</button>
      </Link>
      <Link href="/user">
        <button className="border py-2 rounded-full w-full">User</button>
      </Link>
    </div>
  );
};
