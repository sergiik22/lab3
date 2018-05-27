
document.addEventListener("DOMContentLoaded", start);
//Global Variables
var gl;
//Drawing Array
var positionBuffer1;
var arraysz = 0;
var colorBuffer1;
var flag = 0;
//Score
var score = 0;
//Gravity
var last_time = 0;
var refresh_time = 0;
var to_refresh = 1000;
var gravity_enabled = false;
var gravity_speed = 1.0;
var gravitycoef = 1;
//Movements
var moveX = 0;
var moveY = 0;
var moveZ = 0;
var angle = 0;
//Quantity of triangles to draw
var trquantity;
//Center, form and color of the Tetromino
var centerX = 0;
var centerY = 0;
var tetrominosform = 0;
var tetrominosColor = [1, 0, 0, 1];
//Boolean variables for movement
var moveleft = false;
var rotate_ = false;
var rotate = false;
var moveright = false;
var movedown = false;
var gravity_enabled = false;
var gravity_speed = 1.0;
//game over
var gameover = false;
//Drawing tetrominos 
var shaderProgram;
var positionBuffer;
var tetrominovertices;
var colorBuffer;
var positionTetromino = [];
// Matrices
var viewMatrix3 = mat4.create();
var projectionMatrix3 = mat4.create();
var modelMatrix = mat4.create();
var camera = { position: vec3.fromValues(0, 0, 0), direction: vec3.fromValues(0, 0, -1), pitch: 0, yaw: -1 * Math.PI/2.0 };



var canvas = document.getElementById("myCanvas");
gl = canvas.getContext("webgl2");
var textcanvas = document.getElementById("text");
var ctx = textcanvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillStyle = "#ffffff";





//Draw score and speed
function redrawscore() {
    ctx.clearRect(0, 0, 420, 720);
    ctx.fillText("Score: " + score, 10, 700);
    ctx.fillText("Speed: " + gravitycoef, 300, 700);
}
//Start Position of the Tetromino in Array
function setTetrominoPosition(tetromino) {

    var temp = tetromino;
    switch (temp) {
        case 1: this.positionTetromino = [];
            this.positionTetromino = [
                0, 6,
                0, 7,
                1, 6,
                1, 7
            ]
            break;
        case 2: this.positionTetromino = [];
            this.positionTetromino = [
                0, 6,
                0, 7,
                1, 6,
                1, 7
            ]
            break;
        case 3: this.positionTetromino = [];
            this.positionTetromino = [
                0, 6,
                0, 7,
                1, 6,
                1, 7
            ]
            break;
        case 4: this.positionTetromino = [];
            this.positionTetromino = [
                0, 6,
                0, 7,
                1, 6,
                1, 7
            ]
            break;
        case 5: this.positionTetromino = [];
            this.positionTetromino = [
                0, 6,
                0, 7,
                1, 6,
                1, 7
            ]
            break;
        case 6: this.positionTetromino = [];
            this.positionTetromino = [
                0, 6,
                0, 7,
                1, 6,
                1, 7
            ]
            break;
        case 7: this.positionTetromino = [];
            this.positionTetromino = [
                0, 6,
                0, 7,
                1, 6,
                1, 7
            ]
            break;

    }
}
//Initialising Grid: Array
var mainGrid = new grid();
//Gravity
gravity_enabled = true;
//Creating a new Tetromino
function newTetromino() {
    var rand = Math.floor(Math.random() * 8) + 1;
    rand = 7;
    console.log("random", rand);
    switch (rand) {
        case 1:
            var TJ = createTetromino(arrI, 6, colI);
            trquantity = 126;
            centerY = 1.8;
            centerX = 0;
            tetrominosform = 1;
            for (var i = 0; i < 6; ++i) {
                tetrominosColor.push(arrColors[1]);
            }
            break;
        case 2:
            var TJ = new createTetromino(arrO, 6, colO);
            trquantity = 120;
            centerY = 1.8;
            centerX = 0.3;
            tetrominosform = 2;
            for (var i = 0; i < 6; ++i) {
                tetrominosColor.push(arrColors[0]);
            }
            break;
        case 3:
            var TJ = createTetromino(arrT, 6, colT);
            trquantity = 126;
            centerY = 1.8;
            centerX = 0.3;
            tetrominosform = 3;
            break;
        case 4:
            var TJ = createTetromino(arrL, 6, colL);
            trquantity = 114;
            centerY = 1.8;
            centerX = 0.3;
            tetrominosform = 4;
            break;
        case 5:
            var TJ = createTetromino(arrTR, 6, colTR);
            trquantity = 138;
            centerY = 1.8;
            centerX = 0.3;
            tetrominosform = 5;
            break;
        case 6:
            var TJ = createTetromino(arrS, 6, colS);
            trquantity = 126;
            centerY = 1.8;
            centerX = 0.3;
            tetrominosform = 6;
            break;
        case 7:
            var TJ = createTetromino(arrTP, 6, colTP);
            trquantity = 126;
            centerY = 1.8;
            centerX = 0.3;
            tetrominosform = 7;
            break;
        case 8:
            var TJ = createTetromino(arrTL, 6, colTL);
            trquantity = 138;
            centerY = 1.8;
            centerX = 0.3;
            tetrominosform = 7;
            break;
    }

    return TJ;

}
//Drawing Scores and Speed
redrawscore();

function start() {
    //Checking for Gameover
    for (var i = 0; i < 14; ++i) {
        if (mainGrid[0][i][42] === true) {
            gameover = true;
        }
    }
    if (gameover) {
        mainGrid = new grid();
        score = 0;
        gravitycoef = 1;
        flag = 0;
        redrawscore();
        gameover = false;

    }
    //Creating new Tetromino and setting position in the array
    newTetromino();
    setTetrominoPosition(tetrominosform);
    this.moveX = 0;
    this.moveY = 0;
    this.angle = 0;
    this.moveZ = 0;
    //this.gravity_enabled = true;
    //Creating Projection
    var left = 0;
    var right = gl.canvas.clientWidth;
    var bottom = gl.canvas.clientHeight;
    var top = 0;
    var near = 400;
    var far = -400;
   // mat4.ortho(projectionMatrix3, left, right, bottom, top, near, far);

    mat4.perspective(projectionMatrix3, 45 * Math.PI / 180.0, canvas.width / canvas.height, 0.1, 10);
   
    //Blocks with current position of tetromino are not availible more
    mainGrid[positionTetromino[0]][positionTetromino[1]][42] = true;
    mainGrid[positionTetromino[2]][positionTetromino[3]][42] = true;
    mainGrid[positionTetromino[4]][positionTetromino[5]][42] = true;
    mainGrid[positionTetromino[6]][positionTetromino[7]][42] = true;


    document.onkeydown = handleKeyDown;

}


//start array for Tetromi.nos
var startArray = [0, 0, -8.7];
requestAnimationFrame(runRenderLoop);

function handleKeyDown(event) {

    if (event.keyCode === 49 || event.keyCode === 56) {

        rotate_ = true;
        if (!is_collised(positionTetromino)) {
            angle -= 90;
            if (angle === -360) { angle = 0; }
        }

    }

    else if (event.keyCode === 51 || event.keyCode === 48) {

        if (!is_collised(positionTetromino)) {
            angle += 90;
            if (angle === 360) { angle = 0; }
        }

    }


    else if (event.keyCode === 37 || event.keyCode === 65) {

        moveleft = true;
        //if not collised changing availibility in array, changing position of tetrominos on the screen, changing 
        //variable moveX for translation
        if (!is_collised(positionTetromino)) {
            moveX += -0.3;

            mainGrid[positionTetromino[6]][positionTetromino[7]][42] = false;
            mainGrid[positionTetromino[2]][positionTetromino[3]][42] = false;
            positionTetromino[1]--;
            positionTetromino[3]--;
            positionTetromino[5]--;
            positionTetromino[7]--;
            mainGrid[positionTetromino[4]][positionTetromino[5]][42] = true;
            mainGrid[positionTetromino[0]][positionTetromino[1]][42] = true;
        }
        moveleft = false;

    }

    else if (event.keyCode === 39 || event.keyCode === 68) {

        moveright = true;
        //if not collised changing availibility in array, changing position of tetrominos on the screen, changing 
        //variable moveX for translation
        if (!is_collised(positionTetromino)) {
            moveX += 0.3;

            mainGrid[positionTetromino[0]][positionTetromino[1]][42] = false;
            mainGrid[positionTetromino[4]][positionTetromino[5]][42] = false;
            positionTetromino[1]++;
            positionTetromino[3]++;
            positionTetromino[5]++;
            positionTetromino[7]++;
            mainGrid[positionTetromino[2]][positionTetromino[3]][42] = true;
            mainGrid[positionTetromino[6]][positionTetromino[7]][42] = true;
        }

        moveright = false;


    }

    else if (event.keyCode === 38 || event.keyCode === 87) {

        if (gravity_enabled) { gravity_enabled = false; }

    }
    else if (event.keyCode === 40 || event.keyCode === 83) {
        // on key down if gravity is enabled then drop tetromino
        if (!gravity_enabled) {
            gravity_enabled = true;
        }
        else {
            drop();
        }
    }
    else if (event.keyCode === 107) {

        //camera.position[2] -= .1;  
        var moveDirection = vec3.create();
        vec3.scale(moveDirection, camera.direction, 0.1);
        vec3.add(camera.position, camera.position, moveDirection);
    }

    else if (event.key === '-') {

        //camera.position[2] += .1; 
        var moveDirection = vec3.create();
        vec3.scale(moveDirection, camera.direction,  -0.1);
        vec3.add(camera.position, camera.position, moveDirection);

    }

    else if (event.key === 'j') {
        
        camera.yaw += .02;
        camera.direction[0] = Math.cos(camera.pitch) * Math.cos(camera.yaw);
        camera.direction[1] = Math.sin(camera.pitch);
        camera.direction[2] = Math.cos(camera.pitch) * Math.sin(camera.yaw);

    }

    else if (event.key === 'l') {
        
        camera.yaw -= .02;
        camera.direction[0] = Math.cos(camera.pitch) * Math.cos(camera.yaw);
        camera.direction[1] = Math.sin(camera.pitch);
        camera.direction[2] = Math.cos(camera.pitch) * Math.sin(camera.yaw);

    }


    else if (event.key === 'i') {

        camera.pitch += .02;
        camera.direction[0] = Math.cos(camera.pitch) * Math.cos(camera.yaw);
        camera.direction[1] = Math.sin(camera.pitch);
        camera.direction[2] = Math.cos(camera.pitch) * Math.sin(camera.yaw);

    }

    else if (event.key === 'k') {

        camera.pitch -= .02;
        camera.direction[0] = Math.cos(camera.pitch) * Math.cos(camera.yaw);
        camera.direction[1] = Math.sin(camera.pitch);
        camera.direction[2] = Math.cos(camera.pitch) * Math.sin(camera.yaw);

    }
}
//Function for dropping Tetromino
function drop() {
    var helper;
    var i = positionTetromino[4];
    //Looking for a free place in the Grid
    for (; i < 23; ++i) {

        if (mainGrid[i + 1][positionTetromino[5]][42] === true
            || mainGrid[i + 1][positionTetromino[7]][42] === true) {
            helper = i;
            i = 25;
        }
    }
    //changing availibility in the array
    if (i === 23) { helper = i; }
    mainGrid[positionTetromino[0]][positionTetromino[1]][42] = false;
    mainGrid[positionTetromino[2]][positionTetromino[3]][42] = false;
    mainGrid[positionTetromino[4]][positionTetromino[5]][42] = false;
    mainGrid[positionTetromino[6]][positionTetromino[7]][42] = false;

    mainGrid[helper - 1][positionTetromino[1]][42] = true;
    mainGrid[helper - 1][positionTetromino[3]][42] = true;
    mainGrid[helper][positionTetromino[5]][42] = true;
    mainGrid[helper][positionTetromino[7]][42] = true;
    //If a row is full cleaning blocks
    clearblocks();
    //saving new array for drawing
    saveArray();
    //start with new Tetromino
    start();
}

function runRenderLoop(time = 0) {
    //Time for gravity. 
    const time_difference = time - last_time;
    last_time = time;
    refresh_time += time_difference * gravitycoef;
    if (refresh_time > to_refresh && gravity_enabled) {
        move_down();
        refresh_time = 0;
    } 

    //Drawing Tetrominos
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPHT_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(shaderProgram);

    var target = vec3.create();
    vec3.add(target, camera.position, camera.direction);
    mat4.lookAt(viewMatrix3, camera.position, target, vec3.fromValues(0, 1, 0));
    
  

    gl.viewport(0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight);
    //gl.enable(gl.CULL_FACE);

    mat4.perspective(projectionMatrix3, 45 * Math.PI / 180.0, canvas.width / canvas.height, 0.1, 1000);
    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [moveX + startArray[0], moveY + startArray[1] + centerY, moveZ + startArray[2]]);
    mat4.rotateY(modelMatrix, modelMatrix, toRadian(angle));
    mat4.translate(modelMatrix, modelMatrix, [centerX, centerY, 0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(shaderProgram.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

    gl.uniformMatrix4fv(shaderProgram.projectionMatrixLocation3, false, projectionMatrix3);
    gl.uniformMatrix4fv(shaderProgram.viewMatrixLocation3, false, viewMatrix3);
    gl.uniformMatrix4fv(shaderProgram.modelMatrixLocation, false, modelMatrix);
   

    gl.drawArrays(gl.TRIANGLES, 0, trquantity);
    //Drawing array
    if (flag) {
        var left = 0;
        var right = gl.canvas.clientWidth;
        var bottom = gl.canvas.clientHeight;
        var top = 0;
        var near = 400;
        var far = -400;
        mat4.ortho(projectionMatrix3, left, right, bottom, top, near, far);
        mat4.identity(modelMatrix);
        mat4.translate(modelMatrix, modelMatrix, [0, 0, 0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer1);
        gl.vertexAttribPointer(shaderProgram.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer1);
        gl.vertexAttribPointer(shaderProgram.colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(shaderProgram.projectionMatrixLocation3, false, projectionMatrix3);
        gl.uniformMatrix4fv(shaderProgram.viewMatrixLocation3, false, viewMatrix3);
        gl.uniformMatrix4fv(shaderProgram.modelMatrixLocation, false, modelMatrix);
      
        gl.drawArrays(gl.TRIANGLES, 0, arraysz);
    }
    requestAnimationFrame(runRenderLoop);
}
//Checking Collisions
function is_collised(position) {

    var tempposition = position;


   // switch (tetrominosform) {
        //case 1: break;
       // case 2:

            if (moveright) {
                if (tempposition[3] + 1 > 13) {
                    return true;
                }
                else if (mainGrid[positionTetromino[6]][positionTetromino[7] + 1][42] === true ||
                    mainGrid[positionTetromino[2]][positionTetromino[3] + 1][42] === true) {
                    return true;
                }

            }
            if (moveleft) {
                if (tempposition[1] - 1 < 0) {
                    return true;
                }
                else if (mainGrid[positionTetromino[4]][positionTetromino[5] - 1][42] === true ||
                    mainGrid[positionTetromino[0]][positionTetromino[1] - 1][42] === true) {
                    return true;
                }

            }

            if (movedown) {

                if (tempposition[6] + 1 > 23) {
                    clearblocks();
                    saveArray();
                    return true;
                }
                else if (mainGrid[positionTetromino[4] + 1][positionTetromino[5]][42] === true ||
                    mainGrid[positionTetromino[6] + 1][positionTetromino[7]][42] === true) {
                    clearblocks();
                    saveArray();
                    return true;
                }

            }
            //break;
    /*    case 3: break;
        case 4: break;
        case 5: break;
        case 6: break;
        case 7: break;
    }*/
    return false;
}
//Moving down with gravity
function move_down() {

    movedown = true;
    if (!is_collised(positionTetromino)) {

        moveY -= 0.3;
        mainGrid[positionTetromino[0]][positionTetromino[1]][42] = false;
        mainGrid[positionTetromino[2]][positionTetromino[3]][42] = false;
        positionTetromino[0]++;
        positionTetromino[2]++;
        positionTetromino[4]++;
        positionTetromino[6]++;
        mainGrid[positionTetromino[4]][positionTetromino[5]][42] = true;
        mainGrid[positionTetromino[6]][positionTetromino[7]][42] = true;
    }

    else {
        gravity_enabled = false;

        start();
    }
}
//Clearing full rows, when they exist, score+=100, every tenth row gravity++
function clearblocks() {
    var k = 0;

    for (var i = 23; i > 0;) {
        k = 0;
        for (var j = 0; j < 14; ++j) {
            if (mainGrid[i][j][42] === true) {
                k++;
            }

        }
        if (k === 14) {
            score += 100;
            if (score % 1000 === 0 && score != 0) {
                gravitycoef++;
            }
            redrawscore();
            booly = 5;
            for (var l = i; l > 0; --l) {
                for (var w = 0; w < 14; ++w) {
                    for (var t = 0; t < 24; ++t) {
                        mainGrid[l][w][t] = mainGrid[l - 1][w][t];
                    }
                    mainGrid[l][w][42] = mainGrid[l - 1][w][42];
                }
            }

            for (var n = 0; n < 14; ++n) {
                mainGrid[0][n][42] = false;

            }

        }
        else { --i; }
    }
}


//Saving new array, creating color and Vertix buffer for array
function saveArray() {
    flag = 0;
    shaderProgram1 = gl.createProgram();
    var sz = 0;
    //var Arrayvertices = [];
    var arr = [];
    // var colors = [];
    var colorsarr = [];
    for (var i = 0; i < 24; ++i) {
        for (var j = 0; j < 14; ++j) {
            if (mainGrid[i][j][42] === true) {
                sz++;
                for (var k = 24; k < 42; ++k) {
                    arr.push(mainGrid[i][j][k]);
                }
                for (var k = 0; k < 24; ++k) {
                    colorsarr.push(mainGrid[i][j][k]);
                }
            }
        }

    }
    saveArray.Arrayvertices = arr;
    positionBuffer1 = gl.createBuffer();

    //Create and Bind vertex Buffer Buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(saveArray.Arrayvertices), gl.STATIC_DRAW);

    saveArray.colors = [];
    arraysz = sz * 6;

    for (var j = 0; j < arraysz; ++j) {
        for (var i = 0; i < 4; ++i)
            saveArray.colors.push(tetrominosColor[i]);
    }

    colorBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(saveArray.colors), gl.STATIC_DRAW);
    if (sz > 0) { flag = 1 };
}

//Creating buffers for Tetrominos, linking the main program
function createTetromino(arr, sz, cls) {
    var tetromino = {};
    shaderProgram = gl.createProgram();
    tetrominovertices = arr;
    positionBuffer = gl.createBuffer();

    //Create and Bind vertex Buffer Buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tetrominovertices), gl.STATIC_DRAW);

    tetromino.colors = [];
    tetromino.verticesAmmount = sz;
    var colorsBuff = cls;
    
    colorsBuff.forEach(function (color) {
        for (var j = 0; j < 6; ++j) {
        tetromino.colors = tetromino.colors.concat(color);
        }
    }
    );
    
    //Create and Bind color Buffer
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tetromino.colors), gl.STATIC_DRAW);

    // Compile shaders and create new Program
    tetromino.vertexShader = getAndCompileShader("vertexShader");
    tetromino.fragmentShader = getAndCompileShader("fragmentShader");

    gl.attachShader(shaderProgram, tetromino.vertexShader);
    gl.attachShader(shaderProgram, tetromino.fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
    gl.useProgram(shaderProgram);
    tetromino.vertexArr = gl.createVertexArray();
    gl.bindVertexArray(tetromino.vertexArr);

    //Bind shaders Attributes with buffers
    shaderProgram.positionAttributeLocation = gl.getAttribLocation(shaderProgram, "position");
    gl.enableVertexAttribArray(shaderProgram.positionAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(shaderProgram.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);


    shaderProgram.colorAttributeLocation = gl.getAttribLocation(shaderProgram, "color");
    gl.enableVertexAttribArray(shaderProgram.colorAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

    shaderProgram.viewMatrixLocation3 = gl.getUniformLocation(shaderProgram, "viewMatrix");
    shaderProgram.projectionMatrixLocation3 = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    shaderProgram.modelMatrixLocation = gl.getUniformLocation(shaderProgram, "modelMatrix");
   

    return tetromino;
}
var bs = 30;
//Vertices
//            _ _ _ _
//main array [_|_|_|_]
//           [_|_|_|_]
var centerMainArr = gl.canvas.clientWidth / 2;
var mainArr = [
    //1st front
    //1st block 0-17
    -0.6 , 0, 0.15,
    -0.6, -0.3, 0.15,
    -0.3, 0, 0.15,
    -0.3, 0, 0.15,
    -0.6, -0.3, 0.15,
    -0.3, -0.3, 0.15,
    //2nd block 18-35
    -0.3, 0, 0.15,
    -0.3, -0.3, 0.15,                     
    0, 0, 0.15,                       
    0, 0, 0.15,
    -0.3, -0.3, 0.15,
    0, -0.3, 0.15,
    //3rd block 36-53
    0, 0, 0.15,
    0, -0.3, 0.15,
    0.3, 0, 0.15,
    0.3, 0, 0.15,
    0, -0.3, 0.15,
    0.3, -0.3, 0.15,
    //4th block 54-71
    0.3, 0, 0.15,
    0.3, -0.3, 0.15,
    0.6, 0, 0.15,
    0.6, 0, 0.15,
    0.3, -0.3, 0.15,
    0.6, -0.3, 0.15,
    //2nd front
    //1st block 72-89
    -0.6, -0.3, 0.15,
    -0.6, -0.6, 0.15,
    -0.3, -0.3, 0.15,
    -0.3, -0.3, 0.15,                
    -0.6, -0.6, 0.15,
    -0.3, -0.6, 0.15,             
    //2nd block 90-107
    -0.3, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    0, -0.3, 0.15,
    0, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    0, -0.6, 0.15,
    //3rd block 108-125
    0, -0.3, 0.15,
    0, -0.6, 0.15,
    0.3, -0.3, 0.15,
    0.3, -0.3, 0.15,
    0, -0.6, 0.15,
    0.3, -0.6, 0.15,
    //4th block 126-143
    0.3, -0.3, 0.15,
    0.3, -0.6, 0.15,
    0.6, -0.3, 0.15,
    0.6, -0.3, 0.15,
    0.3, -0.6, 0.15,
    0.6, -0.6, 0.15,
    /////////////////////////////////////////////
    //1st back
    //1st block 144-161
    -0.6, 0, -0.15,
    -0.6, -0.3, -0.15,
    -0.3, 0, -0.15,
    -0.3, 0, -0.15,
    -0.6, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    //2nd block 162-179
    -0.3, 0, -0.15,
    -0.3, -0.3, -0.15,
    0, 0, -0.15,
    0, 0, -0.15,
    -0.3, -0.3, -0.15,
    0, -0.3, -0.15,
    //3rd block 180-197
    0, 0, -0.15,
    0, -0.3, -0.15,
    0.3, 0, -0.15,
    0.3, 0, -0.15,
    0, -0.3, -0.15,
    0.3, -0.3, -0.15,
    //4th block 198-215
    0.3, 0, -0.15,
    0.3, -0.3, -0.15,
    0.6, 0, -0.15,
    0.6, 0, -0.15,
    0.3, -0.3, -0.15,
    0.6, -0.3, -0.15,
    //2nd back
    //1st block 216-233
    -0.6, -0.3, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,                 
    -0.6, -0.6, -0.15,
    -0.3, -0.6, -0.15, 
    //2nd block 234-251
    -0.3, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.3, -0.15,
    0, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.6, -0.15,
    //3rd block 252-269
    0, -0.3, -0.15,
    0, -0.6, -0.15,
    0.3, -0.3, -0.15,
    0.3, -0.3, -0.15,
    0, -0.6, -0.15,
    0.3, -0.6, -0.15,
    //4th block 270-287
    0.3, -0.3, -0.15,
    0.3, -0.6, -0.15,
    0.6, -0.3, -0.15,
    0.6, -0.3, -0.15,
    0.3, -0.6, -0.15,
    0.6, -0.6, -0.15,
    /////////////////////////////////////////////
    // Top
    // 1st Block 288-305
    -0.6 , 0, 0.15,
    -0.3 , 0, 0.15,
    -0.6, 0, -0.15,
    -0.6, 0, -0.15,
    -0.3 , 0, 0.15,
    -0.3, 0, -0.15,
    // 2nd Block 306-323
    -0.3 , 0, 0.15,
    0 , 0, 0.15,
    -0.3, 0, -0.15,
    -0.3, 0, -0.15,                 
    0 , 0, 0.15,
    0, 0, -0.15,             
    // 3rd Block 324-341
    0 , 0, 0.15,
    0.3 , 0, 0.15,
    0, 0, -0.15,
    0, 0, -0.15,
    0.3 , 0, 0.15,
    0.3, 0, -0.15,
    //4th Block 342-359
    0.3 , 0, 0.15,
    0.6 , 0, 0.15,
    0.3, 0, -0.15,
    0.3, 0, -0.15,
    0.6 , 0, 0.15,
    0.6, 0, -0.15,
    // 1st - 2nd 
    // 1st Block 360-377
    -0.6, -0.3, 0.15,
    -0.3, -0.3, 0.15,
    -0.6, -0.3, -0.15,
    -0.6, -0.3, -0.15,
    -0.3, -0.3, 0.15,
    -0.3, -0.3, -0.15,
    // 2nd Block 378-395
    -0.3, -0.3, 0.15,
    0, -0.3, 0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,                  
    0, -0.3, 0.15,
    0, -0.3, -0.15, 
    // 3rd Block 396-413
    0, -0.3, 0.15,
    0.3, -0.3, 0.15,
    0, -0.3, -0.15,
    0, -0.3, -0.15,
    0.3, -0.3, 0.15,
    0.3, -0.3, -0.15,
    //4th Block 414-431
    0.3, -0.3, 0.15,
    0.6, -0.3, 0.15,
    0.3, -0.3, -0.15,
    0.3, -0.3, -0.15,
    0.6, -0.3, 0.15,
    0.6, -0.3, -0.15,
    // Bottom
    // 1st Block 432-449
    -0.6, -0.6, 0.15,
    -0.3, -0.6, 0.15,
    -0.6, -0.6, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.6, 0.15,
    -0.3, -0.6, -0.15,
    // 2nd Block 450-467
    -0.3, -0.6, 0.15,
    0, -0.6, 0.15,
    -0.3, -0.6, -0.15,
    -0.3, -0.6, -0.15,                  ////3 * bs = 0.3     2 * bs = 0,   bs = -0.3     4 * bs = 0.6  0 = -0.6
    0, -0.6, 0.15,
    0, -0.6, -0.15, 
    // 3rd Block 468-485
    0, -0.6, 0.15,
    0.3, -0.6, 0.15,
    0, -0.6, -0.15,
    0, -0.6, -0.15,
    0.3, -0.6, 0.15,
    0.3, -0.6, -0.15,
    //4th Block 486-503
    0.3, -0.6, 0.15,
    0.6, -0.6, 0.15,
    0.3, -0.6, -0.15,
    0.3, -0.6, -0.15,
    0.6, -0.6, 0.15,
    0.6, -0.6, -0.15,
    //Sides 1st
    //Left 504-521
    -0.6 , 0, 0.15,
    -0.6, -0.3, 0.15,
    -0.6, 0, -0.15,
    -0.6, 0, -0.15,
    -0.6, -0.3, 0.15,
    -0.6, -0.3, -0.15,
    //1st-2nd 522-539
    -0.3 , 0, 0.15,
    -0.3, -0.3, 0.15,
    -0.3, 0, -0.15,
    -0.3, 0, -0.15,
    -0.3, -0.3, 0.15,
    -0.3, -0.3, -0.15,                        
    //2nd-3rd 540-557                   
    0 , 0, 0.15,
    0, -0.3, 0.15,
    0, 0, -0.15,
    0, 0, -0.15,
    0, -0.3, 0.15,
    0, -0.3, -0.15,
    //3rd-4th 558-575
    0.3 , 0, 0.15,
    0.3 , -0.3 , 0.15,
    0.3, 0, -0.15,
    0.3, 0, -0.15,
    0.3, -0.3, 0.15,
    0.3, -0.3, -0.15,
    //right 576-593
    0.6 , 0, 0.15,
    0.6 ,-0.3, 0.15,
    0.6, 0, -0.15,
    0.6, 0, -0.15,
    0.6, -0.3, 0.15,
    0.6, -0.3, -0.15,
    //Sides 2st
    //Left 594-611
    -0.6, -0.3, 0.15,
    -0.6, -0.6, 0.15,
    -0.6, -0.3, -0.15,
    -0.6, -0.3, -0.15,
    -0.6, -0.6, 0.15,
    -0.6, -0.6, -0.15,
    //1st-2nd 612-629
    -0.3, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.6, 0.15,
    -0.3, -0.6, -0.15, 
    //2nd-3rd 630-647
    0, -0.3, 0.15,
    0, -0.6, 0.15,
    0, -0.3, -0.15,
    0, -0.3, -0.15,
    0, -0.6, 0.15,
    0, -0.6, -0.15,
    //3rd-4th 648-665
    0.3, -0.3, 0.15,
    0.3, -0.6, 0.15,
    0.3, -0.3, -0.15,
    0.3, -0.3, -0.15,
    0.3, -0.6, 0.15,
    0.3, -0.6, -0.15,
    //right 666-683
    0.6, -0.3, 0.15,
    0.6, -0.6, 0.15,
    0.6, -0.3, -0.15,
    0.6, -0.3, -0.15,
    0.6, -0.6, 0.15,
    0.6, -0.6, -0.15,
];
//            _ _ _ _
// Tetromino [_|_|_|_] Vertices
var arrI = [];
// front for I
for (var i = 0; i < 72; ++i) {
    arrI.push(mainArr[i]);
    
}
// back for I
for (var i = 144; i < 216; ++i) {
    arrI.push(mainArr[i]);
}
//top and bottom for I
for (var i = 288; i < 432; ++i) {
    arrI.push(mainArr[i]);
}
//sides for I
for (var i = 504; i < 594; ++i) {
    arrI.push(mainArr[i]);
}
//           _ _           
//          |_|_| 
//Tetromino |_|_|
var arrO = [];
//front for O
for (var i = 0; i < 36; ++i) {
    
    arrO.push(mainArr[i]);
}
for (var i = 72; i < 108; ++i) {
    arrO.push(mainArr[i]);
}
//back for O
for (var i = 144; i < 180; ++i) {
    arrO.push(mainArr[i]);
}
for (var i = 216; i < 252; ++i) {
    arrO.push(mainArr[i]);
}
//Top for O
for (var i = 288; i < 324; ++i) {
    arrO.push(mainArr[i]);
}
//bottom for o
for (var i = 432; i < 468; ++i) {
    arrO.push(mainArr[i]);
}
//left, right for O
for (var i = 504; i < 558; ++i) {
    arrO.push(mainArr[i]);
}
for (var i = 594; i < 648; ++i) {
    arrO.push(mainArr[i]);
}
//Middle for O
for (var i = 360; i < 396; ++i) {
    arrO.push(mainArr[i]);
}
//              _
//            _|_|_
//Tetromino  |_|_|_|
var arrT = [];
//front for T
for (var i = 18; i < 36; ++i) {
    arrT.push(mainArr[i]);
}
for (var i = 72; i < 126; ++i) {
    arrT.push(mainArr[i]);
}
//back for T
for (var i = 162; i < 180; ++i) {
    arrT.push(mainArr[i]);
}
for (var i = 216; i < 270; ++i) {
    arrT.push(mainArr[i]);
}
//top for T
for (var i = 306; i < 324; ++i) {
    arrT.push(mainArr[i]);
}
for (var i = 360; i < 414; ++i) {
    arrT.push(mainArr[i]);
}
//bottom for T
for (var i = 432; i < 486; ++i) {
    arrT.push(mainArr[i]);
}
//sides for T
for (var i = 522; i < 558; ++i) {
    arrT.push(mainArr[i]);
}
for (var i = 594; i < 666; ++i) {
    arrT.push(mainArr[i]);
}

//              _ _ _ 
//             |_|_|_|
//Tetromino    |_|
var arrL = [];
//front for L
for (var i = 0; i < 54; ++i) {
    arrL.push(mainArr[i]);
}
for (var i = 72; i < 90; ++i) {
    arrL.push(mainArr[i]);
}
//back for L
for (var i = 144; i < 198; ++i) {
    arrL.push(mainArr[i]);
}
for (var i = 216; i < 234; ++i) {
    arrL.push(mainArr[i]);
}
//top for L
for (var i = 288; i < 342; ++i) {
    arrL.push(mainArr[i]);
}
for (var i = 360; i < 378; ++i) {
    arrL.push(mainArr[i]);
}
//bottom for L
for (var i = 432; i < 450; ++i) {
    arrL.push(mainArr[i]);
}
//sides for L
for (var i = 504; i < 576; ++i) {
    arrL.push(mainArr[i]);
}
for (var i = 594; i < 630; ++i) {
    arrL.push(mainArr[i]);
}

//              _ _ 
//            _|_|_|
//Tetromino  |_|_|
var arrS = [];
//front for S
for (var i = 18; i < 54; ++i) {
    arrS.push(mainArr[i]);
}
for (var i = 72; i < 108; ++i) {
    arrS.push(mainArr[i]);
}
//back for S
for (var i = 162; i < 198; ++i) {
    arrS.push(mainArr[i]);
}
for (var i = 216; i < 252; ++i) {
    arrS.push(mainArr[i]);
}
//top for S
for (var i = 306; i < 342; ++i) {
    arrS.push(mainArr[i]);
}
for (var i = 360; i < 414; ++i) {
    arrS.push(mainArr[i]);
}
//bottom for S
for (var i = 432; i < 468; ++i) {
    arrS.push(mainArr[i]);
}
//sides for S
for (var i = 522; i < 576; ++i) {
    arrS.push(mainArr[i]);
}
for (var i = 594; i < 648; ++i) {
    arrS.push(mainArr[i]);
}
//              
//             
//Tetromino    Tower Rigth    
var arrTR = [
    //Front
    //1st block 72-89
    -0.6, -0.3, 0.15,
    -0.6, -0.6, 0.15,
    -0.3, -0.3, 0.15,
    -0.3, -0.3, 0.15,                
    -0.6, -0.6, 0.15,
    -0.3, -0.6, 0.15,
    //2nd block 90-107
    -0.3, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    0, -0.3, 0.15,
    0, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    0, -0.6, 0.15,
    //Back
    //1st block 216-233
    -0.6, -0.3, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.6, -0.15,
    //2nd block 234-251
    -0.3, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.3, -0.15,
    0, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.6, -0.15,
    //Top
    -0.6, -0.3, 0.15,
    -0.3, -0.3, 0.15,
    -0.6, -0.3, -0.15,
    -0.6, -0.3, -0.15,
    -0.3, -0.3, 0.15,
    -0.3, -0.3, -0.15,
    // 2nd Block 378-395
    -0.3, -0.3, 0.15,
    0, -0.3, 0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,                 
    0, -0.3, 0.15,
    0, -0.3, -0.15, 
    // Bottom
    // 1st Block 432-449
    -0.6, -0.6, 0.15,
    -0.3, -0.6, 0.15,
    -0.6, -0.6, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.6, 0.15,
    -0.3, -0.6, -0.15,
    // 2nd Block 450-467
    -0.3, -0.6, 0.15,
    0, -0.6, 0.15,
    -0.3, -0.6, -0.15,
    -0.3, -0.6, -0.15,                 
    0, -0.6, 0.15,
    0, -0.6, -0.15,

    //Sides 
    -0.6, -0.3, 0.15,
    -0.6, -0.6, 0.15,
    -0.6, -0.3, -0.15,
    -0.6, -0.3, -0.15,
    -0.6, -0.6, 0.15,
    -0.6, -0.6, -0.15,
    //1st-2nd 612-629
    -0.3, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.6, 0.15,
    -0.3, -0.6, -0.15,
    //2nd-3rd 630-647
    0, -0.3, 0.15,
    0, -0.6, 0.15,
    0, -0.3, -0.15,
    0, -0.3, -0.15,
    0, -0.6, 0.15,
    0, -0.6, -0.15,
    //Block Oben
    //Front
    -0.3, 0, -0.15,
    -0.3, -0.3, -0.15,
    0, 0, -0.15,
    0, 0, -0.15,
    -0.3, -0.3, -0.15,
    0, -0.3, -0.15,
    //Back
    -0.3, 0, -0.45,
    -0.3, -0.3, -0.45,
    0, 0, -0.45,
    0, 0, -0.45,
    -0.3, -0.3, -0.45,
    0, -0.3, -0.45,
    //Top
    -0.3, 0, -0.15,
    0, 0, -0.15,
    -0.3, 0, -0.45,
    -0.3, 0, -0.45,
    0, 0, -0.15,
    0, 0, -0.45,  
    //Bottom
    -0.3, -0.3, -0.15,
    0, -0.3, -0.15,
    -0.3, -0.3, -0.45,
    -0.3, -0.3, -0.45,
    0, -0.3, -0.15,
    0, -0.3, -0.45, 
    //Sides
    -0.3, 0, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, 0, -0.45,
    -0.3, 0, -0.45,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.45,
                     
    0, 0, -0.15,
    0, -0.3, -0.15,
    0, 0, -0.45,
    0, 0, -0.45,
    0, -0.3, -0.15,
    0, -0.3, -0.45,

    //Block Unten
    //Front
    -0.3, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.3, -0.15,
    0, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.6, -0.15,
    //Back
    -0.3, -0.3, -0.45,
    -0.3, -0.6, -0.45,
    0, -0.3, -0.45,
    0, -0.3, -0.45,
    -0.3, -0.6, -0.45,
    0, -0.6, -0.45,
    //Top
    -0.3, -0.3, -0.15,
    0, -0.3, -0.15,
    -0.3, -0.3, -0.45,
    -0.3, -0.3, -0.45,
    0, -0.3, -0.15,
    0, -0.3, -0.45,
    //Bottom
    -0.3, -0.6, -0.15,
    0, -0.6, -0.15,
    -0.3, -0.6, -0.45,
    -0.3, -0.6, -0.45,
    0, -0.6, -0.15,
    0, -0.6, -0.45,
    //Sides
    -0.3, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    -0.3, -0.3, -0.45,
    -0.3, -0.3, -0.45,
    -0.3, -0.6, -0.15,
    -0.3, -0.6, -0.45,

    0, -0.3, -0.15,
    0, -0.6, -0.15,
    0, -0.3, -0.45,
    0, -0.3, -0.45,
    0, -0.6, -0.15,
    0, -0.6, -0.45
];

var arrTL = [
    //Front
    //1st block 72-89
    -0.6, -0.3, 0.15,
    -0.6, -0.6, 0.15,
    -0.3, -0.3, 0.15,
    -0.3, -0.3, 0.15,
    -0.6, -0.6, 0.15,
    -0.3, -0.6, 0.15,
    //2nd block 90-107
    -0.3, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    0, -0.3, 0.15,
    0, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    0, -0.6, 0.15,
    //Back
    //1st block 216-233
    -0.6, -0.3, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.6, -0.15,
    //2nd block 234-251
    -0.3, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.3, -0.15,
    0, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.6, -0.15,
    //Top
    -0.6, -0.3, 0.15,
    -0.3, -0.3, 0.15,
    -0.6, -0.3, -0.15,
    -0.6, -0.3, -0.15,
    -0.3, -0.3, 0.15,
    -0.3, -0.3, -0.15,
    // 2nd Block 378-395
    -0.3, -0.3, 0.15,
    0, -0.3, 0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    0, -0.3, 0.15,
    0, -0.3, -0.15,
    // Bottom
    // 1st Block 432-449
    -0.6, -0.6, 0.15,
    -0.3, -0.6, 0.15,
    -0.6, -0.6, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.6, 0.15,
    -0.3, -0.6, -0.15,
    // 2nd Block 450-467
    -0.3, -0.6, 0.15,
    0, -0.6, 0.15,
    -0.3, -0.6, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.6, 0.15,
    0, -0.6, -0.15,

    //Sides 
    -0.6, -0.3, 0.15,
    -0.6, -0.6, 0.15,
    -0.6, -0.3, -0.15,
    -0.6, -0.3, -0.15,
    -0.6, -0.6, 0.15,
    -0.6, -0.6, -0.15,
    //1st-2nd 612-629
    -0.3, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.6, 0.15,
    -0.3, -0.6, -0.15,
    //2nd-3rd 630-647
    0, -0.3, 0.15,
    0, -0.6, 0.15,
    0, -0.3, -0.15,
    0, -0.3, -0.15,
    0, -0.6, 0.15,
    0, -0.6, -0.15,
    //Block Oben
    //Front
    -0.6, 0, -0.15,
    -0.6, -0.3, -0.15,
    -0.3, 0, -0.15,
    -0.3, 0, -0.15,
    -0.6, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    //Back
    -0.6, 0, -0.45,
    -0.6, -0.3, -0.45,
    -0.3, 0, -0.45,
    -0.3, 0, -0.45,
    -0.6, -0.3, -0.45,
    -0.3, -0.3, -0.45,
    //Top
    -0.6, 0, -0.15,
    -0.3, 0, -0.15,
    -0.6, 0, -0.45,
    -0.6, 0, -0.45,
    -0.3, 0, -0.15,
    -0.3, 0, -0.45,
    //Bottom
    -0.6, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    -0.6, -0.3, -0.45,
    -0.6, -0.3, -0.45,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.45,
    //Sides
    -0.6, 0, -0.15,
    -0.6, -0.3, -0.15,
    -0.6, 0, -0.45,
    -0.6, 0, -0.45,
    -0.6, -0.3, -0.15,
    -0.6, -0.3, -0.45,

    -0.3, 0, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, 0, -0.45,
    -0.3, 0, -0.45,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.45,

    //Block Unten
    //Front
    -0.6, -0.3, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.6, -0.15,
    //Back
    -0.6, -0.3, -0.45,
    -0.6, -0.6, -0.45,
    -0.3, -0.3, -0.45,
    -0.3, -0.3, -0.45,
    -0.6, -0.6, -0.45,
    -0.3, -0.6, -0.45,
    //Top
    -0.6, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    -0.6, -0.3, -0.45,
    -0.6, -0.3, -0.45,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.45,
    //Bottom
    -0.6, -0.6, -0.15,
    -0.3, -0.6, -0.15,
    -0.6, -0.6, -0.45,
    -0.6, -0.6, -0.45,
    -0.3, -0.6, -0.15,
    -0.3, -0.6, -0.45,
    //Sides
    -0.6, -0.3, -0.15,
    -0.6, -0.6, -0.15,
    -0.6, -0.3, -0.45,
    -0.6, -0.3, -0.45,
    -0.6, -0.6, -0.15,
    -0.6, -0.6, -0.45,

    -0.3, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    -0.3, -0.3, -0.45,
    -0.3, -0.3, -0.45,
    -0.3, -0.6, -0.15,
    -0.3, -0.6, -0.45
];

//             
//             

var arrTP = [
    //Front
    //1st block 72-89
    -0.6, -0.3, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    -0.6, -0.6, -0.15,
    -0.3, -0.6, -0.15,
    //2nd block 90-107
    -0.3, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    0, -0.3, 0.15,
    0, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    0, -0.6, 0.15,
    //Back
    //1st block 216-233
    -0.6, -0.3, -0.45,
    -0.6, -0.6, -0.45,
    -0.3, -0.3, -0.45,
    -0.3, -0.3, -0.45,
    -0.6, -0.6, -0.45,
    -0.3, -0.6, -0.45,
    //2nd block 234-251
    -0.3, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.3, -0.15,
    0, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.6, -0.15,
    //Top
    -0.6, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    -0.6, -0.3, -0.45,
    -0.6, -0.3, -0.45,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.45,
    // 2nd Block 378-395
    -0.3, -0.3, 0.15,
    0, -0.3, 0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    0, -0.3, 0.15,
    0, -0.3, -0.15,
    // Bottom
    // 1st Block 432-449
    -0.6, -0.6, -0.15,
    -0.3, -0.6, -0.15,
    -0.6, -0.6, -0.45,
    -0.6, -0.6, -0.45,
    -0.3, -0.6, -0.15,
    -0.3, -0.6, -0.45,
    // 2nd Block 450-467
    -0.3, -0.6, 0.15,
    0, -0.6, 0.15,
    -0.3, -0.6, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.6, 0.15,
    0, -0.6, -0.15,

    //Sides 
    -0.6, -0.3, -0.15,
    -0.6, -0.6, -0.15,
    -0.6, -0.3, -0.45,
    -0.6, -0.3, -0.45,
    -0.6, -0.6, -0.15,
    -0.6, -0.6, -0.45,
    //1st-2nd 612-629
    -0.3, -0.3, 0.15,
    -0.3, -0.6, 0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, -0.6, 0.15,
    -0.3, -0.6, -0.15,
    //2nd-3rd 630-647
    0, -0.3, 0.15,
    0, -0.6, 0.15,
    0, -0.3, -0.15,
    0, -0.3, -0.15,
    0, -0.6, 0.15,
    0, -0.6, -0.15,
    //Block Oben
    //Front
    -0.3, 0, -0.15,
    -0.3, -0.3, -0.15,
    0, 0, -0.15,
    0, 0, -0.15,
    -0.3, -0.3, -0.15,
    0, -0.3, -0.15,
    //Back
    -0.3, 0, -0.45,
    -0.3, -0.3, -0.45,
    0, 0, -0.45,
    0, 0, -0.45,
    -0.3, -0.3, -0.45,
    0, -0.3, -0.45,
    //Top
    -0.3, 0, -0.15,
    0, 0, -0.15,
    -0.3, 0, -0.45,
    -0.3, 0, -0.45,
    0, 0, -0.15,
    0, 0, -0.45,
    //Bottom
    -0.3, -0.3, -0.15,
    0, -0.3, -0.15,
    -0.3, -0.3, -0.45,
    -0.3, -0.3, -0.45,
    0, -0.3, -0.15,
    0, -0.3, -0.45,
    //Sides
    -0.3, 0, -0.15,
    -0.3, -0.3, -0.15,
    -0.3, 0, -0.45,
    -0.3, 0, -0.45,
    -0.3, -0.3, -0.15,
    -0.3, -0.3, -0.45,

    0, 0, -0.15,
    0, -0.3, -0.15,
    0, 0, -0.45,
    0, 0, -0.45,
    0, -0.3, -0.15,
    0, -0.3, -0.45,

    //Block Unten
    //Front
    -0.3, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.3, -0.15,
    0, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    0, -0.6, -0.15,
    //Back
    -0.3, -0.3, -0.45,
    -0.3, -0.6, -0.45,
    0, -0.3, -0.45,
    0, -0.3, -0.45,
    -0.3, -0.6, -0.45,
    0, -0.6, -0.45,
    //Top
    -0.3, -0.3, -0.15,
    0, -0.3, -0.15,
    -0.3, -0.3, -0.45,
    -0.3, -0.3, -0.45,
    0, -0.3, -0.15,
    0, -0.3, -0.45,
    //Bottom
    -0.3, -0.6, -0.15,
    0, -0.6, -0.15,
    -0.3, -0.6, -0.45,
    -0.3, -0.6, -0.45,
    0, -0.6, -0.15,
    0, -0.6, -0.45,
    //Sides
    -0.3, -0.3, -0.15,
    -0.3, -0.6, -0.15,
    -0.3, -0.3, -0.45,
    -0.3, -0.3, -0.45,
    -0.3, -0.6, -0.15,
    -0.3, -0.6, -0.45,

    0, -0.3, -0.15,
    0, -0.6, -0.15,
    0, -0.3, -0.45,
    0, -0.3, -0.45,
    0, -0.6, -0.15,
    0, -0.6, -0.45
];

//             
//             

//COLORS
var arrColors = [
    //colO - 0
    [1.0, 1.0, 0, 1.0],
    //colI - 1
    [0, 1.0, 1.0, 1.0],
    //colT - 2
    [1.0, 0, 1.0, 1.0],
    //colJ - 3
    [0, 0, 1.0, 1.0],
    //colL - 4
    [1.0, 0.5019, 0, 1.0],
    //colS - 5
    [0, 1.0, 0, 1.0],
    //colZ - 6
    [1.0, 0, 0, 1.0]
]
var colO = [];
for (var i = 0; i < 4; ++i) {
    colO.push(arrColors[0]);
}
for (var i = 4; i < 8; ++i) {
    colO.push(arrColors[1]);
}
for (var i = 8; i < 10; ++i) {
    colO.push(arrColors[2]);
}
for (var i = 10; i < 12; ++i) {
    colO.push(arrColors[3]);
}
for (var i = 12; i < 18; ++i) {
    colO.push(arrColors[4]);
}
for (var i = 18; i < 20; ++i) {
    colO.push(arrColors[5]);
}
var colI = [];
for (var i = 0; i < 21; ++i) {
    colI.push(arrColors[1]);
}
var colT = [];
for (var i = 0; i < 21; ++i) {
    colT.push(arrColors[2]);
}

var colL = [];
for (var i = 0; i < 21; ++i) {
    colL.push(arrColors[4]);
}
var colS = [];
for (var i = 0; i < 21; ++i) {
    colS.push(arrColors[5]);
}


var colTP = [];
for (var i = 0; i < 11; ) {
    colTP.push(arrColors[0]);
    colTP.push(arrColors[2]);
    i += 2;    
}
colTP.push(arrColors[1]);

for (var i = 11; i < 17; ++i) {
    colTP.push(arrColors[3]);
}
for (var i = 17; i < 23; ++i) {
    colTP.push(arrColors[4]);
}


var colTL = [];
for (var i = 0; i < 4; ++i) {
    colTL.push(arrColors[0]);
}
for (var i = 4; i < 8; ++i) {
    colTL.push(arrColors[1]);
}
for (var i = 8; i < 11; ++i) {
    colTL.push(arrColors[2]);
}
for (var i = 11; i < 13; ++i) {
    colTL.push(arrColors[0]);
}
for (var i = 13; i < 15; ++i) {
    colTL.push(arrColors[3]);
}
for (var i = 15; i < 17; ++i) {
    colTL.push(arrColors[2]);
}
for (var i = 17; i < 19; ++i) {
    colTL.push(arrColors[0]);
}
for (var i = 19; i < 21; ++i) {
    colTL.push(arrColors[4]);
}
for (var i = 21; i < 23; ++i) {
    colTL.push(arrColors[5]);
}

var colTR = [];
for (var i = 0; i < 4; ++i) {
    colTR.push(arrColors[0]);
}
for (var i = 4; i < 8; ++i) {
    colTR.push(arrColors[1]);
}
for (var i = 8; i < 11; ++i) {
    colTR.push(arrColors[2]);
}
for (var i = 11; i < 13; ++i) {
    colTR.push(arrColors[0]);
}
for (var i = 13; i < 15; ++i) {
    colTR.push(arrColors[3]);
}
for (var i = 15; i < 17; ++i) {
    colTR.push(arrColors[2]);
}
for (var i = 17; i < 19; ++i) {
    colTR.push(arrColors[0]);
}
for (var i = 19; i < 21; ++i) {
    colTR.push(arrColors[4]);
}
for (var i = 21; i < 23; ++i) {
    colTR.push(arrColors[5]);
}


function grid() {


    var gridBlocks = [];
    var bs = 30;
    for (var i = 0; i < 24; ++i) {

        gridBlocks[i] = [];
        for (var j = 0; j < 14; ++j) {

            gridBlocks[i][j] = [
                0, 0, 1, 1, ///Colors 0-23
                0, 0, 1, 1,
                0, 0, 1, 1,
                0, 0, 1, 1,
                0, 0, 1, 1,
                0, 0, 1, 1,
                j * bs + 500, i * bs, 0,  //Vertices 24-41
                (j + 1) * bs + 500, i * bs, 0.15,
                j * bs + 500, (i + 1) * bs, 0.15,
                j * bs + 500, (i + 1) * bs, 0.15,
                (j + 1) * bs + 500, i * bs, 0.15,
                (j + 1) * bs + 500, (i + 1) * bs, 0.15,
                false //availibility 42
            ];

        }
    }
    return gridBlocks;

}



//Shaders compilation
function getAndCompileShader(id) {
    var shader;
    var shaderElement = document.getElementById(id);
    var shaderText = shaderElement.text.trim();
    if (id === "vertexShader")
        shader = gl.createShader(gl.VERTEX_SHADER);
    else if (id === "fragmentShader")
        shader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(shader, shaderText);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}
//Converting from degrees to radians
function toRadian(input) {

    return input * Math.PI / 180;

}

