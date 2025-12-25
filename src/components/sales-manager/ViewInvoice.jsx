import { useLocation, useNavigate } from "react-router-dom";

export const ViewSalesInvoice = () => {
    const { state: invoice } = useLocation();
    const navigate = useNavigate();

    if (!invoice) {
        return (
            <div className="text-center mt-5 text-danger fw-bold">
                No Sales Invoice Data Found
            </div>
        );
    }

    const {
        invoice_no,
        date,
        patient_details,
        doctor,
        items,
        mrp_total,
        selling_rate_total,
        discount_amount
    } = invoice;

    return (
        <div className="container-fluid bg-light p-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold">
                    <i className="bi bi-receipt me-2"></i>
                    Sales Invoice Details
                </h4>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>

            {/* Invoice Header */}
            <div className="bg-white border rounded shadow-sm p-4 mb-3">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="fw-bold mb-1">
                            Invoice No:
                            <span className="text-primary ms-2">{invoice_no}</span>
                        </h5>

                        <div className="text-muted">
                            Patient:
                            <strong className="ms-1">
                                {patient_details?.name}
                            </strong>
                        </div>

                        <div className="text-muted">
                            Doctor:
                            <strong className="ms-1">
                                {doctor?.name || "—"}
                            </strong>
                        </div>
                    </div>

                    <div className="text-end">
                        <div className="fw-semibold">Invoice Date</div>
                        <div>{date}</div>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="bg-white border rounded shadow-sm p-3 mb-3">
                <h6 className="fw-bold mb-3 text-secondary">
                    Sold Items
                </h6>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-sm">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Medicine</th>
                                <th>Batch</th>
                                <th>Expiry</th>
                                <th>Qty</th>
                                <th>MRP / Unit</th>
                                <th>Selling / Unit</th>
                                <th>Total MRP</th>
                                <th>Total Selling</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="fw-semibold">
                                        {item.name}
                                    </td>
                                    <td>{item.batch_no}</td>
                                    <td>{item.expiry_date}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹ {item.mrp_per_unit}</td>
                                    <td>₹ {item.selling_price_per_unit}</td>
                                    <td className="fw-semibold">
                                        ₹ {item.total_mrp}
                                    </td>
                                    <td className="fw-semibold text-success">
                                        ₹ {item.total_selling_rate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Summary */}
            <div className="row justify-content-end">
                <div className="col-4">
                    <div className="bg-white border rounded shadow-sm p-4">
                        <h6 className="fw-bold text-primary mb-3">
                            Invoice Summary
                        </h6>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Total MRP</span>
                            <span className="fw-semibold">
                                ₹ {mrp_total}
                            </span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Total Selling</span>
                            <span className="fw-semibold text-success">
                                ₹ {selling_rate_total}
                            </span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Discount</span>
                            <span className="fw-semibold text-danger">
                                ₹ {discount_amount}
                            </span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between fs-5">
                            <span className="fw-bold">Amount Payable</span>
                            <span className="fw-bold text-success">
                                ₹ {selling_rate_total}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
