import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field ,FieldArray} from 'formik';
import { getCompaniesEndpoint } from '../../utils/endpoints';

export const ModifyCompany = () => {

  const [companies, setCompanies] = useState([])
  const [selectedCompany, setselectedCompany] = useState({
    name: "",
    contact: { phone: "", email: "" },
    suppliers: [""]
  })

  function LoadTypes() {
    axios.get(getCompaniesEndpoint).then(response => {
      setCompanies(response.data);
      console.log(response.data)
    })
  }

  function HandleEditSubmt(values, { setIsSubmitting }) {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false)
      console.log("Edited Company:", values);
      alert('Company Updated')
    }, 3000);
  }

  useEffect(() => {
    LoadTypes();
  }, [])
  return (
    <div className='container-fluid'>
      <div className='fw-bold'>Modify Company</div>
      <table className='table table-hover mt-2'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            companies.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>
                  {company.contact.email}
                  <br />
                  {company.contact.phone}
                </td>
                <td className='d-flex gap-2 '>
                  {/* Edit Button */}
                  <div
                    className='btn btn-warning bi bi-pen'
                    onClick={() => setselectedCompany(company)}
                    data-bs-target="#edit-modal"
                    data-bs-toggle="modal"
                  ></div>
                  {/* Details Button (New) */}
                  <div
                    className='btn btn-secondary bi bi-info-circle'
                    onClick={() => setselectedCompany(company)} // Set company to populate details modal
                    data-bs-target="#details-modal"
                    data-bs-toggle="modal"
                  ></div>
                  {/* Delete Button */}
                  <div
                    className='btn btn-danger bi bi-trash'
                    data-bs-target="#delete-modal"
                    data-bs-toggle="modal"
                  ></div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>


      {/* Edit Modal */}
      <div className='modal fade ' id="edit-modal">
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <h3 className='modal-header'>{selectedCompany.name}</h3>
            <Formik
              initialValues={selectedCompany}
              key={selectedCompany.id}
              onSubmit={HandleEditSubmt}>
              {({ values }) => (<Form className='bg-light shadow p-4 m-3'>
                <label className='form-label'>Name</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  className="form-control w-50" />

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
                          <Field name={`suppliers.${index}`}
                            placeholder={`Enter Supplier ${index + 1}`}
                            className="form-control w-50" />
                          <button className='btn btn-outline-danger' onClick={() => { remove(index) }}>Remove</button>
                        </div>
                      </div>))}

                      <button className='btn btn-outline-primary mt-3 w-25' onClick={() => { push("") }}>+ Add Supplier</button>
                    </div>
                  )}
                </FieldArray>
                <div className=' modal-footer'>
                  <button data-bs-dismiss="modal" className='btn '>Cencel</button>
                  <button type='submit' data-bs-dismiss="modal" className='btn btn-success'>Save</button>
                </div>
              </Form>)}
            </Formik>
          </div>
        </div>
      </div>


      {/* Delete Modal */}
      <div className='modal fade' id='delete-modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <h4 className='modal-header text-danger'>Delete: {selectedCompany.name}</h4>
            <div className='modal-body'>Are you sure you want to Delete?</div>
            <div className='modal-footer'>
              <button className='btn' data-bs-dismiss="modal">Cancel</button>
              <button className='btn btn-danger' data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <div className='modal fade' id="details-modal">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3>{selectedCompany.name}</h3>
              <button className='btn btn-close' data-bs-dismiss="modal"></button>
            </div>
            <div className='modal-body'>
              <div className='fs-4 mb-3'>{selectedCompany.name}</div>
              <p className='fw-bold'>Suppliers</p>
              <ol>
                {selectedCompany.suppliers.map(
                  (suppier, index) =>
                  (
                    <li key={index}>{suppier}</li>
                  ))
                }
              </ol>
              <p className='fw-bold'>Contact (Company)</p>
              <div className='d-flex align-items-center justify-content-between my-2'>
                <div className='d-flex gap-2'><span className='bi bi-telephone'></span>
                  <span>{selectedCompany.contact.phone}</span></div>
                <button className='btn btn-success w-25'>Call</button>
              </div>
              <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex gap-2'><span className='bi bi-envelope'></span>
                  <span>{selectedCompany.contact.email}</span></div>
                <button className='btn btn-warning w-25'>Email</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
