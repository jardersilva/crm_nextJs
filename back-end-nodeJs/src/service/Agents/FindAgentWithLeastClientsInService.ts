import Agents from "../../models/Agents";
import Clients from "../../models/Clients";

const getAgentsWithCompleteClientCounts = async () => {
  try {
    // Consulta para obter contagens de clientes por agente com base no status
    const clientCounts = await Clients.aggregate([
      {
        $match: {
          status: { $in: ['Em Atendimento', 'Aguardando Atendimento'] },
        },
      },
      {
        $group: {
          _id: '$id_agente',
          totalClients: { $sum: 1 },
          emAtendimentoCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Em Atendimento'] }, 1, 0],
            },
          },
          aguardandoAtendimentoCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Aguardando Atendimento'] }, 1, 0],
            },
          },
        },
      },
    ]);

    // Obter a lista de todos os agentes em ordem alfabética
    const agents = await Agents.find({ status: 'Ativo' }).sort({ name: 1 });

    // Agora, para cada agente, associe as contagens corretas
    const agentsWithCounts = agents.map((agent: any) => {
      const countInfo = clientCounts.find(
        (count) => count._id?.toString() === agent._id.toString()
      );

      return {
        agentId: agent._id,
        agentName: agent.name,
        totalClients: countInfo?.totalClients ?? 0,
        emAtendimentoCount: countInfo?.emAtendimentoCount ?? 0,
        aguardandoAtendimentoCount: countInfo?.aguardandoAtendimentoCount ?? 0,
      };
    });

    agentsWithCounts.sort((a, b) => {
      if (a.totalClients < b.totalClients) return -1;
      if (a.totalClients > b.totalClients) return 1;
      // Se tiverem o mesmo número de clientes, ordena por nome em ordem alfabética
      if (a.agentName < b.agentName) return -1;
      if (a.agentName > b.agentName) return 1;
      return 0;
    });

    return agentsWithCounts[0].agentId;
  } catch (error) {
    console.error('Error fetching agents with complete client counts:', error);
    throw error;
  }
};

export default getAgentsWithCompleteClientCounts;