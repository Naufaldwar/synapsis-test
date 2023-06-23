import { Navbar } from "@/components/Navbar";
import { SideBar } from "@/components/SideBar";

export default function Layout({ children, dataUser }) {
  return (
    <>
      <Navbar dataUser={dataUser} />
      <div className="flex gap-4 mt-4 static h-screen justify-between">
        <SideBar />
        <div className="w-full lg:w-[70%] px-4">{children}</div>
      </div>
    </>
  );
}
