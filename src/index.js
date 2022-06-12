import _ from 'lodash';
import './style.css';
import { linparInputs, criaFormCadastro, criaFormUpdate, imprimeDados, headerTable, criaDiv, qVendas } from './layout.js';

import { initializeApp } from 'firebase/app'; 
import { getDatabase, ref, push, onValue, get, child } from 'firebase/database';

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
    const db = getDatabase(app);
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

function getCliente(key) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `clientes/${key}`)).then((snapshot) => {
    if (snapshot.exists()) {
        criaFormUpdate(snapshot.val());
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });

}

function getDados(valorChamada) {        
    const db = getDatabase(app);
    const dbRef = ref(db, 'clientes/');
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = Object.values(childSnapshot.val());
            if (valorChamada === 'pageLoad') {
                histVendas.push(childData);
                qVendas(+childData[3]);
                return
            }
            imprimeDados(childData, childSnapshot.key);
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

function getKey(element) {
    const Key = element.firstChild.innerHTML;
    getCliente(Key);
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
    if (abaClicada.classList.contains('caixa-grid') ||
        (abaClicada.classList.contains('linha-grid')) ||
        (abaClicada.classList.contains('coluna-grid')) ) getKey(abaClicada.firstChild);
})

window.onload = function() {
    getDados('pageLoad');
};