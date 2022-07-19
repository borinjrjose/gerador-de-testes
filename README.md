# Descrição

Gerador de testes para a disciplina SIN5022 - Teste de Software.

## Requisitos

Para rodar o programa, é necessário estar com os programas [Node.js](https://nodejs.org/en/) e [Yarn](https://yarnpkg.com/) instalados na máquina.

Adicionalmente, é recomendado possuir [Git](https://git-scm.com/) instalado para clonar o repositório.

## Setup

Rodar os seguintes comandos:

```bash
# Clonar o repositório
git clone https://github.com/borinjrjose/gerador-de-testes.git

# Mudar para o diretório do projeto
cd gerador-de-testes

# Instalar as dependências
yarn install
```

## Entrada

Dois arquivos `csv` que representam a `tabela de transição` do sistema e o `mapeamento` de eventos para funções do programa, conforme os arquivos encontrados na pasta [example](./example/).

### Nota

Os arquivos de `mapeamento` devem possuir os parâmetros das funções separados por ponto e vírgula (;).

## Iniciar o programa

Jogar os arquivos de entrada dentro da pasta raiz do projeto e rodar o seguinte comando:

```bash
# Iniciar o programa
yarn start <estados>.csv <mapeamento>.csv
```

Onde `<estados>` e `<mapeamento>` representam, respectivamente, os nomes dos arquivos que contêm a `tabela de transição` e o `mapeamento`.

### Nota

Para o exemplo, basta rodar o seguinte comando:

```bash
# Rodar programa com os arquivos na pasta example
yarn start example/transicao.csv example/mapeamento.csv
```

## Saída

Ao terminar de executar, o programa gerará os seguintes arquivos dentro da pasta `dist`:

- `árvore.txt`, representando a árvore de transição;
- `caminhos.txt`, representando os caminhos básicos;
- `testesAutomatizados.test.js`, o qual possui os scripts de teste em [Jest](https://jestjs.io/pt-BR/) para os caminhos básicos e secretos.
