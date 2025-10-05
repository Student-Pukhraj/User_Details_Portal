import { useFormik } from "formik";
import * as Yup from "yup";

type initialState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageUrl: string;
};

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      imageUrl: "",
    } as initialState,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(3, "Password must be 3 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex items-center justify-center relative"
      >
        <div className="bg-gray-200 flex w-fit flex-col mt-10 items-center relative justify-center p-10 rounded-xl text-xl">
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
            type="text"
            name="password"
            placeholder="enter your password"
            className="border border-b-amber-200 p-2 rounded-xl m-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}

          <button className="bg-green-500 w-fit self-end p-2  rounded-xl m-2">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
