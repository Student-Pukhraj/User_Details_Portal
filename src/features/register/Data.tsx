import { useAppSelector } from "../../app/hooks";
import { fetchData } from "./dataslice";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";

const Data = () => {
  const dispatch = useAppDispatch();

  const getdata = useAppSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="flex w-full flex-wrap justify-around mt-4 relative">
      {getdata.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ul className="bg-gray-300  pt-6 p-14 m-2 h-[890px] rounded-xl">
          <div className=" text-lg p-2 m-2 rounded-xl   w-max items-center relative left-26  justify-center">
            Github Profile
          </div>
          <li>
            <img
              src={getdata.items.avatar_url}
              alt="github image"
              width={335}
              className="rounded-2xl left-3  relative items-center border justify-center"
            />
          </li>
          <li className=" text-lg p-2 m-2 rounded-xl border  w-max">
            Name : {getdata.items.name}
          </li>
          <li className=" text-lg p-2 m-2  rounded-xl border  w-max">
            username : {getdata.items.login}
          </li>
          <li className=" text-lg p-2 m-2  rounded-xl border  w-96 ">
            bio : {getdata.items.bio}
          </li>
          <li className=" text-lg p-2 m-2  rounded-xl border  w-max">
            Email : {getdata.items.email}
          </li>
          <li className=" text-lg p-2 m-2  rounded-xl border  w-max">
            Location : {getdata.items.location}
          </li>
          <li className=" text-lg p-2 m-2  rounded-xl border  w-max">
            Public repos : {getdata.items.public_repos}
          </li>
          <li className=" text-lg p-2 m-2  rounded-xl border  w-max">
            Github :
            <a target="_blank" href={getdata.items.html_url}>
              {" "}
              {getdata.items.html_url}
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Data;
