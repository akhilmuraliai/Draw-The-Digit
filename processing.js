var model

async function loadModel() {
    model = await tf.loadLayersModel('./ML-Model/tfjs-model/model.json')
}


function predictImage() {
    // Accepting canvas image
    let image = cv.imread(canvas)

    // Converting to grayscale and thresholding
    cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY, 0)
    cv.threshold(image, image, 175, 255, cv.THRESH_BINARY)

    // Finding contours
    let contours = new cv.MatVector()
    let hierarchy = new cv.Mat()
    cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)

    // Bounding rectangles (ROI), crop
    let cnt = contours.get(0)
    let rect = cv.boundingRect(cnt)
    image = image.roi(rect)

    // Resize the image
    var height = image.rows
    var width = image.cols
    // tall and narrow image
    if(height > width){
        height = 20
        const scaleFactor = image.rows / height
        width = Math.round(image.cols / scaleFactor)
    }// short and narrow image
    else{
        width = 20
        const scaleFactor = image.cols / width
        height = Math.round(image.rows / scaleFactor)
    }

    let newSize = new cv.Size(width, height)
    cv.resize(image, image, newSize, 0, 0, cv.INTER_AREA)

    // Add Padding
    const LEFT = Math.ceil(4 + (20 - width)/2)
    const RIGHT = Math.floor(4 + (20 - width)/2)
    const TOP = Math.ceil(4 + (20 - height)/2)
    const BOTTOM = Math.floor(4 + (20 - height)/2)

    const BLACK = new cv.Scalar(0, 0, 0, 0)
    cv.copyMakeBorder(image, image, TOP, BOTTOM, LEFT, RIGHT, cv.BORDER_CONSTANT, BLACK)

    // Center of mass
    cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)
    cnt = contours.get(0)
    const Moments = cv.moments(cnt, false)

    const cx = Moments.m10 / Moments.m00
    const cy = Moments.m01 / Moments.m00

    // Shifting the image
    const X_SHIFT = Math.round(image.cols/2.0 - cx)
    const Y_SHIFT = Math.round(image.rows/2.0 - cy)

    const M = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, X_SHIFT, 0, 1, Y_SHIFT])
    newSize = new cv.Size(image.rows, image.cols);
    cv.warpAffine(image, image, M, newSize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, BLACK)

    // Normalizing the image
    let pixelValues = image.data
    pixelValues = Float32Array.from(pixelValues)
    pixelValues = pixelValues.map((item) => {
        return item/255.0
    })

    // Prediction and output returning
    const shape = [1, 28, 28, 1]
    const X = tf.tensor([pixelValues], shape)
    // console.log(`Shape of Tensor: ${X.shape}`)
    // console.log(`dtype of Tensor: ${X.dtype}`)
    const result = model.predict(X).as1D().argMax()

    // var testM = document.querySelector('.test-m')
    // testM.innerText = a1

    //result.as1D().argMax().print()
    // result.as1D().argMax().asScalar().toInt().print()

    const output = result.dataSync()[0]
    // console.log(`Out: ${output}`)

    // Test Code
    // const outputCanvas = document.createElement('CANVAS')
    // cv.imshow(outputCanvas, image)
    // document.body.appendChild(outputCanvas)

    // Clean up
    image.delete()
    contours.delete()
    cnt.delete()
    hierarchy.delete()
    M.delete()
    X.dispose()
    result.dispose()

    return output
}
