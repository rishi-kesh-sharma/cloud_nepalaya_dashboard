import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { RxCross1 } from "react-icons/rx";
import { IoArrowBack } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SET_BLOGS } from "../../utils/actions";
import Dropzone from "../commons/Dropzone";
import {
  createDocument,
  getDocuments,
  updateDocument,
} from "../../apiCalls/general";
import { confirmToast, messageToast } from "../../utils/toast";
import Editor from "../commons/Editor";
import { Persist } from "formik-persist";

export default function ({ currentId, setOpenModal, mode }) {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state?.blog);
  const auth = useSelector((state) => state?.auth);
  const [image, setImage] = useState({});

  let initialValues = {
    title: "",
    text: "",
  };
  if (currentId && (mode == "update" || mode == "view")) {
    const currentDocument = documents?.find(
      (document) => document._id == currentId
    );

    if (currentDocument) {
      const { title, text } = currentDocument;

      initialValues = {
        title,
        text,
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
    title: Yup.string().required(),
    text: Yup.string().required(),
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
          response = await updateDocument("blog", currentId, formData);
        }
        if (mode == "create") {
          response = await createDocument("blog", formData);
        }
        if (response.status != 200) {
          return messageToast(
            "error",
            response.data.message || `Cannot ${mode} !!!`
          );
        }
        messageToast("success", `You have successfully ${mode}d document !!!`);
      } catch (err) {
        messageToast("error", err.message || `Cannot ${mode} document !!!`);
      }
    }
    resetForm();
    setOpenModal(false);
    let response = await getDocuments("blog");
    dispatch({ type: SET_BLOGS, payload: response.data.documents });
  };
  return (
    <div className="">
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
          <div className="bg-white mt-[1rem] p-[2rem]">
            <div className=" form " style={{ maxWidth: "100%", padding: 0 }}>
              <p className="text-blue-500  text-2xl mb-[2rem]">Blog</p>
              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}>
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
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="text">
                    Title
                  </label>
                  <input
                    disabled={mode == "view" ? true : false}
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    placeholder="Enter title"
                    style={{ padding: "10px" }}
                    className="w-[500px] outline-none rounded-lg border border-gray-400 text-gray-500"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {(errors.title && touched.title && errors.title) ||
                      (isSubmitting && errors.title)}
                  </p>
                </div>

                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="text">
                    Description
                  </label>
                  <Editor
                    disabled={mode == "view" ? true : false}
                    name="text"
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>
                {mode != "view" && (
                  <button
                    type="submit p-0"
                    className="bg-[#316EFF] w-[5rem] rounded-md text-gray-100 p-2 text-lg">
                    Save
                  </button>
                )}
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
