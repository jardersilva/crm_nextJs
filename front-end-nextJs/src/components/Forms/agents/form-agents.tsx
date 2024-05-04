'use client'

import { IAgentsRequest, IUser } from "@/interfaces/IUsers"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from "@/validators/form-agents-validator"
import { useLayoutEffect } from "react"
import { ToastNotification } from "@/components/toast-notification"
import { create, remove, update } from "@/repository/agentsRepository"
import { useRouter } from 'next/navigation'

interface IFormUserProps {
  user?: IUser | null
}

const FormAgents = ({ user }: IFormUserProps) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IAgentsRequest>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  })
  const router = useRouter()

  const onSubmit = async (agent: IAgentsRequest) => {
    try {
      if (user) {
        await update(agent, user._id)
      } else {
        await create(agent)
      }

      ToastNotification({
        message: 'Agente salvo com sucesso',
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
      await remove(user?._id || '')

      ToastNotification({
        message: 'Agente deletado com sucesso',
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
    if (user) {
      reset(user)
    }
  }, [user, reset])

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
                placeholder="Informe o nome do agente"
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
              placeholder="Informe o email do agente"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {!!errors.email && <label className="mb-3 block text-sm font-medium text-red mt-2">
              {errors.email?.message}
            </label>}
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Senha
            </label>
            <input
              type="password"
              {...register('password')}
              placeholder="Informe uma senha para o agente"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {!!errors.password && <label className="mb-3 block text-sm font-medium text-red mt-2">
              {errors.password?.message}
            </label>}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
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
                <option value="Ativo" className="text-body dark:text-bodydark">
                  Ativo
                </option>
                <option value="Inativo" className="text-body dark:text-bodydark">
                  Inativo
                </option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Salvar
          </button>
        </div>
      </form>
      {user && (
        <div className="px-6 pb-10">
          <button onClick={handleDelete} className="flex w-full mt-3 justify-center rounded bg-red p-3 font-medium text-gray hover:bg-opacity-90">
            Excluir
          </button>
        </div>
      )}
    </div>
  )
}

export default FormAgents
