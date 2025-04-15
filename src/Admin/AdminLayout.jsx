
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";
import AdminHeader from "../Components/AdminHeader";
import AdminFooter from "../Components/AdminFooter";

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar></AdminSidebar>
      <div className="flex-1 p-6">
        <AdminHeader></AdminHeader>
        <Outlet />
        <AdminFooter></AdminFooter>
      </div>
    </div>
  );
};

export default AdminLayout;
