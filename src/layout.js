import IMask from 'imask';

const body = document.querySelector('.container-main');
let val = 0;
const clientesDevedores = [];

export function linparInputs() {
    const input = document.querySelectorAll('.input');
    input.forEach(valor => {
        valor.value = '';
    })
    
}

export function criaDiv() {
    const caixa = document.querySelector('.caixa-centro');
    const header = document.querySelector('.header-table');

    if (caixa != null) caixa.remove();
    if (header != null) header.remove();

    const criaCaixa = document.createElement('div');
    criaCaixa.classList.add('caixa-centro');
    body.appendChild(criaCaixa);
    return criaCaixa;
}

function criaBtnFecharMenu() {
    const btnFechar = criaTabela('btn-fechar');
    const line1 = criaTabela('line-btn-fechar');
    const line2 = criaTabela('line-btn-fechar');

    line1.style.transform = 'rotate(45deg)';
    line2.style.transform = 'rotate(-45deg) translate(6px, -7px)';

    btnFechar.appendChild(line1);
    btnFechar.appendChild(line2);

    return btnFechar;
}

function criaTitulo(titulo, classe) {
    const title = document.createElement('h2');
    title.classList.add('titulo-menu');
    title.classList.add(classe);
    title.textContent = titulo;
    title.style.transitionDelay = '6s';
    return title
}

function criaTituloMenu() {
    const titulos = criaTabela('titulos-menu');
    const registrarVenda = criaTitulo('Registrar venda', 'btn-form-vendas');
    const visualizarVendas = criaTitulo('Visualizar vendas', 'btn-form-relatorio');
    const cadastroProduto = criaTitulo('Cadastro de produtos', 'btn-form-produtos');

    titulos.appendChild(registrarVenda);
    titulos.appendChild(visualizarVendas);
    titulos.appendChild(cadastroProduto);

    return titulos
}

export function abrirMenu() {
    const menu = document.querySelector('.menu');
    menu.style.marginLeft = 0;
    menu.style.transitionDuration = '1s';
    
    menu.appendChild(criaBtnFecharMenu());
    menu.appendChild(criaTituloMenu());

}

export function fecharMenu() {
    const btnMenu = document.querySelector('.btn-fechar');
    btnMenu.remove();
    const menuTitulos = document.querySelector('.titulos-menu');
    menuTitulos.remove();
    const menu = document.querySelector('.menu');
    menu.style.marginLeft = '-3000px';
    menu.style.transitionDuration = '1s';    
}

function criaTabela(classe) {
    const criaCaixa = document.createElement('div');
    criaCaixa.classList.add(classe);
    return criaCaixa;
}

function criaLinhaHorizontal() {
    const linha = document.createElement('hr');
    return linha
}

export function criaCheckBox() {
    const divContent = criaTabela('div-checkbox');
    const elementos = ['Cone:', 'Bolo de pote:', 'Torta olandesa:', 'Bolachas:'];
    elementos.forEach(el => {
        const label = document.createElement('label');
        label.textContent = el;
        const formaPagamento = document.createElement('input');
        formaPagamento.setAttribute('type', 'checkbox');
        formaPagamento.classList.add('checkbox');
        divContent.appendChild(label);
        divContent.appendChild(formaPagamento);
    })

    return divContent;
}

export function criaFormCadVendas() {
    const body = document.querySelector('.container-main');
    const divCentro = criaDiv(body);

    const nomeCli = document.createElement('input');
    nomeCli.classList.add('input-nome');
    nomeCli.classList.add('input');
    nomeCli.setAttribute('placeholder', 'Nome do Cliente');

    const produto = document.createElement('input');
    produto.classList.add('input-produto');
    produto.classList.add('input');
    produto.setAttribute('placeholder', 'Produto');

    const quantidade = document.createElement('input');
    quantidade.classList.add('input-quantidade');
    quantidade.classList.add('input');
    quantidade.setAttribute('placeholder', 'Quantidade');

    const formaPagamento = document.createElement('input');
    formaPagamento.classList.add('input-forma-pagamento');
    formaPagamento.classList.add('input');
    formaPagamento.setAttribute('placeholder', 'Forma de pagamento');

    const inputStatus = document.createElement('input');
    inputStatus.classList.add('input-status');
    inputStatus.classList.add('input');
    inputStatus.setAttribute('placeholder', 'Status');

    const btnEnviar = document.createElement('button');
    btnEnviar.classList.add('btn-enviar');
    btnEnviar.classList.add('btn-cad-vendas')
    btnEnviar.innerHTML = 'Enviar';

    divCentro.appendChild(nomeCli);
    divCentro.appendChild(produto);
    divCentro.appendChild(quantidade);
    divCentro.appendChild(formaPagamento);
    divCentro.appendChild(inputStatus);
    divCentro.appendChild(btnEnviar);

    body.appendChild(divCentro);
}

export function criaFormCadProdutos() {
    const body = document.querySelector('.container-main');
    const divCentro = criaDiv(body);

    const descricao = document.createElement('input');
    descricao.classList.add('input-descricao');
    descricao.classList.add('input');
    descricao.setAttribute('placeholder', 'Descrição');

    const valor = document.createElement('input');
    valor.classList.add('input-valor');
    valor.classList.add('input');
    valor.setAttribute('placeholder', 'R$ 0.00');

    const btnEnviar = document.createElement('button');
    btnEnviar.classList.add('btn-enviar');
    btnEnviar.classList.add('btn-cad-produtos');
    btnEnviar.innerHTML = 'Enviar';

    divCentro.appendChild(descricao);
    divCentro.appendChild(valor);
    divCentro.appendChild(btnEnviar);

    body.appendChild(divCentro);

    inputMask();
}

export function headerTable() {
    const titleHeader = ['codigo', 'Nome', 'Prod.', 'Quant.', 'Pag.', 'Status', 'Data'];
    const hr = criaTabela('header-table');

    titleHeader.forEach(el => {
        const cl = criaTabela('coluna-grid');
        cl.classList.add(el)
        cl.innerHTML = el;
        hr.appendChild(cl);
    });

    body.appendChild(hr);
}

export function imprimeDados(element, childSnapshot) {
    const caixa = document.querySelector('.caixa-centro');
    const linhaHorizontal = criaLinhaHorizontal();
    const tabela = criaTabela('caixa-grid');
    const linha = criaTabela('linha-grid');

    const key = criaTabela('coluna-grid');
    const keyValue = document.createElement('p');
    keyValue.classList.add('key');
    keyValue.innerHTML = childSnapshot;
    key.appendChild(keyValue);

    const colNome = criaTabela('coluna-grid');
    const nome = document.createElement('p');
    nome.innerHTML = element[2];
    colNome.appendChild(nome);

    const colProduto = criaTabela('coluna-grid');
    const produto = document.createElement('p');
    produto.innerHTML = element[3];
    colProduto.appendChild(produto);

    const colQuantidade = criaTabela('coluna-grid');
    const quantidade = document.createElement('p');
    quantidade.innerHTML = element[4];
    colQuantidade.appendChild(quantidade);

    const colFormaPagamento = criaTabela('coluna-grid');
    const formaPagamento = document.createElement('p');
    formaPagamento.innerHTML = element[1];
    colFormaPagamento.appendChild(formaPagamento);

    const colStatus = criaTabela('coluna-grid');
    const status = document.createElement('p');
    status.innerHTML = element[5];
    colStatus.appendChild(status);

    const colData = criaTabela('coluna-grid');
    const data = document.createElement('p');
    data.innerHTML = element[0];
    colData.appendChild(data);

    linha.appendChild(key);
    linha.appendChild(colNome);
    linha.appendChild(colProduto);
    linha.appendChild(colQuantidade);
    linha.appendChild(colFormaPagamento);
    linha.appendChild(colStatus);
    linha.appendChild(colData);

    tabela.appendChild(linha);
    caixa.appendChild(tabela);
    caixa.appendChild(linhaHorizontal);
    body.appendChild(caixa);

}

export function criaFormUpdate(dadosCliente) {
    const divCentro = criaDiv();

    const nomeCli = document.createElement('input');
    nomeCli.classList.add('input-nome')
    nomeCli.setAttribute('placeholder', 'Nome do Cliente');
    nomeCli.value = dadosCliente.nomeCli;

    const produto = document.createElement('input');
    produto.classList.add('input-produto')
    produto.setAttribute('placeholder', 'produto');
    produto.value = dadosCliente.produto;

    const quantidade = document.createElement('input');
    quantidade.classList.add('input-quantidade')
    quantidade.setAttribute('placeholder', 'Quantidade');
    quantidade.value = dadosCliente.quantidade;

    const formaPagamento = document.createElement('input');
    formaPagamento.classList.add('input-forma-pagamento');
    formaPagamento.setAttribute('placeholder', 'Forma de pagamento');
    formaPagamento.value = dadosCliente.formaPagamento;

    const inputStatus = document.createElement('input');
    inputStatus.classList.add('input-status');
    inputStatus.setAttribute('placeholder', 'Status');
    inputStatus.value = dadosCliente.status;

    const btnEnviar = document.createElement('button');
    btnEnviar.classList.add('btn-editar');
    btnEnviar.classList.add('btn-edt-vendas');
    btnEnviar.innerHTML = 'Editar';

    divCentro.appendChild(nomeCli);
    divCentro.appendChild(produto);
    divCentro.appendChild(quantidade);
    divCentro.appendChild(formaPagamento);
    divCentro.appendChild(inputStatus);
    divCentro.appendChild(btnEnviar);

    body.appendChild(divCentro);
}

function calc(valor) {
    val += valor;
    return val;
}

export function qVendas(quantidade) {
    const divComponent = criaDiv();
    const divContent = criaTabela('div-cliente-devedor');
    const divQVendas = criaTabela('q-vendas');
    divQVendas.innerHTML = `Total de vendas: ${calc(quantidade)}`
    divContent.innerHTML = `Clientes em débito: ${clientesDevedores.length}`;

    divComponent.appendChild(divQVendas);
    divComponent.appendChild(divContent);

    body.appendChild(divComponent);
}

export function clienteDevedor(status) {
    if (status != 'Pago') {
        clientesDevedores.push(status);
    }
}

function inputMask() {
    const inputValor = document.querySelector('.input-valor');

    var numberMask = IMask(inputValor, {
        mask: Number,  // enable number mask
      
        // other options are optional with defaults below
        scale: 2,  // digits after point, 0 for integers
        signed: false,  // disallow negative
        thousandsSeparator: '.',  // any single char
        padFractionalZeros: true,  // if true, then pads zeros at end to the length of scale
        normalizeZeros: true,  // appends or removes zeros at ends
        radix: ',',  // fractional delimiter
        mapToRadix: ['.'],  // symbols to process as radix
      
        // additional number interval options (e.g.)
        min: -10000,
        max: 10000
      });
}