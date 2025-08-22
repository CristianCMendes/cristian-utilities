# Pacote de utilidades - Por Cristian/Korsa

Aplicação web construída com React + TypeScript + Vite. Este repositório contém utilitários e componentes que podem ser usados livremente pela comunidade para estudos, forks e criações de versões próprias — desde que não haja finalidade comercial (venda).

## Sumário
- Visão geral
- Requisitos
- Como executar
- Scripts disponíveis
- Estrutura do projeto
- Contribuindo / Forks
- Licença

## Visão geral
Projeto inicializado com Vite e React, utilizando TypeScript e Material UI (MUI) para a interface. Ideal para quem deseja explorar exemplos e criar variações do projeto.

## Requisitos
- Node.js LTS (recomendado)
- npm (ou pnpm/yarn, se preferir)

## Como executar
1. Instale as dependências:
   `npm install`
2. Inicie o servidor de desenvolvimento:
   `npm run dev`
3. Acesse o endereço mostrado no terminal (por padrão, http://localhost:5173).

## Scripts disponíveis
- dev: roda o servidor de desenvolvimento Vite
- build: gera o build de produção (tsc + vite build)
- preview: pré-visualiza o build de produção
- lint: executa o ESLint

### Notas sobre o build (Vite)
- Divisão de código otimizada: manualChunks com separação dedicada para React, MUI, Emotion e React Router. Todo o restante de node_modules é agrupado em um único chunk vendor para evitar muitos arquivos pequenos.
- Nomes de arquivos com hash e pastas organizadas em assets/chunks para JavaScript e assets/[ext] para demais assets.
- Remoção de console/debugger apenas em produção para reduzir o tamanho do bundle sem prejudicar DX.
- assetsInlineLimit = 0 para forçar assets a serem emitidos como arquivos (melhor cache CDN).
- emptyOutDir = true para limpar a pasta dist a cada build.

## Estrutura do projeto
- src/: código-fonte da aplicação (componentes, rotas, etc.)
- public/: arquivos públicos/estáticos
- vite.config.ts: configuração do Vite
- tsconfig*.json: configurações do TypeScript

## Contribuindo / Forks
- Você pode forkar este repositório e fazer suas próprias versões livremente.
- Pull Requests são bem-vindos! Sinta-se à vontade para propor melhorias e correções.
- Observação importante: o uso é não comercial. Você não pode vender este software ou versões derivadas. Consulte a seção de Licença abaixo para detalhes.


## Licença
Uso e forks permitidos. É proibido vender o software, cobrar pelo acesso (incl. SaaS) ou redistribuir comercialmente versões derivadas. Veja LICENSE.
