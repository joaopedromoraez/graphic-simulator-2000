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
function getPt(n1, n2, perc) {
    let diff = n2 - n1;

    // return Math.ceil (n1 + (diff * perc));
    return n1 + (diff * perc);
}

function bezier(x1, y1, x2, y2, x3, y3) {

    for (let i = 0; i < 1 ; i += 0.01 )
    {
        // The Green Line
        let xa = getPt(x1, x2, i);
        let ya = getPt(y1, y2, i);
        let xb = getPt(x2, x3, i);
        let yb = getPt(y2, y3, i);

        // The Black Dot
        let x = getPt(xa, xb, i);
        let y = getPt(ya, yb, i);

        console.log(x,y);
        // pixelPaint(x, y);
    }
}