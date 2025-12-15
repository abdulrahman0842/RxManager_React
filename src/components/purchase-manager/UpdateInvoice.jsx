import axios from 'axios';
import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { getAgenciesEndpoint } from '../../utils/endpoints';

export const UpdateInvoice = () => {

    const { state: invoice } = useLocation();
    const [suppliers, setsuppliers] = useState([]);

    const [invoice_no, setinvoice_no] = useState('')
    const [invoice_date, setinvoice_date] = useState('')
    const [selectedSupplier, setselectedSupplier] = useState('')
    const [items, setitems] = useState([]);

    const [total_amount, settotal_amount] = useState(0)
    const [discount_percent, setdiscount_percent] = useState(0)
    const discount_amount = total_amount * discount_percent / 100;
    const amount_payable = total_amount - discount_amount

    const [editItem, seteditItem] = useState({});
    const [deleteItem, setdeleteItem] = useState(null);

    const itemModalRef = useRef(null);
    const deleteModalRef = useRef(null);

    function LoadSuppliers() {
        axios.get(getAgenciesEndpoint).then(response => {
            setsuppliers(response.data);
        })
    }

    useEffect(() => {
        LoadSuppliers();

        setinvoice_no(invoice.invoice_no)
        setinvoice_date(invoice.invoice_date)
        setselectedSupplier(invoice.supplier.name)
        setitems(invoice.items)

        settotal_amount(invoice.total_amount)
        setdiscount_percent(invoice.discount_percent)

        console.log(invoice);

    }, [])

    function HandleItemSave() {
        if (!ValidateInput()) {
            return;
        }

        const index = items.findIndex(item => item.medicine_id === editItem.medicine_id)

        const prevRate = items[index].purchase_rate;
        if (prevRate !== editItem.purchase_rate) {
            const prevRateTotal = prevRate * items[index].quantity;
            const updateRateTotal = editItem.purchase_rate * editItem.quantity;
            if (prevRateTotal > updateRateTotal) {
                const diffrence = prevRateTotal - updateRateTotal;
                settotal_amount(prev => prev - diffrence)
            } else {
                const diffrence = updateRateTotal - prevRateTotal;
                settotal_amount(prev => prev + diffrence);
            }
        }

        const updatedIems = [...items];
        updatedIems[index] = editItem;
        setitems([...updatedIems])



        seteditItem({})

        if (itemModalRef.current && window.bootstrap) {
            const modalInstance = window.bootstrap.Modal.getInstance(itemModalRef.current) || new window.bootstrap.Modal.getInstance(itemModalRef.current);
            modalInstance.hide();
        }

    }
    function HandleDelete() {
        const index = items.findIndex(item => item.medicine_id === deleteItem.medicine_id);
        if (index === -1) return;
        let updatedItems = items;
        updatedItems = updatedItems.filter(item => item.medicine_id !== deleteItem.medicine_id);

        setitems(updatedItems);

        settotal_amount(prev => prev - deleteItem.purchase_rate * deleteItem.quantity)

        if (deleteModalRef.current && window.bootstrap) {

            const modalInstance = window.bootstrap.Modal.getInstance(deleteModalRef.current) || new window.bootstrap.Modal.getInstance(deleteModalRef);
            modalInstance.hide()
        }

    }
    function ValidateInput() {
        if (!editItem.name || editItem.name.trim() === '') {
            alert('Name is Required')
            return false;
        }

        // Validate Expiry Date
        if (!editItem.expiry_date) {
            alert('Expiry Date is Required');
            return false;
        }
        // Other Expiry Criteria Based on Business Requiredm


        if (!editItem.batch_no || editItem.batch_no.trim() === '') {
            alert('Batch is Required')
            return false;
        }
        if (!editItem.quantity || isNaN(Number(editItem.quantity)) || Number(editItem.quantity) <= 0) {
            alert('Quantity required')
            return false;
        }
        if (!editItem.purchase_rate || isNaN(Number(editItem.purchase_rate)) || Number(editItem.purchase_rate) <= 0) {
            alert('Purchase Rate required')
            return false;
        }
        if (!editItem.mrp || isNaN(Number(editItem.mrp)) || Number(editItem.mrp) <= 0) {
            alert('MRP required')
            return false;
        }
        if (!editItem.selling_rate || isNaN(Number(editItem.selling_rate)) || Number(editItem.selling_rate) <= 0) {
            alert('Selling Rate required')
            return false;
        }
        if (!editItem.convert_unit || isNaN(Number(editItem.convert_unit)) || Number(editItem.convert_unit) <= 0) {
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
    function HandleInvoiceSave() {
        if (!ValidateInvoice()) return;
        const invoice = {
            invoice_no: invoice_no,
            invoice_date: invoice_date,
            selectedSupplier: selectedSupplier,
            total_amount: total_amount,
            discount_percent: discount_percent,
            discount_amount: discount_amount,
            amount_payable: amount_payable,
            items: [...items]
        }
        console.log("updated Invoice", invoice);

    }

    return (
        <>
            <div className='fw-bold m-2'>Update Invoice: {invoice.invoice_no} </div>
            <div className='d-flex gap-3 '>

                <div className='col-9 border rounded p-3 shadow d-flex  flex-column' style={{ height: '70vh' }}>

                    {/* Invoice Header */}
                    <div className='d-flex justify-content-between gap-3 flex-shrink-0 mb-2'>
                        <div className='flex-fill'>
                            <label htmlFor="">Invoice No.</label>
                            <div>{invoice_no}</div>
                        </div>
                        <div className='flex-fill'>
                            <label htmlFor="">Invoice Date</label>
                            <input type="date" name="invoice_date" value={invoice_date} onChange={(e) => {
                                setinvoice_date(e.target.value)

                            }} className='form-control' />
                        </div>
                        <div className='flex-fill'>
                            <label htmlFor="">Supplier</label>
                            <select className='form-select' name="selectedSupplier" value={selectedSupplier} onChange={(e) => {
                                setselectedSupplier(e.target.value)

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
                                    <th>Actions</th>
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
                                        <td className='d-flex'>
                                            <div className='bi bi-pen btn text-warning' data-bs-toggle="modal" data-bs-target="#edit-item-modal" onClick={() => {
                                                seteditItem({ ...item })
                                            }}></div>
                                            <div className='bi bi-trash btn text-danger' data-bs-toggle="modal" data-bs-target="#delete-item-modal"
                                                onClick={() => { setdeleteItem({ ...item }) }}></div>
                                        </td>
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
                {/* Summary Card and Discount*/}
                <div className='col-3 '>

                    <div className='mb-3 card p-3 shadow'>
                        <label className='fw-bold mb-2 text-success'>Discount</label>
                        <input type="number" name="discount_percent" className='form-control' value={discount_percent} placeholder='Enter Discount %' min={0} max={100} onChange={(e) => { setdiscount_percent(e.target.value) }} />
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



            </div >


            {/* Edit Item Modal */}
            < div className='modal fade' id='edit-item-modal' ref={itemModalRef} >
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'><strong>{editItem.name}</strong></div>

                        <div className='modal-body d-flex row gap-2'>

                            {/* Name -- Batch No */}
                            <div className='d-flex gap-3'>
                                <div className='flex-fill'>
                                    <label htmlFor="">Name</label>
                                    <input type="text" name="name" value={editItem.name} placeholder='Enter Name' onChange={(e) => { seteditItem({ ...editItem, name: e.target.value }) }} className='form-control' />
                                </div>
                                <div className='flex-fill'>
                                    <label htmlFor="">Batch No.</label>
                                    <input type="text" name="batch_no" value={editItem.batch_no} placeholder='Enter Batch' onChange={(e) => { seteditItem({ ...editItem, batch_no: e.target.value }) }} className='form-control' />
                                </div>
                            </div>

                            {/* Expiry -- Convert Unit -- GST */}
                            <div className='d-flex gap-3'>
                                <div className='flex-fill'>
                                    <label htmlFor="">Expiry Date</label>
                                    <input type="date" name="expiry_date" value={editItem.expiry_date} onChange={(e) => { seteditItem({ ...editItem, expiry_date: e.target.value }) }} className='form-control' />
                                </div>
                                <div className='flex-fill'>
                                    <label htmlFor="">Convert Unit</label>
                                    <input type="number" name="convert_unit" value={editItem.convert_unit} placeholder='Enter Convert Unit' onChange={(e) => { seteditItem({ ...editItem, convert_unit: e.target.value }) }} className='form-control' />
                                </div>
                                <div className='flex-fill'>
                                    <label htmlFor="">GST</label>
                                    <select name="gst" value={editItem.gst} onChange={(e) => { seteditItem({ ...editItem, gst: e.target.value }) }} className='form-select'>
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
                                    <input type="number" name="quantity" value={editItem.quantity} placeholder='Enter Quantity' onChange={(e) => { seteditItem({ ...editItem, quantity: e.target.value }) }} className='form-control' />
                                </div>
                                <div className='flex-fill'>
                                    <label htmlFor="">Free</label>
                                    <input type="number" name="free" value={editItem.free} placeholder='Enter Free Quantity' onChange={(e) => { seteditItem({ ...editItem, free: e.target.value }) }} className='form-control' />
                                </div>
                            </div>

                            {/* Purchase Rate -- MRP */}
                            <div className='d-flex gap-3'>
                                <div className='flex-fill'>
                                    <label htmlFor="">Purchase Rate</label>
                                    <input type="number" name="purchase_rate" value={editItem.purchase_rate} placeholder='Enter Purchase Rate' onChange={(e) => { seteditItem({ ...editItem, purchase_rate: e.target.value }) }} className='form-control' />
                                </div>
                                <div className='flex-fill'>
                                    <label htmlFor="">MRP</label>
                                    <input type="number" name="mrp" value={editItem.mrp} placeholder='Enter MRP' onChange={(e) => { seteditItem({ ...editItem, mrp: e.target.value }) }} className='form-control' />
                                </div>
                            </div>

                            {/* Selling Rate */}
                            <div className='flex-fill'>
                                <label htmlFor="">Selling Rate</label>
                                <input type="number" name="selling_rate" value={editItem.selling_rate} placeholder='Enter Selling Rate' onChange={(e) => { seteditItem({ ...editItem, selling_rate: e.target.value }) }} className='form-control' />
                            </div>

                        </div>

                        <div
                            className='modal-footer'>
                            <button className='btn btn-outline-secondary w-25' data-bs-dismiss="modal" >Cancel</button>
                            <button className='btn btn-warning w-25' onClick={HandleItemSave} >Save</button>
                        </div>

                    </div>
                </div>
            </div >

            {/* Delete Item Modal */}
            < div className='modal fade' id='delete-item-modal' ref={deleteModalRef} >
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-body text-danger fw-bold fs-5'>Delete {deleteItem?.name || ""}</div>
                        <div className='modal-footer'>
                            <button className='btn' data-bs-dismiss='modal'>Cancel</button>
                            <button className='btn btn-danger' onClick={HandleDelete} >Delete</button>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}
