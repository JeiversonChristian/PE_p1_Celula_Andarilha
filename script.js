const  canvas = window.document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Celula {
    constructor() {
        this.r = 50;
        this.x_center = 0 + this.r;
        this.y_center = 0 + this.r;
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

const celula1 = new Celula();
celula1.desenhar();
