import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'

import { getBatchesEndpoint, getMedicinesEndpoint } from '../../utils/endpoints';
import { Modal } from 'bootstrap';
export const AddSale = () => {
    const addItemModalRef = useRef(null);
    const addItemModalInstance = useRef(null);
    const editItemModalRef = useRef(null);
    const editItemModalInstance = useRef(null);
    const checkOutModalRef = useRef(null);
    const checkOutModalInstance = useRef(null);

    const [medicines, setmedicines] = useState([]);
    const [filteredMedicines, setfilteredMedicines] = useState([])
    const [query, setquery] = useState('')

    const [selectedMedicine, setselectedMedicine] = useState(null)
    const [selectedMedicineBatches, setselectedMedicineBatches] = useState({
        "catch": "update the agency , different agency have diffrent purchase rate update agency and store purchase rate and selling rate based on agency",
        "medicine_id": "as45",
        "total_stock": 500,
        "total_batch": 6,
        "batches": [
            {
                "batch_no": "IBU45",
                "stock": 45,
                "expiry_date": "03/2026",
                "purchase_rate": 30,
                "selling_price": 45,
                "mrp": 60,
                "tax": 12,
                "convert_unit": 15,
                "purchase_rate_per_unit": 2,
                "selling_price_per_unit": 3,
                "mrp_per_unit": 4,
                "agencies": [
                    {
                        "id": "",
                        "name": ""
                    }
                ]
            },
            {
                "batch_no": "IBU85",
                "stock": 150,
                "expiry_date": "10/2026",
                "purchase_rate": 60,
                "selling_price": 90,
                "mrp": 120,
                "tax": 12,
                "convert_unit": 30,
                "purchase_rate_per_unit": 2,
                "selling_price_per_unit": 3,
                "mrp_per_unit": 4,
                "agencies": [
                    {
                        "id": "",
                        "name": ""
                    }
                ]
            }
        ]
    })
    const [selectedBatchNo, setselectedBatchNo] = useState('') // For Select Input
    const [selectedBatch, setselectedBatch] = useState(null)

    const [items, setitems] = useState([])
    const [itemQuantity, setitemQuantity] = useState(0)
    const [itemSellingRateTotal, setitemSellingRateTotal] = useState(0)
    const [itemMrpTotal, setitemMrpTotal] = useState(0)


    const [invoiceTotalMrp, setinvoiceTotalMrp] = useState(0);
    const [invoiceTotalSellingRate, setinvoiceTotalSellingRate] = useState(0)


    const [selectedItem, setselectedItem] = useState(null)


    const [patientDetails, setpatientDetails] = useState({ name: null, mobile_no: null })
    const [doctorDetails, setdoctorDetails] = useState({ name: null, license_no: null })





    function LoadMedicines() {
        axios.get(getMedicinesEndpoint).then(response => {
            setmedicines(response.data)
        })
    }

    function SearchMedicines(query) {
        const results = medicines.filter(med => med.name.toLowerCase().includes(query.toLowerCase()));
        setfilteredMedicines(results)
    }

    function LoadBatches(medicine_id) {
        axios.get(`${getBatchesEndpoint}/${medicine_id}`).then(
            response => setselectedMedicineBatches(response.data)
        )
    }

    function ValidateItem() {
        if (!selectedMedicine) {
            alert('Select a Medicine First!')
            return false;
        }
        if (!selectedBatch) {
            alert('Select a Batch First')
            return false;
        }
        if (parseInt(itemQuantity) > selectedBatch?.stock || 0) {
            alert('Not enough stock avaiable')
            return false;
        }
        if (isNaN(parseInt(itemQuantity)) || parseInt(itemQuantity) === 0) {
            alert("Quantity can't be zero")
            return false;
        }
        return true;
    }

    function AddItem() {
        if (!ValidateItem()) return;

        const newItem = {
            medicine_id: selectedMedicine.id,
            name: selectedMedicine.name,
            batch_no: selectedBatch.batch_no,
            mrp: parseFloat(selectedBatch.mrp),
            selling_price: parseFloat(selectedBatch.selling_price),
            pack_size: selectedBatch.convert_unit,
            mrp_per_unit: parseFloat(selectedBatch.mrp_per_unit),
            selling_price_per_unit: parseFloat(selectedBatch.selling_price_per_unit),
            quantity: Number(itemQuantity),
            expiry_date: selectedBatch?.expiry_date,
            totalSellingRate: itemSellingRateTotal,
            totalMrp: itemMrpTotal
        }

        setitems(prev => [...prev, newItem])
        setselectedBatch(null)
        setselectedBatchNo('')
        setselectedMedicine(null)
        setitemQuantity(0)
        setitemSellingRateTotal(0)
        setitemMrpTotal(0)

        setinvoiceTotalMrp(prev => prev + Number(itemMrpTotal))
        setinvoiceTotalSellingRate(prev => prev + Number(itemSellingRateTotal))

        addItemModalInstance.current?.hide()
    }

    function DeleteItem(medicine_id) {
        const item = items.find(item => item.medicine_id === medicine_id)
        setinvoiceTotalMrp(prev => prev - item.totalMrp)
        setinvoiceTotalSellingRate(prev => prev - item.totalSellingRate)
        setitems(prev => prev.filter(item => item.medicine_id !== medicine_id))
    }

    function UpdateItemQuantity() {

        const item = items.find(i => i.medicine_id === selectedItem.medicine_id)

        if (selectedItem.quantity > item.quantity) {
            const mrpDiffrenece = selectedItem.totalMrp - item.totalMrp;
            const sellingRateDifference = selectedItem.totalSellingRate - item.totalSellingRate
            setinvoiceTotalMrp(prev => prev + mrpDiffrenece)
            setinvoiceTotalSellingRate(prev => prev + sellingRateDifference)
        } else {
            const mrpDiffrenece = item.totalMrp - selectedItem.totalMrp
            const sellingRateDiffrence = item.totalSellingRate - selectedItem.totalSellingRate
            setinvoiceTotalMrp(prev => prev - mrpDiffrenece)
            setinvoiceTotalSellingRate(prev => prev - sellingRateDiffrence)
        }

        const index = items.findIndex(item => item.medicine_id === selectedItem.medicine_id)
        const newItems = items;
        newItems[index] = selectedItem
        setitems(newItems);
        setselectedItem(null)
        setitemQuantity(0)

        editItemModalInstance.current?.hide();


    }
    function HandleProceed() {
        if (items.length < 1) {
            alert('Add atleast one item to proceed.');
            return;
        }
        checkOutModalInstance.current?.show()
    }

    function SaveInvoice(printInvoice = false) {

        const invoice = {
            items: items,
            mrp_total: invoiceTotalMrp,
            selling_rate_total: invoiceTotalSellingRate,
            discount_amount: invoiceTotalMrp - invoiceTotalSellingRate,
            patient_details: patientDetails,
            doctor_details: doctorDetails
        }

        setitems([])
        setinvoiceTotalMrp(0)
        setinvoiceTotalSellingRate(0)
        setpatientDetails({
            name: null, mobile_no: null
        })
        setdoctorDetails({
            name: null,
            license_no: null
        })
        console.log(invoice)
        if (printInvoice) {
            console.log('Printing Invoice... ')
        }
        checkOutModalInstance.current?.hide();
    }

    useEffect(() => {
        LoadMedicines();
    }, [])

    useEffect(() => {

        if (!query || query === "") return;

        if (query.length < 2) {
            setfilteredMedicines([]);
            return;
        }

        const timer = setTimeout(() => {
            if (query.length >= 2) {
                SearchMedicines(query);
            }
        }, 300)

        return () => clearTimeout(timer)

    }, [query])

    useEffect(() => {
        if (addItemModalRef.current) {
            addItemModalInstance.current = new Modal(addItemModalRef.current);
        }
        if (editItemModalRef.current) {
            editItemModalInstance.current = new Modal(editItemModalRef.current);
        }
        if (checkOutModalRef.current) {
            checkOutModalInstance.current = new Modal(checkOutModalRef.current);
        }

        return () => {
            addItemModalInstance.current?.dispose()
            editItemModalInstance.current?.dispose()
            checkOutModalInstance.current?.dispose();
        }

    }, [])

    return (
        <>
            <div>
                {/* Header */}
                <div className="mb-3">
                    <h4 className="fw-bold text-primary mb-0">Add Sale Invoice</h4>
                </div>

                {/* Main Body */}
                <div className="d-flex gap-2">

                    {/* LEFT COLUMN */}
                    <div className="col-9 bg-white rounded shadow border p-4 d-flex flex-column" style={{ height: "70vh" }}>

                        {/* Items Table */}
                        <div className="flex-grow-1 overflow-auto border rounded">
                            <table className="table table-sm table-hover mb-0">
                                <thead className="table-light sticky-top">
                                    <tr>
                                        <th>#</th>
                                        <th>Medicine</th>
                                        <th>Batch</th>
                                        <th>Qty</th>
                                        <th>Rate</th>
                                        <th>Total</th>
                                        <th>MRP</th>
                                        <th>Selling Rate</th>
                                        <th>Expiry</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td className="fw-semibold">{item.name}</td>
                                            <td>
                                                {item.batch_no}
                                                <small className="text-muted"> ({item.pack_size}s)</small>
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>{item.selling_price_per_unit}</td>
                                            <td className="fw-semibold">{item.totalSellingRate}</td>
                                            <td>{item.mrp}</td>
                                            <td>{item.selling_price}</td>
                                            <td>{item.expiry_date}</td>
                                            <td>
                                                <button className='btn text-warning bi bi-pen' onClick={() => {
                                                    setselectedItem(item)
                                                    editItemModalInstance.current?.show();
                                                }}></button>
                                                <button className='btn text-danger bi bi-trash' onClick={() => { DeleteItem(item.medicine_id) }}></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Bottom Buttons */}
                        <div className="d-flex justify-content-between mt-3">
                            <button className="btn btn-outline-danger w-25">
                                <i className="bi bi-arrow-left me-1"></i> Back
                            </button>

                            <div className="d-flex gap-3 w-50">
                                <button
                                    className="btn btn-outline-secondary flex-fill"

                                    onClick={() => { addItemModalInstance.current?.show() }}
                                >
                                    <i className="bi bi-plus-circle me-1"></i> Add Item
                                </button>

                                <button
                                    className="btn btn-success flex-fill"
                                    onClick={HandleProceed}

                                >
                                    <i className="bi bi-receipt me-1"></i> Proceed
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN SUMMARY */}
                    <div className="col-3">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h6 className="fw-bold text-primary mb-3">Bill Summary</h6>

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Total MRP</span>
                                    <span>{invoiceTotalMrp}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2 text-success">
                                    <span>Discount</span>
                                    <span>{invoiceTotalMrp - invoiceTotalSellingRate}</span>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between fs-5">
                                    <span className="fw-bold">Payable</span>
                                    <span className="fw-bold text-success">{invoiceTotalSellingRate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Item Model */}
            <div className="modal fade" id="sale-item-modal" ref={addItemModalRef}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5>Add Item</h5>
                        </div>

                        <div className="modal-body  ">
                            <div className="row g-4">

                                {/* MEDICINE COLUMN */}
                                <div className="col-6 position-relative">
                                    <label className="form-label">Medicine</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={query}
                                        placeholder="Search medicine"
                                        onChange={(e) => setquery(e.target.value)}
                                    />
                                    {query.length >= 2 && filteredMedicines.length > 0 && (
                                        <ul className="list-group position-absolute w-100 shadow z-3">
                                            {filteredMedicines.map(med => (
                                                <li
                                                    key={med.id}
                                                    className="list-group-item list-group-item-action"
                                                    onClick={() => {
                                                        setselectedMedicine(med);
                                                        setquery("");
                                                    }}
                                                >
                                                    <div className="fw-semibold">{med.name}</div>
                                                    <small className="text-muted">
                                                        {med.item_type} • {med.storage}
                                                    </small>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Medicine Info */}
                                    {selectedMedicine && (
                                        <div className="border rounded p-3 bg-light mt-2 small">
                                            <div className="fw-semibold">{selectedMedicine.name}</div>
                                            <div className="text-muted">
                                                {selectedMedicine.item_type} • Pack of {selectedMedicine.convert_unit}
                                            </div>
                                            <hr className="my-2" />
                                            <div><strong>Company:</strong> {selectedMedicine.company}</div>
                                            <div><strong>Storage:</strong> {selectedMedicine.storage}</div>
                                        </div>
                                    )}
                                </div>

                                {/* BATCH COLUMN */}
                                <div className="col-6">
                                    <label className="form-label">Batch</label>

                                    <select
                                        className="form-select"
                                        value={selectedBatchNo}
                                        disabled={!selectedMedicine}
                                        onChange={(e) => {
                                            const batch = selectedMedicineBatches.batches.find(
                                                b => b.batch_no === e.target.value
                                            );
                                            setselectedBatchNo(e.target.value);
                                            setselectedBatch(batch);
                                        }}
                                    >
                                        <option value="" disabled>-- Select Batch --</option>
                                        {selectedMedicineBatches?.batches?.map(batch => (
                                            <option key={batch.batch_no} value={batch.batch_no} className='d-flex justify-content-between'>
                                                {batch.batch_no} | Exp: {batch.expiry_date} | Stock: {batch.stock}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Batch Info */}
                                    {selectedBatch && (
                                        <div className="border rounded p-3 bg-light mt-2 small">
                                            <div className="fw-semibold">Batch: {selectedBatch.batch_no}</div>
                                            <div className="text-muted">Expiry: {selectedBatch.expiry_date}</div>
                                            <hr className="my-2" />
                                            <div><strong>Stock:</strong> {selectedBatch.stock}</div>
                                            <div><strong>Purchase / Unit:</strong> ₹{selectedBatch.purchase_rate_per_unit}</div>
                                            <div><strong>Selling / Unit:</strong> ₹{selectedBatch.selling_price_per_unit}</div>
                                            <div><strong>MRP / Unit:</strong> ₹{selectedBatch.mrp_rate_per_unit}</div>
                                        </div>
                                    )}
                                </div>

                            </div>

                            {/* Quantity n Pricing */}
                            <div className="row g-3 mt-3">
                                <div className="col-3">
                                    <label className="form-label">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name='itemQuantity'
                                        value={itemQuantity}
                                        onChange={(e) => {
                                            const qty = e.target.value;
                                            setitemQuantity(qty)
                                            setitemSellingRateTotal(selectedBatch?.selling_price_per_unit * qty)
                                            setitemMrpTotal(selectedBatch?.mrp_per_unit * qty)
                                        }}
                                        min={1}
                                        max={selectedBatch?.stock || 0}
                                    />
                                </div>

                                <div className="col-2">
                                    <label className="form-label">Pack Size</label>
                                    <input
                                        className="form-control"
                                        value={selectedBatch?.convert_unit || ""}
                                        disabled
                                    />
                                </div>

                                <div className="col-2">
                                    <label className="form-label">Selling Rate</label>
                                    <input
                                        className="form-control"
                                        value={selectedBatch?.selling_price || ""}
                                        disabled
                                    />
                                </div>

                                <div className="col-2">
                                    <label className="form-label">MRP</label>
                                    <input
                                        className="form-control"
                                        value={selectedBatch?.mrp || ""}
                                        disabled
                                    />
                                </div>
                                <div className='col-3 '>
                                    <label htmlFor="">Total</label>
                                    <div className='fw-bold text-success mt-2 fs-3'>{itemSellingRateTotal}</div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className='btn btn-outline-secondary w-25' onClick={() => { addItemModalInstance.current?.hide() }}>Cancel</button>
                            <button className="btn btn-success w-25" onClick={AddItem}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Item Modal */}
            <div className="modal fade" id="edit-item-modal" ref={editItemModalRef}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        {/* HEADER */}
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Item</h5>
                        </div>

                        {/* BODY */}
                        <div className="modal-body">

                            {/* ITEM SUMMARY */}
                            <div className="border rounded p-3 bg-light mb-3">
                                <div className="fw-semibold fs-5">{selectedItem?.name}</div>
                                <div className="text-muted small">
                                    Batch: {selectedItem?.batch_no} • Exp: {selectedItem?.expiry_date}
                                </div>
                            </div>

                            <div className="row g-3">

                                {/* QUANTITY (ONLY EDITABLE FIELD) */}
                                <div className="col-4">
                                    <label className="form-label">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min={1}
                                        value={selectedItem?.quantity}
                                        onChange={(e) => {
                                            const qty = Number(e.target.value) || 0;
                                            setitemQuantity(qty);
                                            setselectedItem({ ...selectedItem, quantity: qty, totalMrp: qty * selectedItem.mrp_per_unit, totalSellingRate: qty * selectedItem.selling_price_per_unit })
                                        }}
                                    />
                                </div>

                                {/* PACK SIZE */}
                                <div className="col-4">
                                    <label className="form-label">Pack Size</label>
                                    <input
                                        className="form-control"
                                        value={selectedItem?.pack_size || ""}
                                        disabled
                                    />
                                </div>

                                {/* SELLING PRICE */}
                                <div className="col-4">
                                    <label className="form-label">Selling / Unit</label>
                                    <input
                                        className="form-control"
                                        value={selectedItem?.selling_price_per_unit || ""}
                                        disabled
                                    />
                                </div>

                                {/* MRP PER UNIT */}
                                <div className="col-4">
                                    <label className="form-label">MRP / Unit</label>
                                    <input
                                        className="form-control"
                                        value={selectedItem?.mrp_per_unit || ""}
                                        disabled
                                    />
                                </div>

                                {/* TOTAL */}
                                <div className="col-4">
                                    <label className="form-label">Total</label>
                                    <div className="fw-bold text-success fs-4 mt-1">
                                        ₹{selectedItem?.totalSellingRate}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="modal-footer">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    editItemModalInstance.current?.hide();
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={UpdateItemQuantity}
                            >
                                Update Item
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Patient + Doctor Modal */}
            <div className="modal fade" id="patient-doctor-modal" ref={checkOutModalRef}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5>Patient & Doctor Details</h5>
                        </div>

                        <div className="modal-body row g-3">

                            <div className="col-6">
                                <label>Patient Name</label>
                                <input className="form-control" value={patientDetails.name} placeholder='Enter Patient Name' onChange={(e) => { setpatientDetails({ ...patientDetails, name: e.target.value }) }} />
                            </div>

                            <div className="col-6">
                                <label>Patient Phone</label>
                                <input className="form-control" type='tel' value={patientDetails.mobile_no} placeholder='Enter Patient Mobile No.' onChange={(e) => { setpatientDetails({ ...patientDetails, mobile_no: e.target.value }) }} />
                            </div>

                            <div className="col-6">
                                <label>Doctor Name</label>
                                <input className="form-control" value={doctorDetails.name} placeholder='Enter Doctor Name' onChange={(e) => { setdoctorDetails({ ...doctorDetails, name: e.target.value }) }} />
                            </div>

                            <div className="col-6">
                                <label>Doctor License No</label>
                                <input className="form-control" value={doctorDetails.license_no} placeholder='Enter Doctor License No.' onChange={(e) => { setdoctorDetails({ ...doctorDetails, license_no: e.target.value }) }} />
                            </div>

                        </div>

                        <div className="modal-footer d-flex gap-3">
                            <button className="btn btn-outline-secondary flex-fill"
                                onClick={() => {
                                    SaveInvoice(false)
                                }}>
                                Save Bill
                            </button>
                            <button className="btn btn-success flex-fill"
                                onClick={() => {
                                    SaveInvoice(true)
                                }}>
                                Save & Print
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>)
}
