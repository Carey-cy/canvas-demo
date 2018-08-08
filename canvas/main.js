var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')

autoSetCanvasSize(yyy)
listenToUser(yyy)

var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function(){
    eraserEnabled = false
    actions.className = 'actions'
}

/*****工具函数****/
function drawCircle(x,y,radius){
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()
}
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineWidth = 5
    context.strokeStyle = 'black'
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
