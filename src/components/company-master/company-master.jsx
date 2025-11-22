import axios from "axios";
import { useEffect, useState } from "react";
import { EditModal } from "../edit-modal";

const CompanyMaster = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({});

  function LoadCompanies() {
    axios
      .get("/data/companies.json")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    LoadCompanies();
  }, []);

  return (
    <>
      <EditModal
        companies={companies}
        selectedCompany={selectedCompany}
        setCompanies={setCompanies}
        setSelectedCompany={setSelectedCompany}
      />

      <div className="container mt-4 bg-light" style={{ maxWidth: "800px" }}>
        <h3 className="text-center">Company Master</h3>
        <div className="mt-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Name</th>
                <th>Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{company.name}</td>
                  <td>{company.code}</td>
                  <td>
                    <span
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => setSelectedCompany(company)}
                      className="bi bi-pen btn btn-warning"
                    ></span>
                    <span className="btn btn-danger bi bi-trash mx-2"></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CompanyMaster;
