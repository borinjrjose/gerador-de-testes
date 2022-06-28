const imprimirArvore = (arvore) => {
  const nos = [arvore]

  while (nos.length > 0) {
    const no = nos.pop()

    no.arestas.forEach((aresta) => {
      console.log(`${no.estado}, ${aresta.no.estado}`)

      nos.push(aresta.no)
    })
  }
}

export default imprimirArvore
