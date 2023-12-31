const  canvas = window.document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas_width = 4000;
const canvas_height = 1000;

let canvasInfo = window.document.getElementById("canvas_infos");
let ctxInfo = canvasInfo.getContext("2d");
const canvasInfo_width = 4000;
const canvasInfo_height = 300;

class Celula {
    constructor(x,y, cor) {
        this.r = 50;
        this.x_center = x + this.r;
        this.y_center = y + this.r;
        this.v = 50;
        this.cor = cor;
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
function gerar_celulas(n) {
    for (let i = 0; i <= n; i++) {
        let x = gerar_n_aleatorio(0,canvas_width - 100);
        let y = gerar_n_aleatorio(0,canvas_height - 100);
        let cor = gerar_cor_aleatoria();
        const celula = new Celula(x,y,cor);
        celulas.push(celula);
    }
}

function desenhar_celulas(n) {
    /*for (let i = 0; i <= n; i++) {
        celulas[i].desenhar();
    }*/
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    celulas[0].desenhar();
}

function movimentar_celulas() {
    /*for (let i = 0; i <= 4; i++) {
        let decisao = gerar_n_aleatorio(0,5);
        //alert(decisao);
        switch (decisao) {
            case 1:
                celulas[i].andar_frente();
                break;
            case 2:
                celulas[i].andar_tras();
                break;
            case 3:
                celulas[i].andar_cima();
                break;
            case 4:
                celulas[i].andar_baixo();
                break;
            default: // case 0, fique parado
                break;      
        }
    }*/

    let decisao = gerar_n_aleatorio(0,5);
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

let tempoInicial = 0;
let tempoFinal = 0;
let tempoTotal = 0;
function atualizar_info() {
    ctxInfo.clearRect(0, 0, canvasInfo_width, canvasInfo_height);
    ctxInfo.font = "100px Arial";
    ctxInfo.fillStyle = "black";
    ctxInfo.textAlign = "left";
    ctxInfo.fillText(`Tempo decorrido:`, 20, 100);
    let minutos = Math.floor(tempoTotal / (60 * 1000))
    ctxInfo.fillText(`${minutos} minutos`, 880, 100);
    let segundos = ((tempoTotal % (60 * 1000)) / 1000).toFixed(0)
    ctxInfo.fillText(`${segundos} segundos`, 1425, 100);
}


function rodar_simulacao() {
    desenhar_celulas(4);
    tempoFinal = performance.now();
    tempoTotal = tempoFinal - tempoInicial; //milissegundos
    atualizar_info();
    movimentar_celulas();
    requestAnimationFrame(rodar_simulacao);
}

gerar_celulas(4);
tempoInicial = performance.now();
rodar_simulacao();
