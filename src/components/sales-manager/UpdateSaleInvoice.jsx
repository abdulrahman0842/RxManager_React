import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UpdateSaleInvoice = () => {
    const { state: invoice } = useLocation();
    const navigate = useNavigate();

    const [invoice_no, setInvoiceNo] = useState("");
    const [invoice_date, setInvoiceDate] = useState("");
    const [patient, setPatient] = useState({ name: "", mobile_no: "" });
    const [doctor, setDoctor] = useState({ name: "", license_no: "" });

    const [items, setItems] = useState([]);

    const [mrpTotal, setMrpTotal] = useState(0);
    const [sellingTotal, setSellingTotal] = useState(0);
    const discountAmount = mrpTotal - sellingTotal;

    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);

    const editModalRef = useRef(null);
    const editModalInstance = useRef(null)
    const deleteModalRef = useRef(null);
    const deleteModalInstance = useRef(null)

    /* ---------------- Load Invoice ---------------- */
    useEffect(() => {
        if (!invoice) return;

        setInvoiceNo(invoice.invoice_no);
        setInvoiceDate(invoice.date);
        setPatient(invoice.patient_details);
        setDoctor(invoice.doctor);
        setItems(invoice.items);

        setMrpTotal(invoice.mrp_total);
        setSellingTotal(invoice.selling_rate_total);
    }, [invoice]);

    /* ---------------- Item Save ---------------- */
    function handleItemSave() {
        if (!editItem) return;

        const index = items.findIndex(
            (i) => i.medicine_id === editItem.medicine_id
        );

        if (index === -1) return;

        const oldItem = items[index];

        const oldMrp = oldItem.total_mrp;
        const oldSelling = oldItem.total_selling_rate;

        const newMrp =
            editItem.quantity * editItem.mrp_per_unit;
        const newSelling =
            editItem.quantity * editItem.selling_price_per_unit;

        const updatedItem = {
            ...editItem,
            total_mrp: newMrp,
            total_selling_rate: newSelling,
        };

        const updatedItems = [...items];
        updatedItems[index] = updatedItem;

        setItems(updatedItems);
        setMrpTotal((prev) => prev - oldMrp + newMrp);
        setSellingTotal((prev) => prev - oldSelling + newSelling);

        setEditItem(null);

        window.bootstrap.Modal.getInstance(editModalRef.current)?.hide();
    }

    /* ---------------- Item Delete ---------------- */
    function handleDeleteItem() {
        const index = items.findIndex(
            (i) => i.medicine_id === deleteItem.medicine_id
        );
        if (index === -1) return;

        setMrpTotal((prev) => prev - deleteItem.total_mrp);
        setSellingTotal((prev) => prev - deleteItem.total_selling_rate);

        setItems(items.filter((i) => i.medicine_id !== deleteItem.medicine_id));
        setDeleteItem(null);

        deleteModalInstance.current?.hide()
    }

    /* ---------------- Invoice Save ---------------- */
    function handleInvoiceSave() {
        if (items.length < 1) {
            alert('Add Atleast one item to continue')
            return;
        }
        const updatedInvoice = {
            invoice_no,
            date: invoice_date,
            patient_details: patient,
            doctor,
            items,
            mrp_total: mrpTotal,
            selling_rate_total: sellingTotal,
            discount_amount: discountAmount,
        };

        console.log("Updated Sales Invoice:", updatedInvoice);
        // API CALL HERE
    }

    useEffect(() => {
        if (editModalRef.current) {
            editModalInstance.current = new Modal(editModalRef.current);
        }
        if (deleteModalRef.current) {
            deleteModalInstance.current = new Modal(deleteModalRef.current)
        }


        return () => {
            editModalInstance.current?.dispose()
            deleteModalInstance.current?.dispose()
        }
    }, [])
    return (
        <>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-primary">
                    <i className="bi bi-pencil-square me-2"></i>
                    Update Sales Invoice
                    <span className="text-muted ms-2">({invoice_no})</span>
                </h5>
            </div>

            <div className="d-flex gap-3">

                {/* LEFT SIDE */}
                <div className="col-9 bg-white border rounded shadow-sm p-3 d-flex flex-column" style={{ height: "70vh" }}>

                    {/* Invoice Header */}
                    <div className="row g-3 mb-3">
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Invoice No</label>
                            <div className="form-control-plaintext fw-bold">
                                {invoice_no}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={invoice_date}
                                onChange={(e) => setInvoiceDate(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Patient</label>
                            <input
                                className="form-control"
                                value={patient.name}
                                onChange={(e) =>
                                    setPatient({ ...patient, name: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="flex-grow-1 overflow-auto border rounded">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light position-sticky top-0">
                                <tr>
                                    <th>#</th>
                                    <th>Medicine</th>
                                    <th>Batch</th>
                                    <th className="text-end">Qty</th>
                                    <th className="text-end">MRP</th>
                                    <th className="text-end">Selling</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="fw-semibold">{item.name}</td>
                                        <td>{item.batch_no}</td>
                                        <td className="text-end">{item.quantity}</td>
                                        <td className="text-end">{item.total_mrp}</td>
                                        <td className="text-end text-success">
                                            {item.total_selling_rate}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-sm btn-outline-warning me-2"

                                                onClick={() => {
                                                    setEditItem({ ...item })
                                                    editModalInstance.current?.show()
                                                }}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"

                                                onClick={() => {
                                                    setDeleteItem(item)

                                                    deleteModalInstance.current?.show()
                                                }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Buttons */}
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                            Back
                        </button>
                        <button className="btn btn-success" onClick={handleInvoiceSave}>
                            Save Invoice
                        </button>
                    </div>
                </div>

                {/* RIGHT SUMMARY */}
                <div className="col-3">
                    <div className="card p-3 shadow-sm">
                        <h6 className="fw-bold text-primary mb-3">Summary</h6>

                        <div className="d-flex justify-content-between">
                            <span>Total MRP</span>
                            <span>₹ {mrpTotal}</span>
                        </div>

                        <div className="d-flex justify-content-between">
                            <span>Selling Total</span>
                            <span className="text-success">₹ {sellingTotal}</span>
                        </div>

                        <div className="d-flex justify-content-between fw-bold text-danger">
                            <span>Discount</span>
                            <span>₹ {discountAmount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* EDIT ITEM MODAL */}
            <div className="modal fade" id="edit-sale-item" ref={editModalRef}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="fw-bold">Edit Item</h6>
                            <button className="btn-close" onClick={() => {
                                editModalInstance.current?.hide()
                            }} />
                        </div>

                        <div className="modal-body">
                            <label className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                value={editItem?.quantity || ""}
                                onChange={(e) =>
                                    setEditItem({
                                        ...editItem,
                                        quantity: Number(e.target.value),
                                    })
                                }
                            />
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => {

                                editModalInstance.current?.hide()
                            }}>
                                Cancel
                            </button>
                            <button className="btn btn-warning" onClick={handleItemSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* DELETE MODAL */}
            <div className="modal fade" id="delete-sale-item" ref={deleteModalRef}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="text-danger fw-bold">Confirm Delete</h6>
                            <button className="btn-close" onClick={() => {

                                deleteModalInstance.current?.hide()
                            }} />
                        </div>

                        <div className="modal-body">
                            Delete <strong>{deleteItem?.name}</strong>?
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => {

                                deleteModalInstance.current?.hide()
                            }}>
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={handleDeleteItem}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
