import { useEffect } from "react";
import { string, object } from "yup";
import { useFormik } from "formik";
import {
  AiOutlineHome,
  AiOutlineMail,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { saveContact } from "../redux/reducers/contact/contactSlice";

const Contact = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isSuccess } = useSelector((state: RootState) => state.contact);

  const ContactSchema = object({
    name: string().required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    phone: string().required("Phone is required"),
    comments: string().required("Comments are required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      comments: "",
    },
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      dispatch(saveContact(values));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm(); // Reset the form after successful submission
    }
  }, [isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="bg-[#FFFFF7] dark:bg-[#323436]">
      <section className="px-4 sm:px-10 py-5">
        <div className="">
          {/* Your map iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15224.997569037472!2d78.36621957687373!3d17.447773555790764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557fa0ee!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana%20500081!5e0!3m2!1sen!2sin!4v1709399230528!5m2!1sen!2sin"
            width="600"
            height="450"
            className="border-0 w-full"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="block 1100px:flex justify-evenly my-5 bg-white dark:bg-[#222e35] p-5 shadow-lg">
          <div>
            <h3 className="font-bold text-2xl text-skin-base">Contact</h3>
            <form onSubmit={formik.handleSubmit} className="mt-[1rem]">
              <div className="mb-6 w-full">
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Enter your name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:max-w-[50%] 1100px:max-w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-[14px]">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div className="mb-6 w-full">
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  id="email"
                  placeholder="Enter your Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:max-w-[50%] 1100px:max-w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-[14px]">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div className="mb-6 w-full">
                <input
                  type="tel"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  placeholder="Enter your PhoneNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:max-w-[50%] 1100px:max-w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500 text-[14px]">
                    {formik.errors.phone}
                  </div>
                )}
              </div>
              <div className="mb-6 w-full">
                <textarea
                  name="comments"
                  value={formik.values.comments}
                  onChange={formik.handleChange}
                  cols={40}
                  rows={4}
                  placeholder="Comments"
                  className="rounded-lg p-2.5  w-full sm:max-w-[50%] 1100px:max-w-full  bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
                {formik.touched.comments && formik.errors.comments && (
                  <div className="text-red-500 text-[14px]">
                    {formik.errors.comments}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="button dark:bg-[#00a884] my-[10px] text-white text-[0.91rem] px-[25px] py-[6px] rounded-[25px]"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="text-skin-base">
            <h3 className="font-bold text-2xl">Get In Touch</h3>
            <address>
              <AiOutlineHome size={25} className="inline m-3" />
              100ft road, Hitech City, Hyderabad, Telengana,
            </address>
            <a href="tel:+91 80XXXXXXXX">
              <BsTelephone size={25} className="inline m-3" />
              +91 8XXXX XXXXX
            </a>{" "}
            <br />
            <a href="mailto:muskangambhir13@montclair.edu">
              <AiOutlineMail size={25} className="inline m-3" />
              ecommmail@xrxxxy.co.in
            </a>
            <p>
              <AiOutlineInfoCircle size={25} className="inline m-3" />
              ahex-tech, Hyderabad
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Contact;
