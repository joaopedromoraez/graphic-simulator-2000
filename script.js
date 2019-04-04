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
// bresenham

let draw_line = (x1, y1, x2, y2,color) => {
    
    // Iterators, counters required by algorithm
    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;

    // Calculate line deltas
    dx = x2 - x1;
    dy = y2 - y1;

    // Create a positive copy of deltas (makes iterating easier)
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);

    // Calculate error intervals for both axis
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;

    // The line is X-axis dominant
    if (dy1 <= dx1) {

        // Line is drawn left to right
        if (dx >= 0) {
            x = x1; y = y1; xe = x2;
        } else { // Line is drawn right to left (swap ends)
            x = x2; y = y2; xe = x1;
        }
        console.log("x:"+x,"y"+y)
        console.log(typeof(x))
        pixelPaint(x, y,color); // Draw first pixel

        // Rasterize the line
        for (i = 0; x < xe; i++) {
            x = x + 1;

            // Deal with octants...
            if (px < 0) {
                px = px + 2 * dy1;
            } else {
                if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                    y = y + 1;
                } else {
                    y = y - 1;
                }
                px = px + 2 * (dy1 - dx1);
            }

            // Draw pixel from line span at currently rasterized position
            console.log("x:"+x,"y"+y)
            pixelPaint(x, y,color);
        }

    } else { // The line is Y-axis dominant

        // Line is drawn bottom to top
        if (dy >= 0) {
            x = x1; y = y1; ye = y2;
        } else { // Line is drawn top to bottom
            x = x2; y = y2; ye = y1;
        }
        console.log("x:"+x,"y"+y)
        pixelPaint(x, y,color); // Draw first pixel

        // Rasterize the line
        for (i = 0; y < ye; i++) {
            y = y + 1;

            // Deal with octants...
            if (py <= 0) {
                py = py + 2 * dx1;
            } else {
                if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                    x = x + 1;
                } else {
                    x = x - 1;
                }
                py = py + 2 * (dx1 - dy1);
            }
            console.log("x:"+x,"y"+y)
            // Draw pixel from line span at currently rasterized position
            pixelPaint(x, y,color);
        }
    }
 }
