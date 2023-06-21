import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const Props = {
  dataUser: Object,
};
export default function Layout({ children, dataUser }) {
  return (
    <>
      <Navbar dataUser={dataUser} />
      <div className="flex">
        <div className=" w-1/3">
          <Link href="/">Home</Link>
          <Link href="/user">user</Link>
        </div>
        <div className="w-2/3">{children}</div>
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
