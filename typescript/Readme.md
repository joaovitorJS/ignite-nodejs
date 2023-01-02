# Criando um projeo com typescript

Projeto apenas para demonstrar o uso do typescript

## Pontos importantes

* Adicionando as dependências do TS no projeto
  ```bash
  yarn add typescript -D
  ```
  > `-D`: Dependência de desenvolvimento

* Iniciando configurações do TS (`tsconfig.json`)
  ```bash
  yarn tsc --init
  ```

* Gerando código JS a partir de um TS
  ```bash
  yarn tsc
  ```

  > Porém ele gera na própria pasta o arquivo JS, para corrigir isso, basta deixar a opção `outDir` em `tsconfig.json`
  > 
  >```json
  >"outDir": "./dist"
  >```
  > Toda vez que der agora o comando o código JS vai para a pasta `dist` 
