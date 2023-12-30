const  canvas = window.document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Celula {
    constructor(x,y, cor) {
        this.r = 50;
        this.x_center = x + this.r;
        this.y_center = y + this.r;
        this.v = 5;
        this.cor = cor;
    }

    andar() {
        this.x_center += this.v;
        this.y_center += this.v;
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
    const vermelho  = Math.floor(Math.random() * 256);
    const verde  = Math.floor(Math.random() * 256);
    const azul = Math.floor(Math.random() * 256);
    const cor = `#${vermelho.toString(16)}${verde.toString(16)}${azul.toString(16)}`;
    return cor;
}

let celulas = [];
let x = 0;
let y = 0;
let cor = '';
function gerar_celulas() {
    for (let i = 0; i <= 4; i++) {
        x = gerar_n_aleatorio(0,1900);
        y = gerar_n_aleatorio(0,1500);
        cor = gerar_cor_aleatoria();
        const celula = new Celula(x,y,cor);
        celulas.push(celula);
    }
}

function desenhar_celulas() {
    for (let i = 0; i <= 4; i++) {
        celulas[i].desenhar();
    }
}

gerar_celulas();
desenhar_celulas();
