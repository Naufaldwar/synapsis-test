import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const Props = {
  dataUser: Object,
};
export default function Layout({ children, dataUser }) {
  return (
    <>
      <Navbar dataUser={dataUser} />
      <div className="grid grid-cols-11 mt-4 ">
        <div className="col-span-3">
          <Link rel="stylesheet" href="/">
            home
          </Link>
          <Link rel="stylesheet" href="/user">
            user
          </Link>
        </div>
        {children}
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
