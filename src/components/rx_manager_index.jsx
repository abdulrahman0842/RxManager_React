import { Routes, Route } from "react-router-dom";
import { RxManagerHome } from "./rx_manager_home";
import { NavBar } from "./NavBar";
import { AgencyHome } from "./agency-manager/AgencyHome";
import { ItemTypeHome } from "./item-type-manager/ItemTypeHome";
import { StorageHome } from "./storage-manager/StorageHome";
import { CompanyHome } from "./company-manager/CompanyHome";
import { ContentHome } from "./content-manager/ContentHome";
import { MedicineHome } from "./medicine-manager/MedicineHome";
import { PurchaseHome } from "./purchase-manager/PurchaseHome";

export function RxManagerIndex() {


  return (
    <div>
      <NavBar />

      <section className="bg-light w-100 p-0 m-0 " style={{height:'90vh'}}>
        <Routes>
          <Route path="/" element={<RxManagerHome />} />
          <Route path="/agency-manager/*" element={<AgencyHome />} />
          <Route path="/item-type-manager/*" element={<ItemTypeHome />} />
          <Route path="/storage-manager/*" element={<StorageHome />} />
          <Route path="/company-manager/*" element={<CompanyHome />} />
          <Route path="/content-manager/*" element={<ContentHome />} />
          <Route path="/medicine-manager/*" element={<MedicineHome />} />
          <Route path="/purchase-manager/*" element={<PurchaseHome />} />



          <Route path="*" element={<h2 className="text-center m-4"> Path Not Found</h2>} />
        </Routes>
      </section>
    </div>
  );
}
