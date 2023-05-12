import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SET_TESTIMONIALS } from "../../utils/actions";
import {
  createDocument,
  getDocuments,
  updateDocument,
} from "../../apiCalls/general";
import { confirmToast, messageToast } from "../../utils/toast";
import { Persist } from "formik-persist";
import Dropzone from "../commons/Dropzone";

export default function ({ currentId, setOpenModal, mode }) {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state?.testimonial);
  const auth = useSelector((state) => state?.auth);
  const [image, setImage] = useState({});

  let initialValues = {
    ratings: "",
    text: "",
    reviewer: "",
    designation: "",
  };

  if (currentId && (mode == "update" || mode == "view")) {
    const currentDocument = documents?.find(
      (document) => document._id == currentId
    );
    if (currentDocument) {
      const { ratings, text, reviewer, designation } = currentDocument;
      initialValues = {
        ratings,
        text,
        reviewer,
        designation,
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
    text: Yup.string().required(),
    reviewer: Yup.string().required(),
    designation: Yup.string().required(),
    rating: Yup.number(),
  });

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
          response = await updateDocument("testimonial", currentId, formData);
        }
        if (mode == "create") {
          response = await createDocument("testimonial", formData);
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
    let response = await getDocuments("testimonial");
    dispatch({ type: SET_TESTIMONIALS, payload: response?.data?.documents });
  };
  return (
    <div>
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
          <div className="update-testimonial ">
            <div className=" form " style={{ maxWidth: "100%", padding: 0 }}>
              <p className="text-blue-500  text-2xl mb-[1rem]">Testimonial</p>

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
                    htmlFor="text">
                    Ratings
                  </label>
                  <input
                    disabled={mode == "view" ? true : false}
                    type="number"
                    max={5}
                    min={0}
                    name="ratings"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ratings}
                    placeholder="Enter ratings"
                    style={{ padding: "10px" }}
                    className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500 "
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {(errors.ratings && touched.ratings && errors.ratings) ||
                      (isSubmitting && errors.ratings)}
                  </p>
                </div>
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="text">
                    Reviewer's Name
                  </label>
                  <input
                    disabled={mode == "view" ? true : false}
                    type="text"
                    max={5}
                    min={0}
                    name="reviewer"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.reviewer}
                    placeholder="Enter reviewer"
                    style={{ padding: "10px" }}
                    className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500 "
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {(errors.reviewer && touched.reviewer && errors.reviewer) ||
                      (isSubmitting && errors.reviewer)}
                  </p>
                </div>
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="designation">
                    Reviewer's Designation
                  </label>
                  <input
                    disabled={mode == "view" ? true : false}
                    type="text"
                    max={5}
                    min={0}
                    name="designation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.designation}
                    placeholder="Enter designation"
                    style={{ padding: "10px" }}
                    className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500 "
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {(errors.designation &&
                      touched.designation &&
                      errors.designation) ||
                      (isSubmitting && errors.designation)}
                  </p>
                </div>
                <br />
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="text">
                    Image
                  </label>

                  <Dropzone
                    height={300}
                    width={400}
                    name="image"
                    setFieldValue={setFieldValue}
                    setImage={setImage}
                    image={image}
                    values={values}
                    mode={mode}
                  />
                </div>
                <div className="w-full">
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="text">
                    Review
                  </label>

                  <textarea
                    disabled={mode == "view" ? true : false}
                    rows={5}
                    name="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.text}
                    placeholder="Enter text "
                    className="w-[100%] outline-none rounded-lg border border-gray-400 text-gray-500 "
                    id="text"
                    style={{ padding: "10px" }}
                  />
                  <p className="text-red-500 text-sm ">
                    {errors.text && touched.text && errors.text}
                  </p>
                </div>

                {mode != "view" && (
                  <button
                    type="submit p-0"
                    className="bg-[#316EFF] w-full text-gray-100 text-center py-3 text-lg rounded-md">
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
