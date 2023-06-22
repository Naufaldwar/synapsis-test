import Layout from "@/layouts";
import { useState } from "react";
import axios from "axios";

export default function User({ datauser }) {
  const [user, setUsers] = useState(datauser);
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
  const [opened, setOpened] = useState(false);
  const [genderOption, setGenderOption] = useState(datauser.gender);
  const [isValid, setIsValid] = useState(true);
  const [name, setName] = useState(datauser.name);
  const [email, setEmail] = useState(datauser.email);
  const token =
    "c5b8cefca69edb498783452cb93311a2b98e2db4c699975b7c28e3d1626d8c6b";
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

  const handleChangeGander = (gender) => {
    setGenderOption(gender);
  };
  const handleConfirm = () => {
    setOpened(!opened);
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `https://gorest.co.in/public/v2/users/3032041`,
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
              onChange={handleChangeName}
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
              onChange={handleChangeEmail}
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
                    // id={item.value}
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
              (name === user.name &&
                email === user.email &&
                genderOption === user.gender) ||
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
      </div>
    </Layout>
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
