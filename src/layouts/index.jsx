import { Navbar } from "@/components/Navbar";
import { Search } from "@/components/Search";

const Props = {
  dataUser: Object,
  searchTerm: String,
  setSearchTerm: String,
  searchResults: String,
};
export default function Layout({
  children,
  dataUser,
  searchTerm,
  setSearchTerm,
  searchResults,
}) {
  return (
    <>
      <Navbar dataUser={dataUser} />
      <div className="grid grid-cols-11 mt-4 grid-flow-row-dense ">
        <div className="col-span-3 px-4">
          {/* {openLogin === true ? (
              <>
                <p>Masuk</p>
                <FormUser onFormSubmit={handleUser} />
                <p>
                  Belum Punya Akun?{" "}
                  <span
                    onClick={handleOpenLogin}
                    className="hover:cursor-pointer hover:text-slate-500"
                  >
                    Daftar
                  </span>
                </p>
              </>
            ) : (
              <>
                <p>Daftar</p>
                <FormReg />
                <p>
                  Sudah Punya Akun?{" "}
                  <span
                    onClick={handleOpenLogin}
                    className="hover:cursor-pointer hover:text-slate-500"
                  >
                    Masuk
                  </span>
                </p>
              </>
            )} */}
        </div>
        <div className="col-span-5">{children}</div>
        <div className="col-span-3">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchResults={searchResults}
          />
        </div>
      </div>
    </>
  );
}
