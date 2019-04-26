function screen(x, y) {
    let table = document.createElement('table', 'screen');
    table.className = 'screen';
    document.getElementById('screen').appendChild(table);

    for (let i = 0; i < x; i++) {
        let line = document.createElement('tr');
        line.className = 'row';
        table.appendChild(line);

        for (let j = 0; j < y; j++) {
            let column = document.createElement('th');
            column.className = 'column';
            column.style.backgroundColor = "white";
            column.style.width = '10px';
            column.style.height = '10px';
            column.setAttribute('onmousemove', 'coordenadas(' + i + ',' + j + ');');
            column.setAttribute('onclick', 'clickPixel(' + i + ',' + j + ',color);');
            line.appendChild(column);
        }
    }
}

function pixelPaint(x, y) {
    if (x >= 0 && y >= 0 && x < xScreen && y < yScreen) {
        let pixel = document.getElementsByClassName('row')[x].getElementsByClassName('column')[y];
        pixel.style.backgroundColor = color;
    }
}

function cleanPixel(x, y) {
    let pixel = document.getElementsByClassName('row')[x].getElementsByClassName('column')[y];
    pixel.style.backgroundColor = 'white';
}

function clickPixel(x, y) {
    if (document.getElementsByClassName('row')[x].getElementsByClassName('column')[y].style.backgroundColor === 'white') {
        pixelPaint(x, y);
    } else {
        cleanPixel(x, y);
    }
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
    document.getElementById('coordenadas').innerHTML = 'COORDENADAS (' + (x) + ',' + (y) + ')';

}
// =========== ALGORITMOS GRAFICOS ==================
// Bresenham
function bresenham(x0, y0, x1, y1) {

    var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
    var err = (dx > dy ? dx : -dy) / 2;

    while (true) {
        pixelPaint(x0, y0);
        if (x0 === x1 && y0 === y1) break;
        var e2 = err;
        if (e2 > -dx) { err -= dy; x0 += sx; }
        if (e2 < dy) { err += dx; y0 += sy; }
    }
}

//Circulo
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

function circulo(xCenter, yCenter, radius) {
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

//Curva de Belzie
function bezierQuadratic(x1, y1, x2, y2, x3, y3) {
    console.log(`P1(${x1},${y1})`);
    console.log(`P2(${x2},${y2})`);
    console.log(`P3(${x3},${y3})`);
    for(let t = 0 ; t <= 1 ; t += 0.001) 
    { 
        let xu = Math.pow(1-t,2)*x1 + 2*t*(1-t)*x2 + Math.pow(t,2)*x3; 
        let yu = Math.pow(1-t,2)*y1 + 2*t*(1-t)*y2 + Math.pow(t,2)*y3; 
        
        console.table(Math.round(xu) , Math.round(yu)) ; 
        pixelPaint(Math.round(xu) , Math.round(yu)) ; 
    } 
} 

function bezierCubic(x1, y1, x2, y2, x3, y3,x4,y4) {
    console.log(`P1(${x1},${y1})`);
    console.log(`P2(${x2},${y2})`);
    console.log(`P3(${x3},${y3})`);
    console.log(`P4(${x4},${y4})`);
    for(let t = 0 ; t <= 1 ; t += 0.001) 
    { 
        let xu = Math.pow(1-t,3)*x1 + 3*t*Math.pow(1-t,2)*x2 + 3*Math.pow(t,2)*(1-t)*x3 + Math.pow(t,3)*x4;

        let yu = Math.pow(1-t,3)*y1 + 3*t*Math.pow(1-t,2)*y2 + 3*Math.pow(t,2)*(1-t)*y3 + Math.pow(t,3)*y4;
        
        console.table(Math.round(xu) , Math.round(yu)) ; 
        pixelPaint(Math.round(xu) , Math.round(yu)) ; 
    } 
} 