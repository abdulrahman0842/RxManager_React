import axios from "axios"
import { useState, useEffect } from "react"
import { getPurchaseInvoiceEndpoint } from "../../utils/endpoints"
import { useNavigate } from "react-router-dom"

export const ModifyPurchase = () => {

  const [invoices, setinvoices] = useState([])

  const navigate = useNavigate();


  function LoadInvoices() {
    axios.get(getPurchaseInvoiceEndpoint).then(response => {
      setinvoices(response.data)
      console.log(response.data)
    })
  }

  useEffect(() => {
    LoadInvoices();
  }, [])

  return (
    <div className="w-75">
      <div className="fw-bold m-2">ModifyPurchase</div>
      <div className="rounded shadow border overflow-auto" style={{ height: "70vh" }}>
        <table className="table table-hover p-2 ">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Invoice No</th>
              <th>Invoice Date</th>
              <th>Supplier</th>
              <th>Amount Payable</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {invoices.map((invoice, index) => {
              return <tr key={invoice._id}>
                <td>{index + 1}</td>
                <td>{invoice.invoice_no}</td>
                <td>{invoice.invoice_date}</td>
                <td>{invoice.supplier.name}</td>
                <td>{invoice.amount_payable}</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-warning bi bi-pen" onClick={() => {
                    navigate("/purchase-manager/update-invoice", {
                      state: invoice
                    });

                  }}></button>
                  <button className="btn btn-danger bi bi-trash"></button>
                  <button className="btn btn-secondary bi bi-info"></button>
                </td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
