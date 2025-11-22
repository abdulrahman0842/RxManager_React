import React from "react";

export const EditModal = ({
  companies,
  selectedCompany,
  setCompanies,
  setSelectedCompany,
}) => {
  function HandleUpdateClick() {
    // Find the index of the selected company in the array
    const index = companies.findIndex(
      (company) => company.code === selectedCompany.code
    );

    if (index !== -1) {
      // Create a copy of the array
      const updatedCompanies = [...companies];
      updatedCompanies[index] = { ...selectedCompany };

      setCompanies(updatedCompanies);
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="modal fade" id="editModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">
              Edit Company
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <dl className="w-100 p-2">
              <dt>Name</dt>
              <dd>
                <input
                  className="form-control"
                  type="text"
                  onChange={handleInputChange}
                  name="name"
                  value={selectedCompany.name}
                />
              </dd>
              <dt>Code</dt>
              <dd>
                <input
                  className="form-control"
                  type="text"
                  name="code"
                  onChange={handleInputChange}
                  value={selectedCompany.code}
                />
              </dd>
            </dl>
          </div>
          <div className="modal-footer">
            <button
              data-bs-dismiss="modal"
              className="btn btn-success w-100 mt-2"
              onClick={HandleUpdateClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
