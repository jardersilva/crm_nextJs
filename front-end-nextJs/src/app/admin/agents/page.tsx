'use client'
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableAgentes from "@/components/Tables/TableAgentes";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { list } from "@/repository/agentsRepository";


const AgentsPage = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await list(10, 1);
      setAgents(data.agents);
    }
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Agentes" />

      <div className="flex flex-col gap-10">
        <TableAgentes data={agents} />
      </div>
    </DefaultLayout>
  );
};

export default AgentsPage;
