import { Formik, Form } from "formik";
import { Persist } from "formik-persist";
import React from "react";
import { useSelector } from "react-redux";

export default function ({ currentId, setOpenModal, hasAddFeature, mode }) {
  const documents = useSelector((state) => state?.contact);
  let initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  if (currentId && (mode == "update" || mode == "view")) {
    const currentDocument = documents?.find(
      (document) => document._id == currentId
    );
    if (currentDocument) {
      const { name, email, subject, message } = currentDocument;
      initialValues = {
        name,
        email,
        subject,
        message,
      };
    }
  }
  return (
    <div>
      <Formik initialValues={initialValues} enableReinitialize>
        {({ values }) => (
          <div className="update-blog ">
            <div className=" form " style={{ maxWidth: "100%", padding: 0 }}>
              <p className="text-blue-500  text-2xl mb-[1rem]">Contact</p>
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
                    htmlFor="name">
                    Name
                  </label>
                  <input
                    disabled
                    type="text"
                    name="name"
                    value={values.name}
                    style={{ padding: "10px" }}
                    className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="email">
                    Email
                  </label>
                  <input
                    disabled
                    type="text"
                    name="email"
                    value={values.email}
                    style={{ padding: "10px" }}
                    className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="subject">
                    Subject
                  </label>
                  <input
                    disabled
                    type="text"
                    name="subject"
                    value={values.subject}
                    style={{ padding: "10px" }}
                    className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500"
                  />
                </div>
                <div className="w-full">
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="message">
                    Message
                  </label>
                  <textarea
                    disabled
                    rows={5}
                    name="message"
                    value={values.message}
                    className="w-[100%] outline-none rounded-lg border border-gray-400 text-gray-500"
                    id="message"
                    style={{ padding: "10px" }}
                  />
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
