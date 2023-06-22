import { Navbar } from "@/components/Navbar";
import { SideBar } from "@/components/SideBar";

export default function Layout({ children, dataUser }) {
  return (
    <>
      <Navbar dataUser={dataUser} />
      <div className="flex flex-col md:flex-row gap-4 mt-4 static h-screen justify-between md:justify-center ">
        <div className="h-full w-[30%]">
          <SideBar />
        </div>
        <div className="w-full md:w-[70%] px-4">{children}</div>
        <div className="h-full w-[30%] sticky block md:hidden bottom-0 ">
          <SideBar />
        </div>
      </div>
    </>
  );
}
