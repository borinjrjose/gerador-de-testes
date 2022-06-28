import { writeFileSync } from 'fs'

const imprimirCaminhosSecretos = (arvore, mapeamento, tabelaTransicao) => {
  const [proxy, classe] = mapeamento.columns

  let contador = 1
  const fraseInicial = `test("testa caminho secreto TEST_NUM", () => {\n`
  const caminhosSecretos = (no, testes) => {
    const novoTeste = `\texpect(${classe}.getState()).toBe('${no.estado.split('_')[0]}')`
    const mudancaEstado = testes.concat(novoTeste)
    const estadoAtual = tabelaTransicao.find(
      (t) => t[tabelaTransicao.columns[0]] === no.estado.split('_')[0]
    )
    const eventosInutilizados = Object.keys(estadoAtual).filter((k) => !estadoAtual[k])

    let caminhosTeste = ''
    eventosInutilizados.forEach((e) => {
      caminhosTeste = caminhosTeste.concat(
        `\n\n\t${mapeamento.find((m) => m[proxy] === e)[classe].replace(';', ',')}`
      )
      caminhosTeste = caminhosTeste.concat('\n').concat(novoTeste)
    })

    const testToWrite = fraseInicial
      .replace(/TEST_NUM/, contador++)
      .concat(mudancaEstado)
      .concat(caminhosTeste)
      .concat('\n})\n\n')

    writeFileSync('dist/testesAutomatizados.test.js', testToWrite, {
      flag: 'a+',
      encoding: 'utf-8'
    })

    if (no.arestas.length > 0)
      no.arestas.forEach((aresta) => {
        if (aresta.no.estado.split('_')[1] === '0') {
          const mudaEstado = mudancaEstado.concat(
            `\n\n\t${mapeamento
              .find((elem) => elem[proxy] === aresta.evento)
              [classe].replace(';', ',')}\n`
          )

          caminhosSecretos(aresta.no, mudaEstado)
        }
      })
  }

  caminhosSecretos(arvore, '')
}

export default imprimirCaminhosSecretos
