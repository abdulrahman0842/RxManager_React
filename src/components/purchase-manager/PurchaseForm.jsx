import { Formik, Form, Field, ErrorMessage, useFormikContext, } from 'formik'
import { useState } from 'react';
import * as yup from 'yup';
export const PurchaseForm = () => {

    const { values } = useFormikContext();

    const [items, setitems] = useState([{}])

    return (
        <div className='container mt-3'>
            <div >
                <label >Supplier Name</label>
                <div className='fs-5'>{values.supplier}</div>
                <label >Date</label>
                <div className='fs-5'>{values.invoice_date}</div>
                <label >Invoice Number</label>
                <div className='fs-5'>{values.invoice_no}</div>
            </div>
            <div className='d-flex gap-4 justify-content-between mt-4 p-2'>
                <div className='btn btn-danger w-25'>Back</div>
                <div className='w-50 d-flex gap-3'>
                    <div className='btn btn-outline-secondary flex-fill' data-bs-toggle="modal" data-bs-target="#item-modal">Addd Item</div>
                    <div className='btn btn-success flex-fill' >Save</div>
                </div>
            </div>



            <div id='item-modal' className='modal fade'>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content '>
                        <div className='modal-header'></div>
                        <div className='modal-body'>
                            <Formik
                                //  validationSchema={{
                                //     name: yup.string().required('Name is required'),
                                //     batch_no: yup.string().required('Batch No is required'),
                                //     expiry_date: yup.date().required('Date Required'),
                                //     quantity: yup.number().required('Quantity Required'),
                                //     free: 0,
                                //     purchase_rate: yup.number().required('Purchase Rate Required'),
                                //     mrp: yup.number().required('MRP Required'),
                                //     margin: 0,
                                //     selling_rate: 0,
                                //     gst: yup.number().required('GST Required'),
                                //     convert_unit: 0,
                                
                                //  }}   
                                initialValues={{
                                    name: "",
                                    batch_no: "",
                                    expiry_date: "",
                                    quantity: 0,
                                    free: 0,
                                    purchase_rate: 0,
                                    mrp: 0,
                                    margin: 0,
                                    selling_rate: 0,
                                    gst: 0,
                                    convert_unit: 0,
                                }}
                                onSubmit={(values) => {
                                    console.log(values)
                                }}>
                                <Form>
                                    <div>
                                        <label htmlFor="">Name</label>
                                        <Field
                                            name="name"
                                            placeholder="Enter Name"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name='name'
                                            component={'div'}
                                            className='text-danger' />
                                    </div>
                                    <div className='d-flex gap-2'>
                                        <div className='flex-fill'>
                                            <label htmlFor="">Batch No.</label>
                                            <Field
                                                name="batch_no"
                                                placeholder="Enter Batch"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name='batch_no'
                                                component={'div'}
                                                className='text-danger' />
                                        </div>
                                        <div className='flex-fill'>
                                            <label htmlFor="">Expiry Date</label>
                                            <Field
                                                name="expiry_date"
                                                type="date"
                                                placeholder="Enter Expiry"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name='expiry_date'
                                                component={'div'}
                                                className='text-danger' />
                                        </div>
                                    </div>
                                    {/* Quantity */}
                                    <div className='d-flex gap-2 '>
                                        <div className='flex-fill'>
                                            <label htmlFor="">Quantity</label>
                                            <Field
                                                name="quantity"
                                                type="number"
                                                placeholder="Enter Quantity"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name='quantity'
                                                component={'div'}
                                                className='text-danger' />
                                        </div>
                                        <div className='flex-fill'>
                                            <label htmlFor="">Scheme</label>
                                            <Field
                                                name="free"
                                                type="number"
                                                placeholder="Enter Free Quantity"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name='free'
                                                component={'div'}
                                                className='text-danger' />
                                        </div>
                                    </div>

                                    {/* Rate */}
                                    <div className='d-flex gap-2 '>
                                        <div className='flex-fill'>
                                            <label htmlFor="">Purchase Rate</label>
                                            <Field
                                                name="purchase_rate"
                                                type="number"
                                                placeholder="Enter Purchase Rate"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name='purchase_rate'
                                                component={'div'}
                                                className='text-danger' />
                                        </div>
                                        <div className='flex-fill'>
                                            <label htmlFor="">MRP</label>
                                            <Field
                                                name="mrp"
                                                type="number"
                                                placeholder="Enter MRP"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name='mrp'
                                                component={'div'}
                                                className='text-danger' />
                                        </div>
                                    </div>
                                    <div className='d-flex gap-2 '>
                                        <div className='flex-fill'>
                                            <label htmlFor="">Margin %</label>
                                            <Field
                                                name="profit_percent"
                                                type="number"
                                                placeholder="Enter Margin Percent"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name='profit_percent'
                                                component={'div'}
                                                className='text-danger' />
                                        </div>
                                        <div className='flex-fill'>
                                            <label htmlFor="">Selling Rate</label>
                                            <Field
                                                name="selling_rate"
                                                type="number"
                                                placeholder="Enter Seling Rate"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name='selling_rate'
                                                component={'div'}
                                                className='text-danger' />
                                        </div>
                                    </div>

                                    {/* GST */}
                                    <div className='d-flex gap-2 '>
                                        <div className='flex-fill'>
                                            <label htmlFor="">GST</label>
                                            <Field
                                                name="gst"
                                                as="select"
                                                className="form-select"
                                            >
                                                <option value="0">0%</option>
                                                <option value="5">5%</option>
                                                <option value="12">12%</option>
                                                <option value="18">18%</option>
                                            </Field>
                                        </div>

                                        {/* Convert Unit */}
                                        <div className='flex-fill'>
                                            <label htmlFor="">Convert Unit</label>
                                            <Field
                                                name="convert_unit"
                                                type="number"
                                                placeholder="Enter Convert Unit"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name='convert_unit'
                                                component={'div'}
                                                className='text-danger' />
                                        </div>
                                    </div>
                                    <div className='align-items-center mt-3 d-flex gap-3 justify-content-between'>
                                        <button data-bs-dismiss="modal" className='btn btn-danger flex-fill'>Cancel</button>
                                        <button type='submit' className='btn btn-success flex-fill'>Save</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
