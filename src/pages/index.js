import { Card } from "@/components/Card";
import { Form } from "@/components/Form";
import { Search } from "@/components/Search";
import Layout from "@/layouts";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home({ datauser, datapost }) {
  const [user, setUsers] = useState(datauser);
  const [posts, setPosts] = useState(datapost);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token =
    "c5b8cefca69edb498783452cb93311a2b98e2db4c699975b7c28e3d1626d8c6b";
  const getData = async () => {
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

  const postData = async (title, post) => {
    try {
      const response = await axios.post(
        `https://gorest.co.in/public/v2/users/${userId}/posts`,
        {
          user_id: 3032041,
          title: title,
          body: post,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts((posts) => [response.data, ...posts]);
      handleSucces();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getData();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    console.log(e.post);
    console.log(e.title);
    postData(e.title, e.post);
  };
  const handleSucces = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <Layout
      dataUser={user}
      searchResults={searchResults}
      setSearchTerm={setSearchTerm}
      searchTerm={searchTerm}
    >
      <div className="col-span-5">
        <div className=" grid gap-4">
          <Form onFormSubmit={handleSubmit} />
          {success === true ? <p>Berhasil Menambahkan...</p> : null}
          {posts.map((item) => {
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
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.BASE_URL}/users/3032041`, {
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
      datauser: data,
      datapost: datapost,
    },
  };
}
