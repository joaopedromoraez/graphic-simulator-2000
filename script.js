function screen(x,y){
    var table = document.createElement('table','screen'); 
    table.className = 'screen';
    document.getElementById('screen').appendChild(table);
    
    for (var i = 0; i < x ; i++){
        var line = document.createElement('tr'); 
        line.className = 'row';
        table.appendChild(line);

        for (var j = 0; j < y ; j++){
            var column = document.createElement('th'); 
            column.className = 'column';
            column.style.backgroundColor = "white";
            column.style.width = '20px';
            column.style.height = '20px';
            column.setAttribute('onmousemove','coordenadas('+i+','+j+');');
            column.setAttribute('onclick','clickPixel('+i+','+j+',color);');
            line.appendChild(column);
        }
    }
}

function pixelPaint(x,y,color = '#000'){
    document.getElementsByClassName('row')[x].getElementsByClassName('column')[y].style.backgroundColor = color;
}

function cleanPixel(x,y){
    document.getElementsByClassName('row')[x].getElementsByClassName('column')[y].style.backgroundColor = 'white';
}

function clickPixel(x,y,color = '#000'){
    if (document.getElementsByClassName('row')[x].getElementsByClassName('column')[y].style.backgroundColor === 'white'){
        pixelPaint(x,y,color);
    } else {
        cleanPixel(x,y);
    }
}

function screenClean(i, j) { //limpa todos os pixels da tela
    for (var x = 0; x < i; x++) {
        for (var y = 0; y < j; y++) {
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

function coordenadas(x,y){
    document.getElementById('coordenadas').innerHTML = 'COORDENADAS ('+(x)+','+(y)+')';

}

// =========== ALGORITMOS GRAFICOS ==================
// Bresenham
function bresenham(x0, y0, x1, y1,color) {

    var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1; 
    var err = (dx>dy ? dx : -dy)/2;
    
    while (true) {
        pixelPaint(x0,y0,color);
        if (x0 === x1 && y0 === y1) break;
        var e2 = err;
        if (e2 > -dx) { err -= dy; x0 += sx; }
        if (e2 < dy) { err += dx; y0 += sy; }
    }
}

// Circulo
function circulo (x,y,raio,color){

}

