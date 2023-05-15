import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SET_FAQS } from "../../utils/actions";
import {
  createDocument,
  getDocuments,
  updateDocument,
} from "../../apiCalls/general";
import { confirmToast, messageToast } from "../../utils/toast";

export default function ({ currentId, setOpenModal, mode }) {
  const dispatch = useDispatch();
  const FAQDocuments = useSelector((state) => state?.FAQ);
  const serviceDocuments = useSelector((state) => state?.service);
  let initialValues = {
    question: "",
    answer: "",
    service: serviceDocuments[0]?._id,
    type: "General",
  };

  if (currentId && (mode == "update" || mode == "view")) {
    const currentDocument = FAQDocuments?.find(
      (document) => document?._id == currentId
    );
    if (currentDocument) {
      const { question, answer, service, type } = currentDocument;
      console.log(type);
      initialValues = {
        type: type,
        question,
        answer,
        service: service || serviceDocuments[0]?.id,
      };
    }
  }
  const schema = Yup.object().shape({
    question: Yup.string().required(),
    answer: Yup.string().required(),
    type: Yup.string().required(),
    service: Yup.string().when("type", {
      is: "Service Related",

      then: Yup.string().required("Service  is required."),
    }),
  });

  const submitForm = async (values, { resetForm }) => {
    if (values.type == "General") {
      delete values["service"];
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
          response = await updateDocument("faq", currentId, values);
        }
        if (mode == "create") {
          response = await createDocument("faq", {
            ...values,
          });
        }
        if (response?.status != 200) {
          return messageToast(
            "error",
            response?.data?.message || `Cannot ${mode} !!!`
          );
        }
        messageToast("success", `You have successfully ${mode}d document !!!`);
      } catch (err) {
        messageToast("error", err.message || `Cannot ${mode} document !!!`);
      }
    }
    resetForm();
    setOpenModal(false);
    let response = await getDocuments("faq");
    dispatch({ type: SET_FAQS, payload: response?.data?.documents });
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
          <div className="update-blog ">
            <div className=" form " style={{ maxWidth: "100%", padding: 0 }}>
              <p className="text-blue-500  text-2xl mb-[1rem]">FAQ</p>

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
                    htmlFor="question">
                    Question
                  </label>
                  <input
                    disabled={mode == "view" ? true : false}
                    type="text"
                    name="question"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.question}
                    placeholder="Enter question"
                    style={{ padding: "10px" }}
                    className="w-[100%] outline-none rounded-lg border border-gray-400 text-gray-500 "
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {(errors.question &&
                      touched?.question &&
                      errors.question) ||
                      (isSubmitting && errors?.question)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-[2rem]">
                  <div>
                    <label
                      className="text-gray-400 mb-[0.7rem] block"
                      htmlFor="type">
                      Type
                    </label>

                    <select
                      disabled={mode == "view" ? true : false}
                      type="text"
                      name="type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.type}
                      placeholder="Enter Related type"
                      style={{ padding: "10px" }}
                      className="cursor-pointer w-[100%] outline-none rounded-lg border border-gray-400 text-gray-800">
                      {["General", "Service Related"]?.map((item, index) => {
                        return (
                          <option
                            key={index}
                            className=" cursor-pointer  block h-[4rem] py-[2rem]"
                            value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                    {/* If validation is not passed show errors */}
                    <p className="text-red-500 text-sm ">
                      {(errors?.type && touched?.type && errors?.type) ||
                        (isSubmitting && errors?.type)}
                    </p>
                  </div>
                  {values.type == "Service Related" && (
                    <div>
                      <label
                        className="text-gray-400 mb-[0.7rem] block"
                        htmlFor="service">
                        Related Service
                      </label>

                      <select
                        disabled={mode == "view" ? true : false}
                        type="text"
                        name="service"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.service || serviceDocuments?._id}
                        placeholder="Enter Related Service"
                        style={{ padding: "10px" }}
                        className="cursor-pointer w-[100%] outline-none rounded-lg border border-gray-400 text-gray-800">
                        {serviceDocuments?.map((item, index) => {
                          return (
                            <option
                              defaultValue={serviceDocuments[0]?._id}
                              key={index}
                              className=" cursor-pointer  block h-[4rem] py-[2rem]"
                              value={item?._id}>
                              {serviceDocuments.find((item) => {
                                if (item._id == values.service) {
                                  return;
                                }
                              })?.title || item?.title}
                            </option>
                          );
                        })}
                      </select>
                      {/* If validation is not passed show errors */}
                      <p className="text-red-500 text-sm ">
                        {(errors?.service &&
                          touched?.service &&
                          errors?.service) ||
                          (isSubmitting && errors?.service)}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="answer">
                    Answer
                  </label>
                  <textarea
                    disabled={mode == "view" ? true : false}
                    rows={5}
                    name="answer"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.answer}
                    placeholder="Enter Answer "
                    className="w-[100%] outline-none rounded-lg border border-gray-400 text-gray-500 "
                    id="answer"
                    style={{ padding: "10px" }}
                  />
                  <p className="text-red-500 text-sm ">
                    {errors.answer && touched.answer && errors.answer}
                  </p>
                </div>

                {mode != "view" && (
                  <button
                    type="submit p-0"
                    className="bg-[#316EFF] text-gray-100 p-2 text-lg">
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
