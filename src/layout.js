import IMask from 'imask';

const body = document.querySelector('.container-main');
const clientesDevedores = [];
const inputsFormProduto = ['descrição', 'valor']

let val = 0;

export function createForm() {
    const form = document.querySelector('.container-form');
    const header = document.querySelector('.header-table');

    if (form != null) form.remove();
    if (header != null) header.remove();

    const criaCaixa = document.createElement('div');
    criaCaixa.classList.add('container-form');
    
    body.appendChild(criaCaixa);
   
    return criaCaixa;
}

function createDiv(cls) {
    const criaCaixa = document.createElement('div');
    criaCaixa.classList.add(cls);
    return criaCaixa;
}

function createInput(cls, att) {
    const input = document.createElement('input');
    input.classList.add(cls);
    input.classList.add('input');
    input.setAttribute('placeholder', att);
    return input;
}

function createButton(cls1, cls2, titulo) {
    const button = document.createElement('button');
    button.classList.add(cls1);
    button.classList.add(cls2);
    button.innerHTML = titulo;
    return button
}

function createP(element, cls) {
    const p = document.createElement('p');
    p.classList.add(cls);
    p.innerHTML = element;
    return p
}



function criaBtnFecharMenu() {
    const btnFechar = createDiv('btn-fechar');
    const line1 = createDiv('line-btn-fechar');
    const line2 = createDiv('line-btn-fechar');

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
    const titulos = createDiv('titulos-menu');
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


function criaLinhaHorizontal() {
    const linha = document.createElement('hr');
    return linha
}

export function createFormVendas() {
    const containerForm = createForm();

    const inputs = ['input-nome', 'input-produto', 'input-quantidade', 'input-forma-pagamento', 'status'];
    const attribute = ['Nome de cliente', 'Produto', 'Qauntidade', 'Forma de pagamento', 'status'];
    const propertButton = ['btn-cad-vendas', 'btn-enviar', 'Enviar'];
    
    let count = 0;

    inputs.forEach(element => {
        const input = createInput(element, attribute[count]);
        containerForm.appendChild(input);
        count++;
    });

    const btnEnviar = createButton(propertButton[0], propertButton[1], propertButton[2])
    containerForm.appendChild(btnEnviar);

    body.appendChild(containerForm);
}

export function createFormProdutos() {
    const containerForm = createForm();
    
    const inputs = ['input-descricao', 'input-valor'];
    const attribute = ['Descrição', 'R$ 0.00'];
    const propertButton = ['btn-cad-produto', 'btn-enviar', 'Enviar'];
    
    let count = 0;

    inputs.forEach(element => {
        const input = createInput(element, attribute[count]);
        containerForm.appendChild(input);
        count++;
    });

    const btnEnviar = createButton(propertButton[0], propertButton[1], propertButton[2])
    containerForm.appendChild(btnEnviar);

    body.appendChild(containerForm);
    inputMask();
}

export function headerTable() {
    const titleHeader = ['codigo', 'Nome', 'Prod.', 'Quant.', 'Pag.', 
                        'Status', 'Data'];
    const hr = createDiv('header-table');

    titleHeader.forEach(el => {
        const cl = createDiv('colum-grid');
        cl.classList.add(el)
        cl.innerHTML = el;
        hr.appendChild(cl);
    });

    body.appendChild(hr);
}

export function printData(element, childSnapshot) {
    const cls = ['dat', 'pag', 'name', 'prod', 'quant', 'stat'];
    const containerForm = document.querySelector('.container-form');
    const table = createDiv('container-grid');
    const rowTable = createDiv('row-grid');
    const linhaHorizontal = criaLinhaHorizontal();
    
    const key = createDiv('colum-grid');
    const keyValue = createP(childSnapshot, 'key');
    key.appendChild(keyValue);
    rowTable.appendChild(key);

    let cont = 0;    
    element.forEach(el => {
        const columGrid = createDiv('colum-grid');
        const data = createP(el);
        columGrid.appendChild(data);
        columGrid.classList.add(cls[cont]);
        rowTable.appendChild(columGrid);
        cont++;
    });

    table.appendChild(rowTable);
    containerForm.appendChild(table);
    containerForm.appendChild(linhaHorizontal);
    body.appendChild(containerForm);
}

export function criaFormUpdate(dadosCliente) {
    const divCentro = createForm();

    const nomeCli = document.createElement('input');
    nomeCli.classList.add('input-nome');
    nomeCli.classList.add('input');
    nomeCli.setAttribute('placeholder', 'Nome do Cliente');
    nomeCli.value = dadosCliente.nomeCli;

    const produto = document.createElement('input');
    produto.classList.add('input-produto');
    produto.classList.add('input');
    produto.setAttribute('placeholder', 'produto');
    produto.value = dadosCliente.produto;

    const quantidade = document.createElement('input');
    quantidade.classList.add('input-quantidade');
    quantidade.classList.add('input');
    quantidade.setAttribute('placeholder', 'Quantidade');
    quantidade.value = dadosCliente.quantidade;

    const formaPagamento = document.createElement('input');
    formaPagamento.classList.add('input-forma-pagamento');
    formaPagamento.classList.add('input');
    formaPagamento.setAttribute('placeholder', 'Forma de pagamento');
    formaPagamento.value = dadosCliente.formaPagamento;

    const inputStatus = document.createElement('input');
    inputStatus.classList.add('status');
    inputStatus.classList.add('input');
    inputStatus.setAttribute('placeholder', 'Status');
    inputStatus.value = dadosCliente.status;

    const btnEnviar = document.createElement('button');
    btnEnviar.classList.add('btn-editar');
    btnEnviar.classList.add('btn-edt-vendas');
    btnEnviar.innerHTML = 'Editar';

    const btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btn-excluir');
    btnExcluir.classList.add('btn-exc-vendas');
    btnExcluir.innerHTML = 'Excluir';

    divCentro.appendChild(nomeCli);
    divCentro.appendChild(produto);
    divCentro.appendChild(quantidade);
    divCentro.appendChild(formaPagamento);
    divCentro.appendChild(inputStatus);
    divCentro.appendChild(btnEnviar);
    divCentro.appendChild(btnExcluir);

    body.appendChild(divCentro);
}

function calc(valor) {
    val += valor;
    return val;
}

export function qVendas(quantidade) {
    const divComponent = createForm();
    const divContent = createDiv('div-cliente-devedor');
    const divQVendas = createDiv('q-vendas');
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
        mask: Number, 
        scale: 2, 
        signed: false,
        thousandsSeparator: '.',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ',',
        mapToRadix: ['.'],
      
        min: -10000,
        max: 10000
      });
}
export function cleanInputs() {
        const input = document.querySelectorAll('.input');
        input.forEach(valor => {
            valor.value = '';
        })
        
}