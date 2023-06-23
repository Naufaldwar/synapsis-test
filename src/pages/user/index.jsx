import Layout from "@/layouts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getLocalStorage, setLocalStorage } from "../localStorage";

export default function User() {
  let id = null;
  if (typeof localStorage !== "undefined") {
    id = localStorage.getItem("id");
  }
  const router = useRouter();
  const gender = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];
  const [user, setUsers] = useState({});
  const [opened, setOpened] = useState(false);
  const [genderOption, setGenderOption] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const token = process.env.TOKEN;
  const handleChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleCheckEmail = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
  };
  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    handleCheckEmail(e);
  };

  const handleChangeGander = (e) => {
    setGenderOption(e.target.value);
  };
  const handleConfirm = () => {
    setOpened(!opened);
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `https://gorest.co.in/public/v2/users/${id}`,
        {
          name: name,
          email: email,
          gender: genderOption,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data;
      setUsers((user) => ({ ...user, ...data }));
      setOpened(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${process.env.BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;
      setUsers((user) => ({ ...user, ...data }));
      setOpened(false);
      localStorage.removeItem("id");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("id");
    router.push("/login");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${process.env.BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.data;
        setUsers(data);
        setEmail(data.email);
        setName(data.name);
        setGenderOption(data.gender);
      } catch (error) {
        console.log(error);
      }
    };
    if (id == null) {
      router.push("/login");
    } else {
      getData();
    }
  }, [id]);

  return (
    <Layout dataUser={user}>
      <div className="flex flex-col lg:w-[70%]">
        <p className="text-xl">User Settings</p>
        <hr className="my-3" />
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm">Name</p>
            <input
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => handleChangeName(e)}
              type="text"
              placeholder="name"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <p className="text-sm">Email</p>
            <input
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => handleChangeEmail(e)}
              type="text"
              placeholder="email"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
            {!isValid && (
              <span className="text-red-300 text-xs">Email invalid</span>
            )}
          </div>
          <div>
            <p className="text-sm">Gender</p>
            <div className="flex items-center gap-4">
              {gender.map((item) => (
                <div key={item.value} className="flex items-center gap-1">
                  <input
                    autoComplete="off"
                    name={item.value}
                    type="radio"
                    value={genderOption}
                    checked={genderOption === item.value}
                    onChange={() => setGenderOption(item.value)}
                    className="border border-gray-500 rounded-lg p-2 w-full"
                  />
                  <p className="text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            disabled={
              (name === user?.name &&
                email === user?.email &&
                genderOption === user?.gender) ||
              name === "" ||
              email === "" ||
              !isValid
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end disabled:cursor-default disabled:bg-blue-300 disabled:hover:bg-blue-300 disabled:hover:cursor-default"
          >
            Save
          </button>
        </div>
        {opened && (
          <div className="bg-black bg-opacity-70 fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8">
              <p>Continue change profile?</p>
              <div className="flex justify-evenly items-center">
                <button
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleConfirm}
                >
                  Close
                </button>
                <button
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <p
            onClick={handleLogOut}
            className="text-red-400 hover:text-red-600 hover:cursor-pointer text-sm underline "
          >
            LogOut
          </p>
          <p
            className="text-red-400 hover:text-red-600 hover:cursor-pointer text-sm underline"
            onClick={handleDelete}
          >
            Delete account
          </p>
        </div>
      </div>
    </Layout>
  );
}
