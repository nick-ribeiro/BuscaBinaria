const { dir } = require('console');
const fs = require('fs');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
var inputData = [];

const quantHash = 100000;

class RegistrosParaTabela {
  constructor(log, usuario, mes, descricao) {
    this.log = log;
    this.usuario = usuario;
    this.mes = mes;
    this.descricao = descricao;
  }
}

class TabelaHash {
  constructor() {
    this.capacity = quantHash;
    this.tabela = new Array(this.capacity);
  }

  inserir(registro) {
    const hash = this.calcularHash(registro.mes);
    if (!this.tabela[hash]) {
      this.tabela[hash] = [];
    }
    this.tabela[hash].push(registro);
  }

  calcularHash(mes) {
    return mes % this.capacity;
  }

  getTabelaMes(mes) {
    const hash = this.calcularHash(mes);
    return this.tabela[hash] || [];
  }
}

// Função para processar cada objeto JSON lido do arquivo, colocando-o em um vetor
async function processJsonObject(jsonObj) {
  inputData.push(jsonObj);
}

// Caminho do arquivo JSON de origem
const filePath = './data.json';

// Cria um fluxo de leitura para o arquivo
const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

// Cria um pipeline de fluxo com StreamArray
const jsonStream = readStream.pipe(parser()).pipe(streamArray());

// Lê e processa cada objeto JSON do array
jsonStream.on('data', ({ key, value }) => {
  processJsonObject(value);
});

// Captura erros no fluxo de leitura
readStream.on('error', (error) => {
  console.error(`Erro ao ler o arquivo: ${error.message}`);
});

// Captura erros no fluxo JSON
jsonStream.on('error', (error) => {
  console.error(`Erro ao analisar o JSON: ${error.message}`);
});

function InsertionVector() {
  const MesesMap = new Map();
  MesesMap.set('January', 1);
  MesesMap.set('February', 2);
  MesesMap.set('March', 3);
  MesesMap.set('April', 4);
  MesesMap.set('May', 5);
  MesesMap.set('June', 6);
  MesesMap.set('July', 7);
  MesesMap.set('August', 8);
  MesesMap.set('September', 9);
  MesesMap.set('October', 10);
  MesesMap.set('November', 11);
  MesesMap.set('December', 12);

  inputData.forEach(({ log, month, user, msg }) => {
    const mes = MesesMap.get(month);
    const registro = new RegistrosParaTabela(log, user, mes, msg);
    tabelaLogs.inserir(registro);
  });
}

const tabelaLogs = new TabelaHash();

function buscaBinaria(tabela, logAlvo, mesAlvo) {
  const registrosMes = tabela.getTabelaMes(mesAlvo);
  if (registrosMes) {
    const registro = registrosMes.find(r => parseInt(r.log) === parseInt(logAlvo));
    return registro || null;
  }
  return null;
}

function buscaBinariaTodosMeses(tabela, logAlvo) {
  const registrosEncontrados = [];

  for (let mes = 1; mes <= 12; mes++) {
    const registrosMes = tabela.getTabelaMes(mes);

    for (let i = 0; i < registrosMes.length; i++) {
      const registro = registrosMes[i];
      if (registro && parseInt(registro.log) === parseInt(logAlvo)) {
        registrosEncontrados.push(registro);
      }
    }
  }

  if (registrosEncontrados.length > 0) {
    return registrosEncontrados;
  } else {
    return null;
  }
}

// Finaliza o processo ao terminar a leitura
jsonStream.on('end', () => {
    console.log('Leitura do arquivo concluída.');

    InsertionVector();
    const prompt = require('prompt-sync')();

    console.log("****************** MENU ********************");
    console.log("********* BUSCA POR MÊS ESPECÍFICO *********");
    console.log("* 1 - BUSCA BINÁRIA                        *");
    console.log("********* BUSCA POR TODOS OS MESES *********");
    console.log("* 2 - BUSCA BINÁRIA                        *");
    console.log("********************************************");
    var escolha = prompt("Digite sua escolha: ");

    switch(escolha) {
      case "1":
        var Mes = prompt("Digite o número do mês que deseja realizar a busca (1 - 12): ");
        while(Mes < 0 || Mes > 12) {
          console.log("Valor invalido! Digite novamente");
          var Mes = prompt("Digite um valor entre 1 e 12: ");
        }
        var Log = prompt("Digite o número de log que deseja procurar: ");
        if(Mes == 1) {

          console.time('Timer');
          mesAlvo = 1;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        else if(Mes == 2) {

          console.time('Timer');
          mesAlvo = 2;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        else if(Mes == 3) {

          console.time('Timer');
          mesAlvo = 3;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        else if(Mes == 4) {

          console.time('Timer');
          mesAlvo = 4;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        else if(Mes == 5) {

          console.time('Timer');
          mesAlvo = 5;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        else if(Mes == 6) {

          console.time('Timer');
          mesAlvo = 6;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        else if(Mes == 7) {

          console.time('Timer');
          mesAlvo = 7;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        else if(Mes == 8) {

          console.time('Timer');
          mesAlvo = 8;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        else if(Mes == 9) {

          console.time('Timer');
          mesAlvo = 9;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        else if(Mes == 10) {

          console.time('Timer');
          mesAlvo = 10;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        else if(Mes == 11) {

          console.time('Timer');
          mesAlvo = 11;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        else if(Mes == 12) {
         
          console.time('Timer');
          mesAlvo = 12;
          const registroEncontrado = buscaBinaria(tabelaLogs, parseInt(Log), mesAlvo);
          if (registroEncontrado) {
            console.log('Registro encontrado:', registroEncontrado);
          } else {
            console.log('Registro não encontrado');
          }
          console.timeEnd('Timer');
        }
        break;
      case "2":

        var Log = prompt("Digite o número de log que deseja procurar: ");
        console.time('Timer');
        const registroEncontrado = buscaBinariaTodosMeses(tabelaLogs, parseInt(Log));
        if (registroEncontrado) {
          console.log('Registro(s) encontrado:', registroEncontrado);
        } else {
          console.log('Registro não encontrado');
        }
        console.timeEnd('Timer');
        break;
      default:
        console.log("Opção não encontrada");
        process.exit();
    }
});
