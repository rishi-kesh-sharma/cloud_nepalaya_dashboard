import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { updateBlog } from "../../apiCalls/blogs";
import { useDispatch, useSelector } from "react-redux";
import { SET_BLOGS } from "../../actions/blogActions";
import Swal from "sweetalert2";

const BlogUpdateForm = ({ editingUserId, setOpen }) => {
  const dispatch = useDispatch();
  const blogsInfo = useSelector((state) => state?.blogReducer);
  let initialValues = {
    title: "",
    text: "",
  };
  if (editingUserId) {
    const editingBlog = blogsInfo?.blogs?.find(
      (blog) => blog._id == editingUserId
    );
    if (editingBlog) {
      const { _id, title, text } = editingBlog;
      initialValues = {
        title,
        text,
      };
    }
  }
  // if (editingUserId) {

  const schema = Yup.object().shape({
    title: Yup.string().required(),
    text: Yup.string().required(),
  });

  const submitForm = async (values) => {
    const blogs = blogsInfo?.blogs?.map((blog) => {
      if (blog._id == editingUserId) {
        return { ...blog, ...values };
      }
      return blog;
    });
    const response = await updateBlog(editingUserId, values);
    if (response.status != 200) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    dispatch({ type: SET_BLOGS, payload: { ...blogsInfo, blogs } });

    setOpen(false);
    Swal.fire("blog Updated", "", "success");
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
        }) => (
          <div className="update-blog ">
            <div className=" form " style={{ maxWidth: "100%", padding: 0 }}>
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <div>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    placeholder="Enter title"
                    style={{ padding: "10px" }}
                    className="w-[100%] outline-none rounded-lg border text-gray-500"
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.text}
                    placeholder="Enter description of blog "
                    className="w-[100%] outline-none rounded-lg border text-gray-500"
                    id="text"
                    style={{ padding: "10px" }}
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-500 text-sm ">
                    {errors.text && touched.text && errors.text}
                  </p>
                </div>

                {/* Click on submit button to submit the form */}
                <button
                  type="submit p-0"
                  className="bg-[#316EFF] text-gray-100 p-2 text-lg">
                  Save
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default BlogUpdateForm;
