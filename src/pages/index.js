import { Card } from "@/components/Card";
import { Form } from "@/components/Form";
import { Navbar } from "@/components/Navbar";
import { Search } from "@/components/Search";
import axios from "axios";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.BASE_URL}/users/3032940`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  const data = await res.data;
  const respost = await axios.get(`${process.env.BASE_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  const datapost = await respost.data;
  return {
    props: {
      user: data,
      post: datapost,
    },
  };
}

export default function Home({ user, post }) {
  console.log(post);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token =
    "c5b8cefca69edb498783452cb93311a2b98e2db4c699975b7c28e3d1626d8c6b";
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/users?name=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    console.log(e.post);
    console.log(e.title);
  };
  return (
    <>
      <Navbar dataUser={user} />
      <main>
        <div className="grid grid-cols-11 mt-4 grid-flow-row-dense ">
          <div className="col-span-3">
            <p>Ganti akun</p>
          </div>
          <div className="col-span-5">
            <div className=" grid gap-4">
              <Form onFormSubmit={handleSubmit} />
              {post.map((item) => {
                return <Card key={item.id} dataPost={item} />;
              })}
            </div>
          </div>
          <div className="col-span-3">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
            />
          </div>
        </div>
      </main>
    </>
  );
}
