$().ready(function() {
  var context,
      canvasDiv = document.getElementById('canvasDiv'),
      canvas = document.createElement('canvas'),
      canvasWidth = 800,
      canvasHeight = 300,
      paint = false,
      clickX = [],
      clickY = [],
      clickDrag = [],
      colorBlue = "#334455",
      colorGreen = "#659b41",
      colorYellow = "#ffcf33",
      colorBrown = "#986928",
      curColor = colorBlue,
      clickColor = [];

  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);
  canvas.setAttribute('id', 'canvas');
  canvasDiv.appendChild(canvas);
  if(typeof G_vmlCanvasManager != 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
  }
  context = canvas.getContext("2d");

  $('#canvas').mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
      
    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
  });

  $('#canvas').mousemove(function(e){
    if(paint){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  });

  $('#canvas').mouseup(function(e){
    paint = false;
    redraw();
  });

  $('#canvas').mouseleave(function(e){
    paint = false;
  });

  $('#choosePurple').mousedown(function(e){
    curColor = colorPurple;
  });
  $('#chooseGreen').mousedown(function(e){
    curColor = colorGreen;
  });
  $('#chooseYellow').mousedown(function(e){
    curColor = colorYellow;
  });
  $('#chooseBrown').mousedown(function(e){
    curColor = colorBrown;
  });
  $('#clearCanvas').mousedown(function(e){
    clickX = [];
    clickY = [];
    clickDrag = [];
    clickColor = [];
    clearCanvas();
  });

  function addClick(x, y, dragging){
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(curColor);
  }

  function clearCanvas(){
    context.fillStyle = '#ffffff'; // Work around for Chrome
    context.fillRect(0, 0, canvasWidth, canvasHeight); // Fill in the canvas with white
    canvas.width = canvas.width; // clears the canvas 
  }

  function redraw(){
    clearCanvas();
    
    var radius = 5;
    context.lineJoin = "round";
    context.lineWidth = radius;

    for(var i=0; i < clickX.length; i++) {    
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
         context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.strokeStyle = clickColor[i];
       context.stroke();
    }
  }
});
