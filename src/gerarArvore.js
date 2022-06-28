const gerarArvore = (tabelaTransicao) => {
  const contadores = {}
  const state = tabelaTransicao.columns[0]
  const [, ...events] = tabelaTransicao.columns

  tabelaTransicao.forEach((elem) => {
    contadores[elem[state]] = 0
  })

  const arvore = {
    estado: `${tabelaTransicao[0][state]}_${contadores[tabelaTransicao[0][state]]++}`,
    arestas: []
  }

  const nos = [arvore]

  while (nos.length > 0) {
    const no = nos.pop()

    const estadoInfo = no.estado.split('_')

    if (parseInt(estadoInfo[1]) === 0) {
      const estado = tabelaTransicao.find((elem) => elem[state] === estadoInfo[0])

      events.forEach((evento) => {
        if (estado[evento]) {
          const novoNo = {
            estado: `${estado[evento]}_${contadores[estado[evento]]++}`,
            arestas: []
          }

          no.arestas.push({ evento, no: novoNo })

          nos.push(novoNo)
        }
      })
    }
  }

  return arvore
}

export default gerarArvore
