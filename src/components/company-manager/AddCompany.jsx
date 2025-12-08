import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import React from 'react'

export const AddCompany = () => {
  const validationSchema = Yup.object(
    {
      name: Yup.string().required("Name is Required"),
    }
  )

  const initialValue = {
    id: "",
    name: "",
    contact: { phone: "", email: "" },
    suppliers: [""]
  }

  const HandleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    console.log("Company Added:", values);
    setTimeout(() => {

      setSubmitting(false)
      alert('Added Successfully');
      resetForm();
    }, 3000)

  }

  return (
    <div className='container mt-2'>
      <div className='fw-bold m-2'>Add Company</div>

      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={HandleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className='border p-4 rounded shadow bg-white'>
            <div className='d-flex gap-3' >
              <div className=' w-50'>
                <label className='form-label'>Company</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter Company"
                  className="form-control"
                />
                <ErrorMessage
                  name="company"
                  component={'div'}
                  className='text-danger mt-1 small'
                />
              </div>
            </div>
            <div className='d-flex gap-3'>
              <div className=' flex-fill'>
                <label className='form-label'>Phone No.</label>
                <Field
                  name="contact.phone"
                  type="tel"
                  placeholder="Enter Phone No."
                  className="form-control"
                />
              </div>
              <div className=' flex-fill'>
                <label className='form-label'>Email</label>
                <Field
                  name="contact.email"
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                />
              </div>
            </div>
            <div className='fw-bold  mt-3'>Suppliers</div>
            <FieldArray name='suppliers'>
              {({ push, remove }) => (
                <div >{values.suppliers.map((_, index) => (
                  <div key={index} className='mt-2'>
                    <label className='form-label'>Supplier {index + 1}</label>
                    <div className='d-flex gap-3'>
                      <Field name={`suppliers[${[index]}]`}
                        placeholder={`Enter Supplier ${index + 1}`}
                        className="form-control w-50" />
                      <button className='btn btn-outline-danger' onClick={() => { remove(index) }}>Remove</button>
                    </div>
                  </div>))}

                  <button className='btn btn-outline-primary mt-3 w-25' onClick={() => { push("") }}>+ Add Supplier</button>
                </div>
              )}
            </FieldArray>

            <button type='submit' disabled={isSubmitting} className='btn btn-primary mt-3 w-25'>{isSubmitting ? "Loading..." : "Save"}</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
