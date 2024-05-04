'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useLayoutEffect, useState } from "react";
import { IUser } from "@/interfaces/IUsers";
import { list } from "@/repository/agentsRepository";
import { ToastNotification } from "@/components/toast-notification";
import { IClientes } from "@/interfaces/IClientes";
import { show } from "@/repository/clientsRepository";
import FormCliente from "@/components/Forms/clientes/form-cliente";


const CadClientPage = ({ params: { id } }: { params: { id: string } }) => {
  const [agents, setAgents] = useState<IUser[]>([])
  const [clientes, setClientes] = useState<IClientes>()
  useLayoutEffect(() => {
    const fetchTournaments = async () => {
      try {
        const agent = await list(1000, 1)
        const client = await show(id)
        setAgents(agent.agents)
        setClientes(client)
      } catch (error) {
        ToastNotification({
          message: "Erro ao buscar cliente",
          type: 'error',
        })
      }
    }
    fetchTournaments()
  }, [id])
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Editar um cliente" />

      <div className="flex flex-col gap-9">
        <FormCliente cliente={clientes} agents={agents} />
      </div>
    </DefaultLayout>
  );
};

export default CadClientPage;
