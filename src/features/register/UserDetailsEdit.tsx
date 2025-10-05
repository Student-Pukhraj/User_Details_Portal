import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserDetailsEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const localData = localStorage.getItem("userData");

  const getData = localData ? JSON.parse(localData) : [];

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (!id && !getData) {
      return;
    }

    const getUserData = getData
      .filter(
        (item: {
          imageUrl: string;
          firstName: string;
          lastName: string;
          email: string;
          password: string;
          id: string;
        }) => item.id === String(id)
      )
      .map((item: string) => item);

    if (getUserData) {
      setUserData(getUserData);
    }

    console.log("laksjdlasd", { getUserData, id });
  }, [id]);

  const handleHome = () => {
    console.log("button clicked home");
    navigate("/");
  };

  const handleUserData = () => {
    console.log("button clicked data");
    navigate("/user-data");
  };

  const handleEdit = (item: { id: string }) => {
    navigate(`/${item.id}`, { state: getData });
  };

  const renderDetails = (item: {
    imageUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    id: string;
  }) => {
    return (
      <ul key={id} className="bg-gray-300 pt-6 p-16 mt-6 h-[750px] rounded-xl">
        <img
          src={item.imageUrl}
          alt="image"
          width={250}
          className="rounded-xl items-center justify-center"
        />
        <li className=" text-lg p-2 m-2 mt-4 rounded-xl border w-full">
          {item.firstName}
        </li>
        <li className=" text-lg p-2 m-2 mt-4 rounded-xl border w-full">
          {item.lastName}
        </li>
        <li className=" text-lg p-2 m-2 mt-4 rounded-xl border w-full">
          {item.email}
        </li>
        <li className=" text-lg p-2 m-2 mt-4 rounded-xl border w-full">
          {item.password}
        </li>
        <button
          onClick={() => handleEdit(item)}
          className="w-fit text-lg cursor-pointer bg-red-200 p-2 rounded-xl top-4 left-18 relative items-center justify-center"
        >
          Edit Details
        </button>
      </ul>
    );
  };

  return (
    <>
      <div className="bg-red-400 mt-4 z-10">
        <button
          onClick={() => handleHome()}
          className="bg-red-200 cursor-pointer text-xl left-20 absolute p-2 rounded-xl m-2 self-start w-fit flex"
        >
          Back to User-form
        </button>
        <button
          onClick={() => handleUserData()}
          className="bg-red-200 cursor-pointer text-xl right-20 absolute p-2 rounded-xl m-2 self-start w-fit flex"
        >
          Go to User-Data
        </button>
      </div>
      <div className="w-full top-20 flex  flex-col items-center  justify-center relative">
        <h1 className=" w-fit -mt-6 text-2xl items-center justify-center">
          User Details Edit
        </h1>

        {userData.map(
          (item: {
            imageUrl: string;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            id: string;
          }) => renderDetails(item)
        )}
      </div>
    </>
  );
};

export default UserDetailsEdit;
