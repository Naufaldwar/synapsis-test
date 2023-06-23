import { useState } from "react";

export const FormReg = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cekGender, setCekGender] = useState("");
  const [isValid, setIsValid] = useState(true);

  const gender = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  const handleName = (e) => {
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

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    handleCheckEmail(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      gender: cekGender,
      status: "active",
    };
    onFormSubmit({ data });
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4  p-4 ">
        <label htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          autoComplete="off"
          id="name"
          value={name}
          onChange={handleName}
          name="name"
          type="text"
          placeholder="Masukan Nama"
          className="border rounded-lg p-2 w-full"
        />
        <label htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          autoComplete="off"
          onChange={handleEmail}
          value={email}
          id="email"
          name="email"
          type="text"
          placeholder="Masukan Email"
          className="border rounded-lg p-2 w-full"
        />
        {!isValid && <p className="text-red-500 text-sm">Email invalid</p>}

        <label htmlFor="gender">
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          {gender.map((item, index) => {
            return (
              <div key={index} className="flex gap-2 items-center">
                <input
                  autoComplete="off"
                  id={item.value}
                  name={item.value}
                  type="radio"
                  value={cekGender}
                  checked={cekGender === item.value}
                  onChange={() => setCekGender(item.value)}
                  className="border rounded-lg p-2 w-full"
                />
                <label htmlFor={item.value}>{item.label}</label>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={name === "" || email === "" || cekGender === "" || !isValid}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end disabled:cursor-default disabled:bg-blue-300 disabled:hover:bg-blue-300 disabled:hover:cursor-default"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
