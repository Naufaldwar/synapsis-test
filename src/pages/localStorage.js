// localStorage.js
export const setLocalStorage = (id, value) => {
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    try {
      window.localStorage.setItem(id, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }
};

export const getLocalStorage = () => {
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    const data = window.localStorage.getItem("data");
    if (data) {
      return JSON.parse(data);
    }
  }
  return null;
};
