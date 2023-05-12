import { Formik, Form } from "formik";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SET_USERS } from "../../utils/actions";
import {
  createDocument,
  getDocuments,
  updateDocument,
} from "../../apiCalls/general";
import { confirmToast, messageToast } from "../../utils/toast";
import Dropzone from "../commons/Dropzone";
export default function ({ currentId, setOpenModal, mode }) {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state?.user);
  const auth = useSelector((state) => state?.auth);
  const [image, setImage] = useState({});

  let initialValues = {
    username: "",
    avatar: "",
    email: "",
    role: "admin",
    address: "",
    contact: "",
    password: "",
    confirmPassword: "",
  };

  if (currentId && (mode == "update" || mode == "view")) {
    const currentDocument = documents?.find(
      (document) => document._id == currentId
    );
    if (currentDocument) {
      const { username, email, role, address, contact } = currentDocument;
      initialValues = {
        username,
        email,
        role,
        address,
        contact,
      };
      if (
        image &&
        Object?.keys(image).length == 0 &&
        !(image instanceof File)
      ) {
        setImage(currentDocument?.image);
      }
    }
  }
  const schema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    address: Yup.string(),
    contact: Yup.number(),
    password: Yup.string().when("isDisabled", {
      is: false,
      then: Yup.string().required(),
    }),
    confirmPassword: Yup.string().when("isDisabled", {
      is: false,
      then: Yup.string().required(),
    }),
  });

  const handleGoBack = (e) => {
    setOpenModal(false);
  };

  const submitForm = async (values, { resetForm }) => {
    let formData = new FormData();
    /* append input field values to formData */
    for (let value in values) {
      formData.append(value, values[value]);
    }
    // append image and author
    if (image && !image?.filePath && image !== "undefined") {
      formData.append("image", image);
    }
    formData.append("author", auth?.authenticatedUser?._id);

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
          response = await updateDocument("user", currentId, formData);
        }
        if (mode == "create") {
          response = await createDocument("auth/register", formData);
        }
        if (response?.status != 200) {
          return messageToast(
            "error",
            response?.data?.message || `Cannot ${mode} !!!`
          );
        }
        messageToast("success", `You have successfully ${mode}d document !!!`);
      } catch (err) {
        messageToast("error", err?.message || `Cannot ${mode} document !!!`);
      }
    }
    resetForm();
    setOpenModal(false);
    let response = await getDocuments("user");
    dispatch({ type: SET_USERS, payload: response?.data?.documents });
  };
  return (
    <div className="bg">
      <button
        onClick={handleGoBack}
        className="bg-blue-500 ml-[0] text-gray-100 p-[0.5rem] rounded-md flex items-center gap-[0.4rem]">
        <IoArrowBack /> Go Back
      </button>
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
          <div className="update-user bg-white py-[1rem] px-[1rem] rounded-lg mt-[1rem]">
            <div className=" form " style={{ maxWidth: "100%", padding: 0 }}>
              <p className="text-blue-500  text-2xl mb-[1rem]">User</p>

              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}>
                <div>
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
                    className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500 "
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
                    className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500 "
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
                    className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500 "
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
                    className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500 "
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
                    disabled={mode == "view" ? true : false}
                    max={5}
                    min={0}
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                    placeholder="Enter Role "
                    style={{ padding: "10px" }}
                    className="w-[250px] cursor-pointer outline-none rounded-lg border border-gray-400 text-gray-500 ">
                    {["admin", "guest"].map((item, index) => {
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
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="text">
                    Image
                  </label>

                  <Dropzone
                    name="image"
                    setFieldValue={setFieldValue}
                    setImage={setImage}
                    image={image}
                    values={values}
                    mode={mode}
                  />
                </div>

                {mode == "create" && (
                  <div className="w-full flex gap-[1rem]">
                    <div>
                      <label
                        className="text-gray-400 mb-[0.7rem] block"
                        htmlFor="password">
                        Password
                      </label>
                      <input
                        disabled={
                          mode == "view" && mode == "update" ? true : false
                        }
                        type="password"
                        max={5}
                        min={0}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Enter password"
                        style={{ padding: "10px" }}
                        className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500 "
                      />
                      {/* If validation is not passed show errors */}
                      <p className="text-red-500 text-sm ">
                        {(errors.password &&
                          touched.password &&
                          errors.password) ||
                          (isSubmitting && errors.password)}
                      </p>
                    </div>

                    <div>
                      <label
                        className="text-gray-400 mb-[0.7rem] block"
                        htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <input
                        disabled={
                          mode == "view" && mode == "update" ? true : false
                        }
                        type="password"
                        max={5}
                        min={0}
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        placeholder="Confirm Password"
                        style={{ padding: "10px" }}
                        className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500 "
                      />
                      {/* If validation is not passed show errors */}
                      <p className="text-red-500 text-sm ">
                        {(errors.confirmPassword &&
                          touched.confirmPassword &&
                          errors.confirmPassword) ||
                          (isSubmitting && errors.confirmPassword)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="w-full">
                  {mode != "view" && (
                    <button
                      type="submit p-0"
                      className="bg-[#316EFF] w-[100px]  text-gray-100 text-center py-2 text-lg rounded-md">
                      Save
                    </button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
