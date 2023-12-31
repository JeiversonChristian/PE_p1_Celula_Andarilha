const  canvas = window.document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas_width = 4000;
const canvas_height = 1000;

let canvasInfo = window.document.getElementById("canvas_infos");
let ctxInfo = canvasInfo.getContext("2d");
const canvasInfo_width = 4000;
const canvasInfo_height = 400;

class Celula {
    constructor(x,y,cor,num_celula,geracao_celula) {
        this.r = 50;
        this.x_center = x + this.r;
        this.y_center = y + this.r;
        this.v = 50;
        this.cor = cor;
        this.energia = 30;
        this.num_celula = num_celula;
        this.geracao_celula = geracao_celula;
        this.entrada = 0; //vai ser a distância até a comida
        this.peso = 0; // vai ser gerado aleatoriamente
        this.bias = 0; // vai ser gerado aleatoriamente
        this.saida_linear = 0; // vai ser igual a (entrada * peso) + bias;
    }

    andar_frente() {
        if (this.x_center < canvas_width - this.r) {
            this.x_center += this.v;
        }
    }

    andar_tras() {
        if (this.x_center > 0 + this.r) {
            this.x_center -= this.v;
        }
    }

    andar_cima() {
        if (this.y_center > 0 + this.r) {
            this.y_center -= this.v;
        }
    }

    andar_baixo() {
        if (this.y_center < canvas_height - this.r) {
            this.y_center += this.v;
        }
    }

    desenhar() {
        ctx.beginPath();
        ctx.arc(this.x_center,this.y_center,this.r,0,2*Math.PI)
        ctx.fillStyle = this.cor;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath;
    }
}

class Comida {
    constructor(x,y) {
        this.r = 10;
        this.x_center = x + this.r;
        this.y_center = y + this.r;
        this.cor = 'green';
    }

    desenhar() {
        ctx.beginPath();
        ctx.arc(this.x_center,this.y_center,this.r,0,2*Math.PI)
        ctx.fillStyle = this.cor;
        ctx.fill();
        ctx.closePath;
    }
}

function gerar_n_aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function gerar_cor_aleatoria() {
    let vermelho  = Math.floor(Math.random() * 256);
    let verde  = Math.floor(Math.random() * 256);
    let azul = Math.floor(Math.random() * 256);
    let cor = `#${vermelho.toString(16)}${verde.toString(16)}${azul.toString(16)}`;
    return cor;
}

let celulas = [];

function calcular_peso() {
    if (celulas.length > 0) {
        for (let i = 0; i <= 4; i++) {
            celulas[0].peso = Math.random() * (2 * 0.01) - 0.01;
        }
    }
}

function calcular_bias() {
    if (celulas.length > 0) {
        for (let i = 0; i <= 4; i++) {
            celulas[0].bias = Math.random() * (2 * 0.01) - 0.01;
        }
    }
}

function gerar_celulas(n,g) {
    for (let i = 0; i <= n; i++) {
        let x = gerar_n_aleatorio(0,canvas_width - 100);
        let y = gerar_n_aleatorio(0,canvas_height - 100);
        let cor = gerar_cor_aleatoria();
        let num_celula = i+1;
        let geracao_celula = g;
        const celula = new Celula(x,y,cor,num_celula,geracao_celula);
        calcular_peso();
        calcular_bias();
        celulas.push(celula);
    }
}

let comidas = [];

function gerar_comidas() {
    for (let i = 0; i <= 0; i++) {
        let x = gerar_n_aleatorio(0,canvas_width - 100);
        let y = gerar_n_aleatorio(0,canvas_height - 100);
        const comida = new Comida(x,y);
        comidas.push(comida); 
    }
}

function desenhar_celulas(n) {
    if (celulas.length > 0) {
        celulas[0].desenhar();
    }
}

function desenhar_comidas() {
    for (let i = 0; i <= comidas.length - 1; i++) {
        comidas[i].desenhar();
    }
}

function desenhar_elementos() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    desenhar_celulas(4);
    desenhar_comidas();
}

function calcular_distancia() {
    if (celulas.length > 0) {
        for(let i = 0; i <= comidas.length - 1; i++) {
            // Obtém as coordenadas dos centros dos círculos
            let x1 = comidas[i].x_center;
            let y1 = comidas[i].y_center;
            let x2 = celulas[0].x_center;
            let y2 = celulas[0].y_center;

            // Calcula a distância entre os centros dos círculos
            let distanciaCentros = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

            celulas[0].entrada = distanciaCentros;
        }
    }
}


function calcular_saida_linear() {
    if (celulas.length > 0) {
        celulas[0].saida_linear = (celulas[0].entrada*celulas[0].peso)+celulas[0].bias;
    }
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function decidir(valorSigmoid) {
    if (valorSigmoid >= 0.0 && valorSigmoid < 0.2) {
        return 1;
    } else if (valorSigmoid >= 0.2 && valorSigmoid < 0.4) {
        return 2;
    } else if (valorSigmoid >= 0.4 && valorSigmoid < 0.6) {
        return 3;
    } else if (valorSigmoid >= 0.6 && valorSigmoid < 0.8) {
        return 4;
    } else {
        return 0;
    }
}

function movimentar_celulas() {
    if (celulas.length > 0) {
        calcular_distancia();
        calcular_saida_linear();
        let saidaLinear = celulas[0].saida_linear;
        const valorSigmoid = sigmoid(saidaLinear);
        const decisao = decidir(valorSigmoid);
        //let decisao = gerar_n_aleatorio(0,5);
        //alert(celulas[0].entrada);
        //alert(celulas[0].peso);
        //alert(celulas[0].bias);
        //alert(celulas[0].saida_linear);
        //alert(decisao);
        switch (decisao) {
            case 1:
                celulas[0].andar_frente();
                break;
            case 2:
                celulas[0].andar_tras();
                break;
            case 3:
                celulas[0].andar_cima();
                break;
            case 4:
                celulas[0].andar_baixo();
                break;
            default: // case 0, fique parado
                break;      
        }
    }
}

let tempoInicial = 0;
let tempoFinal = 0;
let tempoTotal = 0;

function atualizar_info() {
    ctxInfo.clearRect(0, 0, canvasInfo_width, canvasInfo_height);
    ctxInfo.font = "80px Arial";
    ctxInfo.fillStyle = "black";
    ctxInfo.textAlign = "left";

    ctxInfo.fillText(`Tempo decorrido:`, 20, 100);
    let minutos = Math.floor(tempoTotal / (60 * 1000))
    ctxInfo.fillText(`${minutos} minutos`, 880, 100);
    let segundos = ((tempoTotal % (60 * 1000)) / 1000).toFixed(0)
    ctxInfo.fillText(`${segundos} segundos`, 1425, 100);

    if (celulas.length > 0) {
        ctxInfo.fillText(`Energia da célula:`, 20, 200);
        ctxInfo.fillText(`${celulas[0].energia}`, 880, 200);

        ctxInfo.fillText(`Número | Geração:`, 20, 300);
        ctxInfo.fillText(`${celulas[0].num_celula} | ${celulas[0].geracao_celula}`, 880, 300);
    }
}

function tirar_energia_celulas() {
    if (celulas.length > 0) {
        celulas[0].energia -= 1;
        if (celulas[0].energia == 0) {
            celulas.splice(0,1);
        }
    }
}

function dar_energia_celula() {
    celulas[0].energia += 10;
}

function detectar_colisoes() {
    if (celulas.length > 0) {
        for(let i = 0; i <= comidas.length - 1; i++) {
            // Obtém as coordenadas dos centros dos círculos
            let x1 = comidas[i].x_center;
            let y1 = comidas[i].y_center;
            let x2 = celulas[0].x_center;
            let y2 = celulas[0].y_center;

            // Calcula a distância entre os centros dos círculos
            let distanciaCentros = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

            // Soma dos raios dos círculos
            let somaDosRaios = comidas[i].r + celulas[0].r;

            // Verifica se há colisão
            if (distanciaCentros <= somaDosRaios) {
                // Colisão detectada
                // remover a comida da lista e dar energia pra célula
                comidas.splice(i, 1);
                dar_energia_celula();
            }
        }
    }
}

let mult_1000 = 1;

function rodar_simulacao() {
    desenhar_elementos();
    tempoFinal = performance.now();
    tempoTotal = tempoFinal - tempoInicial; //milissegundos
    if (tempoTotal >= mult_1000*1000) {
        tirar_energia_celulas();
        mult_1000++;
    }
    movimentar_celulas();
    detectar_colisoes();
    if (comidas.length == 0) {
        gerar_comidas();
    }
    atualizar_info();
    requestAnimationFrame(rodar_simulacao);
}

gerar_celulas(4,1);
gerar_comidas();
tempoInicial = performance.now();
rodar_simulacao();
