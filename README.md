# Mini CRM

Neste projeto, demonstro algumas de minhas habilidades no desenvolvimento Full Stack, utilizando Next.js 14 e Node.js. A aplicação oferece uma interface simples e funcional, composta por diferentes telas e recursos, como:

- Login: Utilizando usuário e senha, com proteção JWT para autenticação segura.
- Relatórios: Exibe informações resumidas sobre o atendimento, com filtros por período, agentes e status.
- CRUD de Clientes: Além das operações básicas de CRUD, o sistema encontra o agente mais disponível para direcionar um novo cliente.
- CRUD de Agentes: Gerenciamento de agentes com operações CRUD.


## Executando a aplicação

A aplicação está disponível em um ambiente hospedado na Vercel. Abaixo estão as informações de acesso para testes:

- URL: https://breakdance.github.io/breakdance/
- Usuário: admin@admin.com
- Senha: 123456


### Execução local

Para executar a aplicação localmente, é necessário seguir os passos abaixo. Certifique-se de criar uma instância do MongoDB antes de iniciar.

* Faça o clone do repositório
* Acesse a pasta back-end-nodeJs
* Crie o arquivo .env (use o .env.example como exemplo), e em seguida preencha as informações
* Execute:
    ```sh 
        npm i
        npm run dev
    ```
    Feito isso a aplicação back-end é executada
* Acesse a pasta front-end-nextJs
* Crie o arquivo .env (use o .env.example como exemplo), e em seguida preencha as informações
* Execute:
    ```sh 
        npm i
        npm run dev
    ```
Se todos os passos forem seguidos corretamente, a aplicação deve estar rodando localmente. Se você encontrar algum problema ou tiver perguntas, fique à vontade para entrar em contato.
