import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { getAgenciesEndpoint, getCompaniesEndpoint, getContentsEndpoint, getItemTypesEndpoint, getStorageEndpoint } from '../../utils/endpoints';
import { MedicineForm } from './MedicineForm';
export const AddMedicine = () => {
    const [contents, setContents] = useState([])
    const [companies, setCompanies] = useState([])
    const [storages, setStorages] = useState([])
    const [item_types, setItem_types] = useState([])
    const [agencies, setAgencies] = useState([])

    function LoadSelectOptions() {
        axios.get(getContentsEndpoint).then(response => {
            setContents(response.data);
        })
        axios.get(getCompaniesEndpoint).then(response => {
            setCompanies(response.data);
        })
        axios.get(getStorageEndpoint).then(response => {
            setStorages(response.data);
        })
        axios.get(getItemTypesEndpoint).then(response => {
            setItem_types(response.data);
        })
        axios.get(getAgenciesEndpoint).then(
            response => {
                setAgencies(response.data);
            }
        )
    }


    useEffect(() => {
        LoadSelectOptions()
    }, [])


    const validationSchema = Yup.object({
        name: Yup.string().required("Medicine Name Required"),
        content: Yup.string().required("Content is Required"),
        company: Yup.string().required("Company is Required"),
        convert_unit: Yup.number().required("Convert Unit Required"),
        storage: Yup.string().required("Storage is Required"),
        item_type: Yup.string().required("Item Type is Required"),
        supplier: Yup.array(Yup.string().required("Supplier is required")),
    })

    const initialValue = {
        name: "",
        content: "",
        company: "",
        convert_unit: 0,
        storage: "",
        item_type: "",
        supplier: [""]
    }

    const HandleSubmit = (values) => {
        console.log(values)
    }

    return (
        <>

            <div className='container w-75 bg-white shadow p-2 rounded'>
                {/* <Formik initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={HandleSubmit}
                >
                    {({ isSubmitting, values }) => (
                        <Form className='p-2'>
                            <div className='d-flex justify-content-between align-items-center gap-3 my-2'>
                                <div className='flex-fill'>
                                    <label className='form-label'>Enter Name</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="Enter Name"
                                        className="form-control " />
                                    <ErrorMessage
                                        name='name'
                                        component={'div'}
                                        className='text-danger'
                                    />
                                </div>

                                <div className='flex-fill'>
                                    <label className='form-label'>Select Company</label>
                                    <Field
                                        name="company"
                                        as="select"
                                        className="form-select " >
                                        <option value="" disabled>-- Select a Company --</option>
                                        {company.map(item => (<option key={item.id} value={item.name}> {item.name}</option>))}
                                    </Field>
                                    <ErrorMessage
                                        name='company'
                                        component={'div'}
                                        className='text-danger'
                                    />
                                </div>
                            </div>

                            <div className='d-flex justify-content-between align-items-center gap-3 my-2'>
                                <div className='flex-fill'>
                                    <label className='form-label'>Select Content</label>
                                    <Field
                                        name="content"
                                        as="select"
                                        className="form-select " >
                                        <option value="" disabled>-- Select a Content --</option>
                                        {contents.map(item => (<option key={item.id} value={item.content}> {item.content}</option>))}
                                    </Field>
                                    <ErrorMessage
                                        name='content'
                                        component={'div'}
                                        className='text-danger'
                                    />
                                </div>

                                <div className='flex-fill'>
                                    <label className='form-label'>Enter Convert Unit</label>
                                    <Field
                                        name="convert_unit"
                                        type="number"
                                        min="0"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="convert_unit"
                                        component={'div'}
                                        className='text-danger'
                                    />
                                </div>
                            </div>

                            <div className='d-flex justify-content-between align-items-center gap-3 my-2'>
                                <div className='flex-fill'>
                                    <label className='form-label'>Select Storage</label>
                                    <Field
                                        name="storage"
                                        as="select"
                                        className="form-select " >
                                        <option value="" disabled>-- Select a Storage --</option>
                                        {storage.map(item => (<option key={item.id} value={item.storage}> {item.storage}</option>))}
                                    </Field>
                                    <ErrorMessage
                                        name='storage'
                                        component={'div'}
                                        className='text-danger'
                                    />
                                </div>

                                <div className='flex-fill'>
                                    <label className='form-label'>Select Item Type</label>
                                    <Field
                                        name="item_type"
                                        as="select"
                                        className="form-select " >
                                        <option value="" disabled>-- Select a Item Type --</option>
                                        {item_type.map(item => (<option key={item.id} value={item.type}> {item.type}</option>))}
                                    </Field>
                                    <ErrorMessage
                                        name='item_type'
                                        component={'div'}
                                        className='text-danger'
                                    />
                                </div>

                            </div>

                            <FieldArray name='supplier'>
                                {({ push, remove }) => {
                                    return <div> {values.supplier.map((_, index) => (
                                        <div key={index}>
                                            <label className='form-label'>{`Supplier ${index + 1}`}</label>
                                            <div className='d-flex  align-items-center '>
                                                <div className='w-100'>
                                                    <Field
                                                        name={`supplier[${index}]`}
                                                        as="select"
                                                        className="form-select w-50"
                                                    >
                                                        <option disabled="true" value="">--Select Supplier--</option>
                                                        {agencies.map(agency => (<option value={agency.name} key={agency.id}>{agency.name}</option>))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name={`supplier[${index}]`}
                                                        component={'div'}
                                                        className='text-danger'
                                                    /></div>
                                                <button type='button' className='btn btn-outline-danger' onClick={() => { remove(index) }}>Remove</button>
                                            </div>
                                        </div>))}
                                        <button type='button' className='btn btn-outline-primary mt-3 w-25' onClick={() => { push("") }}>Add Supplier</button>
                                    </div>
                                }}
                            </FieldArray>
                            <button type='submit' disabled={isSubmitting} className='btn btn-primary w-25 mt-2'>Save</button>
                        </Form>
                    )}
                </Formik> */}
                <MedicineForm agencies={agencies} companies={companies} contents={contents} item_types={item_types} storages={storages} initialValue={initialValue} validationSchema={validationSchema} onSubmit={HandleSubmit}submitText='Submit' />
            </div>
        </>)
}
