import { Card } from "@/components/Card";
import { Form } from "@/components/Form";
import { Search } from "@/components/Search";
import Layout from "@/layouts";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home({ datapost, datacomments }) {
  let id = null;
  if (typeof localStorage !== "undefined") {
    id = localStorage.getItem("id");
  }
  const [comments, setComments] = useState(datacomments);
  const [page, setPage] = useState(2);
  const [user, setUsers] = useState();
  const [posts, setPosts] = useState(datapost);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = process.env.TOKEN;

  const postData = async (title, post) => {
    try {
      const response = await axios.post(
        `https://gorest.co.in/public/v2/users/${id}/posts`,
        {
          user_id: user.id,
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

  const postDataComment = async (id, comment, name, email) => {
    try {
      const response = await axios.post(
        `https://gorest.co.in/public/v2/posts/${id}/comments`,
        {
          post_id: id,
          name: name,
          email: email,
          body: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((comments) => [response.data, ...comments]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await axios.get(`https://gorest.co.in/public/v2/posts`, {
        params: {
          page: page,
          per_page: 10,
        },
      });
      const { data } = response;
      setPage(page + 1);
      setPosts((posts) => [...posts, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/comments`,
        {
          params: {
            page: page,
            per_page: 10,
          },
        }
      );
      const { data } = response;
      setComments((comments) => [...comments, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    postData(e.title, e.post);
  };

  const handleComment = (e) => {
    postDataComment(e.id, e.comment, user.name, user.email);
  };

  const handleSucces = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const handleMore = () => {
    fetchComments();
    fetchPost();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://gorest.co.in/public/v2/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      getData();
    } else {
      console.log("id kosong");
    }
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASE_URL}/users?name=${searchTerm}`,
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
    const delayDebounceFn = setTimeout(() => {
      getData();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <>
      <Layout
        dataUser={user}
        searchResults={searchResults}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      >
        <div className="flex justify-between gap-4">
          <div className="w-full lg:w-[65%]">
            <div className=" grid gap-4">
              {id && <Form onFormSubmit={handleSubmit} />}
              {success === true ? <p>Berhasil Menambahkan...</p> : null}
              {posts.map((item) => {
                return (
                  <Card
                    key={item.id}
                    onFormSubmit={handleComment}
                    dataPost={item}
                    dataComments={comments}
                    dataUser={user}
                  />
                );
              })}
              <p
                onClick={() => handleMore()}
                className="hover:cursor-pointer hover:underline"
              >
                Tampilkan Item Lainnya..
              </p>
            </div>
          </div>
          <div className="w-[35%] hidden lg:block">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const respost = await axios.get(`${process.env.BASE_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  const datapost = await respost.data;
  const rescomments = await axios.get(`${process.env.BASE_URL}/comments`, {
    params: {
      page: 1,
      per_page: 10,
    },

    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  const datacomments = await rescomments.data;
  return {
    props: {
      datapost: datapost,
      datacomments: datacomments,
    },
  };
}
