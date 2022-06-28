import { readFileSync } from 'fs'
import { csvParse } from 'd3'
import gerarArvore from './gerarArvore.js'
import imprimirArvore from './imprimirArvore.js'

const geradorTestes = (argv) => {
  if (argv.length < 4) {
    console.error(
      `Erro! Eram esperados 2 arquivos csv para a execução da aplicação, mas apenas foram recebidos ${
        argv.length - 2
      }!`
    )

    return
  }

  const [, , tabelaTransicao, mapeamento] = argv

  const parsedTabelaTransicao = csvParse(readFileSync(tabelaTransicao, 'utf-8'))

  const arvoreTransicao = gerarArvore(parsedTabelaTransicao)

  imprimirArvore(arvoreTransicao)
}

export default geradorTestes
