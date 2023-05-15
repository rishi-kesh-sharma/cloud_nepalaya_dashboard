import { Formik, Form } from "formik";
import React, { useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../utils/actions";
import {
  createDocument,
  updateDocument,
  updateMe,
} from "../../apiCalls/general";
import { confirmToast, messageToast } from "../../utils/toast";
import { checkTokenValidity } from "../../apiCalls/auth";
import { useNavigate } from "react-router-dom";
import Dropzone from "../commons/Dropzone";

export default function ({ setOpenModal, mode, setMode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const [image, setImage] = useState({});

  const { username, email, role, address, contact, _id } =
    auth?.authenticatedUser;
  let initialValues = {
    username: username,
    email: email,
    role: role,
    address: address,
    contact: contact,
  };
  if (image && Object?.keys(image).length == 0 && !(image instanceof File)) {
    setImage(auth?.authenticatedUser?.image);
  }

  const schema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    address: Yup.string(),
    contact: Yup.number(),
  });

  const toggleMode = (e) => {
    setMode(`${mode == "view" ? "update" : "view"}`);
  };

  const handleChangePasswordClick = () => {
    setOpenModal(true);
  };

  const submitForm = async (values, { resetForm }) => {
    console.log(values);
    let formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    if (image && !image?.filePath && image !== "undefined") {
      formData.append("image", image);
    }
    const result = await confirmToast(
      null,
      `You are ${mode}ing  the document!`,
      null,
      `${mode} !`
    );
    if (result) {
      try {
        let response;
        if (mode == "update") {
          response = await updateMe("profile", formData);
        }
        if (response?.status != 200) {
          return messageToast(
            "error",
            response?.data?.message || `Cannot ${mode} !!!`
          );
        }
        messageToast("success", `You have successfully ${mode}d document !!!`);
      } catch (err) {
        messageToast(
          "error",
          err.response?.message || `Cannot ${mode} document !!!`
        );
      }
    }

    resetForm();
    try {
      const response = await checkTokenValidity();
      if (!response.isValid) {
        dispatch({
          type: LOGIN,
          payload: {
            isAuthenticated: false,
            authenticatedUser: {},
          },
        });
        navigate("/login");
      } else {
        dispatch({
          type: LOGIN,
          payload: {
            isAuthenticated: true,
            authenticatedUser: response?.user,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: LOGIN,
        payload: {
          isAuthenticated: false,
          authenticatedUser: {},
        },
      });
    }
  };
  return (
    <div className="">
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={submitForm}
        enableReinitialize>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
          <div className="update-user bg-white  px-[1rem] rounded-lg ">
            <div className=" form " style={{ maxWidth: "100%", padding: 0 }}>
              <div className="flex  items-center mb-[1rem]">
                <p className="text-blue-500  text-2xl ">Profile</p>
                <button
                  onClick={toggleMode}
                  className="bg-blue-500 px-[1rem] text-gray-100 p-[0.5rem] rounded-md flex items-center gap-[0.4rem] ml-auto mr-[2rem]">
                  {mode == "view" ? "  Edit" : "View Only"}
                </button>
              </div>
              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}>
                <div className="">
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="username">
                    Name
                  </label>
                  <input
                    disabled={mode == "view" ? true : false}
                    type="text"
                    max={5}
                    min={0}
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Enter name"
                    style={{ padding: "10px" }}
                    className="w-full outline-none rounded-lg border border-gray-400 text-gray-500 "
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {(errors.username && touched.username && errors.username) ||
                      (isSubmitting && errors.username)}
                  </p>
                </div>
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="email">
                    Email
                  </label>
                  <input
                    disabled={mode == "view" ? true : false}
                    type="email"
                    max={5}
                    min={0}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter email"
                    style={{ padding: "10px" }}
                    className="w-full outline-none rounded-lg border border-gray-400 text-gray-500 "
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {(errors.email && touched.email && errors.email) ||
                      (isSubmitting && errors.email)}
                  </p>
                </div>
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="address">
                    Address
                  </label>
                  <input
                    disabled={mode == "view" ? true : false}
                    type="text"
                    max={5}
                    min={0}
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    placeholder="Enter address"
                    style={{ padding: "10px" }}
                    className="w-full outline-none rounded-lg border border-gray-400 text-gray-500 "
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {(errors.address && touched.address && errors.address) ||
                      (isSubmitting && errors.address)}
                  </p>
                </div>
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="contact">
                    Contact
                  </label>
                  <input
                    disabled={mode == "view" ? true : false}
                    type="number"
                    maxLength={10}
                    min={0}
                    name="contact"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contact}
                    placeholder="Enter Contact No"
                    style={{ padding: "10px" }}
                    className="w-full outline-none rounded-lg border border-gray-400 text-gray-500 "
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {(errors.contact && touched.contact && errors.contact) ||
                      (isSubmitting && errors.contact)}
                  </p>
                </div>
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="role">
                    Role
                  </label>
                  <select
                    disabled
                    max={5}
                    min={0}
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                    placeholder="Enter Role "
                    style={{ padding: "10px" }}
                    className="w-full cursor-pointer outline-none rounded-lg border border-gray-400 text-gray-500 ">
                    {["superadmin", "admin", "guest"].map((item, index) => {
                      return (
                        <option
                          className="cursor-pointer"
                          key={index + 1}
                          value={item}
                          name="role">
                          {item}
                        </option>
                      );
                    })}
                  </select>
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {(errors.role && touched.role && errors.role) ||
                      (isSubmitting && errors.role)}
                  </p>
                </div>
                {mode !== "view" && (
                  <div>
                    <label
                      className="text-gray-400 mb-[0.7rem] block"
                      htmlFor="text">
                      Image
                    </label>

                    <Dropzone
                      // height={0}
                      width={450}
                      name="image"
                      setFieldValue={setFieldValue}
                      setImage={setImage}
                      image={image}
                      values={values}
                    />
                  </div>
                )}

                <div className="  w-full flex items-center mt-[2rem]">
                  <div className=" ">
                    {mode != "view" && (
                      <button
                        type="submit"
                        className="bg-[#316EFF] w-[100px]  text-gray-100 text-center py-2 text-lg rounded-md">
                        Save
                      </button>
                    )}
                  </div>
                  <div className="   ml-auto pr-[2rem]">
                    {mode !== "view" && (
                      <div
                        onClick={handleChangePasswordClick}
                        className="cursor-pointer bg-[#316EFF]  px-[1rem]  text-gray-100 text-center py-2 text-lg rounded-md">
                        Change Password
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
