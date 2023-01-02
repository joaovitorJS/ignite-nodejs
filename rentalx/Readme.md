# Criando a API com NodeJS

## Requisitos do sistema 

**RF - Requisito funcional**
**RNF - Requisito não funcional**
**RN - Regras de negócio**

---
### Cadastro de carro

**RF**
- [RF1] - Dever ser possível cadastrar um novo carro.

**RN**
- [RN1] - Não deve ser possível cadastrar um carro com uma placa já existente.
- [RN2] - O carro deve ser cadastrado, por padrão, com disponibilidade.
- [RN3] - O usuário responsável pelo cadastro deve ser um usuário administrador.

---
### Listagem de carros

**RF**
- [RF1] - Deve ser possível listar todos os carros disponíveis.
- [RF2] - Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [RF3] - Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [RF4] - Deve ser possível listar todos os carros disponíveis nome do carro.


**RN**
- [RN1] - O usuário não precisa estar logado no sistema.

---
### Cadastro de Especificação no carro

**RF**
- [RF1] - Deve ser possível cadastrar uma especificação para um carro.
- [RF2] - Deve ser possível listar todas as especificações.
- [RF3] - Deve ser possível listar todos os carros.

**RN**
- [RN1] - Não deve ser possível cadastrar uma especificação para um carro não cadastrado. 
- [RN2] - Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- [RN3] - O usuário responsável pelo cadastro deve ser um usuário administrador.

---
### Cadastro de imagens do carro

**RF**
- [RF1] - Deve ser possível cadastrar a imagem do carro.
- [RF2] - Deve ser possível listar todos os carros.

**RNF**
- [RNF] - Uttilizar o multer para upload dos arquivos.

**RN**
- [RN1] - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [RN2] - O usuário responsável pelo cadastro deve ser um usuário administrador.

---
### Aluguel de carro

**RF**
- [RF1] - Deve ser possível cadastrar um aluguel.

**RN**
- [RN1] - O aluguel deve ter duração mínima de 24 horas.
- [RN2] - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [RN3] - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- [RN4] - O usuário deve estar logado na aplicação.
- [RN5] - Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

---
### Devolução de carro

**RF**
- [RF1] - Deve ser possível realizar a devolução de um carro

**RN**
- [RN1] - Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- [RN2] - Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- [RN3] - Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- [RN4] - Ao realizar a devolução, deverá ser calculado o total do aluguel.
- [RN5] - Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- [RN6] - Caso haja multa, deverá ser somado ao total do aluguel.

---
### Listagem de alugueis para o usuário

**RF**
- [RF1] - Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
- [RN1] - O usuário deve estar logado na aplicação

---
### Recuperar senha 

**RF**
- [RF1] - Deve ser possível o usuário recuperar senha informando o e-mail 
- [RF2] - O usuário deve receber um e-mail com o passo a passo para recupeção de senha
- [RF3] - O usuário deve conseguir inserir uma nova senha

**RN**
- [RN1] - O usuário precisa informar uma nova senha 
- [RN2] - O link enviado para a recuperação deve expirar em 3 horas



<br>

## Pontos importantes aprendidos

* Uso de ESLint e Prettier

* Debugging com o vscode
  > Uso da flag `--inspect` na execução do `ts-node-dev`

* Conceito DTO - Data transfer object

* Principios S.O.L.I.D

  S => SRP - Single Responsability Principle (Princípio da Responsabilidade Única) <br>
  O => OCP - Open-Closed Principle (Princípio aberto/fechado)<br>
  L => LSP - Liskov Substituion Principle (Princípio de Substituição de Liskov)<br>
  I => ISP - Interface Segregation Principle (Princípio da Segregação de Interface)<br>
  D => DIP - Dependency Inversion Principle (Princípio da Inversão de Dependência)

* Uso do Singleton Pattern (Padrão de Projeto)
  > Criando ua Instância do repositório

* Uso da lib `multer` para realizar o upload de arquivo

* Uso da lib do node `stream` para ler um arquivo por partes
  > Solução melhor que o `readFile` que lê tudo de uma vez.  
  ```js
  import fs from "node:fs";
  ```

* Documentação com Swagger

* Uso do `TypeORM` - Banco de dados postgres

* Migrations 
  > versionamento do banco

* Injeção de dependências com a lib `tsyringe`

* Criptografia de senhas com `bcrypt`

* Autenticação com `jsonwebtoken`

* `express-async-errors` para ajudar a retornar erros da aplicação

* **Testes** 
  - Unitários
    > Testar a regra de negócio da aplicação
    
  - Integração
    > Testar a aplicação como um todo (inteira)
    
    > Por exemplo: Testar uma rota completa de cadastro de usuário

    > -> routes -> controllers -> useCases -> repository
     <- repository <- useCases <- controllers <- routes


* TDD - Test-Driven Development 
 
  - Desenvolvimento dirigido por testes
  - Metodologia para testar a aplicação

<br>

* Criação de testes com `Jest`

* imports com `@` com a lib `tsconfig-paths`
  > Adicionar no `script`


* Testes de integração nos controllers com `Jest` e a lib `supertest` para simular requisições
  > Criamos um banco de dados para realizar os testes, sendo ativado apenas quando roda o script de test

* Refresh tokens

* recuperação de senha
  * `Nodemailer` 
  > envio de email
    * Ethereal email

  * template engine de email utilizando o `handlebars`

* Coverage dos testes

* Deploy na AWS
  > lib `aws-sdk`

  * class-transformer

* configurando email em produção
  > envio de emails utilizando o `AWS-SES`
