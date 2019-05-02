function screen(x, y) {
    let table = document.createElement('table');
    table.className = 'screen';
    document.getElementById('screen').appendChild(table);

    for (let i = 0; i < y; i++) {
        let line = document.createElement('tr');
        line.className = 'row';
        table.appendChild(line);

        for (let j = 0; j < x; j++) {
            let column = document.createElement('th');
            column.className = 'column';
            column.style.backgroundColor = "#fff";
            column.style.width = '10px';
            column.style.height = '10px';
            column.setAttribute('onmousemove', `coordenadas( ${j},${i});`);
            column.setAttribute('onclick', `pixelPaint(${j}, ${i}); poligonoPoint( ${j},${i});`);
            column.setAttribute('ondblclick', `cleanPixel(${j}, ${i});`);

            line.appendChild(column);
        }
    }
}

function pixelPaint(x, y, cor = color) {
    if (x >= 0 && y >= 0 && x < xScreen && y < yScreen) {
        let pixel = document.getElementsByClassName('row')[y].getElementsByClassName('column')[x];
        pixel.style.backgroundColor = cor;
    }
}

function cleanPixel(x, y) {
    if (x >= 0 && y >= 0 && x < xScreen && y < yScreen) {
        let pixel = document.getElementsByClassName('row')[y].getElementsByClassName('column')[x];
        pixel.style.backgroundColor = '#ffffff';
    }
}

function rgbToHex(col){
    if(col.charAt(0)=='r'){
        col=col.replace('rgb(','').replace(')','').split(',');
        var r=parseInt(col[0], 10).toString(16);
        var g=parseInt(col[1], 10).toString(16);
        var b=parseInt(col[2], 10).toString(16);
        r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
        var colHex='#'+r+g+b;
        return colHex;
    }
}

function pixelColorSearch(x, y) {
    let pixel = document.getElementsByClassName('row')[y].getElementsByClassName('column')[x];
    return rgbToHex(pixel.style.backgroundColor);
}

function screenClean(i, j) { //limpa todos os pixels da tela
    for (let x = 0; x < i; x++) {
        for (let y = 0; y < j; y++) {
            cleanPixel(x, y);
        }
    }
}

function valueById(x) {
    return document.getElementById(x).value;
}

function numberValueById(x) {
    return Number(document.getElementById(x).value);
}

function coordenadas(x, y) {
    document.getElementById('coordenadas').innerHTML = `COORDENADAS (${x},${y})`;

}
// =========== ALGORITMOS GRAFICOS ==================
function bresenham(x0, y0, x1, y1) {

    let dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    let dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
    let err = (dx > dy ? dx : -dy) / 2;

    while (true) {
        pixelPaint(x0, y0);
        if (x0 === x1 && y0 === y1) break;
        let e2 = err;
        if (e2 > -dx) { err -= dy; x0 += sx; }
        if (e2 < dy) { err += dx; y0 += sy; }
    }
}

function bresenhamClean(x0, y0, x1, y1) {

    let dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    let dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
    let err = (dx > dy ? dx : -dy) / 2;

    while (true) {
        cleanPixel(x0, y0);
        if (x0 === x1 && y0 === y1) break;
        let e2 = err;
        if (e2 > -dx) { err -= dy; x0 += sx; }
        if (e2 < dy) { err += dx; y0 += sy; }
    }
}

//Circulo
function circle(xCenter, yCenter, radius) {

    function circlePoints(cx, cy, x, y) {
        if (x === 0) {
            pixelPaint(cx, cy + y);
            pixelPaint(cx, cy - y);
            pixelPaint(cx + y, cy);
            pixelPaint(cx - y, cy);
        } else if (x === y) {
            pixelPaint(cx + x, cy + y);
            pixelPaint(cx - x, cy + y);
            pixelPaint(cx + x, cy - y);
            pixelPaint(cx - x, cy - y);
        } else if (x < y) {
            pixelPaint(cx + x, cy + y);
            pixelPaint(cx - x, cy + y);
            pixelPaint(cx + x, cy - y);
            pixelPaint(cx - x, cy - y);
            pixelPaint(cx + y, cy + x);
            pixelPaint(cx - y, cy + x);
            pixelPaint(cx + y, cy - x);
            pixelPaint(cx - y, cy - x);
        }
    }

    let x = 0;
    let y = radius;
    let p = (5 - radius * 4) / 4;

    circlePoints(xCenter, yCenter, x, y);
    while (x < y) {
        x++;
        if (p < 0) {
            p += 2 * x + 1;
        } else {
            y--;
            p += 2 * (x - y) + 1;
        }
        circlePoints(xCenter, yCenter, x, y);
    }
}

//Curva de Bezier
//Bezier Quadratico
function bezierQuadratic(x1, y1, x2, y2, x3, y3) {
    console.log(`P1(${x1},${y1})`);
    console.log(`P2(${x2},${y2})`);
    console.log(`P3(${x3},${y3})`);
    for (let t = 0; t <= 1; t += 0.001) {
        let xu = Math.pow(1 - t, 2) * x1 + 2 * t * (1 - t) * x2 + Math.pow(t, 2) * x3;
        let yu = Math.pow(1 - t, 2) * y1 + 2 * t * (1 - t) * y2 + Math.pow(t, 2) * y3;

        console.table(Math.round(xu), Math.round(yu));
        pixelPaint(Math.round(xu), Math.round(yu));
    }
}

//Bezier Cubico
function bezierCubic(x1, y1, x2, y2, x3, y3, x4, y4) {
    console.log(`P1(${x1},${y1})`);
    console.log(`P2(${x2},${y2})`);
    console.log(`P3(${x3},${y3})`);
    console.log(`P4(${x4},${y4})`);
    for (let t = 0; t <= 1; t += 0.001) {
        let xu = Math.pow(1 - t, 3) * x1 + 3 * t * Math.pow(1 - t, 2) * x2 + 3 * Math.pow(t, 2) * (1 - t) * x3 + Math.pow(t, 3) * x4;
        let yu = Math.pow(1 - t, 3) * y1 + 3 * t * Math.pow(1 - t, 2) * y2 + 3 * Math.pow(t, 2) * (1 - t) * y3 + Math.pow(t, 3) * y4;
        console.table(Math.round(xu), Math.round(yu));
        pixelPaint(Math.round(xu), Math.round(yu));
    }
}

//Poligono
function poligonoPoint(x, y) {
    poligono.push([x, y]);
}

function poligonoPaint(p) { //recebe como algumento um array bi-dimensional com as coordenadas dos pontos no polighono.
    for (let count = 0; count < p.length; count++) {
        if (count != p.length - 1) {
            bresenham(p[count][0], p[count][1], p[count + 1][0], p[count + 1][1]);
        }
        else {
            bresenham(p[0][0], p[0][1], p[p.length - 1][0], p[p.length - 1][1]);
        }
    }
    return console.table(p)
}

function poligonoClean(p) { //recebe como algumento um array bi-dimensional com as coordenadas dos pontos no polighono.
    for (let count = 0; count < p.length; count++) {
        if (count != p.length - 1) {
            bresenhamClean(p[count][0], p[count][1], p[count + 1][0], p[count + 1][1]);
        }
        else {
            bresenhamClean(p[0][0], p[0][1], p[p.length - 1][0], p[p.length - 1][1]);
        }
    }
    return console.table(p)
}

//Transformação - Translado
function poligonoTranslado(p, x, y) {
    for (let count = 0; count < p.length; count++) {
        p[count][0] += x;
        p[count][1] += y;
    }
}

//Transformação - Escala
function poligonoEscala(p, x, y) {
    //VARIAVEIS PARA COREÇAO DE DESLOCAMENTO
    let listax = []; listay = [];

    for (let x = 0; x < p.length; x++) {
        listax.push(parseInt(p[x][0]));
        listay.push(parseInt(p[x][1]));

    }

    let originX = listax.reduce(function (a, b) {
        return Math.min(a, b);
    });

    let originY = listay.reduce(function (a, b) {
        return Math.min(a, b);
    });
    //ALGORITMO DE ESCALA [COM CORREÇAO DE DISTANCIA]
    for (let count = 0; count < p.length; count++) {
        if (x != 0) { p[count][0] = originX + (Math.round((p[count][0] - originX) * x)); }
        if (y != 0) { p[count][1] = originY + (Math.round((p[count][1] - originY) * y)); }
    }
}

//Transformação - Rotação
function poligonoRotate(p, x_pivot, y_pivot, angle) {
    for (let i = 0; i < p.length; i++) {
        let x_shifted = p[i][0] - x_pivot;
        let y_shifted = p[i][1] - y_pivot;
        p[i][0] = Math.round(x_pivot + (x_shifted * Math.cos(angle * Math.PI / 180) - y_shifted * Math.sin(angle * Math.PI / 180)));
        p[i][1] = Math.round(y_pivot + (x_shifted * Math.sin(angle * Math.PI / 180) + y_shifted * Math.cos(angle * Math.PI / 180)));
    }
}

//PREENCHIMENTO
//recursivo
function floodFill(x,  y,  fill_color, boundary_color)
{
    if(pixelColorSearch(x, y) != boundary_color && pixelColorSearch(x, y) != fill_color)
    {
        pixelPaint(x, y, fill_color);
        floodFill(x + 1, y, fill_color, boundary_color);
        floodFill(x, y + 1, fill_color, boundary_color);
        floodFill(x - 1, y, fill_color, boundary_color);
        floodFill(x, y - 1, fill_color, boundary_color);
    }
}

//scanline
function fillScanline(color,fill){
    return console.log('Scan line não implementado');
}

//RECORTE
//linha [Cohen-Sutherland]

// Define os Códigos das Regiões
const INSIDE = 0; // 0000 
const LEFT = 1;   // 0001 
const RIGHT = 2;  // 0010 
const BOTTOM = 4; // 0100 
const TOP = 8;    // 1000 

// Define x_max, y_max e x_min, y_min para os 
// retângulo de recorte. Como os pontos diagonais são
// o suficiente para definir um retângulo 
let x_max = 49;
let y_max = 49;
let x_min = 0;
let y_min = 0;

// Função para calcular o código da região para um point(x, y) 
function computeCode(x, y){
    // initialized as being inside  
    let code = INSIDE;

    if (x < x_min)       // à esquerda do retângulo
        {code = LEFT;}
    else if (x > x_max)  // à direita do retângulo 
        {code = RIGHT;}
    if (y < y_min)       // abaixo do retângulo 
        {code = BOTTOM;}
    else if (y > y_max)  // acima do retângulo 
        {code = TOP;}

    return code;
}

// Implementaçao do algoritmo de Cohen-Sutherland  
// recorta a linha para os pontos P1 = (x2, y2) to P2 = (x2, y2) 
function cohenSutherlandClip(x1, y1, x2, y2){
    // Códigos de região de computação para P1, P2 
    let code1 = computeCode(x1, y1);
    let code2 = computeCode(x2, y2);

    // Inicialize a linha como fora da janela retangular
    let accept = false;

    while (true) {
        if ((code1 === 0) && (code2 === 0)) {
            // Se ambos os terminais estiverem dentro do retângulo
            accept = true;
            //desenha a linha
            bresenham(x1, y1, x2, y2);
            break;
        }
        else if ((code1 !== 0) && (code2 !== 0)) {
            // Se ambos os terminais estiverem fora do retângulo, na mesma região
            break;
        }
        else {
            // Algum segmento de linha está dentro do retângulo
            let code_out, x, y;

            // Pelo menos um endpoint está fora do retângulo, escolha.
            if (code1 !== 0){
                code_out = code1;
            }else{
                code_out = code2;
            }
            // Encontrar ponto de intersecção;
            // usando as formulas: y = y1 + slope * (x - x1), 
            // x = x1 + (1 / slope) * (y - y1) 
            if (code_out === TOP) {
                // o ponto está acima do retângulo do clipe
                x = x1 + (x2 - x1) * (y_max - y1) / (y2 - y1);
                y = y_max;
            }
            else if (code_out === BOTTOM) {
                // o ponto está abaixo do retângulo
                x = x1 + (x2 - x1) * (y_min - y1) / (y2 - y1);
                y = y_min;
            }
            else if (code_out === RIGHT) {
                // ponto é à direita do retângulo
                y = y1 + (y2 - y1) * (x_max - x1) / (x2 - x1);
                x = x_max;
            }
            else if (code_out === LEFT) {
                // point está à esquerda do retângulo
                y = y1 + (y2 - y1) * (x_min - x1) / (x2 - x1);
                x = x_min;
            }

            // Agora o ponto de intersecção x, y é encontrado
            // Substituímos o ponto fora do retângulo
            // pelo ponto de intersecção
            if (code_out === code1) {
                x1 = x;
                y1 = y;
                code1 = computeCode(x1, y1);
            }
            else {
                x2 = x;
                y2 = y;
                code2 = computeCode(x2, y2);
            }
            bresenham(x1, y1, x2, y2);
        }
    }
    if (accept) {
        console.log(`linha dentro nos pontos p1(${x1},${y1}) e p2(${x2},${y2})`);
        //exibe onde a linha foi plotada
    }else{
        console.log('linha totalmente fora');
    }
} 

//=========poligono [não terminado]
const MAX_POINTS = 20; 
  
// Returns x-value of point of intersectipn of two 
// lines 
int x_intersect(x1, y1, x2, y2, x3, y3, x4, y4){ 
    let num = (x1*y2 - y1*x2) * (x3-x4) - (x1-x2) * (x3*y4 - y3*x4); 
    let den = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4); 
    return num/den; 
} 
  
// Returns y-value of point of intersectipn of 
// two lines 
function y_intersect(x1, y1, x2, y2, x3, y3, x4, y4){ 
    let num = (x1*y2 - y1*x2) * (y3-y4) - (y1-y2) * (x3*y4 - y3*x4); 
    let den = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4); 
    return num/den; 
} 
  
// This functions clips all the edges w.r.t one clip 
// edge of clipping area 
function clip(poly_points[][2], poly_size, x1, y1, x2, y2){ 
    let new_points, new_poly_size = 0; 
  
    // (ix,iy),(kx,ky) are the co-ordinate values of 
    // the points 
    for (let i = 0; i < poly_size; i++){ 
        // i and k form a line in polygon 
        let k = (i+1) % poly_size; 
        let ix = poly_points[i][0], iy = poly_points[i][1]; 
        let kx = poly_points[k][0], ky = poly_points[k][1]; 
  
        // Calculating position of first point 
        // w.r.t. clipper line 
        let i_pos = (x2-x1) * (iy-y1) - (y2-y1) * (ix-x1); 
  
        // Calculating position of second point 
        // w.r.t. clipper line 
        let k_pos = (x2-x1) * (ky-y1) - (y2-y1) * (kx-x1); 
  
        // Case 1 : When both points are inside 
        if (i_pos < 0  && k_pos < 0) 
        { 
            //Only second point is added 
            new_points[new_poly_size][0] = kx; 
            new_points[new_poly_size][1] = ky; 
            new_poly_size++; 
        }   
        // Case 2: When only first point is outside 
        else if (i_pos >= 0  && k_pos < 0) 
        { 
            // Point of intersection with edge 
            // and the second point is added 
            new_points[new_poly_size][0] = x_intersect(x1, y1, x2, y2, ix, iy, kx, ky); 
            new_points[new_poly_size][1] = y_intersect(x1, y1, x2, y2, ix, iy, kx, ky); 
            new_poly_size++; 
            new_points[new_poly_size][0] = kx; 
            new_points[new_poly_size][1] = ky; 
            new_poly_size++; 
        } 
  
        // Case 3: When only second point is outside 
        else if (i_pos < 0  && k_pos >= 0) 
        { 
            //Only point of intersection with edge is added 
            new_points[new_poly_size][0] = x_intersect(x1, y1, x2, y2, ix, iy, kx, ky); 
            new_points[new_poly_size][1] = y_intersect(x1, y1, x2, y2, ix, iy, kx, ky); 
            new_poly_size++; 
        } 
  
        // Case 4: When both points are outside 
        else
        { 
            //No points are added 
        } 
    } 
  
    // Copying new points into original array 
    // and changing the no. of vertices 
    poly_size = new_poly_size; 
    for (let i = 0; i < poly_size; i++) 
    { 
        poly_points[i][0] = new_points[i][0]; 
        poly_points[i][1] = new_points[i][1]; 
    } 
} 
  
// Implements Sutherland–Hodgman algorithm 
function suthHodgClip(poly_points[][2], poly_size, clipper_points[][2], clipper_size) { 
    //i and k are two consecutive indexes 
    for (let i=0; i < clipper_size; i++) 
    { 
        let k = (i+1) % clipper_size; 
  
        // We pass the current array of vertices, it's size 
        // and the end points of the selected clipper line 
        clip(poly_points, poly_size, clipper_points[i][0], clipper_points[i][1], clipper_points[k][0], clipper_points[k][1]); 
    } 
  
    // Printing vertices of clipped polygon 
    for (let i = 0; i < poly_size; i++) {
        console.log(poly_points[i][0],poly_points[i][1]);
    }
} 
  
//Driver code 
int main() 
{ 
    // Defining polygon vertices in clockwise order 
    int poly_size = 3; 
    int poly_points[20][2] = {{100,150}, {200,250}, 
                              {300,200}}; 
  
    // Defining clipper polygon vertices in clockwise order 
    // 1st Example with square clipper 
    int clipper_size = 4; 
    int clipper_points[][2] = {{150,150}, {150,200}, 
                              {200,200}, {200,150} }; 
  
    // 2nd Example with triangle clipper 
    /*int clipper_size = 3; 
    int clipper_points[][2] = {{100,300}, {300,300}, 
                                {200,100}};*/
  
    //Calling the clipping function 
    suthHodgClip(poly_points, poly_size, clipper_points, 
                 clipper_size); 
  
    return 0; 
} 