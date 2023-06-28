function buscaInterpolada(array, logProcurado, mesProcurado) {
  let primeiroIndice = 0;
  let ultimoIndice = array.length - 1;

  while (primeiroIndice <= ultimoIndice) {
    const valorPrimeiro = array[primeiroIndice].log;
    const valorUltimo = array[ultimoIndice].log;
    const posicaoProcurada = Math.floor(
      primeiroIndice +
        ((ultimoIndice - primeiroIndice) / (valorUltimo - valorPrimeiro)) *
          (logProcurado - valorPrimeiro)
    );

    if (posicaoProcurada < primeiroIndice || posicaoProcurada > ultimoIndice) {
      break;
    }

    const registroEncontrado = array[posicaoProcurada];
    const mesRegistro = registroEncontrado.month;

    if (registroEncontrado.log === logProcurado && mesRegistro === mesProcurado) {
      const ocorrencias = array.filter(
        (item) => item.log === logProcurado && item.month === mesProcurado
      );

      return {
        ocorrencias: ocorrencias,
        quantidade: ocorrencias.length,
      };
    }

    if (registroEncontrado.log < logProcurado) {
      primeiroIndice = posicaoProcurada + 1;
    } else {
      ultimoIndice = posicaoProcurada - 1;
    }
  }

  return {
    ocorrencias: [],
    quantidade: 0,
  };
}

// Exemplo de uso:

const arrayDeDados = [
  { msg: 'Mensagem 1', log: 5, month: 'Jan', user: 'Usuário 1' },
  { msg: 'Mensagem 2', log: 10, month: 'Jan', user: 'Usuário 2' },
  // ... (2 milhões de registros)
];

const logProcurado = 10;
const mesProcurado = 'Jan';

const resultado = buscaInterpolada(arrayDeDados, logProcurado, mesProcurado);
console.log('Ocorrências encontradas:', resultado.ocorrencias);
console.log('Quantidade de logs idênticos:', resultado.quantidade);