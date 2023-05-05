import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { registerBlog } from "../../apiCalls/blogs";
import { useDispatch, useSelector } from "react-redux";
import { ADD_BLOG, SET_BLOG } from "../../actions/blogActions";
import Swal from "sweetalert2";

const AddBlogForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const blogsInfo = useSelector((state) => state?.blogReducer);
  let initialValues = {
    title: "",
    text: "",
  };

  const schema = Yup.object().shape({
    // socialMediaHandles: Yup.string(),
    title: Yup.string().required(),
    text: Yup.string().required(),
  });

  const submitForm = async (values, { resetForm }) => {
    const response = await registerBlog(values);
    if (response.status != 200) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    dispatch({ type: ADD_BLOG, payload: { ...values, author: "admin" } });
    resetForm({ values: "" });
    setOpen(false);
    Swal.fire("blog Added", "", "success");
  };
  return (
    <div className="w-[100%] ">
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
        }) => (
          <div className="">
            <div
              className="border-none"
              style={{ maxWidth: "100%", padding: 0 }}>
              <h2 className="text-center text-gray-600 text-[1.5rem] mb-[2rem]">
                {" "}
                Add Blog
              </h2>
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <Form className="flex flex-col gap-[1rem]">
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <div>
                  <input
                    style={{ padding: "10px" }}
                    className="w-[100%] outline-none rounded-lg border text-gray-500"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    placeholder="Enter title"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {(errors.title && touched.title && errors.title) ||
                      (isSubmitting && errors.title)}
                  </p>
                </div>
                <div>
                  <textarea
                    rows={5}
                    className="p-3 text-gray-500 w-[100%] outline-none rounded-lg border "
                    name="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.text}
                    placeholder="Enter description of blog"
                  />
                  <p className="text-red-500 text-sm ">
                    {(errors.text && touched.text && errors.text) ||
                      (isSubmitting && errors.text)}
                  </p>
                </div>
                {/* Click on submit button to submit the form */}
                <button
                  type="submit"
                  className="bg-[#316EFF] text-gray-100 p-2 text-lg">
                  Add
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddBlogForm;
