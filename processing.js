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

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

    let cnt = contours.get(0)
    let rect = cv.boundingRect(cnt)
    image = image.roi(rect)


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
