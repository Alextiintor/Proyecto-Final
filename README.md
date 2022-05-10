# Proyecto Final de desarrollo web
Nuestro proyecto consiste en mover un brazo robot con las manos, mediante una inteligencia artificial, para esto utilizamos [Tensorflow JS](https://www.tensorflow.org/) y los siguientes modelos:

### Modelos
Modelo para detectar una mano:  
[Mediapipe Hands](https://google.github.io/mediapipe/solutions/hands.html)  
Modelo para detectar ambas manos:  
[Tensorflow Hand Pose Detection](https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection)  

---
# Instalación y ejecución del proyecto
El proyecto se divide en 3 apartados:  
* Cliente
* Servidor
* Brazo Robot Remoto

## Instalación:
Para instalar hay que ejecutar el siguiente comando:   
```bash
cd .\remoteRobot\ 
npm i
cd ..\server\ 
npm i
cd ..
npm i
```

## Ejecución:
```bash
cd .\remoteRobot\ 
npm run dev
cd ..\server\ 
npm run dev
cd ..
npm run dev
```
