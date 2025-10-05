import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleDeleteValue,
  itemPerPages,
  nextPage,
  setSearchTerm,
} from "./slice";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";

const UserData = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem("userData");
  const getUserdata = data ? JSON.parse(data) : [];
  const [newData, setNewData] = useState(getUserdata);
  const [currentPage, setCurrentPage] = useState(1);

  const handleHome = () => {
    navigate("/");
  };

  const handleView = (id: string) => {
    console.log("id", id);
    navigate(`/user-details-edit/${id}`, { state: getUserdata });
  };

  const dispatch = useDispatch();
  const searchTerm = useAppSelector(
    (state: { register: { searchTerm: string } }) => state.register.searchTerm
  );

  const handleDelete = (id: string) => {
    dispatch(handleDeleteValue(id));
    const updatededData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") || " []")
      : [];
    setNewData(updatededData);
  };

  const handleSearch = (e: { target: { value: string } }) => {
    const newUser = getUserdata.filter((item: { firstName: string }) =>
      item.firstName.toLowerCase().includes(e.target.value)
    );
    console.log("value", e.target.value, getUserdata, newUser);
    setNewData(newUser);
    console.log("newUser", newUser, e.target.value);
    dispatch(setSearchTerm(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    let newPage = pageNumber;

    if (pageNumber < 1) {
      newPage = totalPages;
    } else if (pageNumber > totalPages) {
      newPage = 1;
    }

    setCurrentPage(newPage);
    console.log("newPage", newPage);
    dispatch(nextPage(newPage));
    dispatch(itemPerPages(4));
  };

  let itemPerPage = 4;

  const totalPages = Math.ceil(newData.length / itemPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const end = currentPage * itemPerPage;
  const start = end - itemPerPage;
  const currentItems = newData.slice(start, end);

  const render = (value: {
    imageUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    id: string;
  }) => {
    return (
      <ul
        key={value.id}
        className="bg-gray-300 pt-6 p-16 m-2 h-[750px] rounded-xl"
      >
        <img
          src={value.imageUrl}
          alt="image"
          width={250}
          className="rounded-xl items-center justify-center"
        />
        <li className=" text-lg p-2 m-2 mt-4 rounded-xl border w-full">
          {value.firstName}
        </li>
        <li className=" text-lg p-2 m-2 rounded-xl border w-full">
          {value.lastName}
        </li>
        <li className=" text-lg p-2 m-2 rounded-xl border w-full">
          {value.email}
        </li>
        <li className=" text-lg p-2 m-2 rounded-xl border w-full">
          {value.password}
        </li>

        <button
          onClick={() => handleView(value.id)}
          className="w-fit text-lg cursor-pointer bg-red-200 p-2 rounded-xl top-10 relative -left-[50px]"
        >
          View Details
        </button>
        <button
          onClick={() => handleDelete(value.id)}
          className="w-fit text-lg cursor-pointer bg-red-200 p-2 rounded-xl top-10 relative -right-[50px]"
        >
          Delete User
        </button>
      </ul>
    );
  };

  return (
    <>
      <div className=" w-full">
        <button
          onClick={() => handleHome()}
          className="bg-red-200 cursor-pointer border mt-12 ml-10 border-r rounded-xl w-max p-2 flex"
        >
          Back to User-form
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`cursor-pointer border absolute left-56 top-12 border-r rounded-xl w-max p-2 flex
    ${currentPage === 1 ? "bg-yellow-400" : ""}`}
        >
          Previous
        </button>

        <div className=" cursor-pointer  absolute left-96 top-12 flex-wrap  rounded-xl w-max flex">
          <ul className="flex flex-row">
            {pages.map((page: number) => {
              return (
                <li
                  onClick={() => handlePageChange(page)}
                  className={`p-2 border px-6 rounded-xl mx-4 cursor-pointer ${
                    currentPage === page ? "bg-yellow-400" : ""
                  }`}
                  key={page}
                >
                  {page}
                </li>
              );
            })}
            <input
              type="text"
              placeholder="Searching..."
              value={searchTerm}
              className="p-2 flex flex-wrap -right-[25vw] relative border rounded-xl"
              onChange={(e) => handleSearch(e)}
            />
          </ul>
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`cursor-pointer border absolute right-[10vw] top-12 border-r rounded-xl w-max p-2 flex
    ${currentPage === totalPages ? "bg-yellow-400" : ""}`}
        >
          Next
        </button>
      </div>

      <div className="  w-full flex flex-col mt-4 items-center justify-center relative">
        <h1 className=" text-2xl">Users Data</h1>

        <div className="flex w-full flex-wrap justify-around mt-4 relative">
          {currentItems && currentItems.length > 0 ? (
            currentItems.map(
              (item: {
                imageUrl: string;
                firstName: string;
                lastName: string;
                email: string;
                password: string;
                id: string;
              }) => render(item)
            )
          ) : (
            <p>No data found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserData;
