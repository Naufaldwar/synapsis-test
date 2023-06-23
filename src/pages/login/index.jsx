import { FormReg } from "@/components/FormReg";
import { FormUser } from "@/components/FormUser";
import Layout from "@/layouts";
import axios from "axios";
import { useRouter } from "next/router";
import { setLocalStorage } from "../localStorage";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState(true);

  const handleReg = (e) => {
    postRegist(e.data);
  };
  const handleLogin = async (e) => {
    try {
      const res = await axios.get(
        `${process.env.BASE_URL}/users/${e.idUser}`,

        {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
          },
        }
      );
      console.log(res.data);
      localStorage.setItem("id", res.data.id);
      setLocalStorage("id", res.data.id);
      router.push("/");
    } catch (error) {
      console.log("id gada");
    }
  };
  const postRegist = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/users`,
        {
          name: data.name,
          email: data.email,
          gender: data.gender,
          status: data.status,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
          },
        }
      );
      localStorage.setItem("id", res.data.id);
      setLocalStorage("id", res.data.id);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="w-[70%]">
        {login === false ? (
          <>
            <h1>Register</h1>
            <FormReg onFormSubmit={handleReg} />
            <p
              onClick={() => setLogin(!login)}
              className="hover:text-slate-400 hover:cursor-pointer underline"
            >
              Have Account?
            </p>
          </>
        ) : (
          <>
            <h1>Login</h1>
            <FormUser onFormSubmit={handleLogin} />
            <p
              onClick={() => setLogin(!login)}
              className="hover:text-slate-400 hover:cursor-pointer underline"
            >
              Create Account?
            </p>
          </>
        )}
      </div>
    </Layout>
  );
}
