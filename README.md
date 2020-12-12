# Draw The Digit
___

![Tensorflow JS](https://img.shields.io/pypi/v/tensorflowjs?label=tensorflowjs)
![Tensorflow](https://img.shields.io/pypi/v/tensorflow?label=tensorflow)
![Keras](https://img.shields.io/pypi/v/keras?label=keras)
![Numpy](https://img.shields.io/pypi/v/numpy?label=numpy)


### A garden which grows/wither based on sum of digits you draw


## Table of content

- [**Getting Started**](#getting-started)
- [Dataset for Training](#dataset-for-training)
- [Tensorflowjs Model](#tensorflowjs-model)
- [Data preprocessing](#data-preprocessing-for-web)
- [Prediction](#prediction)
- [Game Logic](#game-logic)
- [Motivation](#motivation)
- [Acknowledgments](#acknowledgements)

## Getting Started
- [Anaconda](https://www.anaconda.com/products/individual) (model building and training)
- [Atom](https://atom.io/) (web development)
- Browser (chrome/firefox/edge)

- #### Anaconda packages
![Conda](https://img.shields.io/conda/v/conda-forge/tensorflow)
```console
pip install tensorflowjs
pip install tensorflow
pip install keras
```
- #### Atom Plugins
    - [atom-html-preview](https://atom.io/packages/atom-html-preview)
    - [atom-live-server](https://atom.io/packages/atom-live-server)
    - [atom-ternjs](https://atom.io/packages/atom-ternjs)
    - [emmet](https://atom.io/packages/emmet)
    - [terminus](https://atom.io/packages/terminus)

## Dataset for Training
Dataset used to train the model is the famous [MNIST](http://yann.lecun.com/exdb/mnist/) Handwritten digits consist of 60,000 training images and 10000 testing images. Download or import from keras datasets.
- [Download](http://yann.lecun.com/exdb/mnist/)
- [Kaggle](https://www.kaggle.com/c/digit-recognizer)
```python
from keras.datasets import mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()
```

## Tensorflowjs Model
 conversion of keras h5 model to tensorflowjs model
 in the command prompt.<br>
 [Docs](https://www.tensorflow.org/js/guide/conversion)
 ```console
 tensorflowjs_converter --input_format=keras mnist-model.h5 tfjs
 ```
## Data preprocessing for web
preprocessing is mainly done with **opencv js** which is included in folder _vendors/opencv.js_
1. Accept canvas image and load it to opencv
2. Convert to grayscale
3. Find contours inorder to crop the image
4. Resize the image by a scalefactor
5. Add padding
6. Find center of mass and shift the image
7. Normalize pixels
8. Create the tensor

These steps are done in _processing.js_

## Prediction
**X** is the tensor we created as a result of the preprocessing. It is 4D tensor, goes into a CNN, and returns the output.
```python
const shape = [1, 28, 28, 1]

const X = tf.tensor([pixelValues], shape)

const result = model.predict(X).as1D().argMax()

const output = result.dataSync()[0]

return output
```

## Game Logic
Garden grows as long as the answer is correct and withers when answer is wrong.
```javascript
const prediction = predictImage()

if(prediction == answer){
    score++
    if(score <= 6){
        bgImages.push(`url('images/background${score}.svg')`)
        document.body.style.backgroundImage = bgImages
    }
    else{
        alert('Wow! You Won The Game')
        score = 0
        bgImages = []
        document.body.style.backgroundImage = bgImages
    }

}
else{
    if(score != 0) { score-- }
    alert('Oops! Check your calculation')
    setTimeout(() => {
        bgImages.pop()
        document.body.style.backgroundImage = bgImages
    }, 1000)
}
```
---
## Motivation
**Why create it in the first place?**<br>
    Bored by doing analytics in jupyter-notebook and colab <br>Why not use the model we've saved to deploy it to real world for various purposes rather than just saving the model to our local drive?

## Acknowledgments
This project is mainly from the course on [Udemy](https://www.udemy.com) [Data Science and Machine Learning Bootcamp](https://www.udemy.com/course/python-data-science-machine-learning-bootcamp/) taught by Philipp Muellauer and Dr. Angela Yu from [London App Brewery](https://www.appbrewery.co/).

Background Color for Website : [UIColorPicker](https://uicolorpicker.com/) by [LearnCodeOnline](https://learncodeonline.in/)

---
