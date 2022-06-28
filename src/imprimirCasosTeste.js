import { writeFileSync } from 'fs'

const imprimirCasosTeste = (arvore, mapeamento) => {
  const [proxy, classe] = mapeamento.columns

  writeFileSync('dist/testesAutomatizados.test.js', `import ${classe} from ''\n\n`, {
    flag: 'w+',
    encoding: 'utf-8'
  })

  writeFileSync(
    'dist/testesAutomatizados.test.js',
    `let ${classe}\n\nbeforeEach(() => {\n\t${classe} = new ${classe}()\n})\n\n`,
    {
      flag: 'a+',
      encoding: 'utf-8'
    }
  )

  let testeNum = 1
  const fraseInicial = `test("testa caminho TEST_NUM", () => {\n`
  const casosTeste = (no, testes) => {
    const novoTeste = `\texpect(${classe}.getState()).toBe('${no.estado.split('_')[0]}')`

    if (no.arestas.length > 0)
      no.arestas.forEach((aresta) => {
        const mudaEstado = novoTeste.concat(
          `\n\n\t${mapeamento
            .find((elem) => elem[proxy] === aresta.evento)
            [classe].replace(';', ',')}`
        )

        casosTeste(aresta.no, [...testes, mudaEstado])
      })
    else {
      const testToWrite = fraseInicial
        .replace(/TEST_NUM/, testeNum++)
        .concat([...testes, novoTeste].join('\n'))
        .concat('\n})\n\n')

      writeFileSync('dist/testesAutomatizados.test.js', testToWrite, {
        flag: 'a+',
        encoding: 'utf-8'
      })
    }
  }

  casosTeste(arvore, [])
}

export default imprimirCasosTeste
