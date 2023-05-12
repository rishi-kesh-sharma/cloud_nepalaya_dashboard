import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { RxCross1 } from "react-icons/rx";
import { IoArrowBack } from "react-icons/io5";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SET_SERVICES } from "../../utils/actions";
import {
  createDocument,
  getDocuments,
  updateDocument,
} from "../../apiCalls/general";
import { confirmToast, messageToast } from "../../utils/toast";
import Editor from "../commons/Editor";
import { Persist } from "formik-persist";
import Dropzone from "../commons/Dropzone";

export default function ({ currentId, setOpenModal, mode }) {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state?.service);
  const [image, setImage] = useState({});

  const auth = useSelector((state) => state?.auth);

  let initialValues = {
    title: "",
    features: [""],
    mainText: "",
    text: "",
  };
  if (currentId && (mode == "update" || mode == "view")) {
    const currentDocument = documents?.find(
      (document) => document?._id == currentId
    );
    if (currentDocument) {
      const { title, features, text, mainText } = currentDocument;
      console.log(features);
      initialValues = {
        title,
        features,
        mainText,
        text,
      };
      if (
        image &&
        Object.keys(image)?.length == 0 &&
        !(image instanceof File)
      ) {
        setImage(currentDocument?.image);
      }
    }
  }
  const schema = Yup.object().shape({
    title: Yup.string().required(),
    mainText: Yup.string().required(),
    text: Yup.string().required(),
  });
  const handleGoBack = (e) => {
    setOpenModal(false);
  };

  const submitForm = async (values, { resetForm }) => {
    console.log(values);
    const formData = new FormData();
    for (let key in values) {
      Array.isArray(values[key])
        ? formData.append(key, values[key].toString())
        : formData.append(key, values[key]);
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
          response = await updateDocument("service", currentId, formData);
        }
        if (mode == "create") {
          response = await createDocument("service", formData);
        }
        if (response.status != 200) {
          console.log(response.data.message);
          return messageToast(
            "error",
            response.data.message || `Cannot ${mode} !!!`
          );
        }
        messageToast("success", `You have successfully ${mode}d document !!!`);
      } catch (err) {
        console.log(err.response);
        messageToast(
          "error",
          err.response.data.message || `Cannot ${mode} document !!!`
        );
      }
    }
    resetForm();
    setOpenModal(false);
    let response = await getDocuments("blog");
    dispatch({ type: SET_SERVICES, payload: response.data.documents });
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
              <p className="text-blue-500  text-2xl mb-[2rem]">Service</p>

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
                    htmlFor="image">
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
                <FieldArray name="features" id="features">
                  {({ insert, remove, push }) => (
                    <div>
                      <label
                        className="text-gray-400 mb-[0.7rem] block"
                        htmlFor="text">
                        Features
                      </label>
                      <div className="grid grid-cols-3 gap-[1rem]">
                        {values?.features?.length > 0 &&
                          values?.features?.map((feature, index) => (
                            <div
                              className="row relative max-w-[220px]"
                              value={feature}
                              key={index}>
                              <div className="">
                                <Field
                                  disabled={mode == "view" ? true : false}
                                  placeholder="Enter Feature"
                                  style={{ padding: "10px" }}
                                  className="w-[100%] outline-none rounded-lg border border-gray-400 text-gray-500 py-[0.5rem] pl-[1rem]"
                                  name={`features.${index}`}
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`features.${index}`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <div className="col">
                                <button
                                  type="button"
                                  className={`absolute top-[30%] right-[-1.5rem] ${
                                    mode == "view" ? "hidden" : "block"
                                  }`}
                                  onClick={() => remove(index)}>
                                  <RxCross1 className="text-red-600 text-lg" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                      <button
                        type="button"
                        className={`${
                          mode == "view" ? "hidden" : "block"
                        } bg-blue-600  text-gray-100 px-[0.8rem] py-[0.3rem] rounded-md mt-[1rem]`}
                        onClick={() => push("")}>
                        Add
                      </button>
                    </div>
                  )}
                </FieldArray>

                <div className="max-w-[800px]">
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="mainText">
                    Main Text
                  </label>
                  <textarea
                    disabled={mode == "view" ? true : false}
                    rows={8}
                    cols={20}
                    name="mainText"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mainText}
                    placeholder="Enter mainText "
                    className="w-[100%] outline-none rounded-lg border border-gray-400 text-gray-500 "
                    id="mainText"
                    style={{ padding: "10px" }}
                  />
                  <p className="text-red-500 text-sm ">
                    {errors.mainText && touched.mainText && errors.mainText}
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
