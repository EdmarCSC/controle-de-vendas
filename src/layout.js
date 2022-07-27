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

export function createMenu() {
    const menu = createDiv('menu');
    menu.appendChild(criaBtnFecharMenu());
    menu.appendChild(criaTituloMenu());
    body.appendChild(menu);
}

export function fecharMenu() {
    const menu = document.querySelector('.menu');
    menu.remove();   
}


function criaLinhaHorizontal() {
    const linha = document.createElement('hr');
    return linha
}

function createdFocus() {
    const input = document.querySelectorAll('.input');
    input.forEach(el => {
        if ( el.classList.contains('input-nome') || el.classList.contains('input-descricao'))  el.focus();
    });
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
    createdFocus();
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
    createdFocus();
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
        if (el === 'Fiado') {
            rowTable.classList.add('devedor');
        };
        rowTable.appendChild(columGrid);
        cont++;
    });

    table.appendChild(rowTable);
    containerForm.appendChild(table);
    containerForm.appendChild(linhaHorizontal);
    body.appendChild(containerForm);
}

export function criaFormUpdate(dadosCliente) {
    const dataCli = Object.values(dadosCliente);
    const containerForm = createForm();

    const inputs = ['input-forma-pagamento', 'input-nome', 'input-produto', 'input-quantidade', 'status'];
    const attribute = ['Nome de cliente', 'Produto', 'Qauntidade', 'Forma de pagamento', 'status'];
    const propertBtnEnv = ['btn-edt-vendas', 'btn-editar', 'Editar'];
    const propertBtnExc = ['btn-exc-vendas', 'btn-excluir', 'Excluir'];
    
    let count = 1;

    inputs.forEach(element => {
        const input = createInput(element, attribute[count]);
        input.value = dataCli[count];
        containerForm.appendChild(input);
        count++;
    });

    const btnEnviar = createButton(propertBtnEnv[0], propertBtnEnv[1], propertBtnEnv[2])
    containerForm.appendChild(btnEnviar);
    const btnExcluir = createButton(propertBtnExc[0], propertBtnExc[1], propertBtnExc[2])
    
    containerForm.appendChild(btnEnviar);
    containerForm.appendChild(btnExcluir);

    body.appendChild(containerForm);
    createdFocus();
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
    divContent.innerHTML = `Clientes em débito: ${clientesDevedores.length + 1}`;

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