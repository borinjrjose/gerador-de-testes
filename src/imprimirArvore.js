import { writeFile } from 'fs'

const imprimirArvore = (arvore) => {
  let impressao = ''
  const nos = [arvore]

  while (nos.length > 0) {
    const no = nos.pop()

    no.arestas.forEach((aresta) => {
      impressao = impressao.concat(`${no.estado}, ${aresta.no.estado}\n`)

      nos.push(aresta.no)
    })
  }

  writeFile('dist/arvore.txt', impressao, { flag: 'w+' }, (err) => {
    if (err) console.error(err)
  })
}

export default imprimirArvore
