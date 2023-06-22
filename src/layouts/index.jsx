import { Navbar } from "@/components/Navbar";
import { SideBar } from "@/components/SideBar";

export default function Layout({ children, dataUser }) {
  return (
    <>
      <Navbar dataUser={dataUser} />
      <div className="flex gap-4 mt-4">
        <div className=" w-[30%]">
          <SideBar />
        </div>
        <div className="w-[70%]">{children}</div>
      </div>
    </>
  );
}
