import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';
import '@mediapipe/drawing_utils';
import * as fp from "fingerpose";
import * as robotGestures from './Gestures/index'
import { io } from 'socket.io-client'

//const socket = io("localhost:8000");
window.lastMovement = Date.now();
window.finalGestureName = "idle"

let detecting2Hands = false;
let estimatedFirstHandGesture;
let estimatedSecondHandGesture;

let firstHandGesture;
let secondHandGesture;

const knownGestures = [
  robotGestures.downAxis,
  robotGestures.upAxis,
  robotGestures.moveLeft,
  robotGestures.moveRight
];
const GE = new fp.GestureEstimator(knownGestures);

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

    //Recorrer las predicciones y pintar en el canvas las manos
    if(predictions.length != 0){
      setHandsKeyPoints(predictions);

      //console.log(detecting2Hands);
      if(detecting2Hands){
        detect2Hands();
      } else {
        detect1Hand();
      }

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
        })

        // //Compreba si hay gestos
        // if(estimatedGesture.gestures[0]){
        //   //Si hay gestos, pone el nombre del gesto en un div
        //   let gestureName = estimatedGesture.gestures[0].name;

        //   window.finalGestureName = smoothGesture(gestureName)
        //   //console.log(smoothGesture(gestureName));
        //   result.textContent = window.finalGestureName;
        //   //Envia las instrucciones al robot.
        //   moveLocalRobot(window.finalGestureName)
        //   sendInstructions(window.finalGestureName)
        // } else {
        //   //Si no hay ningun gesto pone en el div que esta en "idle"
        //   result.textContent = "idle"
        //   sendInstructions("idle")
        //   moveLocalRobot("idle")
        // }

      });
    }

    //Crear loop
    setTimeout(() => { estimateHands(); }, 1000 / config.video.fps)
  }
  estimateHands();
}

function setHandsKeyPoints(predictions){
    let firstHandKeypoints = predictions[0].keypoints;
    let firstHandKeypointsArray = [];
    firstHandKeypoints.forEach(keypoint => {
      keypoint.z = 0;
      firstHandKeypointsArray.push([keypoint.x, keypoint.y, keypoint.z])
    })

    let secondHandKeypoints;
    let secondHandKeypointsArray = [];
    //console.log(predictions);
    if(predictions[1]){
      detecting2Hands = true
      secondHandKeypoints = predictions[1].keypoints

      secondHandKeypoints.forEach(keypoint => {
        keypoint.z = 0;
        secondHandKeypointsArray.push([keypoint.x, keypoint.y, keypoint.z])
      });
      estimatedFirstHandGesture = GE.estimate(firstHandKeypointsArray, 9)
      estimatedSecondHandGesture = GE.estimate(secondHandKeypointsArray, 9)
    } else {
      detecting2Hands = false;
      estimatedFirstHandGesture = GE.estimate(firstHandKeypointsArray, 9)
    }
}

function detect2Hands(){
  if(estimatedFirstHandGesture.gestures[0] && estimatedSecondHandGesture.gestures[0]){
    firstHandGesture = smoothGesture(estimatedFirstHandGesture.gestures[0].name) 
    secondHandGesture = smoothGesture(estimatedSecondHandGesture.gestures[0].name) 
  } else if (estimatedFirstHandGesture.gestures[0]){
    firstHandGesture = smoothGesture(estimatedFirstHandGesture.gestures[0].name) 
    secondHandGesture = "idle"
  } else if (estimatedSecondHandGesture.gestures[0]){
    firstHandGesture = "idle"
    secondHandGesture = smoothGesture(estimatedSecondHandGesture.gestures[0].name) 
  } else {
    firstHandGesture = "idle"
    secondHandGesture = "idle"
  }
  console.log(secondHandGesture + " " + firstHandGesture);
}

function detect1Hand(){
  if (estimatedFirstHandGesture.gestures[0]){
    firstHandGesture = smoothGesture(estimatedFirstHandGesture.gestures[0].name) 
    secondHandGesture = "idle"
  } else {
    firstHandGesture = "idle"
  }
  console.log(firstHandGesture);
}

let lastGesture = "";
let gestureDuration = 0;

function smoothGesture(gestureName){

  if(gestureName != null){
    if(gestureName == lastGesture){
      gestureDuration++;
    } else {
      lastGesture = gestureName;
      gestureDuration = 0;
    }
  } else {
    lastGesture = "";
    gestureDuration = 0;
  }

  if(gestureDuration < 5){
    return ""
  } else {
    return gestureName;
  }

}

function moveLocalRobot(gestureName){
  //Gloabl
  window.lastMovement = Date.now();

  if(gestureName == "downAxis"){
    if(window.downAxisCount == 0){
      changeAxis(-1);
      window.downAxisCount+=1
    }
    if(window.upAxisCount > 0) window.upAxisCount = 0
  } else if (gestureName == "upAxis"){
    if(window.upAxisCount == 0){
      changeAxis(1);
      window.upAxisCount+=1
    }
    if(window.downAxisCount > 0) window.downAxisCount = 0
  } else if (gestureName == "moveLeft"){
    window.downAxisCount = 0
    window.upAxisCount = 0
    if(window.actualAxis == "5" || window.actualAxis == "ArmBase2" ){
      window.rotate_y_right = false;
      window.rotate_y_left = true;
    } else {
      window.rotate_z_right = false;
      window.rotate_z_left = true;
    }

  } else if (gestureName == "moveRight"){
    window.downAxisCount = 0
    window.upAxisCount = 0
    if(window.actualAxis == "5" || window.actualAxis == "ArmBase2" ){
      window.rotate_y_left = false;
      window.rotate_y_right = true;
    } else {
      window.rotate_z_left = false;
      window.rotate_z_right = true;
    }
  } else {
    window.downAxisCount = 0
    window.upAxisCount = 0
    window.rotate_y_left = false;
    window.rotate_y_right = false;
    window.rotate_z_left = false;
    window.rotate_z_right = false;
  }

}

function changeAxis(num){
  let axis = ["ArmBase2","2","3","4","5",]
  let nextAxis = window.actualAxisIndex + num;

  console.log(nextAxis);
  
  
  if (nextAxis == 5) {
    window.actualAxis = axis[0]
    window.actualAxisIndex = 0;
  } else if (nextAxis == -1) {
    window.actualAxis = axis[4]
    window.actualAxisIndex = 4
  } else {
    window.actualAxis = axis[nextAxis]
    window.actualAxisIndex = nextAxis
  }
  // console.log(window.actualAxis);
  // console.log(window.actualAxisIndex);
}

//Funcion para enviar las instrucciones al robot
function sendInstructions(gesture){
  if(gesture == "downAxis"){
    socket.emit("clientMovesRobot", gesture)
  } else if (gesture == "upAxis"){
    socket.emit("clientMovesRobot", gesture)
  } else if (gesture == "moveLeft"){
    socket.emit("clientMovesRobot", gesture)
  } else if (gesture == "moveRight"){
    socket.emit("clientMovesRobot", gesture)
  } else {
    socket.emit("clientMovesRobot", "idle")
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