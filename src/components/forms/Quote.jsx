import { Formik, Form } from "formik";
import { Persist } from "formik-persist";
import React from "react";
import { useSelector } from "react-redux";

export default function ({ currentId, setOpenModal, hasAddFeature, mode }) {
  const documents = useSelector((state) => state?.quote);
  let initialValues = {
    name: "",
    email: "",
    service: "",
    mobile: "",
    message: "",
  };
  if (currentId && (mode == "update" || mode == "view")) {
    const currentDocument = documents?.find(
      (document) => document._id == currentId
    );
    if (currentDocument) {
      const { name, email, service, mobile, message } = currentDocument;
      initialValues = {
        name,
        email,
        service: service?.title,
        mobile,
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
              <p className="text-blue-500  text-2xl mb-[1rem]">Quote</p>
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
                    htmlFor="text">
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
                    htmlFor="text">
                    Quote For Service
                  </label>
                  <input
                    disabled
                    type="text"
                    name="service"
                    value={values.service}
                    style={{ padding: "10px" }}
                    className="w-[250px] outline-none rounded-lg border border-gray-400 text-gray-500"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-400 mb-[0.7rem] block"
                    htmlFor="text">
                    Mobile
                  </label>
                  <input
                    disabled
                    type="number"
                    name="mobile"
                    value={values.mobile}
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
                    className="w-[100%] block outline-none rounded-lg border border-gray-400 text-gray-500"
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
