"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { messageToast } from "../../utils/toast";
import { updateDocument, updateMe } from "../../apiCalls/general";
import { useSelector } from "react-redux";

const styles = {
  label: "block text-gray-600 text-sm  pt-2 pb-1 ",
  field:
    "bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-solid border-gray-400  rounded py-2 px-4 block w-full appearance-none w-[100%]",
  button:
    " bg-blue-600 w-[200px] text-white py-3 px-4 w-full rounded hover:bg-blue-600 font-light",
  errorMsg: "text-red-500 text-xs",
};
const ChangePasswordForm = ({ setOpenModal }) => {
  const auth = useSelector((state) => state?.auth);
  const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required(" Old Password is Required")
      .min(3, "Too Short!"),
    newPassword: Yup.string()
      .required("Password is Required")
      .min(3, "Too Short!"),
    confirmPassword: Yup.string()
      .required("Confirm Password is Required")
      .min(3, "Too Short!"),
  });
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    try {
      const response = await updateMe("profile/password", formData);
      setSubmitting(false);
      resetForm();
      setOpenModal(false);
      messageToast("success", "Password Updated successfully");
    } catch (err) {
      console.log(err.response.data);
      setSubmitting(false);
      resetForm();

      messageToast("error", `Cannot Change  password`);
    }
  };
  return (
    <div className="min-h-[60vh]">
      <h1 className="text-center text-lg text-blue-600">Change Password</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={changePasswordSchema}>
        {({ isSubmitting }) => {
          return (
            <Form
              className="flex flex-col gap-[rem] "
              encType="multipart/form-data">
              <div>
                <label className={styles.label} htmlFor="oldPassword">
                  Old Password
                </label>
                <Field
                  className={styles.field}
                  id="oldPassword"
                  name="oldPassword"
                />
                <ErrorMessage
                  component="a"
                  className={styles.errorMsg}
                  name="oldPassword"
                />
              </div>
              <div>
                <label className={styles.label} htmlFor="newPassword">
                  New Password
                </label>
                <Field
                  className={styles.field}
                  id="newPassword"
                  name="newPassword"
                />
                <ErrorMessage
                  component="a"
                  className={styles.errorMsg}
                  name="newPassword"
                />
              </div>
              <div>
                <label className={styles.label} htmlFor="confirmPassword">
                  Confirm password
                </label>
                <Field
                  className={styles.field}
                  id="confirmPassword"
                  name="confirmPassword"
                />
                <ErrorMessage
                  component="a"
                  className={styles.errorMsg}
                  name="confirmPassword"
                />
              </div>
              <div class="mt-8 flex justify-end">
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status">
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  </div>
                ) : (
                  <Field
                    type="submit"
                    className={`${styles.button} cursor-pointer`}
                    value="submit"
                  />
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
