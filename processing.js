async function loadModel() {
    // const myTensor = tf.tensor(dataX0)
    // const model = await tf.loadLayersModel('ML-Model/tfjs-model/model.json')
    // const result = model.predict(myTensor)
    // prediction.as1D().argMax().print();
    // result.as1D().argMax().print();
}


function predictImage() {
    // console.log("processing..");

    let image = cv.imread(canvas)

    cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY, 0)

    cv.threshold(image, image, 175, 255, cv.THRESH_BINARY)

    let contours = new cv.MatVector()
    let hierarchy = new cv.Mat()
    cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

    let cnt = contours.get(0)
    let rect = cv.boundingRect(cnt)
    image = image.roi(rect)

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

    const LEFT = Math.ceil(4 + (20 - width)/2)
    const RIGHT = Math.floor(4 + (20 - width)/2)
    const TOP = Math.ceil(4 + (20 - height)/2)
    const BOTTOM = Math.floor(4 + (20 - height)/2)

    // console.log(`T: ${TOP} | B: ${BOTTOM} | L: ${LEFT} | R: ${RIGHT}`);

    const BLACK = new cv.Scalar(0, 0, 0, 0)
    cv.copyMakeBorder(image, image, TOP, BOTTOM, LEFT, RIGHT, cv.BORDER_CONSTANT, BLACK)



    // Test Code
    const outputCanvas = document.createElement('CANVAS')
    cv.imshow(outputCanvas, image)
    document.body.appendChild(outputCanvas)

    // clean up
    // memory free
    image.delete()
    contours.delete()
    cnt.delete()
    hierarchy.delete()
}
