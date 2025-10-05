// import { useFormik } from "formik";
import { Formik } from "formik";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import { v4 as uuidv4 } from 'uuid';

type initialState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl: string;
};

const SignupSchema = Yup.object().shape({
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

  return (
    <Formik
      initialValues={
        {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          imageUrl: "",
        } as initialState
      }
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // const submissionId = uuidv4();

        let formData = [];

        formData.push(values);
        localStorage.setItem("userData", JSON.stringify(formData));

        const localData = localStorage.getItem("userData");
        const getData = localData ? JSON.parse(localData) : [];

        console.log(getData, "console getdata");

        const newItem = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          imageUrl: values.imageUrl,
        };

        console.log(newItem, "newItem");

        navigate("/user-data");
      }}
    >
      {(formik) => (
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
      )}
    </Formik>
  );
};

export default SignUpForm;
