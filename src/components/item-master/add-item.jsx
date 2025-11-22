import { Formik } from "formik";

const AddItem = () => {
  const initialValue = {
    name: "",
    content: "",
    compnay: "",
    supplier: "",
    unit: "",
  };

  const handleSubmit = (item, { resetForm }) => {
    console.log(item);
    alert("Item Added Successfully");
    resetForm();
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}></Formik>
    </div>
  );
};

export default AddItem;
