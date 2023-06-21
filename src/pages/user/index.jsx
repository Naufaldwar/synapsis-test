import Layout from "@/layouts";
import { useState } from "react";
import axios from "axios";

export default function user({ datauser }) {
  const [user, setUsers] = useState(datauser);

  return <Layout dataUser={user}>asda</Layout>;
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
