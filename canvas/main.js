var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')
var lineWidth = 5

autoSetCanvasSize(yyy)
listenToUser(yyy)

var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
black.onclick = function(){
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
}
red.onclick = function(){
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
}
green.onclick = function(){
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
}
blue.onclick = function(){
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
}
yellow.onclick = function(){
    context.fillStyle = 'yellow'
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')
}
thin.onclick = function(){
    lineWidth = 1
    thin.classList.add('active')
    medium.classList.remove('active')
    thick.classList.remove('active')
}
medium.onclick = function(){
    lineWidth = 5
    thin.classList.remove('active')
    medium.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function(){
    lineWidth = 8
    thin.classList.remove('active')
    medium.classList.remove('active')
    thick.classList.add('active')
}
/*****工具函数****/
function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()
}
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}

function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.onresize = function(){
        setCanvasSize();
    }
}   
function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    yyy.width = pageWidth
    yyy.height = pageHeight
}
function listenToUser(canvas){
    var lastPoint = {x:undefined,y:undefined}
    var using = false
    // 特性检查
    if(document.body.ontouchstart !== undefined){
    // 触屏设备
        canvas.ontouchstart = function(aaa){
            using = true
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint = {
                    "x":x,
                    "y":y
                }
            }
            // drawCircle(x,y,1)   
        }
        canvas.ontouchmove = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if(!using) {return} 
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                // drawCircle(x,y,1)
                var newPoint = {"x":x,"y":y}
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint  // 实时更新上一个点
            }
        }
        canvas.ontouchend = function(aaa){
            using = false
        }
    }else{
        // 非触屏设备
        canvas.onmousedown = function(aaa){
            using = true
            var x = aaa.clientX
            var y = aaa.clientY
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint = {
                    "x":x,
                    "y":y
                }
            }
            // drawCircle(x,y,1)   
        }
        canvas.onmousemove = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            if(!using) {return} 
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                // drawCircle(x,y,1)
                var newPoint = {"x":x,"y":y}
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint  // 实时更新上一个点
            }
        }
        canvas.onmouseup = function(aaa){
            using = false
        }
    }    
}
