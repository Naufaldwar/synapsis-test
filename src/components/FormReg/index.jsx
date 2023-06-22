export const FormReg = ({ onFormSubmit }) => {
  return (
    <div className="flex flex-col gap-4 ">
      <form onSubmit={onFormSubmit} className="flex flex-col gap-4  p-4 ">
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Masukan Nama"
          className="border rounded-lg p-2 w-full"
        />
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Masukan Email"
          className="border rounded-lg p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
