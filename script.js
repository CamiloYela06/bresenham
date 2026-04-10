const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Limpia el canvas completo
function limpiar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

//Dibuja un punto en el canvas
const escala = 20;

function plot(x,y){
    ctx.fillstyle="Black";

    ctx.fillRect(
        x*escala,
        canvas.height - y*escala,
        escala,
        escala
    );
}
//dibujar cuadricula y numeracion 
function dibujarCuadricula(){
       ctx.strokeStyle = "#ccc";
       ctx.beginPath();
    for(let x=0;x<canvas.width;x+=escala){
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
    }
    for(let y=0;y<canvas.height;y+=escala){
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
    }
    ctx.stroke();
    //numeracion eje x 
    ctx.fillstyle="Black";
    for(let i=0;i<=canvas.width/escala;i++){
        ctx.fillText(i, i*escala, canvas.height-5);
    }
    //numeracion eje y
    for(let i=0;i<=canvas.height/escala;i++){
        ctx.fillText(i,0,canvas.height-(i*escala));
    }
}
/**
 * Implementación del algoritmo de líneas de Bresenham.
 * @param {number} x0 - Coordenada X inicial.
 * @param {number} y0 - Coordenada Y inicial.
 * @param {number} x1 - Coordenada X final.
 * @param {number} y1 - Coordenada Y final.
 * @param {Function} plot - Función para dibujar el píxel (x, y).
 */
function bresenham(x0, y0, x1, y1, plot) {

    let k = 0;
    const pasos = [];
    // Cálculo de diferenciales y dirección del paso
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        pasos.push({k,x:x0,y:y0,err});

        // Dibujar el punto actual
        plot(x0, y0);

        // Condición de finalización
        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        // Ajuste en el eje X
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        // Ajuste en el eje Y
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
        k++;
    }
    return pasos;
}
//llena la tabla con los pasos del algoritmo
function llenarTabla(pasos){
    const tbody=document.querySelector("#tabla tbody");
    tbody.innerHTML="";
    pasos.forEach(p=>{
        tbody.innerHTML+=`
        <tr>
        <td>${p.k}</td>
        <td>${p.x}</td>
        <td>${p.y}</td>
        <td>${p.err}</td>
        </tr>`;
    });
}
