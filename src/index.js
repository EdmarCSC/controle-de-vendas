import _ from 'lodash';
import './style.css';

import { linparInputs, criaFormCadVendas, criaFormCadProdutos, criaFormUpdate, 
        imprimeDados, headerTable, criaDiv, qVendas,
        clienteDevedor, abrirMenu, fecharMenu } from './layout.js';

import { initializeApp } from 'firebase/app'; 
import { getDatabase, ref, push, onValue, get, child, update } from 'firebase/database';

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
let idCli;
let dClienteOfUp;
let dProdutoOfUp;


function postVendas(nome, produto, quantidade, formaPagamento, status) {
    const db = getDatabase(app);
    push(ref(db, 'clientes/'), {
        nomeCli: nome,
        produto: produto,
        quantidade: quantidade,
        formaPagamento: formaPagamento,
        status: status,
        data: getDate()
    }); 
}

function postProdutos(descricao, valor) {
    const db = getDatabase(app);
    push(ref(db, 'produtos/'), {
        descricao: descricao,
        valor: valor,
        data: getDate()
    }); 
}

function updateStatusCliente(name, produto, quantidade, fPagamento, status) {
  const db = getDatabase();

  const postData = {
    nomeCli: name,
    produto: produto,
    quantidade: quantidade,
    formaPagamento: fPagamento,
    status: status,
    data: dClienteOfUp.data
  };
  const newPostKey = push(child(ref(db), 'posts')).key;

  const updates = {};
  updates['clientes/' + idCli ] = postData;

  return update(ref(db), updates);
}

function updateProdutos(descricao, valor) {
    const db = getDatabase();
  
    const postData = {
      descricao: descricao,
      valor: valor,
      data: dProdutoOfUp.data
    };
    const newPostKey = push(child(ref(db), 'posts')).key;
  
    const updates = {};
    updates['clientes/' + idCli ] = postData;
  
    return update(ref(db), updates);
  }

function capiturarDadosVendas(alvo) {
    const nomeCli = document.querySelector('.input-nome');
    const produto = document.querySelector('.input-produto')
    const quantidade = document.querySelector('.input-quantidade');
    const formaPagamento = document.querySelector('.input-forma-pagamento');
    const status = document.querySelector('.input-status');
    
    if (alvo === 'cadastro')postVendas(nomeCli.value, produto.value, 
        quantidade.value, formaPagamento.value, status.value);
                    
    if (alvo === 'update')updateStatusCliente(nomeCli.value, produto.value,
        quantidade.value, formaPagamento.value, status.value);

    linparInputs();
    qVendas(+quantidade.value);
}

function capiturarDadosProdutos(alvo) {
    const descricao = document.querySelector('.input-descricao');
    const valor = document.querySelector('.input-valor');
    
    if (alvo === 'cadastro')postProdutos(descricao.value, valor.value);
                    
    if (alvo === 'update')updateStatusCliente(descricao.value, valor.value);
    
    linparInputs();
}

function getCliente(key) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `clientes/${key}`)).then((snapshot) => {
    if (snapshot.exists()) {
        criaFormUpdate(snapshot.val());
        idCli = key;
        dClienteOfUp = snapshot.val();
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
                clienteDevedor(childData[4]);
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
    return dataAtual
}

function getKey(element) {
    const Key = element.firstChild.innerHTML;
    getCliente(Key);
}


document.addEventListener('click', element => {
    const abaClicada = element.target;

    if (abaClicada.classList.contains('btn-cad-vendas')) capiturarDadosVendas('cadastro');
    if (abaClicada.classList.contains('btn-edt-vendas')) capiturarDadosVendas('update');
    if (abaClicada.classList.contains('btn-cad-produtos')) capiturarDadosProdutos('cadastro');
    if (abaClicada.classList.contains('btn-edt-produtos')) capiturarDadosProdutos('update');
    
    if (abaClicada.classList.contains('btn-form-vendas')) {
        fecharMenu();
        criaFormCadVendas();
    }
    if (abaClicada.classList.contains('btn-form-produtos')) {
        fecharMenu();
        criaFormCadProdutos();          
    }
    if (abaClicada.classList.contains('btn-form-relatorio')) {
        fecharMenu();
        criaDiv();
        headerTable();
        getDados();
    }
    if (abaClicada.classList.contains('checkbox'))  console.log(abaClicada.value);
    if (abaClicada.classList.contains('caixa-grid') ||
        (abaClicada.classList.contains('linha-grid')) ||
        (abaClicada.classList.contains('coluna-grid')) ) getKey(abaClicada.firstChild);
    if (abaClicada.classList.contains('line-menu')) abrirMenu(abaClicada);
    if (abaClicada.classList.contains('line-btn-fechar')) fecharMenu();
})

window.onload = function() {
    getDados('pageLoad');
};