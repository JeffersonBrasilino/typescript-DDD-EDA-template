### API

#### Especificações
- Nodejs 16.16.0
- Docker 20.10.17
- NestJs 9.0.0
- Typescript 4.3.5
- jest 28.1.2

#### Executar o projeto
Pré requisitos:
    - Docker
    - Docker compose
    - make command

Ao clonar o projeto, deve-se configurar o ambiente, para isso renomear o arquivo **.env.sample** para **.env** e adicionar as variáveis de ambiente neste arquivo.
Após a configuração de ambiente executar o commando ```make up```, este comando é responsável por gerar a imagem do projeto e executar no seu ambiente docker. Se tudo correr bem o seu container da api estará em execução.

Para acompanhar os logs referentes a API(erros, consoles e etc) executar comando ```make logs```.

O projeto será disponibilizado na porta ao qual foi especificado na variavel de ambiente **APP_PORT**

O projeto conta com uma documentação **swagger** onde pode ser acessada via path **/docs**
