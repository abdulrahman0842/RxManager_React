import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { getMedicinesEndpoint } from '../../utils/endpoints';
import { MedicineForm } from './MedicineForm';
import * as Yup from "yup";
import { getAgenciesEndpoint, getCompaniesEndpoint, getContentsEndpoint, getItemTypesEndpoint, getStorageEndpoint } from '../../utils/endpoints';
export const ModifyMedicine = () => {
  const [medicines, setMedicines] = useState([])
  const [selectedMedicine, setSelectedMedicine] = useState({});
  
  function LoadMedicines() {
    axios.get(getMedicinesEndpoint).then(
      response => {
        setMedicines(response.data);
      }
    )
  }
  const [contents, setContents] = useState([])
  const [companies, setCompanies] = useState([])
  const [storages, setStorages] = useState([])
  const [item_types, setItem_types] = useState([])
  const [agencies, setAgencies] = useState([])

  function LoadSelectOptions() {
    axios.get(getContentsEndpoint).then(response => {
      setContents(response.data);
    })
    axios.get(getCompaniesEndpoint).then(response => {
      setCompanies(response.data);
    })
    axios.get(getStorageEndpoint).then(response => {
      setStorages(response.data);
    })
    axios.get(getItemTypesEndpoint).then(response => {
      setItem_types(response.data);
    })
    axios.get(getAgenciesEndpoint).then(
      response => {
        setAgencies(response.data);
      }
    )
  }


  useEffect(() => {
    LoadSelectOptions()
    LoadMedicines()
  }, [])


  const validationSchema = Yup.object({
    name: Yup.string().required("Medicine Name Required"),
    content: Yup.string().required("Content is Required"),
    company: Yup.string().required("Company is Required"),
    convert_unit: Yup.number().required("Convert Unit Required"),
    storage: Yup.string().required("Storage is Required"),
    item_type: Yup.string().required("Item Type is Required"),
    supplier: Yup.array(Yup.string().required("Supplier is required")),
  })

  const initialValue = {
    name: selectedMedicine?.name,
    content: selectedMedicine?.content,
    company: selectedMedicine?.company,
    convert_unit: selectedMedicine?.convert_unit,
    storage: selectedMedicine?.storage,
    item_type: selectedMedicine?.item_type,
    supplier: [selectedMedicine?.suppliers]
  }

  const HandleSubmit = (values) => {
    console.log(values)
  }




  return (
    <div className='d-flex gap-3' >
      <div className='col-8 bg-white shadow p-2 rounded overflow-auto mb-0' style={{ maxHeight: "500px" }}>
        <table className='table table-hover '>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Name</th>
              <th style={{ width: '45%' }}>Content</th>
              <th style={{ width: '15%' }}>Storage</th>

              <th style={{ width: '10%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(med => (
              <tr key={med.id} onClick={() => { setSelectedMedicine(med); console.log(selectedMedicine) }}>
                <td>{med.name}</td>
                <td>{med.content}</td>
                <td>{med.storage}</td>
                <td className='d-flex'>
                  <button className='bi bi-pen btn text-warning' data-bs-toggle="modal" data-bs-target="#EditModal" onClick={() => { setSelectedMedicine(med) }}></button>
                  <button className='btn bi bi-trash text-danger' data-bs-toggle="modal"
                    data-bs-target="#DeleteModal" onClick={() => { setSelectedMedicine(med) }}
                  ></button></td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>

      <div className='col-4 bg-white shadow-lg p-4 rounded-3'>

        {/* Header Section */}
        <h4 className='border-bottom pb-2 mb-3 text-primary'>
          {selectedMedicine.name}
        </h4>

        {/* Detail Items */}
        <div className='mb-2'>
          <span className='text-muted'>Content:</span>
          <span className='fw-bold fs-6 ms-2'>{selectedMedicine.content}</span>
        </div>

        <div className='mb-2'>
          <span className='text-muted'>Company:</span>
          <span className='fw-bold fs-6 ms-2'>{selectedMedicine.company}</span>
        </div>

        <div className='mb-2'>
          <span className='text-muted'>Type:</span>
          <span className='fw-bold fs-6 ms-2'>{selectedMedicine.item_type}</span>
        </div>

        <div className='mb-3 p-2 bg-light rounded'>
          <span className='text-muted d-block'>Convert Unit:</span>
          <span className='fw-bolder fs-4 text-success'>{selectedMedicine.convert_unit}</span>
        </div>

        {/* Suppliers List using Bootstrap List Group */}
        <div className='mt-3'>
          <h6 className='mb-1 text-secondary'>Suppliers:</h6>
          <ul className='list-group list-group-flush'>
            {selectedMedicine.supplier?.map((item, index) => (
              <li key={index} className='list-group-item px-0 py-1 fw-bold border-0'>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='modal fade' id='EditModal'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4>
                Edit {selectedMedicine.name}</h4>
              <button className='btn btn-close ' data-bs-dismiss="modal"></button>
            </div>
            <div className='modal-body'>

              <MedicineForm agencies={agencies} companies={companies} contents={contents} item_types={item_types} storages={storages} initialValue={initialValue} validationSchema={validationSchema} onSubmit={HandleSubmit} submitText='Submit' key={selectedMedicine.id} />
            </div>
            <div className='modal-footer'></div>
          </div>
        </div>
      </div>

      <div className='modal fade' id='DeleteModal'>
        <div className='modal-dialog '>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='text-danger'>
                Delete {selectedMedicine.name}</h4>
              <button className='btn btn-close ' data-bs-dismiss="modal"></button>
            </div>
            
            <div className='modal-footer'>
              <button className='btn' data-bs-dismiss="modal">Cancel</button>
              <button className='btn btn-danger' data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
