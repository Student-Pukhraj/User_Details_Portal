import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

type initialState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl: string;
  id: number;
};

const SignUpSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "must be enter 2 characters atleast")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "must be enter 2 characters atleast")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters")
    .required("Required"),
  imageUrl: Yup.string().required("Required"),
});

const SignUpForm = () => {
  const navigate = useNavigate();

  const localData = localStorage.getItem("userData");

  const getData = localData ? JSON.parse(localData) : [];

  const [data, setData] = useState(getData);

  console.log(data, "data inside signup");

  // console.log(item.firstName),

  const { id } = useParams();

  // const newData = data.map((item: any) => item.id)

  // console.log(data.id, "data inside signup");

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(data));

    let updatedData = data.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          password: item.password,
          imageUrl: item.imageUrl,
        };
      }
      return item;
    });

    setData(updatedData);
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      imageUrl: "",
      id: 1,
    } as initialState,
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      const localData = localStorage.getItem("userData");

      const getdata = localData ? JSON.parse(localData) : [];

      const newId = getdata.length > 0 ? getdata.length + 1 : 1;

      const newUser = {
        ...values,
        id: newId,
      };

      getdata.push(newUser);

      localStorage.setItem("userData", JSON.stringify(getdata));

      navigate(`/user-data`, { state: getdata });
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex items-center justify-center relative"
      >
        <div className="bg-gray-200 flex w-fit flex-col mt-10 items-center relative justify-center p-10 rounded-xl text-xl">
          <label className=" w-fit self-start m-2">FirstName</label>
          <input
            type="text"
            name="firstName"
            placeholder="enter your firstname"
            className="border border-b-amber-200 p-2 rounded-xl m-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.errors.firstName && formik.touched.firstName ? (
            <div className="text-red-500">{formik.errors.firstName}</div>
          ) : null}

          <label className=" w-fit self-start m-2">LastName</label>
          <input
            type="text"
            name="lastName"
            placeholder="enter your lastName"
            className="border border-b-amber-200 p-2 rounded-xl m-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.errors.lastName && formik.touched.lastName ? (
            <div className="text-red-500">{formik.errors.lastName}</div>
          ) : null}

          <label className=" w-fit self-start m-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            className="border border-b-amber-200 p-2 rounded-xl m-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}

          <label className=" w-fit self-start m-2">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            placeholder="enter your password"
            className="border border-b-amber-200 p-2 rounded-xl m-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}

          <label className=" w-fit self-start m-2">ImageUrl</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="enter your imageurl"
            className="border border-b-amber-200 p-2 rounded-xl m-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imageUrl}
          />
          {formik.errors.imageUrl && formik.touched.imageUrl ? (
            <div className="text-red-500">{formik.errors.imageUrl}</div>
          ) : null}

          <button
            type="submit"
            className="bg-green-500 cursor-pointer w-fit self-end p-2  rounded-xl m-2"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
