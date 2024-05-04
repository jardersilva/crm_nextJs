"use client";
import React, { useLayoutEffect, useState } from "react";
import { relatorio } from "@/repository/clientsRepository";
import { IUser } from "@/interfaces/IUsers";
import { list } from "@/repository/agentsRepository";
import { ToastNotification } from "../toast-notification";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from "@/validators/form-relatorio-validator";
import { IRelatorioRequest } from "@/interfaces/IRelatorio";
import TableClientesRelatorio from "../Tables/TableClientsRelatorio";

const ECommerce: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IRelatorioRequest>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  })
  const [agents, setAgents] = useState<IUser[]>([])
  const [data, setData] = useState<any[]>([])
  useLayoutEffect(() => {
    const fetchTournaments = async () => {
      try {
        const agent = await list(1000, 1)
        setAgents(agent.agents)
      } catch (error) {
        ToastNotification({
          message: "Erro ao buscar agentes",
          type: 'error',
        })
      }
    }
    fetchTournaments()
  }, [])


  const onSubmit = async () => {
    try {
      const data = await relatorio(watch('status'), watch('agente'), watch('data1'), watch('data2'))
      
      setData(data)
    } catch (error: any) {
      ToastNotification({
        message: error.message,
        type: 'error',
      })
    }
  }

  return (
    <>
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div onSubmit={handleSubmit(onSubmit)}>
            <h5 className="text-title-md font-bold text-black dark:text-white">
              Filtros
            </h5>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 2xl:grid-cols-4 2xl:gap-7.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Status
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    {...register('status')}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  >
                    <option value="" disabled className="text-body dark:text-bodydark">
                      Selecione um status
                    </option>
                    <option value="Aguardando Atendimento" className="text-body dark:text-bodydark">
                      Aguardando Atendimento
                    </option>
                    <option value="Em Atendimento" className="text-body dark:text-bodydark">
                      Em Atendimento
                    </option>
                    <option value="Proposta Feita" className="text-body dark:text-bodydark">
                      Proposta Feita
                    </option>
                    <option value="Não Concluído" className="text-body dark:text-bodydark">
                      Não Concluído
                    </option>
                    <option value="Vendido" className="text-body dark:text-bodydark">
                      Vendido
                    </option>
                  </select>
                </div>
                {!!errors.status && <label className="mb-3 block text-sm font-medium text-red mt-2">
                  {errors.status?.message}
                </label>}
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Agentes
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    {...register('agente')}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  >
                    <option value="Todos" className="text-body dark:text-bodydark">
                      Todos
                    </option>
                    {agents?.map((agent) => (
                      <option key={agent._id} value={agent._id} className="text-body dark:text-bodydark">
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>
                {!!errors.agente && <label className="mb-3 block text-sm font-medium text-red mt-2">
                  {errors.agente?.message}
                </label>}
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Data inicial (DD/MM/AAAA)
                </label>
                <input
                  type="text"
                  {...register('data1')}
                  placeholder="Informe o endereço do cliente"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {!!errors.data1 && <label className="mb-3 block text-sm font-medium text-red mt-2">
                  {errors.data1?.message}
                </label>}
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Data final (DD/MM/AAAA)
                </label>
                <input
                  type="text"
                  {...register('data2')}
                  placeholder="Informe o endereço do cliente"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {!!errors.data2 && <label className="mb-3 block text-sm font-medium text-red mt-2">
                  {errors.data2?.message}
                </label>}
              </div>
            </div>
            <button onClick={onSubmit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Gerar
            </button>
          </div>
        </div>
      </div>
      {data.length > 0 && (
        <div className="w-full mt-10 pb-20">
          <TableClientesRelatorio data={data} />
        </div>
      )}
    </>
  );
};

export default ECommerce;
