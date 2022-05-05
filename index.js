import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';
import '@mediapipe/drawing_utils';
import * as fp from "fingerpose";
import * as robotGestures from './Gestures/index'
import { io } from 'socket.io-client'
const socket = io("localhost:8000");

//Configuracion de la camara
const config = {
  video: { width: 350, height: 300, fps: 30 }
};

let gesturesCounter = {
  downAxis: 0,
  upAxis: 0
}

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
    const estimationConfig = {flipHorizontal: true /*Girar el detector horizontal mente*/};
    const predictions = await detector.estimateHands(video, estimationConfig);

    //Array con las cordenadas de los puntos de la mano 
    let handKeyPoints = [];
    //Recorrer las predicciones y pintar en el canvas las manos
    if(predictions.length != 0){
      predictions.forEach(hand => {
        hand.keypoints.forEach(keypoint => {
          //Diferenciar manos visualmente
          if(hand.handedness == "Left"){
            //Si la mano es la izquierda pinta los puntos de la mano en azul
            drawPoint(ctx, keypoint.x, keypoint.y, 3, "blue")
          } else {
            //Si es derecha los pinta en rojo
            drawPoint(ctx, keypoint.x, keypoint.y, 3, "red")
          }
          // Hacer que las cordenadas 2D sean "3D"
          keypoint.z = 0;
          //Se rellena el array con las cordenadas de los puntos de la mano
          handKeyPoints.push([keypoint.x, keypoint.y, keypoint.z]);
        })

        const estimatedGesture = GE.estimate(handKeyPoints, 9)

        //Compreba si hay gestos
        if(estimatedGesture.gestures[0]){
          //Si hay gestos, pone el nombre del gesto en un div
          let gestureName = estimatedGesture.gestures[0].name;

          //gestureName = smoothGesture(gestureName, gesturesCounter)
          result.textContent = gestureName;
          //Envia las instrucciones al robot.
          sendInstructions(gestureName)
        } else {
          //Si no hay ningun gesto pone en el div que esta en "idle"
          result.textContent = "idle"
        }

      });
    }

    //Crear loop
    setTimeout(() => { estimateHands(); }, 1000 / config.video.fps)
  }
  estimateHands();
}

function smoothGesture(gestureName, gesturesCounter){
  gesturesCounter[gestureName]++;
  if(gesturesCounter[gestureName] == 3){
    console.log("Entro en el if");
    gesturesCounter = {
      downAxis: 0,
      upAxis: 0,
    }
    console.log(gestureName);
    return gestureName;
  }
}

//Funcion para enviar las instrucciones al robot
function sendInstructions(gesture){
  if(gesture == "downAxis"){
    console.log("Send downAxis");
  } else if (gesture == "upAxis"){
    console.log("Send upAxis");
  } else if (gesture == "moveLeft"){
    console.log("Send moveLeft");
  } else if (gesture == "moveRight"){
    console.log("Send moveRight");
  }
}

//Funcion para inciar la camara
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

//Funcion para pintar los puntos de la mano
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