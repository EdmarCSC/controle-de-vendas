import _ from 'lodash';
import './style.css';
import { initializeApp } from 'firebase/app'; 
import { getDatabase, ref, push, onValue, onChildAdded, onChildChanged, onChildRemoved } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyC76YqX7DUKjJcl2WtzoDwugLw4a2CFXGA",
    authDomain: "controle-de-vendas-52e5a.firebaseapp.com",
    projectId: "controle-de-vendas-52e5a",
    storageBucket: "controle-de-vendas-52e5a.appspot.com",
    messagingSenderId: "328891193112",
    appId: "1:328891193112:web:2cd8db32a96e67be08306d"
};

const app = initializeApp(firebaseConfig);

const body = document.querySelector('.container-main');
const cliente = [];

function enviarRegistroCompra(nome, quantidade, formaPagamento) {
    const db = getDatabase();
    push(ref(db, 'clientes/'), {
        nomeCli: nome,
        quantidade: quantidade,
        formaPagamento: formaPagamento
    });
    console.log('Ok!');
}

function capiturarDados() {
    const nomeCli = document.querySelector('.input-nome');
    const quantidade = document.querySelector('.input-quantidade');
    const formaPagamento = document.querySelector('.input-forma-pagamento');
    enviarRegistroCompra(nomeCli.value, quantidade.value, formaPagamento.value);
    linparInputs();
}

function criaCaixaCentro() {
    const caixa = document.querySelector('.caixa-centro');
    if (caixa != null) {
        caixa.remove();        
    }
    const criaCaixa = document.createElement('div');
    criaCaixa.classList.add('caixa-centro');
    body.appendChild(criaCaixa);
    return criaCaixa;

}

function criarRelatorio(element) {
    const body = document.querySelector('.container-main');
    const caixa = document.querySelector('.caixa-centro');
    const lista = document.createElement('ul');
    const itemLista = document.createElement('li');

    itemLista.innerHTML = element[1] + ' ' + element[2] + ' ' + element[0];
    lista.appendChild(itemLista);
    caixa.appendChild(lista);
    body.appendChild(caixa);

    console.log(element , caixa);

}

function listarDados() {        
    const db = getDatabase();
    const dbRef = ref(db, 'clientes/');
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
        const childData = Object.values(childSnapshot.val());
        criarRelatorio(childData);
    // ...
    });

}, {
  onlyOnce: true
});
}
       
function criaCheckBox() {
    const elementos = ['Dinheiro:', 'Pix:', 'Fiado:'];
    const divCheckbox = document.createElement('div');
    elementos.forEach(el => {
        const label = document.createElement('label');
        label.textContent = el;
        const formaPagamento = document.createElement('input');
        formaPagamento.setAttribute('type', 'checkbox');
        formaPagamento.classList.add('checkbox');        
        divCheckbox.appendChild(label);
        divCheckbox.appendChild(formaPagamento);
    })
    divCheckbox.classList.add('div-checkbox');
    
    return divCheckbox;
}

function formRegistrarCompra() {
    //const formaPagamento = criaCheckBox();
    const body = document.querySelector('.container-main');
    const divCentro = criaCaixaCentro();

    const nomeCli = document.createElement('input');
    nomeCli.classList.add('input-nome')
    nomeCli.setAttribute('placeholder', 'Nome do Cliente');    

    const quantidade = document.createElement('input');
    quantidade.classList.add('input-quantidade')
    quantidade.setAttribute('placeholder', 'Quantidade');

    const formaPagamento = document.createElement('input');
    formaPagamento.classList.add('input-forma-pagamento');
    formaPagamento.setAttribute('placeholder', 'Forma de pagamento');

    const btnEnviar = document.createElement('button');
    btnEnviar.classList.add('btn-enviar');
    btnEnviar.innerHTML = 'Enviar'

    divCentro.appendChild(nomeCli);
    divCentro.appendChild(quantidade);
    divCentro.appendChild(formaPagamento);
    divCentro.appendChild(btnEnviar);

    body.appendChild(divCentro);
    console.log(divCentro);
}

function linparInputs() {
    const nomeCli = document.querySelector('.input-nome');
    const quantidade = document.querySelector('.input-quantidade');
    const formaPagamento = document.querySelector('.input-forma-pagamento');

    nomeCli.value = '';
    quantidade.value = '';
    formaPagamento.value = '';
}

document.addEventListener('click', element => {
    const abaClicada = element.target;

    if (abaClicada.classList.contains('btn-cadastro')) formRegistrarCompra();
    if (abaClicada.classList.contains('btn-enviar'))  capiturarDados();
    if (abaClicada.classList.contains('btn-relatorio')) {
        criaCaixaCentro();
        listarDados();
    }
    if (abaClicada.classList.contains('checkbox'))  console.log(abaClicada.value);
})