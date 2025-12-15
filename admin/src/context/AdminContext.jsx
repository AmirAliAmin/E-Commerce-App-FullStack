import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
  const value = {
    sidebarOpen,setSidebarOpen
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
