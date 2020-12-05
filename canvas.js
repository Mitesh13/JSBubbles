let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth-2
canvas.height = window.innerHeight-6
// console.log(canvas.width);
// console.log(canvas.height);
let c = canvas.getContext('2d')

// c.fillStyle = "rgba(255,0,0,0.5)"
// c.fillRect(100,100,100,100)
// c.fillStyle = "rgba(0,0,255,0.5)"
// c.fillRect(400,100,100,100)
// c.fillStyle = "rgba(0,255,0,0.5)"
// c.fillRect(300,300,100,100)

// //Line
// c.beginPath()
// c.moveTo(50,300)
// c.lineTo(300,100)
// c.lineTo(400,300)
// c.strokeStyle = "#fa34a3"
// c.stroke()

//Arc 
// c.beginPath()
// c.arc(300,300,30,0,Math.PI * 2,false)
// c.strokeStyle = "blue"
// c.stroke()

// for(let i=0; i < 100; i++)
// {
//     let x = Math.random() * window.innerWidth
//     let y = Math.random() * window.innerHeight
//     c.beginPath()
//     c.arc(x,y,30,0,Math.PI * 2,false)
//     c.strokeStyle = "blue"
//     c.stroke()
// }

// let x = Math.random() * innerWidth
// let y = Math.random() * innerHeight
// let dx = (Math.random() - 0.5) * 8 
// let dy = (Math.random() - 0.5) * 8
// console.log(dx);
// console.log(dy);
// let radius = 30

let mouse = {
    x:undefined,
    y:undefined,
}
let maxRadius = 40
let minRadius = 2

let colorArray= [
    '#FFBE0B',
    '#FB5607',
    '#FF006E',
    '#8338EC',
    '#3A86FF',
]

window.addEventListener('mousemove', function(event)
{
    mouse.x = event.x
    mouse.y = event.y
    // console.log(mouse);
})

window.addEventListener('resize',function()
{
    canvas.width = window.innerWidth-2
    canvas.height = window.innerHeight-6

    init()
})

function Circle(x,y,dx,dy,radius)
{
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.maxRadius = Math.floor(Math.random() * (maxRadius-20) + 20 )
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)]
    this.draw = function()
    {
        
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.stroke()
        c.fillStyle = this.color
        c.fill()
    }
    this.update = function()
    {
        if(this.x + radius > innerWidth || this.x - this.radius < 0)
            this.dx = -this.dx    
        
        if(this.y + radius > innerHeight || this.y-this.radius < 0)
            this.dy = -this.dy

        this.x += this.dx
        this.y += this.dy
        
        this.draw()
        if(mouse.x - this.x < 50 
            && mouse.x - this.x > - 50
            && mouse.y - this.y < 50
            && mouse.y - this.y > - 50)
        {
            if(this.radius < this.maxRadius)
                this.radius += 1
        }
        else if(this.radius > this.minRadius){
            this.radius -= 1
        }
    }

}

var circleArray = []

function init()
{
    circleArray = []
    for(let i=0;i<400;i++)
    {
        let radius = Math.random() * 5 + 1
        let x = Math.random() * (innerWidth - radius * 2) + radius
        let y = Math.random() * (innerHeight - radius * 2) + radius
        let dx = (Math.random() - 0.5) 
        let dy = (Math.random() - 0.5) 

        circleArray.push(new Circle(x,y,dx,dy,radius))
    }
}

function animate()
{
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth,innerHeight)
    
    for(let i=0;i<circleArray.length;i++)
    {
        circleArray[i].update()
    }
}
init()
animate()