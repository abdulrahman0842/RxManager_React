import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { getStorageEndpoint } from '../../utils/endpoints';

export const ModifyStorage = () => {

  const [storage, setstorage] = useState([])
  const [selectedStorage, setselectedStorage] = useState({
    type: "",
    description: ""
  })

  function LoadTypes() {
    axios.get(getStorageEndpoint).then(response => {
      setstorage(response.data);
      console.log(response.data)
    })
  }

  function HandleEditSubmt(values, { setIsSubmitting }) {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false)
      console.log("Edited Storage:", values);
      alert('Storage Updated')
    }, 3000);
  }

  useEffect(() => {
    LoadTypes();
  }, [])
  return (
    <div className='container-fluid'>
      <div className='fw-bold'>Modify Storage</div>
      <table className='table table-hover mt-2'>
        <thead>
          <tr>
            <th>Storage</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            storage.map((item) => (<tr key={item.id}>
              <td>{item.storage}</td>
              <td>{item.description}</td>
              <td className='d-flex gap-2 row'>
                <div className='btn btn-warning bi bi-pen' onClick={() => { setselectedStorage(item) }} data-bs-target="#edit-modal" data-bs-toggle="modal"></div>
                <div className='btn btn-danger bi bi-trash' data-bs-target="#delete-modal" data-bs-toggle="modal"></div>
              </td>
            </tr>))
          }
        </tbody>
      </table>


      {/* Edit Modal */}
      <div className='modal fade' id="edit-modal">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <h3 className='modal-header'>{selectedStorage.storage}</h3>
            <Formik
              initialValues={selectedStorage}
              key={selectedStorage.id}
              onSubmit={HandleEditSubmt}>
              <Form className='bg-light shadow p-4 m-3'>
                <label className='form-label'>Storage</label>
                <Field
                  name="storage"
                  type="text"
                  placeholder="Enter Storage"
                  className="form-control" />

                <label className='form-label'>Description</label>
                <Field
                  name="description"
                  type="text"
                  placeholder="Enter Item Type"
                  className="form-control" />

                <div className=' modal-footer'>
                  <button data-bs-dismiss="modal" className='btn '>Cencel</button>
                  <button type='submit' data-bs-dismiss="modal" className='btn btn-success'>Save</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>


      {/* Delete Modal */}
      <div className='modal fade' id='delete-modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <h4 className='modal-header text-danger'>Delete {selectedStorage.storage}</h4>
            <div className='modal-body'>Are you sure you want to Delete?</div>
            <div className='modal-footer'>
              <button className='btn' data-bs-dismiss="modal">Cancel</button>
              <button className='btn btn-danger' data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
