import { writeFile } from 'fs'

const imprimirCaminhosUnicos = (arvore) => {
  const caminhos = []
  const caminhosUnicos = (no, passo) => {
    const novoPasso = [...passo, no.estado]

    if (no.arestas.length > 0)
      no.arestas.forEach((aresta) => {
        caminhosUnicos(aresta.no, novoPasso)
      })
    else caminhos.push(novoPasso.join(', '))
  }

  caminhosUnicos(arvore, [])

  writeFile('dist/caminhos.txt', caminhos.join('\n'), { flag: 'w+' }, (err) => {
    if (err) console.error(err)
  })
}
export default imprimirCaminhosUnicos
