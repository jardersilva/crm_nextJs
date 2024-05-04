import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormAgents from "@/components/Forms/agents/form-agents";


const CadAgentPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cadastrar um agente" />

      <div className="flex flex-col gap-9">
        <FormAgents />
      </div>
    </DefaultLayout>
  );
};

export default CadAgentPage;
