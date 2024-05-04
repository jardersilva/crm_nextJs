'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableClientes from "@/components/Tables/TableClients";
import { list } from "@/repository/clientsRepository";
import { useEffect, useState } from "react";


const ClientesPage = () => {

  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await list(10, 1);
      setClients(data.clients);
    }
    fetchData();
  }, []);
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Clientes" />

      <div className="flex flex-col gap-10">
        <TableClientes data={clients} />
      </div>
    </DefaultLayout>
  );
};

export default ClientesPage;
