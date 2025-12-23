import { useLocation, useNavigate } from "react-router-dom";

export const ViewInvoice = () => {
    const { state: invoice } = useLocation();
    const navigate = useNavigate();

    if (!invoice) {
        return (
            <div className="text-center mt-5 text-danger fw-bold">
                No Invoice Data Found
            </div>
        );
    }

    const {
        invoice_no,
        invoice_date,
        supplier,
        items,
        total_amount,
        discount_percent,
        discount_amount,
        amount_payable,
    } = invoice;

    return (
        <div className="container-fluid bg-light p-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold">Invoice Details</h4>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>

            {/* Invoice Header Card */}
            <div className="bg-white border rounded shadow-sm p-4 mb-3">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="fw-bold mb-1">
                            Invoice No: <span className="text-primary">{invoice_no}</span>
                        </h5>
                        <div className="text-muted">
                            Supplier: <strong>{supplier?.name}</strong>
                        </div>
                    </div>

                    <div className="text-end">
                        <div className="fw-semibold">Invoice Date</div>
                        <div>{invoice_date}</div>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="bg-white border rounded shadow-sm p-3 mb-3">
                <h6 className="fw-bold mb-3 text-secondary">Items</h6>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-sm">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Medicine</th>
                                <th>Batch</th>
                                <th>Expiry</th>
                                <th>Qty</th>
                                <th>Free</th>
                                <th>Purchase</th>
                                <th>MRP</th>
                                <th>Selling</th>
                                <th>GST %</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="fw-semibold">{item.name}</td>
                                    <td>{item.batch_no}</td>
                                    <td>{item.expiry_date}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.free}</td>
                                    <td>{item.purchase_rate}</td>
                                    <td>{item.mrp}</td>
                                    <td>{item.selling_price}</td>
                                    <td>{item.gst}%</td>
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
                            <span>Total Amount</span>
                            <span className="fw-semibold">₹ {total_amount}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span>Discount ({discount_percent}%)</span>
                            <span>₹ {discount_amount}</span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between fs-5">
                            <span className="fw-bold">Amount Payable</span>
                            <span className="fw-bold text-success">
                                ₹ {amount_payable}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
