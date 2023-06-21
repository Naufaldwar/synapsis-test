import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const Props = {
  dataUser: Object,
};
export default function Layout({ children, dataUser }) {
  return (
    <>
      <Navbar dataUser={dataUser} />
      <div className="grid grid-cols-11">
        <div className=" col-span-3">
          <Link href="/">Home</Link>
          <Link href="/user">user</Link>
        </div>
        {children}
        {/* <div className="col-span-8">{children}</div> */}
      </div>
      <div className="grid grid-cols-2">
        <p>1</p>
        <p>2</p>
      </div>
    </>
  );
}

export async function getServerSideProps({}) {
  const res = await axios.get(`${process.env.BASE_URL}/users/3032041`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  const data = await res.data;
  return {
    props: {
      datauser: data,
    },
  };
}
