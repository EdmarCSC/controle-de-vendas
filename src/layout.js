export function linparInputs() {
    const nomeCli = document.querySelector('.input-nome');
    const quantidade = document.querySelector('.input-quantidade');
    const formaPagamento = document.querySelector('.input-forma-pagamento');

    nomeCli.value = '';
    quantidade.value = '';
    formaPagamento.value = '';
}

export function criaDiv(body) {
    const caixa = document.querySelector('.caixa-centro');
    if (caixa != null) {
        caixa.remove();        
    }
    const criaCaixa = document.createElement('div');
    criaCaixa.classList.add('caixa-centro');
    body.appendChild(criaCaixa);
    return criaCaixa;
}

function criaTabela(classe) {
    const criaCaixa = document.createElement('div');
    criaCaixa.classList.add(classe);
    return criaCaixa;   
}

export function criaCheckBox() {
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

export function criaFormCadastro() {
    //const formaPagamento = criaCheckBox();
    const body = document.querySelector('.container-main');
    const divCentro = criaDiv(body);

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
    btnEnviar.innerHTML = 'Enviar';

    divCentro.appendChild(nomeCli);
    divCentro.appendChild(quantidade);
    divCentro.appendChild(formaPagamento);
    divCentro.appendChild(btnEnviar);

    body.appendChild(divCentro);
}

export function headerTable() {
    const body = document.querySelector('.caixa-centro');
    const titleHeader = ['Nome', 'Quantidade', 'Pagamento'];
    const hr = criaTabela('header-table');
    
    titleHeader.forEach(el => {
        const cl = criaTabela('coluna-grid');
        cl.innerHTML = el;
        hr.appendChild(cl);
    });

    body.appendChild(hr);
}

export function imprimeDados(element) {
    const body = document.querySelector('.container-main');
    const caixa = criaDiv(body);
    headerTable();
    const tabela = criaTabela('caixa-grid');
    const linha = criaTabela('linha-grid');
    
    const colNome = criaTabela('coluna-grid');
    const nome = document.createElement('p');
    nome.innerHTML = element[1];
    colNome.appendChild(nome);

    const colQuantidade = criaTabela('coluna-grid');
    const quantidade = document.createElement('p');
    quantidade.innerHTML = element[2];
    colQuantidade.appendChild(quantidade);

    const colFormaPagamento = criaTabela('coluna-grid');
    const formaPagamento = document.createElement('p');
    formaPagamento.innerHTML = element[0];
    colFormaPagamento.appendChild(formaPagamento);

    linha.appendChild(colNome);
    linha.appendChild(colQuantidade);
    linha.appendChild(colFormaPagamento);

    tabela.appendChild(linha);
    caixa.appendChild(tabela);
    body.appendChild(caixa);
}