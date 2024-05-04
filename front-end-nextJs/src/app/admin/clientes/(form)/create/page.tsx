import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormCliente from "@/components/Forms/clientes/form-cliente";
import { useState } from "react";
import { IUser } from "@/interfaces/IUsers";


const CadClientePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cadastrar um cliente" />

      <div className="flex flex-col gap-9">
        <FormCliente agents={[]} />
      </div>
    </DefaultLayout>
  );
};

export default CadClientePage;
