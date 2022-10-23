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

function rgbToHex(col) {
    if (col.charAt(0) == 'r') {
        col = col.replace('rgb(', '').replace(')', '').split(',');
        var r = parseInt(col[0], 10).toString(16);
        var g = parseInt(col[1], 10).toString(16);
        var b = parseInt(col[2], 10).toString(16);
        r = r.length == 1 ? '0' + r : r; g = g.length == 1 ? '0' + g : g; b = b.length == 1 ? '0' + b : b;
        var colHex = '#' + r + g + b;
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
    document.getElementById('coordenadas').innerHTML = `COORDENADAS (x${x},y${y})`;

}
// =========== ALGORITMOS GRAFICOS ==================
function bresenham(x0, y0, x1, y1, cor = color) {

    let dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    let dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
    let err = (dx > dy ? dx : -dy) / 2;

    while (true) {
        pixelPaint(x0, y0, cor);
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
    let pontosbezier = [];
    for (let t = 0; t <= 1; t += 0.1) {
        let xu = Math.pow(1 - t, 2) * x1 + 2 * t * (1 - t) * x2 + Math.pow(t, 2) * x3;
        let yu = Math.pow(1 - t, 2) * y1 + 2 * t * (1 - t) * y2 + Math.pow(t, 2) * y3;
        pontosbezier.push([Math.round(xu), Math.round(yu)]);
    }
    for (let x = 0; x < (pontosbezier.length - 1); x++){
        bresenham(pontosbezier[x][0],pontosbezier[x][1],pontosbezier[x+1][0],pontosbezier[x+1][1],);
    }
    console.table(pontosbezier);
}

//Bezier Cubico
function bezierCubic(x1, y1, x2, y2, x3, y3, x4, y4) {
    let pontosbezier = [];
    for (let t = 0; t <= 1; t += 0.1) {
        let xu = Math.pow(1 - t, 3) * x1 + 3 * t * Math.pow(1 - t, 2) * x2 + 3 * Math.pow(t, 2) * (1 - t) * x3 + Math.pow(t, 3) * x4;
        let yu = Math.pow(1 - t, 3) * y1 + 3 * t * Math.pow(1 - t, 2) * y2 + 3 * Math.pow(t, 2) * (1 - t) * y3 + Math.pow(t, 3) * y4;
        pontosbezier.push([Math.round(xu), Math.round(yu)]);
    }
    for (let x = 0; x < (pontosbezier.length - 1); x++){
        bresenham(pontosbezier[x][0],pontosbezier[x][1],pontosbezier[x+1][0],pontosbezier[x+1][1],);
    }
    console.table(pontosbezier);
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
function floodFill(x, y, fill_color, boundary_color) {
    if (pixelColorSearch(x, y) != boundary_color && pixelColorSearch(x, y) != fill_color) {
        pixelPaint(x, y, fill_color);
        floodFill(x + 1, y, fill_color, boundary_color);
        floodFill(x, y + 1, fill_color, boundary_color);
        floodFill(x - 1, y, fill_color, boundary_color);
        floodFill(x, y - 1, fill_color, boundary_color);
    }
}

//scanline
function fillScanline(polygon, fill) {
    
    function insertEdge(list, edge) {
      let q = list,
          p = list.next
      
      while (p) {
        if (edge.xIntersect < p.xIntersect) {
          p = null
        }
        else {
          q = p
          p = p.next
        }
      }
      
      edge.next = q.next
      q.next = edge
    }
    
    function yNext(k, cnt, pts) {
      let j
      
      if ((k+1) > (cnt-1)) {
        j = 0
      }
      else {
        j = k+1
      }
      
      while (pts[k][1] == pts[j][1]) {
        if ((j+1) > (cnt-1)) {
          j = 0
        }
        else {
          j++
        }
      }
      
      return pts[j][1]
    }
    
    function makeEdgeRec(lower, upper, yComp, edges) {
      let edge = {}
      edge.dxPerScan = (upper[0] - lower[0]) / (upper[1] - lower[1])
      edge.xIntersect = lower[0]
      if (upper[1] < yComp) {
        edge.yUpper = upper[1] - 1
      }
      else {
        edge.yUpper = upper[1]
      }
      insertEdge(edges[lower[1]], edge)
    }
    
    function buildEdgeList(pts, edges) {
      let cnt = pts.length,
          i,
          v1 = [0,0],
          v2 = [0,0],
          yPrev = pts[cnt-2][1]
          
      
      v1[0] = pts[cnt-1][0]
      v1[1] = pts[cnt-1][1]
      
      for (i=0; i<cnt; i++) {
        v2 = pts[i]
        if (v1[1] <= v2[1]) {
          makeEdgeRec(v1, v2, yNext(i, cnt, pts), edges)
        }
        if (v1[1] > v2[1]) {
          makeEdgeRec(v2, v1, yPrev, edges)
        }
        yPrev = v1[1]
        v1 = v2
      }
    }
    
    function buildActiveList(scan, active, edges) {
      let p = edges[scan].next,
          q
      
      while (p) {
        q = p.next
        insertEdge(active, p)
        p = q
      }
    }
    
    function fillScan(scan, active) {
      let p1 = active.next,
          p2,
          i
      
      while (p1) {
        p2 = p1.next
        // HACK FL for some reason we sometimes don't get pairwise lists...?
        if (p2) {
          for (i=Math.round(p1.xIntersect); i<p2.xIntersect; i++) {
            pixelPaint(i,scan,fill);
            // setPixel(i, scan)
          }
        }
        p1 = p2 && p2.next
      }
    }
    
    function deleteAfter(q) {
      let p = q.next
      q.next = p.next
    }
    
    function updateActiveList(scan, active) {
      let q = active,
          p = active.next
      
      while (p) {
        if (scan >= p.yUpper) {
          p = p.next
          deleteAfter(q)
        }
        else {
          p.xIntersect = p.xIntersect + p.dxPerScan
          q = p
          p = p.next
        }
      }
    }
    
    function resortActiveList(active) {
      let q,
          p = active.next
      
      active.next = null
      while (p) {
        q = p.next
        insertEdge(active, p)
        p = q
      }
    }
    
    let edges = [],
        active,
        i,scan
    
    for (i = 0; i<500; i++) {
      edges[i] = {next: null}
    }
    
    buildEdgeList(polygon, edges)
    active = { next: null }
    
    for (scan = 0; scan<500; scan++) {
      buildActiveList(scan, active, edges)
      if (active.next) {
        fillScan(scan, active)
        updateActiveList(scan, active)
        resortActiveList(active)
      }
    }
  }

//RECORTE
//linha [Cohen-Sutherland]

// Implementaçao do algoritmo de Cohen-Sutherland  
// recorta a linha para os pontos P1 = (x2, y2) to P2 = (x2, y2) 
function cohenSutherlandClip(x1, y1, x2, y2) {

    // Define os Códigos das Regiões
    const INSIDE = 0; // 0000 
    const LEFT = 1;   // 0001 
    const RIGHT = 2;  // 0010 
    const BOTTOM = 4; // 0100 
    const TOP = 8;    // 1000 

    // Define x_max, y_max e x_min, y_min para os 
    // retângulo de recorte. Como os pontos diagonais são
    // o suficiente para definir um retângulo 
    let x_max = xScreen - 1;
    let y_max = yScreen - 1;
    let x_min = 0;
    let y_min = 0;

    // Função para calcular o código da região para um point(x, y) 
    function computeCode(x, y) {
        // initialized as being inside  
        let code = INSIDE;

        if (x < x_min)       // à esquerda do retângulo
        { code = LEFT; }
        else if (x > x_max)  // à direita do retângulo 
        { code = RIGHT; }
        if (y < y_min)       // abaixo do retângulo 
        { code = BOTTOM; }
        else if (y > y_max)  // acima do retângulo 
        { code = TOP; }

        return code;
    }

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
            if (code1 !== 0) {
                code_out = code1;
            } else {
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
    } else {
        console.log('linha totalmente fora');
    }
}

//=========poligono 
function polygonClip(subjectPolygon, clipPolygon) {

    var cp1, cp2, s, e;
    var inside = function (p) {
        return (cp2[0] - cp1[0]) * (p[1] - cp1[1]) > (cp2[1] - cp1[1]) * (p[0] - cp1[0]);
    };
    var intersection = function () {
        var dc = [cp1[0] - cp2[0], cp1[1] - cp2[1]],
            dp = [s[0] - e[0], s[1] - e[1]],
            n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
            n2 = s[0] * e[1] - s[1] * e[0],
            n3 = 1.0 / (dc[0] * dp[1] - dc[1] * dp[0]);
        return [Math.round((n1 * dp[0] - n2 * dc[0]) * n3), Math.round((n1 * dp[1] - n2 * dc[1]) * n3)];
    };
    var outputList = subjectPolygon;
    cp1 = clipPolygon[clipPolygon.length - 1];
    for (j in clipPolygon) {
        var cp2 = clipPolygon[j];
        var inputList = outputList;
        outputList = [];
        s = inputList[inputList.length - 1]; //last on the input list
        for (i in inputList) {
            var e = inputList[i];
            if (inside(e)) {
                if (!inside(s)) {
                    outputList.push(intersection());
                }
                outputList.push(e);
            }
            else if (inside(s)) {
                outputList.push(intersection());
            }
            s = e;
        }
        cp1 = cp2;
    }
    console.table(outputList);
    poligonoPaint(outputList)
    listPolygon.push(outputList);
    addPolygon(count,'RECORTADO');
    return outputList;
}

function addPolygon(x,name = 'POLIGONO') {
    var conteudo = document.createElement('input');
    conteudo.value = `${name} ${x}`;
    conteudo.type = 'button'
    conteudo.className = 'form-btn btn-blue';
    document.getElementById('list-polygon').appendChild(conteudo);
    conteudo.addEventListener('click',function(){
    poligono = listPolygon[x];
    });
}

function cubo3d(pontos){ 
    let trans = []; 
    for(let x = 0; x < pontos.length;x++){ //pega os pontos em formato float e faz arredondamento.
        let newpoints = []
        for (let y = 0; y < pontos[x].length; y++){
            newpoints.push(Math.round(pontos[x][y]));
        }
        trans.push(newpoints);
    }
    pontos = [];
    pontos = trans;
    //retorna os pontos do poligono arrendondado;
    return [
    [pontos[0],pontos[1],pontos[2],pontos[3]],
    [pontos[4],pontos[5],pontos[6],pontos[7]],
    [pontos[0],pontos[4],pontos[7],pontos[3]],
    [pontos[1],pontos[5],pontos[6],pontos[2]],
    [pontos[3],pontos[7],pontos[6],pontos[2]],
    [pontos[0],pontos[4],pontos[5],pontos[1]]
];}


function poligono3dPrint(lista){
    for(let x = 0; x < lista.length; x++){
        poligonoPaint(lista[x]);
    }
}
//ROTAÇAO DE POLIGONO 3D
function rotate3D_X(poligono,angle){
    let radius = angle * Math.PI / 180;
    let matriz =[
        [1,0,0,0],
        [0,Math.cos(radius),-(Math.sin(radius)),0],
        [0,Math.sin(radius),Math.cos(radius),0],
        [0,0,0,1]
    ];
    let newpoints = [];
    for(let x = 0; x < poligono.length; x++){
        let vetorlocal = [];
        vetorlocal.push( (matriz[0][0]*poligono[x][0]) + (matriz[0][1]*poligono[x][1]) + (matriz[0][2]*poligono[x][2]) + (matriz[0][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[1][0]*poligono[x][0]) + (matriz[1][1]*poligono[x][1]) + (matriz[1][2]*poligono[x][2]) + (matriz[1][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[2][0]*poligono[x][0]) + (matriz[2][1]*poligono[x][1]) + (matriz[2][2]*poligono[x][2]) + (matriz[2][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[3][0]*poligono[x][0]) + (matriz[3][1]*poligono[x][1]) + (matriz[3][2]*poligono[x][2]) + (matriz[3][3]*poligono[x][3]) );
        newpoints.push(vetorlocal);
    }
    console.table(newpoints);
    return newpoints;
}

function rotate3D_Y(poligono,angle){
    let radius = angle * Math.PI / 180;
    let matriz =[
        [Math.cos(radius),0,Math.sin(radius),0],
        [0,1,0,0],
        [-(Math.sin(radius)),0,Math.cos(radius),0],
        [0,0,0,1]
    ];
    let newpoints = [];
    for(let x = 0; x < poligono.length; x++){
        let vetorlocal = [];
        vetorlocal.push( (matriz[0][0]*poligono[x][0]) + (matriz[0][1]*poligono[x][1]) + (matriz[0][2]*poligono[x][2]) + (matriz[0][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[1][0]*poligono[x][0]) + (matriz[1][1]*poligono[x][1]) + (matriz[1][2]*poligono[x][2]) + (matriz[1][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[2][0]*poligono[x][0]) + (matriz[2][1]*poligono[x][1]) + (matriz[2][2]*poligono[x][2]) + (matriz[2][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[3][0]*poligono[x][0]) + (matriz[3][1]*poligono[x][1]) + (matriz[3][2]*poligono[x][2]) + (matriz[3][3]*poligono[x][3]) );
        newpoints.push(vetorlocal);
    }
    console.table(newpoints);
    return newpoints;
}

function rotate3D_Z(poligono,angle){
    let radius = angle * Math.PI / 180;
    let matriz =[
        [Math.cos(radius),-(Math.sin(radius)),0,0],
        [Math.sin(radius),Math.cos(radius),0,0],
        [0,0,1,0],
        [0,0,0,1]
    ];
    let newpoints = [];
    for(let x = 0; x < poligono.length; x++){
        let vetorlocal = [];
        vetorlocal.push( (matriz[0][0]*poligono[x][0]) + (matriz[0][1]*poligono[x][1]) + (matriz[0][2]*poligono[x][2]) + (matriz[0][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[1][0]*poligono[x][0]) + (matriz[1][1]*poligono[x][1]) + (matriz[1][2]*poligono[x][2]) + (matriz[1][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[2][0]*poligono[x][0]) + (matriz[2][1]*poligono[x][1]) + (matriz[2][2]*poligono[x][2]) + (matriz[2][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[3][0]*poligono[x][0]) + (matriz[3][1]*poligono[x][1]) + (matriz[3][2]*poligono[x][2]) + (matriz[3][3]*poligono[x][3]) );
        newpoints.push(vetorlocal);
    }
    console.table(newpoints);
    return newpoints;
}

function escala3D(poligono,X,Y,Z){
    let matriz =[
        [X,0,0,0],
        [0,Y,0,0],
        [0,0,Z,0],
        [0,0,0,1]
    ];
    let newpoints = [];
    for(let x = 0; x < poligono.length; x++){
        let vetorlocal = [];
        vetorlocal.push( (matriz[0][0]*poligono[x][0]) + (matriz[0][1]*poligono[x][1]) + (matriz[0][2]*poligono[x][2]) + (matriz[0][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[1][0]*poligono[x][0]) + (matriz[1][1]*poligono[x][1]) + (matriz[1][2]*poligono[x][2]) + (matriz[1][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[2][0]*poligono[x][0]) + (matriz[2][1]*poligono[x][1]) + (matriz[2][2]*poligono[x][2]) + (matriz[2][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[3][0]*poligono[x][0]) + (matriz[3][1]*poligono[x][1]) + (matriz[3][2]*poligono[x][2]) + (matriz[3][3]*poligono[x][3]) );
        newpoints.push(vetorlocal);
    }
    console.table(newpoints);
    return newpoints;
}

function trans3D(poligono,X,Y,Z){
    let matriz =[
        [1,0,0,X],
        [0,1,0,Y],
        [0,0,1,Z],
        [0,0,0,1]
    ];
    let newpoints = [];
    for(let x = 0; x < poligono.length; x++){
        let vetorlocal = [];
        vetorlocal.push( (matriz[0][0]*poligono[x][0]) + (matriz[0][1]*poligono[x][1]) + (matriz[0][2]*poligono[x][2]) + (matriz[0][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[1][0]*poligono[x][0]) + (matriz[1][1]*poligono[x][1]) + (matriz[1][2]*poligono[x][2]) + (matriz[1][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[2][0]*poligono[x][0]) + (matriz[2][1]*poligono[x][1]) + (matriz[2][2]*poligono[x][2]) + (matriz[2][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[3][0]*poligono[x][0]) + (matriz[3][1]*poligono[x][1]) + (matriz[3][2]*poligono[x][2]) + (matriz[3][3]*poligono[x][3]) );
        newpoints.push(vetorlocal);
    }
    console.table(newpoints);
    return newpoints;
}

function drawAllPolygon(poligono){
    for(let x = 0; x < poligono.length; x++){
        poligonoPaint(poligono[x]);
    }
}

function perpectiva3d(poligono,d){
    let matriz =[
        [d,0,0,0],
        [0,d,0,0],
        [0,0,d,0],
        [0,0,1,0]
    ];
    let newpoints = [];
    for(let x = 0; x < poligono.length; x++){
        let vetorlocal = [];
        vetorlocal.push( (matriz[0][0]*poligono[x][0]) + (matriz[0][1]*poligono[x][1]) + (matriz[0][2]*poligono[x][2]) + (matriz[0][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[1][0]*poligono[x][0]) + (matriz[1][1]*poligono[x][1]) + (matriz[1][2]*poligono[x][2]) + (matriz[1][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[2][0]*poligono[x][0]) + (matriz[2][1]*poligono[x][1]) + (matriz[2][2]*poligono[x][2]) + (matriz[2][3]*poligono[x][3]) );
        vetorlocal.push( (matriz[3][0]*poligono[x][0]) + (matriz[3][1]*poligono[x][1]) + (matriz[3][2]*poligono[x][2]) + (matriz[3][3]*poligono[x][3]) );
        newpoints.push(vetorlocal);
    }

    for (let x = 0; x < poligono.length;x++){
        newpoints[x][0] = newpoints[x][0] / newpoints[x][3];
        newpoints[x][1] = newpoints[x][1] / newpoints[x][3]
        newpoints[x][2] = newpoints[x][2] / newpoints[x][3]
        newpoints[x][3] = newpoints[x][3] / newpoints[x][3]

    }
    console.table(newpoints);
    return newpoints;
}

function avengers(){
    let fill = '#ff0000';
    let poligono1 = [[34,1],[34,29],[30,25],[30,11],[21,30],[30,30],[30,28],[34,32],[30,36],[30,34],[20,34],[13,48],[7,48],[29,1]];
    let poligono2 = [[34,35],[30,39],[34,39]]
    circle(25,25,19);
    circle(25,25,22);
    floodFill(25, 4, fill, '#000000')
    fillScanline(poligono1, fill)
    fillScanline(poligono2, fill)
    poligonoPaint(poligono1);
    poligonoPaint(poligono2);
    pixelPaint(31,30,fill);
    pixelPaint(31,34,fill);
}