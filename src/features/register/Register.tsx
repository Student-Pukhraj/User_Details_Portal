import { Formik, Form } from "formik";
import { shallowEqual, useDispatch } from "react-redux";
import * as Yup from "yup";
import { handleSubmit, handleUpdateValues } from "./slice";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const schema = Yup.object().shape({
  firstName: Yup.string().min(2, "must be 2 characters").required("Required"),
  lastName: Yup.string().min(2, "must be 2 characters").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Password must be 2 values")
    .required("Required"),
  imageUrl: Yup.string()
    .min(2, "Please give the imageUrl")
    .required("Required"),
});

const Register = () => {
  const navigate = useNavigate();
  const localData = localStorage.getItem("userData");

  const getData = localData ? JSON.parse(localData) : [];

  const { id } = useParams();
  const { firstName, lastName, email, password, imageUrl } = useAppSelector(
    (state: {
      register: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        imageUrl: string;
      };
    }) => {
      let userData = {
        firstName: state.register.firstName,
        lastName: state.register.lastName,
        email: state.register.email,
        password: state.register.password,
        imageUrl: state.register.imageUrl,
      };
      return userData;
    },
    shallowEqual
  );

  console.log(
    { firstName, lastName, email, password, imageUrl },
    id,
    "dfdsfgsdf"
  );

  const dispatch = useDispatch();

  const generateValues = () => {
    console.log(getData, "getData values inside generate");
    localStorage.setItem("userData", JSON.stringify(getData));

    if (id) {
      let updatedData = getData.find(
        (item: {
          id: string;
          firstName: string;
          lastName: string;
          email: string;
          password: string;
          imageUrl: string;
        }) => {
          if (item.id === String(id)) {
            return {
              ...item,
              firstName: item.firstName,
              lastName: item.lastName,
              email: item.email,
              password: item.password,
              imageUrl: item.imageUrl,
            };
          }
        }
      );
      return { ...updatedData };
    } else {
      return {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        imageUrl: "",
      };
    }
  };

  return (
    <Formik
      initialValues={generateValues()}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log({ values }, "values");
        if (id) {
          console.log(values, "values if id available");
          dispatch(handleUpdateValues(values));
        } else {
          console.log(values, "value if id not available");
          dispatch(handleSubmit(values));
        }

        navigate("/user-data");
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        return (
          <Form>
            <div className="w-full h-screen  flex flex-col items-center justify-center">
              <h1 className="w-max text-3xl relative -top-14">Sign Up Form</h1>
              <div className="bg-gray-200 w-max p-6 px-10 rounded-xl items-center justify-center flex h-[650px]">
                <ul className="flex flex-col ">
                  <label className="w-max m-2">FirstName</label>
                  <input
                    name="firstName"
                    placeholder="enter firstName"
                    className="w-max p-4 border  rounded-xl"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.firstName &&
                  touched.firstName &&
                  typeof errors.firstName === "string" ? (
                    <div className="text-red-500 m-2">{errors?.firstName}</div>
                  ) : null}

                  <label className="w-max m-2">LastName</label>
                  <input
                    name="lastName"
                    placeholder="enter lastName"
                    className="w-max p-4 border  rounded-xl"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastName &&
                  touched.lastName &&
                  typeof errors.lastName === "string" ? (
                    <div className="text-red-500 m-2">{errors.lastName}</div>
                  ) : null}

                  <label className="w-max m-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="enter email"
                    className="w-max p-4 border  rounded-xl"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email &&
                  touched.email &&
                  typeof errors.email === "string" ? (
                    <div className="text-red-500 m-2">{errors.email}</div>
                  ) : null}

                  <label className="w-max m-2">Password</label>
                  <input
                    name="password"
                    type="password"
                    autoComplete="false"
                    placeholder="enter password"
                    className="w-max p-4 border  rounded-xl"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password &&
                  touched.password &&
                  typeof errors.password === "string" ? (
                    <div className="text-red-500 m-2">{errors.password}</div>
                  ) : null}

                  <label className="w-max m-2">imageUrl</label>
                  <input
                    name="imageUrl"
                    placeholder="enter imageUrl"
                    className="w-max p-4 border  rounded-xl"
                    value={values.imageUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.imageUrl &&
                  touched.imageUrl &&
                  typeof errors.imageUrl === "string" ? (
                    <div className="text-red-500 m-2">{errors.imageUrl}</div>
                  ) : null}

                  <button
                    className="p-4 bg-green-500 cursor-pointer rounded-xl self-center mt-6 w-max "
                    type="submit"
                  >
                    Submit
                  </button>
                </ul>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Register;
