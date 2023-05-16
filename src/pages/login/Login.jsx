import { Form, Formik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../utils/actions";
import { checkTokenValidity, loginUser } from "../../apiCalls/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { messageToast } from "../../utils/toast";
import { Persist } from "formik-persist";
// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string().required("Password is a required field"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_SERVER_BASE_URL);
  useEffect(() => {
    const checkAuthentication = async () => {
      const response = await checkTokenValidity();
      if (response.isValid) {
        dispatch({
          type: LOGIN,
          payload: {
            isAuthenticated: true,
            authenticatedUser: response.user,
          },
        });
        navigate("/");
      }
    };
    checkAuthentication();
  }, []);
  const submitForm = async ({ email, password }) => {
    try {
      const response = await loginUser({ email, password });
      const { status, data } = await response;
      const { message, user, success, token } = await data;
      if (status == 200 && success) {
        dispatch({
          type: LOGIN,
          payload: {
            isAuthenticated: true,
            authenticatedUser: user,
          },
        });
        localStorage.setItem("auth-token", token);
        messageToast("success", "Successfully Signed in!!");
        navigate("/");
      } else {
        messageToast("error", message || "Cannot SignIn User");
      }
    } catch (err) {}
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={submitForm}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <div className="login">
            <div className="form">
              <Form>
                <span>Login</span>
                <div className="flex flex-col gap-6">
                  <div>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter email id / username"
                      className="form-control inp_text"
                      id="email"
                    />
                    <p className="error">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      className="form-control"
                    />
                    <p className="error">
                      {(errors.password &&
                        touched.password &&
                        errors.password) ||
                        (isSubmitting && errors.password)}
                    </p>
                  </div>
                  <button type="submit">Login</button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
