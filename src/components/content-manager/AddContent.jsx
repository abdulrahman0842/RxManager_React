import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import React from 'react'

export const AddContent = () => {
  const validationSchema = Yup.object(
    {
      content: Yup.string().required("Content is Required"),
      description: Yup.string().nullable()
    }
  )

  const initialValue = {
    id: "",
    content: "",
    description: ""
  }

  const HandleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    console.log("Content Added:", values);
    setTimeout(() => {

      setSubmitting(false)
      alert('Added Successfully');
      resetForm();
    }, 3000)

  }

  return (
    <div className='container mt-2'>
      <div className='fw-bold m-2'>Add Content</div>

      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={HandleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='border p-4 rounded shadow bg-white'>
            <div className='d-flex gap-3' >
              <div className=' flex-fill'>
                <label className='form-label'>Content</label>
                <Field
                  name="content"
                  type="text"
                  placeholder="Enter Content"
                  className="form-control"
                />
                <ErrorMessage
                  name="content"
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
