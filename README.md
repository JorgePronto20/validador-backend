# Validador de Campanhas - Backend

Este backend permite validar códigos de campanhas armazenados num ficheiro JSON no GitHub.

## Endpoints

- `GET /codigos-validos` - Lista os códigos válidos.
- `POST /validar-codigo` - Regista um código como usado.

## Como usar no Render

1. Vai a https://render.com e cria uma conta (se ainda não tiveres).
2. Cria um novo **Web Service**.
3. Faz upload destes ficheiros como um projeto (podes zipar tudo).
4. Define a variável de ambiente `GITHUB_TOKEN` com o teu token pessoal.
5. O Render instala as dependências e inicia o servidor automaticamente.

## Variáveis de ambiente

Cria um ficheiro `.env` com:

