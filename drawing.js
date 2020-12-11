const BG_COLOR = '#000000'
const LINE_COLOR = '#FFFFFF'
const LINE_WD = 15

var currentX = 0
var currentY = 0
var previousX = 0
var previousY = 0

var canvas
var context

function prepareCanvas() {
    // console.log('Preparing canvas')

    canvas = document.getElementById('my-canvas')
    context = canvas.getContext('2d')

    context.fillStyle = BG_COLOR
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    context.strokeStyle = LINE_COLOR
    context.lineWidth = LINE_WD
    context.lineJoin = 'round'

    var isPainting = false

    // mouse events
    document.addEventListener('mousedown', (event) => {
        // console.log("Mouse Down")
        isPainting = true

        currentX = event.clientX - canvas.offsetLeft
        currentY = event.clientY - canvas.offsetTop
    })

    document.addEventListener('mousemove', (event) => {
        if (isPainting) {
            previousX = currentX
            currentX = event.clientX - canvas.offsetLeft

            previousY = currentY
            currentY = event.clientY - canvas.offsetTop

            draw();
        }
    })

    document.addEventListener('mouseup', (event) => {
        // console.log("Mouse Up")
        isPainting = false
    })

    canvas.addEventListener('mouseleave', (event) => {
        isPainting = false
    })

    // Touch Events
    canvas.addEventListener('touchstart', (event) => {
        console.log("Touch Down")
        isPainting = true
        currentX = event.touches[0].clientX - canvas.offsetLeft
        currentY = event.touches[0].clientY - canvas.offsetTop
    })

    canvas.addEventListener('touchcancel', (event) => {
        isPainting = false
    })

    canvas.addEventListener('touchmove', (event) => {
        if (isPainting) {
            previousX = currentX
            currentX = event.touches[0].clientX - canvas.offsetLeft

            previousY = currentY
            currentY = event.touches[0].clientY - canvas.offsetTop

            draw();
        }
    })
}

function draw() {
    context.beginPath()
    context.moveTo(previousX, previousY)
    context.lineTo(currentX, currentY)
    context.closePath()
    context.stroke()
}

function clearCanvas() {
    currentX = 0
    currentY = 0
    previousX = 0
    previousY = 0

    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}
