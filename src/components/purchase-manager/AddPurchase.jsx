import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getAgenciesEndpoint } from '../../utils/endpoints';


export const AddPurchase = () => {
  const [isDirty, setisDirty] = useState(false);

  const [suppliers, setsuppliers] = useState([]);

  const [invoice_no, setinvoice_no] = useState(null);
  const [invoice_date, setinvoice_date] = useState(null);
  const [selectedSupplier, setselectedSupplier] = useState(null)
  const [items, setitems] = useState([])


  const [total_amount, settotal_amount] = useState(0)
  const [discount_percent, setdiscount_percent] = useState(0)
  const discount_amount = total_amount * discount_percent / 100;
  const amount_payable = total_amount - discount_amount;




  const [name, setname] = useState(null);
  const [batch_no, setbatch_no] = useState(null);
  const [expiry_date, setexpiry_date] = useState(null)
  const [quantity, setquantity] = useState(null);
  const [free, setfree] = useState(null)
  const [purchase_rate, setpurchase_rate] = useState(null);
  const [mrp, setmrp] = useState(null);
  const [selling_rate, setselling_rate] = useState(null);
  const [gst, setgst] = useState(0)
  const [convert_unit, setconvert_unit] = useState(null)

  const itemModalRef = useRef(null);

  function LoadSupplier() {
    axios.get(getAgenciesEndpoint).then(
      response => {
        setsuppliers(response.data);
      }
    )
  }
  useEffect(() => {
    LoadSupplier();

    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.returnValue = 'You have unsaved Changes';
      }
    };

    window.addEventListener('beforeUnload', handleBeforeUnload);

  }, [total_amount, discount_percent, isDirty])

  function clearItemState() {
    // Function to clear all item fields
    setname('');
    setbatch_no('');
    setexpiry_date('');
    setquantity('');
    setfree('');
    setpurchase_rate('');
    setmrp('');
    setselling_rate('');
    setgst('0');
    setconvert_unit('');
  }
  function clearInvoiceState() {
    setinvoice_no('');
    setinvoice_date('')
    setselectedSupplier('')
    setitems([])
  }

  function ValidateInput() {
    if (!name || name.trim() === '') {
      alert('Name is Required')
      return false;
    }

    // Validate Expiry Date
    if (!expiry_date) {
      alert('Expiry Date ir Required');
      return false;
    }
    // Other Expiry Criteria Based on Business Requiredm


    if (!batch_no || batch_no.trim() === '') {
      alert('Batch is Required')
      return false;
    }
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      alert('Quantity required')
      return false;
    }
    if (!purchase_rate || isNaN(Number(purchase_rate)) || Number(purchase_rate) <= 0) {
      alert('Purchase Rate required')
      return false;
    }
    if (!mrp || isNaN(Number(mrp)) || Number(mrp) <= 0) {
      alert('MRP required')
      return false;
    }
    if (!selling_rate || isNaN(Number(selling_rate)) || Number(selling_rate) <= 0) {
      alert('Selling Rate required')
      return false;
    }
    if (!convert_unit || isNaN(Number(convert_unit)) || Number(convert_unit) <= 0) {
      alert('Convert Unit required')
      return false;
    }

    return true;
  }
  function ValidateInvoice() {
    if (!invoice_no || invoice_no.trim() === '') {
      alert("Enter Invoice Nubmer First");
      return false;
    }
    if (!invoice_date || invoice_date.trim() === '') {
      alert('Choose Expiry Date')
      return false;
    }
    if (!selectedSupplier || selectedSupplier.trim() === '') {
      alert('Select Supplier')
      return false;
    }

    if (items.length === 0) {
      alert('Add atleast one item first.')
      return false;
    }

    return true;
  }


  function HandleItemSave() {
    if (!ValidateInput()) {
      return;
    }
    const newItemData = {
      name: name,
      batch_no: batch_no,
      expiry_date: expiry_date,
      quantity: quantity,
      free: free,
      purchase_rate: purchase_rate,
      mrp: mrp,
      selling_rate: selling_rate,
      gst: gst,
      convert_unit: convert_unit
    }

    setitems(prevItem => [...prevItem, newItemData])

    settotal_amount(prev => prev + parseFloat(purchase_rate));

    console.log('Amount Payable', amount_payable)
    clearItemState();

    if (itemModalRef.current && window.bootstrap) {
      const modalInstance = window.bootstrap.Modal.getInstance(itemModalRef.current) || new window.bootstrap.Modal.getInstance(itemModalRef.current);
      modalInstance.hide();
    }

    console.log(newItemData)
  }
  function HandleInvoiceSave() {
    if (!ValidateInvoice()) {
      return;
    }
    const invoice = {
      invoice_no: invoice_no,
      invoice_date: invoice_date,
      supplier: selectedSupplier,
      items: [...items]
    }

    setisDirty(false);
    clearInvoiceState();

    console.log(invoice);
  }

  return (


    <div >
      <div className='fw-bold m-2'>AddPurchase</div>

      <div className=' d-flex  justify-content-between alig-items-center gap-2'>

        {/* Left Column Add Invoice  */}
        <div className='col-9  rounded shadow p-4  border d-flex flex-column ' style={{ height: '70vh' }}>

          {/* Invoice Header */}
          <div className='d-flex justify-content-between gap-3 flex-shrink-0'>
            <div className='flex-fill'>
              <label htmlFor="">Invoice No.</label>
              <input type="text" name="invoice_no" value={invoice_no} placeholder='Enter Invoice No.' onChange={(e) => {
                setinvoice_no(e.target.value)
                setisDirty(true);
              }} className='form-control' />
            </div>
            <div className='flex-fill'>
              <label htmlFor="">Invoice Date</label>
              <input type="date" name="invoice_date" value={invoice_date} onChange={(e) => {
                setinvoice_date(e.target.value)
                setisDirty(true);
              }} className='form-control' />
            </div>
            <div className='flex-fill'>
              <label htmlFor="">Supplier</label>
              <select className='form-select' name="selectedSupplier" value={selectedSupplier} onChange={(e) => {
                setselectedSupplier(e.target.value)
                setisDirty(true);
              }} >
                <option disabled>--Select Supplier--</option>
                {suppliers.map(supplier => (
                  <option value={supplier.name} key={supplier.name} >{supplier.name}</option>))}
              </select>
            </div>
          </div>

          {/* Items Table */}
          <div className='flex-grow-1 overflow-auto'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Name</th>
                  <th>Batch</th>
                  <th>Quantity</th>
                  <th>Free</th>
                  <th>Purchase Rate</th>
                  <th>MRP</th>
                  <th>Selling Rate</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.batch_no}</td>
                    <td>{item.quantity}</td>
                    <td>{item.free}</td>
                    <td>{item.purchase_rate}</td>
                    <td>{item.mrp}</td>
                    <td>{item.selling_rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Action Buttons */}
          <div className='d-flex gap-4 justify-content-between mt-4 p-2 flex-shrink-0' >
            <div className='btn btn-danger w-25'>Back</div>
            <div className='w-50 d-flex gap-3'>
              <div className='btn btn-outline-secondary flex-fill' data-bs-toggle="modal" data-bs-target="#item-modal">Addd Item</div>
              <div className='btn btn-success flex-fill' onClick={HandleInvoiceSave} >Save</div>
            </div>
          </div>

        </div>

        {/* Right Column Discount + Invoice Summary */}
        <div className='col-3 '>

          <div className='mb-3 card p-3 shadow'>
            <label className='fw-bold mb-2 text-success'>Discount</label>
            <input type="number" name="discount_percent" className='form-control' placeholder='Enter Discount %' min={0} max={100} onChange={(e) => { setdiscount_percent(e.target.value) }} />
          </div>
          <div className='card p-3 shadow'>
            <h5 className="mb-1 fw-bold text-primary">Invoice Summary</h5>
            <div className="d-flex justify-content-between py-2 border-bottom">
              <span className="fw-semibold">Total Amount:</span>
              <span className="text-dark">{total_amount}</span>
            </div>

            <div className="d-flex justify-content-between py-2 border-bottom">
              <span className="fw-semibold">Discount Percent:</span>
              <span className="text-dark">{discount_percent}%</span>
            </div>

            <div className="d-flex justify-content-between py-2 border-bottom">
              <span className="fw-semibold">Discount Amount:</span>
              <span className="text-dark">{discount_amount}</span>
            </div>

            <div className="d-flex justify-content-between py-2">
              <span className="fw-semibold">Amount Payable:</span>
              <span className="fw-bold text-success">{amount_payable}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Add Item Modal */}
      <div className='modal fade' id='item-modal' ref={itemModalRef}>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header fs-2'>Add Item</div>
            <div className='modal-body d-flex row gap-2'>

              {/* Name -- Batch No */}
              <div className='d-flex gap-3'>
                <div className='flex-fill'>
                  <label htmlFor="">Name</label>
                  <input type="text" name="name" value={name} placeholder='Enter Name' onChange={(e) => { setname(e.target.value) }} className='form-control' />
                </div>
                <div className='flex-fill'>
                  <label htmlFor="">Batch No.</label>
                  <input type="text" name="batch_no" value={batch_no} placeholder='Enter Batch' onChange={(e) => { setbatch_no(e.target.value) }} className='form-control' />
                </div>
              </div>

              {/* Expiry -- Convert Unit -- GST */}
              <div className='d-flex gap-3'>
                <div className='flex-fill'>
                  <label htmlFor="">Expiry Date</label>
                  <input type="date" name="expiry_date" value={expiry_date} onChange={(e) => { setexpiry_date(e.target.value) }} className='form-control' />
                </div>
                <div className='flex-fill'>
                  <label htmlFor="">Convert Unit</label>
                  <input type="number" name="convert_unit" value={convert_unit} placeholder='Enter Convert Unit' onChange={(e) => { setconvert_unit(e.target.value) }} className='form-control' />
                </div>
                <div className='flex-fill'>
                  <label htmlFor="">GST</label>
                  <select name="gst" value={gst} onChange={(e) => { setgst(e.target.value) }} className='form-select'>
                    <option vlaue="" disabled
                    >--Select GST Rate--</option>
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                  </select>
                </div>
              </div>

              {/* Quantity -- Free */}
              <div className='d-flex gap-3'>
                <div className='flex-fill'>
                  <label htmlFor="">Quantity</label>
                  <input type="number" name="quantity" value={quantity} placeholder='Enter Quantity' onChange={(e) => { setquantity(e.target.value) }} className='form-control' />
                </div>
                <div className='flex-fill'>
                  <label htmlFor="">Free</label>
                  <input type="number" name="free" value={free} placeholder='Enter Free Quantity' onChange={(e) => { setfree(e.target.value) }} className='form-control' />
                </div>
              </div>

              {/* Purchase Rate -- MRP */}
              <div className='d-flex gap-3'>
                <div className='flex-fill'>
                  <label htmlFor="">Purchase Rate</label>
                  <input type="number" name="purchase_rate" value={purchase_rate} placeholder='Enter Purchase Rate' onChange={(e) => { setpurchase_rate(e.target.value) }} className='form-control' />
                </div>
                <div className='flex-fill'>
                  <label htmlFor="">MRP</label>
                  <input type="number" name="mrp" value={mrp} placeholder='Enter MRP' onChange={(e) => { setmrp(e.target.value) }} className='form-control' />
                </div>
              </div>

              {/* Selling Rate */}
              <div className='flex-fill'>
                <label htmlFor="">Selling Rate</label>
                <input type="number" name="selling_rate" value={selling_rate} placeholder='Enter Selling Rate' onChange={(e) => { setselling_rate(e.target.value) }} className='form-control' />
              </div>

            </div>

            <div className='modal-footer'>
              <button className='btn btn-warning w-25' onClick={HandleItemSave} >Save</button>
            </div>
          </div>
        </div>
      </div>

    </div>


  )
}
