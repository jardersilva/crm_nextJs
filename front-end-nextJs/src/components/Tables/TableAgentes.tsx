import { IUser } from "@/interfaces/IUsers";
import Link from "next/link";

interface ITableAgentesProps {
  data: IUser[];
}

const TableAgentes = ({ data }: ITableAgentesProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        <Link href="/admin/agents/create">
          <button className="flex justify-center rounded bg-primary p-3 text-gray hover:bg-opacity-90">
            Adicionar
          </button>
        </Link>
      </h4>

      <div className="overflow-x-auto"> {/* Permitir rolagem horizontal */}
        <div className="flex flex-col min-w-[1000px]"> {/* Definir largura mínima */}
          <div className="grid grid-cols-5 bg-gray-200 dark:bg-meta-4 rounded-sm">
            <div className="p-2.5 text-center">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Nome</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">E-mail</h5>
            </div>
            <div className="block p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
            </div>
            <div className="block p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base"></h5>
            </div>
            <div className="block p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Ação</h5>
            </div>
          </div>

          {data.map((d, key) => (
            <div
              className={`grid grid-cols-5 ${key === data.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                }`}
              key={key}
            >
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{d.name}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{d.email}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{d.status}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white"></p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <Link href={`/admin/agents/${d._id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableAgentes;
