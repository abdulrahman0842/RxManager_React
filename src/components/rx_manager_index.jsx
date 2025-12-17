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
import { SalesHome } from "./sales-manager/SalesHome";
import { AddSale } from "./sales-manager/AddSale"
import { ModifySale } from "./sales-manager/ModifySale"
import { ModifyPurchase } from "./purchase-manager/ModifyPurchase";
import { UpdateInvoice } from "./purchase-manager/UpdateInvoice";
import { AddPurchase } from "./purchase-manager/AddPurchase";
import { ViewInvoice } from "./purchase-manager/ViewInvoice";
export function RxManagerIndex() {


  return (
    <div>
      <NavBar />

      <section className="bg-light w-100 p-0 m-0 " style={{ height: '90vh' }}>
        <Routes>
          <Route path="/" element={<RxManagerHome />} />
          <Route path="/agency-manager/*" element={<AgencyHome />} />
          <Route path="/item-type-manager/*" element={<ItemTypeHome />} />
          <Route path="/storage-manager/*" element={<StorageHome />} />
          <Route path="/company-manager/*" element={<CompanyHome />} />
          <Route path="/content-manager/*" element={<ContentHome />} />
          <Route path="/medicine-manager/*" element={<MedicineHome />} />
          <Route path="purchase-manager/" element={<PurchaseHome />} >
            <Route path="add-purchase" element={<AddPurchase />} />
            <Route path="modify-purchase" element={<ModifyPurchase />} />
            <Route path="update-invoice" element={<UpdateInvoice />} />
            <Route path="view-invoice" element={<ViewInvoice />} />

          </Route>
          <Route path="/sales-manager" element={<SalesHome />} >
            <Route path="add-sale" element={<AddSale />} />
            <Route path="modify-sale" element={<ModifySale />} />
          </Route>




          <Route path="*" element={<h2 className="text-center m-4"> Path Not Found</h2>} />
        </Routes>
      </section>
    </div>
  );
}
