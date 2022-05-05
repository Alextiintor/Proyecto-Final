import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';
import '@mediapipe/drawing_utils';
import * as fp from "fingerpose";
import * as robotGestures from './Gestures/index'

const config = {
  video: { width: 250, height: 200, fps: 30 }
};

async function main() {
  //Obtener elementos
  const video = document.querySelector("#pose-video");
  const canvas = document.querySelector("#pose-canvas");
  const ctx = canvas.getContext("2d");
  const result = document.querySelector("#result")

  const knownGestures = [
    robotGestures.downAxis,
    robotGestures.upAxis,
    robotGestures.moveLeft,
    robotGestures.moveRight
  ];
  const GE = new fp.GestureEstimator(knownGestures);


  //Cargar modelo
  const model = await handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: 'mediapipe', // or 'tfjs'
    maxHands: 2,
    solutionPath: './node_modules/@mediapipe/hands',
    modelType: 'full'
  };
  const detector = await handPoseDetection.createDetector(model, detectorConfig);
  console.log("Handpose cheto model loaded");

  const estimateHands = async () => {
    //Limpiar el canvas
    ctx.clearRect(0, 0, config.video.width, config.video.height);

    //Configurar el detector de manos
    const estimationConfig = {flipHorizontal: true};
    const predictions = await detector.estimateHands(video, estimationConfig);

    //Recorrer las predicciones y pintar en el canvas las manos
    let handKeyPoints = [];

    if(predictions.length != 0){
      predictions.forEach(hand => {
        hand.keypoints.forEach(keypoint => {
          if(hand.handedness == "Left"){
            drawPoint(ctx, keypoint.x, keypoint.y, 3, "blue")
          } else {
            drawPoint(ctx, keypoint.x, keypoint.y, 3, "red")
          }
          keypoint.z = 0;
          handKeyPoints.push([keypoint.x, keypoint.y, keypoint.z]);
        })

        //console.log(handKeyPoints);
        const estimatedGesture = GE.estimate(handKeyPoints, 9)
        //result.textContent = estimatedGesture.getstures[0]
        if(estimatedGesture.gestures[0]){
          result.textContent = estimatedGesture.gestures[0].name;
        } else {
          result.textContent = "idle"
        }

      });
    }

    //Crear loop
    setTimeout(() => { estimateHands(); }, 1000 / config.video.fps)
  }
  estimateHands();
}



// async function main() {

//   const video = document.querySelector("#pose-video");
//   const canvas = document.querySelector("#pose-canvas");
//   const ctx = canvas.getContext("2d");

//   const resultLayer = document.querySelector("#pose-result");

//   // configure gesture estimator
//   // add "✌🏻" and "👍" as sample gestures
//   const knownGestures = [
//     fp.Gestures.VictoryGesture,
//     fp.Gestures.ThumbsUpGesture
//   ];
//   const GE = new fp.GestureEstimator(knownGestures);



//   // main estimation loop
//   const estimateHands = async () => {

//     // clear canvas overlay
//     ctx.clearRect(0, 0, config.video.width, config.video.height);
//     resultLayer.innerText = '';

//     // get hand landmarks from video
//     // Note: Handpose currently only detects one hand at a time
//     // Therefore the maximum number of predictions is 1
//     const predictions = await model.estimateHands(video, true);

//     for(let i = 0; i < predictions.length; i++) {

//       // draw colored dots at each predicted joint position
//       for(let part in predictions[i].annotations) {
//         for(let point of predictions[i].annotations[part]) {
//           drawPoint(ctx, point[0], point[1], 3, landmarkColors[part]);
//         }
//       }

//       // estimate gestures based on landmarks
//       // using a minimum score of 9 (out of 10)
//       // gesture candidates with lower score will not be returned
//       const est = GE.estimate(predictions[i].landmarks, 9);

//       if(est.gestures.length > 0) {

//         // find gesture with highest match score
//         let result = est.gestures.reduce((p, c) => { 
//           return (p.score > c.score) ? p : c;
//         });

//         resultLayer.innerText = gestureStrings[result.name];
//       }

//       // update debug info
//       updateDebugInfo(est.poseData);
//     }

//     // ...and so on
//     setTimeout(() => { estimateHands(); }, 1000 / config.video.fps);
//   };

//   estimateHands();
//   console.log("Starting predictions");
// }

async function initCamera(width, height, fps) {

  const constraints = {
    audio: false,
    video: {
      facingMode: "user",
      width: width,
      height: height,
      frameRate: { max: fps }
    }
  };

  const video = document.querySelector("#pose-video");
  video.width = width;
  video.height = height;

  // get video stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  video.srcObject = stream;

  return new Promise(resolve => {
    video.onloadedmetadata = () => { resolve(video) };
  });
}

function drawPoint(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

window.addEventListener("DOMContentLoaded", () => {

  initCamera(
    config.video.width, config.video.height, config.video.fps
  ).then(video => {
    video.play();
    video.addEventListener("loadeddata", event => {
      console.log("Camera is ready");
      main();
    });
  });

  const canvas = document.querySelector("#pose-canvas");
  canvas.width = config.video.width;
  canvas.height = config.video.height;
  console.log("Canvas initialized");
});