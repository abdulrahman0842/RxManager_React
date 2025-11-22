import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import React from 'react'

export const AddItemType = () => {
  const validationSchema = Yup.object(
    {
      type: Yup.string().required("Item is Required"),
      description: Yup.string().nullable()
    }
  )

  const initialValue = {
    id: "",
    type: "",
    description: ""
  }

  const HandleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    console.log("Type Added:", values);
    setTimeout(() => {

      setSubmitting(false)
      alert('Added Successfully');
      resetForm();
    }, 3000)

  }

  return (
    <div className='container mt-2'>
      <div className='fw-bold m-2'>Add Item Type</div>

      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={HandleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='border p-4 rounded shadow-sm bg-light'>
            <div className='d-flex gap-3' >
              <div className=' flex-fill'>
                <label className='form-label'>ItemType</label>
                <Field
                  name="type"
                  type="text"
                  placeholder="Enter Item Type"
                  className="form-control"
                />
                <ErrorMessage
                  name="type"
                  component={'div'}
                  className='text-danger mt-1 small'
                />
              </div>
              <div className=' flex-fill'>
                <label className='form-label'>Description</label>
                <Field
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                  className="form-control"
                />
              </div>
            </div>
            <button type='submit' disabled={isSubmitting} className='btn btn-primary mt-3 w-25'>{isSubmitting ? "Loading..." : "Save"}</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
