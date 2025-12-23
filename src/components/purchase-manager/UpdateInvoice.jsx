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

    }, [invoice])

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
        if (!editItem.selling_price || isNaN(Number(editItem.selling_price)) || Number(editItem.selling_price) <= 0) {
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
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-primary mb-0">
                    <i className="bi bi-pencil-square me-2"></i>
                    Update Invoice
                    <span className="text-muted ms-2 fs-6">
                        ({invoice.invoice_no})
                    </span>
                </h5>
            </div>
            <div className='d-flex gap-3 '>

                <div className='col-9 border rounded shadow-sm p-3 d-flex flex-column bg-white' style={{ height: '70vh' }}>

                    {/* Invoice Header */}
                    <div className="d-flex gap-3 mb-3 flex-shrink-0">
                        <div className="flex-fill">
                            <label className="form-label fw-semibold">Invoice No</label>
                            <div className="form-control-plaintext fw-bold">
                                {invoice_no}
                            </div>
                        </div>

                        <div className="flex-fill">
                            <label className="form-label fw-semibold">Invoice Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={invoice_date}
                                onChange={(e) => setinvoice_date(e.target.value)}
                            />
                        </div>

                        <div className="flex-fill">
                            <label className="form-label fw-semibold">Supplier</label>
                            <select
                                className="form-select"
                                value={selectedSupplier}
                                onChange={(e) => setselectedSupplier(e.target.value)}
                            >
                                <option disabled>-- Select Supplier --</option>
                                {suppliers.map((s) => (
                                    <option key={s.name} value={s.name}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="flex-grow-1 overflow-auto border rounded">
                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light position-sticky top-0">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Batch</th>
                                    <th className="text-end">Qty</th>
                                    <th className="text-end">Free</th>
                                    <th className="text-end">Purchase</th>
                                    <th className="text-end">MRP</th>
                                    <th className="text-end">Selling</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items.length === 0 && (
                                    <tr>
                                        <td colSpan="9" className="text-center text-muted py-4">
                                            <i className="bi bi-inbox fs-4 d-block mb-1"></i>
                                            No items added
                                        </td>
                                    </tr>
                                )}

                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="fw-semibold">{item.name}</td>
                                        <td>{item.batch_no}</td>
                                        <td className="text-end">{item.quantity}</td>
                                        <td className="text-end">{item.free}</td>
                                        <td className="text-end">{item.purchase_rate}</td>
                                        <td className="text-end">{item.mrp}</td>
                                        <td className="text-end">{item.selling_price}</td>

                                        <td className="text-center">
                                            <div className="d-flex justify-content-center gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-warning"
                                                    title="Edit Item"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#edit-item-modal"
                                                    onClick={() => seteditItem({ ...item })}
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete Item"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete-item-modal"
                                                    onClick={() => setdeleteItem({ ...item })}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="d-flex justify-content-between mt-3 flex-shrink-0">
                        <button className="btn btn-outline-danger w-25">
                            <i className="bi bi-arrow-left me-1"></i> Back
                        </button>

                        <div className="d-flex gap-3 w-50">
                            <button
                                className="btn btn-outline-secondary flex-fill"
                                data-bs-toggle="modal"
                                data-bs-target="#edit-item-modal"
                            >
                                <i className="bi bi-plus-circle me-1"></i> Add Item
                            </button>

                            <button
                                className="btn btn-success flex-fill"
                                onClick={HandleInvoiceSave}
                            >
                                <i className="bi bi-check-circle me-1"></i> Save Invoice
                            </button>
                        </div>
                    </div>

                </div>
                {/* Summary Card and Discount*/}
                <div className="col-3">

                    {/* Discount */}
                    <div className="card p-3 shadow-sm mb-3">
                        <label className="fw-bold text-success mb-2">
                            <i className="bi bi-percent me-1"></i> Discount
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            value={discount_percent}
                            min={0}
                            max={100}
                            placeholder="Enter discount %"
                            onChange={(e) => setdiscount_percent(e.target.value)}
                        />
                    </div>

                    {/* Summary */}
                    <div className="card p-3 shadow-sm">
                        <h6 className="fw-bold text-primary mb-3">
                            Invoice Summary
                        </h6>

                        <div className="d-flex justify-content-between border-bottom py-2">
                            <span>Total Amount</span>
                            <span className="fw-semibold">₹ {total_amount}</span>
                        </div>

                        <div className="d-flex justify-content-between border-bottom py-2">
                            <span>Discount</span>
                            <span>{discount_percent}%</span>
                        </div>

                        <div className="d-flex justify-content-between border-bottom py-2">
                            <span>Discount Amount</span>
                            <span>₹ {discount_amount}</span>
                        </div>

                        <div className="d-flex justify-content-between pt-2">
                            <span className="fw-semibold">Amount Payable</span>
                            <span className="fw-bold text-success fs-5">
                                ₹ {amount_payable}
                            </span>
                        </div>
                    </div>

                </div>

            </div >


            {/* Edit Item Modal */}
            < div className='modal fade' id='edit-item-modal' ref={itemModalRef} >
                <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'>
                    <div className='modal-content'>
                        <div className="modal-header bg-light">
                            <h6 className="modal-title fw-bold text-primary">
                                <i className="bi bi-pencil-square me-2"></i>
                                Edit Item
                                <span className="text-muted ms-2">
                                    ({editItem.name || "Item"})
                                </span>
                            </h6>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className='modal-body d-flex row gap-2'>
                            {/* Name -- Batch No */}
                            <div className="mb-3">
                                <h6 className="text-secondary fw-semibold mb-2">
                                    Basic Details
                                </h6>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Item Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editItem.name}
                                            onChange={(e) =>
                                                seteditItem({ ...editItem, name: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Batch No</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editItem.batch_no}
                                            onChange={(e) =>
                                                seteditItem({ ...editItem, batch_no: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Expiry -- Convert Unit -- GST */}
                            <div className="mb-3">
                                <h6 className="text-secondary fw-semibold mb-2">
                                    Stock & Tax
                                </h6>

                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Expiry Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={editItem.expiry_date}
                                            onChange={(e) =>
                                                seteditItem({ ...editItem, expiry_date: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Convert Unit</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editItem.convert_unit}
                                            onChange={(e) =>
                                                seteditItem({ ...editItem, convert_unit: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">GST</label>
                                        <select
                                            className="form-select"
                                            value={editItem.gst}
                                            onChange={(e) =>
                                                seteditItem({ ...editItem, gst: e.target.value })
                                            }
                                        >
                                            <option disabled value="">
                                                -- Select GST --
                                            </option>
                                            <option value="0">0%</option>
                                            <option value="5">5%</option>
                                            <option value="12">12%</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity -- Free */}
                            <div className="mb-3">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editItem.quantity}
                                            onChange={(e) =>
                                                seteditItem({ ...editItem, quantity: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Free</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editItem.free}
                                            onChange={(e) =>
                                                seteditItem({ ...editItem, free: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Purchase Rate -- MRP */}
                            <div>
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Purchase Rate</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editItem.purchase_rate}
                                            onChange={(e) =>
                                                seteditItem({ ...editItem, purchase_rate: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">MRP</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editItem.mrp}
                                            onChange={(e) =>
                                                seteditItem({ ...editItem, mrp: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Selling Rate</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editItem.selling_price}
                                            onChange={(e) =>
                                                seteditItem({ ...editItem, selling_price: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="modal-footer bg-light">
                            <button
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-warning"
                                onClick={HandleItemSave}
                            >
                                <i className="bi bi-save me-1"></i>
                                Save Changes
                            </button>
                        </div>


                    </div>
                </div>
            </div >

            {/* Delete Item Modal */}
            <div className="modal fade" id="delete-item-modal" ref={deleteModalRef}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        {/* Header */}
                        <div className="modal-header bg-light">
                            <h6 className="modal-title text-danger fw-bold">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                Confirm Delete
                            </h6>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body">
                            <p className="mb-2">
                                Are you sure you want to delete the following item?
                            </p>

                            <div className="border rounded p-2 bg-light">
                                <strong className="text-danger">
                                    {deleteItem?.name || "Selected Item"}
                                </strong>
                                {deleteItem?.batch_no && (
                                    <div className="text-muted small">
                                        Batch: {deleteItem.batch_no}
                                    </div>
                                )}
                            </div>

                            <p className="text-muted small mt-2 mb-0">
                                This action cannot be undone.
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="modal-footer bg-light">
                            <button
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={HandleDelete}
                            >
                                <i className="bi bi-trash me-1"></i>
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </>

    )
}
