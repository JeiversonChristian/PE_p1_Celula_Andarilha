const  canvas = window.document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas_width = 2000;
const canvas_height = 1600;

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
    for (let i = 0; i <= n; i++) {
        celulas[i].desenhar();
    }
}

function movimentar_celulas() {
    for (let i = 0; i <= 4; i++) {
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
    }
}

function rodar_simulacao() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    desenhar_celulas(4);
    movimentar_celulas();
    requestAnimationFrame(rodar_simulacao);
}

gerar_celulas(4);
rodar_simulacao();
