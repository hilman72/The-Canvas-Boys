var canvas = document.getElementById('canvas-real');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

// Variables
var mouse = {
    x: undefined,
    y: undefined
}

var isAbstract = true;
var isFill = true;
var isFinished = false;

var maxRadius = 40;
var minRadius = 2;
var speed = 0.5; // default speed 


const colorArrayList = [
    ['#331832', '#694D75', '#1B5299','#9FC2CC', '#F1ECCE'],         // 0 index 
    ['#DE6449','#41D3BD','#FFFFF2','#791E94', '#407899'],           // 1 index
    ['#A1FCDF', '#7FD8BE', '#FCEFEF', '#FCD29F', '#FCAB64'],        // 2 index
    ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498D8', '#298089'],        // 3 index
    ['#7FFF00', '#FCF340', '#FB33DB', '#0310EA', '#298089'],        // 4 index
    ['#B20D30', '#F0E2E7', '#3F84E5', '#C17817', '#3F784C'],        // 5 index
    ['#FFFCF9', '#06D6A0', '#FFD166', '#EF476F', '#26547C'],        // 6 index
    ['#FF9900', '#000000' ],                                        // 7 index
];

var colorArray = colorArrayList[0];

    
// EventListeners

window.addEventListener('mousemove', 
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // Circle interaction with mousemove - calculate distance of x/y value of circle to mouse position 
})

window.addEventListener('resize', function(){   
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // this will maintain the canvas' height/width during browser resize    

    init(); // call init function (line 88)
});

// Event Listener for fill, stroke, animate button
document.getElementById('circle').addEventListener('click', function(){            // circle fill button
    isFill = true;
    isAbstract = true;
    isFinished = false;
    init();
});

document.getElementById('circleStroke').addEventListener('click', function(){     // circle stroke button
    isFill = false;
    isAbstract = true;
    isFinished = false;
    initStroke();
});

document.getElementById('abstractMode').addEventListener('click', function(){    // abstract button
    isAbstract = false;
    init();
});


var clearButton = document.getElementById("clearBalls");                        // clear button

clearButton.addEventListener("click", function () {
  isFinished = true;
  
  init();
});


// Event Listener for color palette
document.getElementById("color1").addEventListener("click", function() {
    colorArray = colorArrayList[0];
    init();     
});

document.getElementById("color2").addEventListener("click", function() {
    colorArray = colorArrayList[1]; 
    init();
});

document.getElementById("color3").addEventListener("click", function() {
    colorArray = colorArrayList[2];
    init();
});

document.getElementById("color4").addEventListener("click", function() {
    colorArray = colorArrayList[3];
    init();
});

document.getElementById("color5").addEventListener("click", function() {
    colorArray = colorArrayList[4];
    init();
});

document.getElementById("color6").addEventListener("click", function() {
    colorArray = colorArrayList[5];
    init();
});

document.getElementById("color7").addEventListener("click", function() {
    colorArray = colorArrayList[6];
    init();
});

document.getElementById("color8").addEventListener("click", function() {
    colorArray = colorArrayList[7];
    init();
});

// Event Listener velocity control
document.getElementById("slow").addEventListener("click", function() {
    speed = 0.5; 
    init();
}) 

document.getElementById("medium").addEventListener("click", function() {
    speed = 2.5; 
    init();
}) 

document.getElementById("fast").addEventListener("click", function() {
    speed = 4.5; 
    init();
}) 

// Create Object for circle with independant x and y values
function Circle(x, y, dx, dy, radius) {
    this.x = x; 
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
        
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]  // accesses colorArray and randomizes circle color
    
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {        
            this.dx = -this.dx;
        }    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interaction with the mouse, circles within 50px will grow to the set max radius and outside of 50px will reduce in size back to the set min radius.
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){ 
            if (this.radius < maxRadius) {
                this.radius += 1;                   // increments radius by 1 until max radius
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;                       // decrements radius by 1 until min radius
        }
        this.draw();                                // calls draw function
    }    
}

// Store circles into an array
var circleArray = [];


function init() {    
    var multiplier = document.getElementById("numberOfCircles").value;
    circleArray = [];

    if(isFill === true && isFinished === false){
    // create for loop for multiple circles with random location/velocties
        for (var i = 0; i<multiplier; i++) {
            var radius = Math.random() * 3 + 1;                                     // minimum radius of 1 due to + 1
            var x = Math.random() * (innerWidth - radius * 2) + radius;             // randomize starting pos
            var y = Math.random() * (innerHeight - radius * 2) + radius;
            
            var dx = (Math.random() - 0.5 * speed );                                // randomize velocity (increase speed by multiplying value)
            var dy = (Math.random() - 0.5 * speed );

        circleArray.push(new Circle(x, y, dx, dy, radius));        
        }
    } else if (isFill === false && isFinished === false) {        
        initStroke();
    } else if (isFinished === true){
        console.log('is finished');    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
init();

// Animation function
function animate() {
    
    if(isAbstract === true){
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);           // clears canvas so circle does not repeat

        for (var i=0; i < circleArray.length; i++) {
            circleArray[i].update();                            // For loop will iterate the 100 circles and run the update() for each individual circles.
        }
    } else if (isAbstract === false) {
        abstract();
    }
}
animate();


// Abstract function 
function abstract() {
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, innerWidth, innerHeight);           // clears canvas so circle does not repeat

    for (var i=0; i < circleArray.length; i++) {
        circleArray[i].update();                            // For loop will iterate the 100 circles and run the update() for each individual circles.
    }
}
abstract();

// CircleStroke Function
function CircleStroke(x, y, dx, dy, radius) {
    this.x = x; 
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
        
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]  // accesses colorArray and randomizes circle color
    
    this.drawStroke = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {        
            this.dx = -this.dx;
        }    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interaction with the mouse, circles within 50px will grow to the set max radius and outside of 50px will reduce in size back to the set min radius.
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){ 
            if (this.radius < maxRadius) {
                this.radius += 1;                   // increments radius by 1 until max radius
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;                       // decrements radius by 1 until min radius
        }

        this.drawStroke();                          // calls draw stroke function
    }    
}

// Stroke Draw function 
function initStroke() {    
    var multiplier = document.getElementById("numberOfCircles").value;
    circleArray = [];

    // create for loop for multiple circles with random location/velocties
    for (var i = 0; i<multiplier; i++) {
        var radius = Math.random() * 3 + 1;                                     // minimum radius of 1 due to + 1
        var x = Math.random() * (innerWidth - radius * 2) + radius;             // randomize starting pos
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        
        var dx = (Math.random() - 0.5 * speed );                                // randomize velocity (increase speed by multiplying value)
        var dy = (Math.random() - 0.5 * speed );

       circleArray.push(new CircleStroke(x, y, dx, dy, radius));
    }
}
initStroke();
