import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';
import '@mediapipe/drawing_utils';
import * as fp from "fingerpose";
import * as robotGestures from './Gestures/index'
import { io } from 'socket.io-client'

//const socket = io("localhost:8000");
window.lastMovement = Date.now()
window.finalGestureName = "idle"
window.leftHandGesture = "idle"
window.rightHandGesture = "idle"

const video = document.querySelector("#pose-video")
const canvas = document.querySelector("#pose-canvas")
const ctx = canvas.getContext("2d")
const left_result = document.querySelector("#left_result")
const right_result = document.querySelector("#right_result")
let createdIntervalMoveRobot = false

let detecting2Hands = false
let estimatedLeftHandGesture
let estimatedRightHandGesture

let leftHandGesture
let rightHandGesture

let isStoped = false

const fullGestures = [
  robotGestures.downAxis,
  robotGestures.upAxis,
  robotGestures.moveLeft,
  robotGestures.moveRight,
  robotGestures.stop,
  robotGestures.resume
]

const rightGestures = [
  robotGestures.moveLeft,
  robotGestures.moveRight,
  robotGestures.stop,
  robotGestures.resume
]

const leftGestures = [
  robotGestures.downAxis,
  robotGestures.upAxis,
  robotGestures.stop,
  robotGestures.resume
]

const fullGE = new fp.GestureEstimator(fullGestures)
const leftGE = new fp.GestureEstimator(leftGestures)
const rightGE = new fp.GestureEstimator(rightGestures)
//Configuracion de la camara
const config = {
  video: { width: 350, height: 300, fps: 30 }
}

// let gesturesCounter = {
//   downAxis: 0,
//   upAxis: 0
// }

async function main() {
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
      //Funcion para establecer los puntos de ambas manos
      setHandsKeyPoints(predictions);

      //Diferenciar entre si hay una mano en pantalla o 2
      if(detecting2Hands){
        detect2Hands();
      } else if (!detecting2Hands) {
        detect1Hand();
      }

      drawHandsPoints(predictions);
      checkStop();
      moveLocalRobot();

    } else {
      left_result.textContent = "Mano Izquierda no detectada"
      right_result.textContent = "Mano Derecha no detectada"
    }

    //Crear loop
    setTimeout(() => { estimateHands(); }, 1000 / config.video.fps)
  }
  estimateHands();
}

function checkStop(){
  if(leftHandGesture == "stop" || rightHandGesture == "stop"){
    stopMove();
    isStoped = true
  } else if (leftHandGesture == "resume"  || rightHandGesture == "resume") {
    isStoped = false
  }
}

function setHandsKeyPoints(predictions){
    //Establecer puntos de la primera mano
    //console.log(predictions);
    let leftHandKeypoints = null;
    let leftHandKeypointsArray = [];
    let rightHandKeypoints = null;
    let rightHandKeypointsArray = [];
    let leftPrediction = null;
    let rightPrediction = null;

    if(predictions.length==2){//hay dos manos
      detecting2Hands = true
      /**
       * Save every handPrediction in a diferent variable
       */
      if(predictions[0].handedness=="Left"){
        leftPrediction = predictions[0]
        rightPrediction = predictions[1]
      }else{
        rightPrediction = predictions[0];
        leftPrediction = predictions[1];
      }
      /**
       * Extract the information of the every hand prediction
       */
      leftHandKeypoints= leftPrediction.keypoints;
      leftHandKeypoints.forEach(keypoint => {
        keypoint.z = 0;
        leftHandKeypointsArray.push([keypoint.x, keypoint.y, keypoint.z])
      })
    
      rightHandKeypoints= rightPrediction.keypoints;
      rightHandKeypoints.forEach(keypoint => {
        keypoint.z = 0;
        rightHandKeypointsArray.push([keypoint.x, keypoint.y, keypoint.z])
      })

      estimatedLeftHandGesture = leftGE.estimate(leftHandKeypointsArray, 9)
      estimatedRightHandGesture = rightGE.estimate(rightHandKeypointsArray, 9)
      
    }else{//hay una mano
      detecting2Hands = false
      if(predictions[0].handedness=="Left"){
        leftPrediction = predictions[0]
      }else{
        rightPrediction = predictions[0];
      }

      if(leftPrediction){
        estimatedRightHandGesture = null
        leftHandKeypoints= leftPrediction.keypoints;
        leftHandKeypoints.forEach(keypoint => {
          keypoint.z = 0;
          leftHandKeypointsArray.push([keypoint.x, keypoint.y, keypoint.z])
        })
        estimatedLeftHandGesture = fullGE.estimate(leftHandKeypointsArray, 9)
      } else if (rightPrediction){
        estimatedLeftHandGesture = null
        rightHandKeypoints= rightPrediction.keypoints;
        rightHandKeypoints.forEach(keypoint => {
          keypoint.z = 0;
          rightHandKeypointsArray.push([keypoint.x, keypoint.y, keypoint.z])
        })
        estimatedRightHandGesture = fullGE.estimate(rightHandKeypointsArray, 9)
      }
    }
}

function detect2Hands(){
  if(estimatedLeftHandGesture.gestures[0] && estimatedRightHandGesture.gestures[0]){
    leftHandGesture = leftSmoothGesture(estimatedLeftHandGesture.gestures[0].name) 
    rightHandGesture = rightSmoothGesture(estimatedRightHandGesture.gestures[0].name) 
  } else if (estimatedLeftHandGesture.gestures[0]){
    leftHandGesture = leftSmoothGesture(estimatedLeftHandGesture.gestures[0].name) 
    rightHandGesture = "idle"
  } else if (estimatedRightHandGesture.gestures[0]){
    leftHandGesture = "idle"
    rightHandGesture = rightSmoothGesture(estimatedRightHandGesture.gestures[0].name) 
  } else {
    leftHandGesture = "idle"
    rightHandGesture = "idle"
  }
  left_result.textContent = leftHandGesture
  right_result.textContent = rightHandGesture
}

function detect1Hand(){
  if (estimatedLeftHandGesture){
    if(estimatedLeftHandGesture.gestures[0]){
      leftHandGesture = leftSmoothGesture(estimatedLeftHandGesture.gestures[0].name)
      rightHandGesture = "Mano derecha no detectada"
    } else {
      leftHandGesture = "idle"
    }
  } else if (estimatedRightHandGesture){
    if(estimatedRightHandGesture.gestures[0]){
      rightHandGesture = rightSmoothGesture(estimatedRightHandGesture.gestures[0].name) 
    } else {
      rightHandGesture = "idle"
    }
  } else {
    leftHandGesture = "idle"
    rightHandGesture = "idle"
  }
  left_result.textContent = leftHandGesture
  right_result.textContent = rightHandGesture
}

let leftLastGesture = "";
let leftGestureDuration = 0;

function leftSmoothGesture(gestureName){
  if(gestureName != null){
    if(gestureName == leftLastGesture){
      leftGestureDuration++;
    } else {
      leftLastGesture = gestureName;
      leftGestureDuration = 0;
    }
  } else {
    leftLastGesture = "";
    leftGestureDuration = 0;
  }

  if(leftGestureDuration < 5){
  } else {
    return gestureName;
  }
}

let rightLastGesture = "";
let rightGestureDuration = 0;

function rightSmoothGesture(gestureName){
  if(gestureName != null){
    if(gestureName == rightLastGesture){
      rightGestureDuration++;
    } else {
      rightLastGesture = gestureName;
      rightGestureDuration = 0;
    }
  } else {
    rightLastGesture = "";
    rightGestureDuration = 0;
  }

  if(rightGestureDuration < 3){
  } else {
    return gestureName;
  }
}

function moveLocalRobot(){
  //Gloabl
  window.lastMovement = Date.now();

  if(isStoped){
    return
  }

  if(leftHandGesture == "downAxis" || rightHandGesture == "downAxis"){
    if(window.downAxisCount == 0){
      changeAxis(-1);
      window.downAxisCount+=1
    }
    if(window.upAxisCount > 0) window.upAxisCount = 0
  } else if (leftHandGesture == "upAxis" || rightHandGesture == "upAxis"){
    if(window.upAxisCount == 0){
      changeAxis(1);
      window.upAxisCount+=1
    }
    if(window.downAxisCount > 0) window.downAxisCount = 0
  } else if (leftHandGesture == "moveLeft" || rightHandGesture == "moveLeft"){
    window.downAxisCount = 0
    window.upAxisCount = 0
    if(window.actualAxisIndex == 4 || window.actualAxisIndex == 0 ){
      window.rotate_y_right = false;
      window.rotate_y_left = true;
    } else {
      window.rotate_z_right = false;
      window.rotate_z_left = true;
    }
  } else if (leftHandGesture == "moveRight" || rightHandGesture == "moveRight"){
    window.downAxisCount = 0
    window.upAxisCount = 0
    if(window.actualAxisIndex == 4 || window.actualAxisIndex == 0 ){
      window.rotate_y_left = false;
      window.rotate_y_right = true;
    } else {
      window.rotate_z_left = false;
      window.rotate_z_right = true;
    }
  } else {
    stopMove();
  }
  
  //moveRemoteRobot()
  if (createdIntervalMoveRobot==false) {
    createdIntervalMoveRobot = true;
    var moveRobotInterval = window.setInterval(moveRemoteRobot, 50);
  }
}

function moveRemoteRobot(){
  //Vuelta completa es 6.28==0 || -6.28==0 
  let fullTurn = 6.28
  console.log("moveRemoteRobot")

  if (window.last_robot_move.z == window.actual_robot_move.z && window.last_robot_move.y == window.actual_robot_move.y) return

  
  //si el robot da mas de una vuelta, resta el valor de una vuelta para reiniciar, en ambos direcciones (L,R)
  if (window.actual_robot_move < -fullTurn) {
    window.actual_robot_move += fullTurn;
  }

  if (window.actual_robot_move > fullTurn) {
    window.actual_robot_move -= fullTurn;
  }


}

function stopMove(){
  window.downAxisCount = 0
  window.upAxisCount = 0
  window.rotate_y_left = false;
  window.rotate_y_right = false;
  window.rotate_z_left = false;
  window.rotate_z_right = false;
}

function changeAxis(num){
  let axis = ["ArmBase2","ArmBase2","ArmBase3","ArmBase4","ArmBase5",]
  let nextAxis = window.actualAxisIndex + num;

  window.rotate_y_left = false;
  window.rotate_y_right = false;
  window.rotate_z_left = false;
  window.rotate_z_right = false;

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

function drawHandsPoints(predictions){
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
  });
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