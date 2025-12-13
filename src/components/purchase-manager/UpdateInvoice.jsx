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

    const [selectedItem, setselectedItem] = useState({});

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


    function LoadSuppliers() {
        axios.get(getAgenciesEndpoint).then(response => {
            setsuppliers(response.data);
        })
    }

    useEffect(() => {
        LoadSuppliers();

        console.log(invoice)
        setinvoice_no(invoice.invoice_no)
        setinvoice_date(invoice.invoice_date)
        setselectedSupplier(invoice.supplier.name)
        setitems(invoice.items)


    }, [])
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

        let index = items.findIndex(item => item.id === selectedItem.id)
        console.log(index)

        clearItemState();

        if (itemModalRef.current && window.bootstrap) {
            const modalInstance = window.bootstrap.Modal.getInstance(itemModalRef.current) || new window.bootstrap.Modal.getInstance(itemModalRef.current);
            modalInstance.hide();
        }

        console.log(newItemData)
    } function clearItemState() {
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
        if (!selectedItem.name || selectedItem.name.trim() === '') {
            alert('Name is Required')
            return false;
        }

        // Validate Expiry Date
        if (!selectedItem.expiry_date) {
            alert('Expiry Date is Required');
            return false;
        }
        // Other Expiry Criteria Based on Business Requiredm


        if (!selectedItem.batch_no || selectedItem.batch_no.trim() === '') {
            alert('Batch is Required')
            return false;
        }
        if (!selectedItem.quantity || isNaN(Number(selectedItem.quantity)) || Number(selectedItem.quantity) <= 0) {
            alert('Quantity required')
            return false;
        }
        if (!selectedItem.purchase_rate || isNaN(Number(selectedItem.purchase_rate)) || Number(selectedItem.purchase_rate) <= 0) {
            alert('Purchase Rate required')
            return false;
        }
        if (!selectedItem.mrp || isNaN(Number(selectedItem.mrp)) || Number(selectedItem.mrp) <= 0) {
            alert('MRP required')
            return false;
        }
        if (!selectedItem.selling_rate || isNaN(Number(selectedItem.selling_rate)) || Number(selectedItem.selling_rate) <= 0) {
            alert('Selling Rate required')
            return false;
        }
        if (!selectedItem.convert_unit || isNaN(Number(selectedItem.convert_unit)) || Number(selectedItem.convert_unit) <= 0) {
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

    return (
        <>
            <div className='fw-bold m-2'>Update Invoice: {invoice.invoice_no} </div>
            <div className='d-flex gap-3 p-3'>

                <div className='col-9 border rounded p-3'>

                    {/* Invoice Header */}
                    <div className='d-flex justify-content-between gap-3 flex-shrink-0'>
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
                                                setselectedItem(item)
                                                console.log(selectedItem)
                                            }}></div>
                                            <div className='bi bi-trash btn text-danger'></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Summary Card */}
                <div className="card p-3 shadow col-3" >
                    <h5 className="mb-1 fw-bold text-primary">Invoice Summary</h5>

                    <div className="d-flex justify-content-between py-2 border-bottom">
                        <span className="fw-semibold">Total Amount:</span>
                        <span className="text-dark">{invoice.total_amount}</span>
                    </div>

                    <div className="d-flex justify-content-between py-2 border-bottom">
                        <span className="fw-semibold">Discount Amount:</span>
                        <span className="text-dark">{invoice.discount_amount}</span>
                    </div>

                    <div className="d-flex justify-content-between py-2 border-bottom">
                        <span className="fw-semibold">Discount Percent:</span>
                        <span className="text-dark">{invoice.discount_percent}%</span>
                    </div>

                    <div className="d-flex justify-content-between py-2">
                        <span className="fw-semibold">Amount Payable:</span>
                        <span className="fw-bold text-success">{invoice.amount_payable}</span>
                    </div>
                </div>
            </div>

            <div className='modal fade' id='edit-item-modal' ref={itemModalRef}>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'><strong>{selectedItem.name}</strong></div>

                        <div className='modal-body d-flex row gap-2'>

                            {/* Name -- Batch No */}
                            <div className='d-flex gap-3'>
                                <div className='flex-fill'>
                                    <label htmlFor="">Name</label>
                                    <input type="text" name="name" value={selectedItem.name} placeholder='Enter Name' onChange={(e) => { setname(e.target.value) }} className='form-control' />
                                </div>
                                <div className='flex-fill'>
                                    <label htmlFor="">Batch No.</label>
                                    <input type="text" name="batch_no" value={selectedItem.batch_no} placeholder='Enter Batch' onChange={(e) => { setbatch_no(e.target.value) }} className='form-control' />
                                </div>
                            </div>

                            {/* Expiry -- Convert Unit -- GST */}
                            <div className='d-flex gap-3'>
                                <div className='flex-fill'>
                                    <label htmlFor="">Expiry Date</label>
                                    <input type="date" name="expiry_date" value={selectedItem.expiry_date} onChange={(e) => { setexpiry_date(e.target.value) }} className='form-control' />
                                </div>
                                <div className='flex-fill'>
                                    <label htmlFor="">Convert Unit</label>
                                    <input type="number" name="convert_unit" value={selectedItem.convert_unit} placeholder='Enter Convert Unit' onChange={(e) => { setconvert_unit(e.target.value) }} className='form-control' />
                                </div>
                                <div className='flex-fill'>
                                    <label htmlFor="">GST</label>
                                    <select name="gst" value={selectedItem.gst} onChange={(e) => { setgst(e.target.value) }} className='form-select'>
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
                                    <input type="number" name="quantity" value={selectedItem.quantity} placeholder='Enter Quantity' onChange={(e) => { setquantity(e.target.value) }} className='form-control' />
                                </div>
                                <div className='flex-fill'>
                                    <label htmlFor="">Free</label>
                                    <input type="number" name="free" value={selectedItem.free} placeholder='Enter Free Quantity' onChange={(e) => { setfree(e.target.value) }} className='form-control' />
                                </div>
                            </div>

                            {/* Purchase Rate -- MRP */}
                            <div className='d-flex gap-3'>
                                <div className='flex-fill'>
                                    <label htmlFor="">Purchase Rate</label>
                                    <input type="number" name="purchase_rate" value={selectedItem.purchase_rate} placeholder='Enter Purchase Rate' onChange={(e) => { setpurchase_rate(e.target.value) }} className='form-control' />
                                </div>
                                <div className='flex-fill'>
                                    <label htmlFor="">MRP</label>
                                    <input type="number" name="mrp" value={selectedItem.mrp} placeholder='Enter MRP' onChange={(e) => { setmrp(e.target.value) }} className='form-control' />
                                </div>
                            </div>

                            {/* Selling Rate */}
                            <div className='flex-fill'>
                                <label htmlFor="">Selling Rate</label>
                                <input type="number" name="selling_rate" value={selectedItem.selling_rate} placeholder='Enter Selling Rate' onChange={(e) => { setselling_rate(e.target.value) }} className='form-control' />
                            </div>

                        </div>

                        <div className='modal-footer'>
                            <button className='btn btn-warning w-25' onClick={HandleItemSave} >Save</button>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}
