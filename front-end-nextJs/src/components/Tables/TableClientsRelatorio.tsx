import { IClientes } from "@/interfaces/IClientes";
import moment from "moment";
import Link from "next/link";

type ClientGet = {
  client: IClientes;
}

interface ITableClientesProps {
  data: ClientGet[];
}

const TableClientesRelatorio = ({ data }: ITableClientesProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto"> {/* Permitir rolagem horizontal */}
        <div className="flex flex-col min-w-[1000px]"> {/* Definir largura mínima */}
          <div className="grid grid-cols-6 bg-gray-200 dark:bg-meta-4 rounded-sm">
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Nome</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Agente</h5>
            </div>
            <div className="block p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Cadastro</h5>
            </div>
            <div className="block p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Atualização</h5>
            </div>
            <div className="block p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
            </div>
            <div className="block p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Valor</h5>
            </div>
          </div>

          {data.map((d, key) => (
            <div
              className={`grid grid-cols-6 ${key === data.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                }`}
              key={key}
            >
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{d.client.name}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{d.client.id_agente.name}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{d.client.status}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{moment(d.client.createdAt?.toString()).format('DD/MM/YY')}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{moment(d.client.updatedAt?.toString()).format('DD/MM/YY')}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{d.client.valor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableClientesRelatorio;
