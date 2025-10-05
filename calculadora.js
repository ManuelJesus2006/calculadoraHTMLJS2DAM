let pantalla;
let lastAnswer = -1;

document.addEventListener('DOMContentLoaded', function () {
    pantalla = document.getElementById("pantallaPrincipal");
    console.log(pantalla.textContent);
});

function aniadir(info) {
    const valor = info.textContent;

    if (pantalla.textContent === '0' && isDigit(valor)) {
        pantalla.textContent = valor; //Reemplaza el 0
    } 
    // Si la pantalla es 0 y el valor es '+' o 'X'
    else {
        pantalla.textContent += valor;
    }
}

function borrarTodo(){
    pantalla.textContent = "0";
}

function borrarAnterior() {
    if (pantalla.textContent === "0") {
        return;
    }
    
    pantalla.textContent = pantalla.textContent.slice(0, -1);
    
    if (pantalla.textContent === "") {
        pantalla.textContent = "0";
    }
}

function resultado() {
    try {
        let expresionJS = traduccirParaOperar(pantalla.textContent);
        let resultadoCalculado = eval(expresionJS);
        
        lastAnswer = resultadoCalculado;
        pantalla.textContent = resultadoCalculado;
        
    } catch (e) {
        pantalla.textContent = 'Error';
    }
}

function traduccirParaOperar(pantallaUser) {
    let pantallaTraducida = "";
    for (let i = 0; i < pantallaUser.length; i++) {
        const char = pantallaUser[i];
        
        if (isDigit(char) || char === '.') {
            pantallaTraducida += char;
        } 
        
        else if (isSimboloOperacion(char)) {
            if (char === 'X') pantallaTraducida += '*';
            else if (char === '÷') pantallaTraducida += '/';
            else pantallaTraducida += char;
        }
        
        else if (char === 'A' && pantallaUser.substring(i, i + 3) === 'ANS' && lastAnswer !== -1) {
            pantallaTraducida += lastAnswer.toString();
            i += 2;
        } 
        
        else if (char === 'E' && pantallaUser.substring(i, i + 3) === 'EXP') {
            pantallaTraducida += 'e+';
            i += 2;
        }
    }
    return pantallaTraducida;
}

function isDigit(caracter) {
    return /^\d$/.test(caracter);
}

function isSimboloOperacion(caracter){
    return caracter === 'X' || caracter === '÷' || caracter === '+' || caracter === '-';
}