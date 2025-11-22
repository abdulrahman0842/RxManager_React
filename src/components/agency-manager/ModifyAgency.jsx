import axios from 'axios';
import { Form, Formik, Field } from 'formik';
import { useEffect } from 'react'
import { useState } from 'react'
import { getAgenciesEndpoint } from '../../utils/endpoints';


export const ModifyAgency = () => {

    const [agencies, setagencies] = useState([]);
    const [selectedAgency, setselectedAgency] = useState({
        name: '',
        contact: {
            email: "",
            phone: "",
        },
        gst_no: "",
        address: "",
    })
    function LoadCompanies() {
        axios.get(getAgenciesEndpoint)
            .then((response) => {
                setagencies(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function HandleEditSubmit(values, setSubmitting,) {
        // Update Agency Logic Here...
        setSubmitting(true)
        console.log(`Edited Agency Data:`, values);
        setTimeout(() => {
            setSubmitting(false)
        }, 3000)
    }

    useEffect(() => {
        LoadCompanies();
    }, []);



    return (
        <>
            <div className="fw-bold m-2 ">Modify Agency</div>

            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>GST No.</th>


                    </tr>
                </thead>
                <tbody>
                    {agencies.map((agency) =>
                        <tr key={agency.id}>
                            <td>{agency.name}</td>
                            <td>{agency.gst_no}</td>
                            <td className='d-flex gap-2 '>
                                <div className='bi bi-pen btn btn-warning' data-bs-toggle="modal"
                                    data-bs-target="#edit-modal" onClick={() => { setselectedAgency(agency) }}> </div>
                                <div className='bi bi-trash btn btn-danger'
                                    data-bs-target="#delete-modal" data-bs-toggle="modal"> </div>
                                <div className='bi bi-info-circle btn btn-secondary' data-bs-target="#info-modal" data-bs-toggle="modal" onClick={() => { setselectedAgency(agency) }}> </div>

                            </td>

                        </tr>)}
                </tbody>
            </table>


            {/* Edit Modal */}
            <div className='modal fade ' id='edit-modal'>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content '>
                        <div className='modal-header fs-3'>Edit:  {selectedAgency.name}</div>
                        <div className='modal-body'>
                            <Formik initialValues={selectedAgency}
                                key={selectedAgency.id}
                                onSubmit={HandleEditSubmit}>
                                {({ isSubmitting }) => (
                                    <Form className='border p-3 rounded shadow-sm bg-light'>
                                        <div className='d-flex gap-3'>
                                            <div className='flex-fill'>
                                                <label className='form-label'>Agency Name</label>
                                                <Field type="text" name="name" className="form-control" placeholder="Enter Agency Name" />
                                            </div>
                                            <div className='flex-fill'>
                                                <label className='form-label'>GST No.</label>
                                                <Field type="text" name="gst_no" className="form-control" placeholder="Enter GST No." />
                                            </div>
                                        </div>
                                        <div className='d-flex gap-3'>
                                            <div className='flex-fill'>
                                                <label className='form-label'>Phone No.</label>
                                                <Field type="text" name="contact.phone" className="form-control" placeholder="Enter Phone No." />
                                            </div>
                                            <div className='flex-fill'>
                                                <label className='form-label'>Email</label>
                                                <Field type="text" name="contact.email" className="form-control" placeholder="Enter Email" />
                                            </div>
                                        </div>
                                        <div className=''><label className='form-label'>Address</label>
                                            <Field type="text" name="address" className="form-control" placeholder="Enter Address" />
                                        </div>
                                        <div className='modal-footer'>
                                            <button className='btn' data-bs-dismiss="modal">Cancel</button>
                                            <button type='submit' data-bs-dismiss="modal" className='btn btn-warning ' disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>

            </div>


            {/* Delete Modal */}
            <div className='modal fade' id='delete-modal'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <h4 className='modal-header text-danger'>Delete {selectedAgency.name}</h4>
                        <div className='modal-body'>Are you sure you want to Delete?</div>
                        <div className='modal-footer'>
                            <button className='btn' data-bs-dismiss="modal">Cancel</button>
                            <button className='btn btn-danger' data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Info Modal */}
            <div className='modal fade' id='info-modal'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h3 className=''>{selectedAgency.name}
                            </h3>
                            <button className='btn btn-close' data-bs-dismiss='modal'></button>
                        </div>
                        <div className='modal-body bg-light p-4 shadow rounded m-3'>
                            <dl>
                                <dt>Name</dt>
                                <dd>{selectedAgency.name}</dd>

                                <dt>GST No.</dt>
                                <dd>{selectedAgency.gst_no}</dd>

                                <dt>Contact No.</dt>
                                <dd>{selectedAgency.contact.phone}</dd>


                                <dt>Email</dt>
                                <dd>{selectedAgency.contact.email}</dd>

                                <dt>Address</dt>
                                <dd>{selectedAgency.address}</dd>
                            </dl>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
