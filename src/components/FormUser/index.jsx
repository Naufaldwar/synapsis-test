import { useState } from "react";

export const FormUser = ({ onFormSubmit }) => {
  const [idUser, setIdUser] = useState("");
  const handleIdUser = (e) => {
    const idUser = e.target.value;
    setIdUser(idUser);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ idUser });
  };
  return (
    <form
      id="submituser"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4  p-4 "
    >
      <input
        id="idUser"
        type="text"
        value={idUser}
        onChange={handleIdUser}
        placeholder="Masukan ID User"
        className="border rounded-lg p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end"
      >
        Submit
      </button>
    </form>
  );
};
