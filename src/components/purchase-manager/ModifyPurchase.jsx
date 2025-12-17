import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { getPurchaseInvoiceEndpoint } from "../../utils/endpoints"
import { useNavigate } from "react-router-dom"

export const ModifyPurchase = () => {

  const [invoices, setinvoices] = useState([])

  const navigate = useNavigate();
  const deleteModalRef = useRef(null);

  const [deleteInvoice, setdeleteInvoice] = useState({});


  function LoadInvoices() {
    axios.get(getPurchaseInvoiceEndpoint).then(response => {
      setinvoices(response.data)
      console.log(response.data)
    })
  }

  useEffect(() => {
    LoadInvoices();
  }, [])


  function HandleDelete() {

  }
  return (
    <>
      <div className="w-75 mx-auto">

        {/* Section Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-primary mb-0">
            <i className="bi bi-receipt-cutoff me-2"></i>
            Modify Purchase Invoices
          </h5>
        </div>

        {/* Table Container */}
        <div
          className="rounded shadow-sm border bg-white overflow-auto"
          style={{ height: "70vh" }}
        >
          <table className="table table-hover align-middle mb-0">

            {/* Sticky Header */}
            <thead className="table-light position-sticky top-0">
              <tr>
                <th style={{ width: "70px" }}>#</th>
                <th>Invoice No</th>
                <th>Invoice Date</th>
                <th>Supplier</th>
                <th className="text-end">Amount Payable</th>
                <th className="text-center" style={{ width: "160px" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {invoices.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    <i className="bi bi-inbox fs-3 d-block mb-2"></i>
                    No invoices found
                  </td>
                </tr>
              )}

              {invoices.map((invoice, index) => (
                <tr key={invoice._id}>
                  <td>{index + 1}</td>

                  <td className="fw-semibold">
                    {invoice.invoice_no}
                  </td>

                  <td>{invoice.invoice_date}</td>

                  <td>{invoice.supplier.name}</td>

                  <td className="text-end fw-bold text-success">
                    ₹ {invoice.amount_payable}
                  </td>

                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">

                      {/* Edit */}
                      <button
                        className="btn btn-sm btn-outline-warning"
                        title="Edit Invoice"
                        onClick={() =>
                          navigate("/purchase-manager/update-invoice", {
                            state: invoice,
                          })
                        }
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      {/* Delete */}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete Invoice"
                        data-bs-toggle="modal"
                        data-bs-target="#delete-invoice-modal"
                        onClick={() => setdeleteInvoice(invoice)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>

                      {/* Info */}
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        title="View Details"
                        onClick={() => { navigate('/purchase-manager/view-invoice', { state: invoice }) }}
                      >
                        <i className="bi bi-info-circle"></i>
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Invoice Modal */}
      <div
        className="modal fade"
        id="delete-invoice-modal"
        ref={deleteModalRef}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">

            {/* Header */}
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Delete Invoice
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <p className="text-danger fw-semibold">
                Are you sure you want to delete this invoice?
                <br />
                <small>This action cannot be undone.</small>
              </p>

              <div className="border rounded p-3 bg-light">
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Invoice No:</span>
                  <span>{deleteInvoice?.invoice_no}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Invoice Date:</span>
                  <span>{deleteInvoice?.invoice_date}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Supplier:</span>
                  <span>{deleteInvoice?.supplier?.name}</span>
                </div>

                <div className="d-flex justify-content-between text-danger fw-bold">
                  <span>Amount Payable:</span>
                  <span>₹ {deleteInvoice?.amount_payable}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={HandleDelete}
              >
                <i className="bi bi-trash me-1"></i>
                Delete Invoice
              </button>
            </div>

          </div>
        </div>
      </div></>

  )
}
