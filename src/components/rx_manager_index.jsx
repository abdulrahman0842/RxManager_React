import { Routes, Route, Link } from "react-router-dom";
import { RxManagerHome } from "./rx_manager_home";
import { NavBar } from "./NavBar";
import { AgencyHome } from "./agency-manager/AgencyHome";
import { ItemTypeHome } from "./item-type-manager/ItemTypeHome";
import { StorageHome } from "./storage-manager/StorageHome";
import { CompanyHome } from "./company-manager/CompanyHome";
export function RxManagerIndex() {


  return (
    <div>
      <NavBar />


      <Routes>
        <Route path="/" element={<RxManagerHome />} />
        <Route path="/agency-manager/*" element={<AgencyHome />} />
        <Route path="/item-type-manager/*" element={<ItemTypeHome />} />
        <Route path="/storage-manager/*" element={<StorageHome />} />
        <Route path="/company-manager/*" element={<CompanyHome />} />


        <Route path="*" element={<div>Path Not Found</div>} />
      </Routes>
    </div>
  );
}
