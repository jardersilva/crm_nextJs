'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormAgents from "@/components/Forms/agents/form-agents";
import { useLayoutEffect, useState } from "react";
import { IUser } from "@/interfaces/IUsers";
import { show } from "@/repository/agentsRepository";
import { ToastNotification } from "@/components/toast-notification";


const CadAgentPage = ({ params: { id } }: { params: { id: string } }) => {
  const [agents, setAgents] = useState<IUser | null>(null)
  useLayoutEffect(() => {
    const fetchTournaments = async () => {
      try {
        const agent: IUser = await show(id)
        setAgents({
          ...agent,
          password: ''
        })
      } catch (error) {
        ToastNotification({
          message: "Erro ao buscar agente",
          type: 'error',
        })
      }
    }
    fetchTournaments()
  }, [id])
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Editar um agente" />

      <div className="flex flex-col gap-9">
        <FormAgents user={agents} />
      </div>
    </DefaultLayout>
  );
};

export default CadAgentPage;
