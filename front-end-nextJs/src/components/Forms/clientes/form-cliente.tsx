'use client'

import { IClientesRequest } from "@/interfaces/IClientes"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from "@/validators/form-clientes-validator"
import { useLayoutEffect } from "react"
import { ToastNotification } from "@/components/toast-notification"
import { create, remove, update } from "@/repository/clientsRepository"
import { useRouter } from 'next/navigation'
import { IClientes } from "@/interfaces/IClientes"
import { IUser } from "@/interfaces/IUsers"

interface IFormClienteProps {
  cliente?: IClientes | null
  agents?: IUser[]
}

const FormCliente = ({ cliente, agents }: IFormClienteProps) => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IClientesRequest>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  })
  const router = useRouter()
  const status = watch('status');

  const onSubmit = async (cli: IClientesRequest) => {
    try {
      if (cliente) {
        await update(cli, cliente._id || '')
      } else {
        await create(cli)
      }

      ToastNotification({
        message: 'Cliente salvo com sucesso',
        type: 'success',
      })

      router.back()
    } catch (error: any) {
      ToastNotification({
        message: error.message,
        type: 'error',
      })
    }
  }

  const handleDelete = async () => {
    try {
      await remove(cliente?._id || '')

      ToastNotification({
        message: 'Cliente deletado com sucesso',
        type: 'success',
      })

      router.back()
    } catch (error: any) {
      ToastNotification({
        message: error.message,
        type: 'error',
      })
    }
  }

  useLayoutEffect(() => {
    if (cliente) {
      reset(cliente)
    }
  }, [cliente, reset])

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Formulário de cadastro
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col xl:flex-row">
            <div className="w-full">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Nome
              </label>
              <input
                type="text"
                {...register('name')}
                placeholder="Informe o nome do cliente"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {!!errors.name && <label className="mb-3 block text-sm font-medium text-red mt-2">
                {errors.name?.message}
              </label>}
            </div>
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              E-mail
            </label>
            <input
              type="mail"
              {...register('email')}
              placeholder="Informe o email do cliente"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {!!errors.email && <label className="mb-3 block text-sm font-medium text-red mt-2">
              {errors.email?.message}
            </label>}
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Telefone
            </label>
            <input
              type="number"
              {...register('telefone')}
              placeholder="Informe o telefone do cliente"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {!!errors.telefone && <label className="mb-3 block text-sm font-medium text-red mt-2">
              {errors.telefone?.message}
            </label>}
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Endereço
            </label>
            <input
              type="text"
              {...register('endereco')}
              placeholder="Informe o endereço do cliente"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {!!errors.endereco && <label className="mb-3 block text-sm font-medium text-red mt-2">
              {errors.endereco?.message}
            </label>}
          </div>

          {
            cliente && (
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
            )
          }
          {
            (cliente && status === "Vendido")  && (
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Valor
                </label>
                <input
                  type="float"
                  {...register('valor')}
                  placeholder="Informe o valor pago"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {!!errors.valor && <label className="mb-3 block text-sm font-medium text-red mt-2">
                  {errors.valor?.message}
                </label>}
              </div>
            )
          }
          {
            cliente && (
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Agente
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    {...register('id_agente')}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  >
                    {agents?.map((agent) => (
                      <option key={agent._id} value={agent._id} className="text-body dark:text-bodydark">
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>
                {!!errors.status && <label className="mb-3 block text-sm font-medium text-red mt-2">
                  {errors.status?.message}
                </label>}
              </div>
            )
          }

          {/* <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Endereço
            </label>

            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                {...register('endereco')}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              >
                <option value="" disabled className="text-body dark:text-bodydark">
                  Selecione um status
                </option>
                <option value="Ativo" className="text-body dark:text-bodydark">
                  Ativo
                </option>
                <option value="Inativo" className="text-body dark:text-bodydark">
                  Inativo
                </option>
              </select>
            </div>
          </div> */}
          <button type="submit" disabled={isSubmitting} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Salvar
          </button>
        </div>
      </form>
      {cliente && (
        <div className="px-6 pb-10">
          <button onClick={handleDelete} className="flex w-full mt-3 justify-center rounded bg-red p-3 font-medium text-gray hover:bg-opacity-90">
            Excluir
          </button>
        </div>
      )}
    </div>
  )
}

export default FormCliente
