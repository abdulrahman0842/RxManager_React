import { useFormik } from "formik";

export function CompanyForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
    },
    onSubmit: (company) => {
      console.log(`Company: ${company.name} \n Code:${company.code}`);
    },
  });
  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4 text-center">Company Master</h3>
      <form action={formik.handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <dl >
          <dt className="form-label">Company Name</dt>
          <dd>
            <input type="text" name="name" className="form-control"  onChange={formik.handleChange} />
          </dd>
          <dt>Code</dt>
          <dd>
            <input type="text" name="code" onChange={formik.handleChange} />
          </dd>
        </dl>
        <button className="btn btn-success" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
