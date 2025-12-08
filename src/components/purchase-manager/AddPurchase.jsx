import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { getAgenciesEndpoint } from '../../utils/endpoints';
import { PurchaseForm } from './PurchaseForm'
export const AddPurchase = () => {

  const [suppliers, setsuppliers] = useState([]);


  function LoadSupplier() {
    axios.get(getAgenciesEndpoint).then(
      response => {
        setsuppliers(response.data);
      }
    )
  }
  useEffect(() => {
    LoadSupplier();



  }, [])

  const [invoiceDetails, setinvoiceDetails] = useState({
    invoice_no: '',
    invoice_date: '',
    supplier: { id: "", name: "" }
  })

  return (

    <>
      <div>AddPurchase</div>
      <Formik

        initialValues={{ invoice_no: "", invoice_date: null, supplier: '' }}
        >
        <Form>
          <div className='d-flex justify-content-between align-items-center gap-5'>
            <div className='flex-fill'>
              <label className='form-label'>Invoice No</label>
              <Field
                name="invoice_no"
                type="text"
                placeholder="Invoice No"
                className="form-control" />
              <ErrorMessage
                name='invoice_no'
                component={'div'}
                className='bg-danger'
              />
            </div>
            <div className='flex-fill'>
              <label className='form-label'>Invoice Date</label>
              <Field
                name="invoice_date"
                type="date"
                className='form-control'
              />
              <ErrorMessage
                name='invoice_date'
                component={'div'}
                className='bg-danger' />
            </div>
            <div className=''>
              <label className='form-label'>Select Supplier</label>
              <Field
                name="supplier"
                as="select"
                className="form-select " >
                <option value=" " disabled hidden>-- Select a Supplier --</option>
                {suppliers.map(supplier => (<option key={supplier.id} value={supplier.name} > {supplier.name}</option>))}
              </Field>
              <ErrorMessage
                name='supplier'
                component={'div'}
                className='bg-danger' />
            </div>

          </div>
          <PurchaseForm/>
          
        </Form>
      </Formik>
      {/* <PurchaseForm initialValues={initialValue} /> */}
    </>)
}
