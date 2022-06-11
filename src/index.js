import _ from 'lodash';
import './style.css';
import { linparInputs, criaFormCadastro, imprimeDados, headerTable, criaDiv, qVendas } from './layout.js';

import { initializeApp } from 'firebase/app'; 
import { getDatabase, ref, push, onValue, get, onChildAdded, onChildChanged, onChildRemoved } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyC76YqX7DUKjJcl2WtzoDwugLw4a2CFXGA",
    authDomain: "controle-de-vendas-52e5a.firebaseapp.com",
    projectId: "controle-de-vendas-52e5a",
    storageBucket: "controle-de-vendas-52e5a.appspot.com",
    messagingSenderId: "328891193112",
    appId: "1:328891193112:web:2cd8db32a96e67be08306d"
};

const app = initializeApp(firebaseConfig);

const histVendas = [];

function enviarRegistroCompra(nome, quantidade, formaPagamento) {
    const db = getDatabase();
    push(ref(db, 'clientes/'), {
        nomeCli: nome,
        quantidade: quantidade,
        formaPagamento: formaPagamento,
        data: getDate()
    }); 
}

function capiturarDados() {
    const nomeCli = document.querySelector('.input-nome');
    const quantidade = document.querySelector('.input-quantidade');
    const formaPagamento = document.querySelector('.input-forma-pagamento');
    enviarRegistroCompra(nomeCli.value, quantidade.value, formaPagamento.value);
    linparInputs();
    qVendas(+quantidade.value);
}

function getDados(valorChamada) {        
    const db = getDatabase();
    const dbRef = ref(db, 'clientes/');
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = Object.values(childSnapshot.val());
            if (valorChamada === 'pageLoad') {
                histVendas.push(childData);
                qVendas(+childData[3]);
                return
            }
            imprimeDados(childData);
        });
    }, {
            onlyOnce: true
    });
}

function addZero (zero) {
    if (zero < 10) {
        zero = '0'+zero;
    }

    return zero;
}

function getDate() {
    const date = new Date();
    let da = 1;
    da += date.getMonth();
    const dia = addZero(date.getDate());
    const mes = addZero(da);
    const ano = date.getFullYear();

    const dataAtual = `${dia}/${mes}/${ano}`
    console.log(dataAtual)
    return dataAtual
}

document.addEventListener('click', element => {
    const abaClicada = element.target;

    if (abaClicada.classList.contains('btn-enviar')) capiturarDados();
    if (abaClicada.classList.contains('btn-cadastro')) criaFormCadastro();
    if (abaClicada.classList.contains('btn-relatorio')) {
        criaDiv();
        headerTable();
        getDados();
    }
    if (abaClicada.classList.contains('checkbox'))  console.log(abaClicada.value);
    console.log(abaClicada);
})

window.onload = function() {
    getDados('pageLoad');
};
  
/* get(dbRef, `clientes/`).then((snapshot) => {
    if (snapshot.exists()) {
      const element = Object.values(snapshot.val());
      element.forEach(el => {
          console.log(el);
      })
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  }); */