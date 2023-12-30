const  canvas = window.document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Celula {
    constructor(x,y) {
        this.r = 50;
        this.x_center = x + this.r;
        this.y_center = y + this.r;
        this.v = 5;
        this.cor = 'blue';
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

let x = gerar_n_aleatorio(0,1900);
let y = gerar_n_aleatorio(0,1500);
const celula1 = new Celula(x,y);
celula1.desenhar();
