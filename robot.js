import 'regenerator-runtime/runtime'

import * as THREE from 'three'

import { OrbitControls, MapControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import * as dat from 'dat.gui'
import { time } from '@tensorflow/tfjs-core';

// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/GLTFLoader.js'; 
// import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/RGBELoader.js'; 
// import { RoughnessMipmapper } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/utils/RoughnessMipmapper.js'; 
//window.three = THREE;
window.robot_parts = [];
window.camera = null;
window.dae_obj = null;
window.boxHelper  = null;
window.robot = null;
window.rotate_z = false;
window.rotate_y_left = false;
window.rotate_y_right = false;
window.rotate_z_left = false;
window.rotate_z_right = false;

window.last_move_robot = {
    axis: "ArmBase2",
    axisIndex: 0,
    y: 0,
    z: 0
}

window.actual_move_robot = {
    axis: "ArmBase2",
    axisIndex: 0,
    y: 0,
    z: 0
}

window.actualAxis = "ArmBase2"
window.actualAxisIndex = 0

window.upAxisCount = 0;
window.downAxisCount = 0;

let look_x = 0;
let look_y = 35;
let look_z = 0;

(function () {
    // create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    window.rotate_z= false; 
    window.rotate_y = false; 
    window.rotate_x = false;

    // point light
    var pl = new THREE.PointLight(0xffffff);
    pl.position.set(30, 60, 40);
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( pl, sphereSize, 0x000000 );

    scene.add(pl);
    //scene.add(pointLightHelper );


    // camera
    var camera = new THREE.PerspectiveCamera(35, 840 / 680, .1, 500 );
    camera.position.set(3, 0.5, 3);
    camera.position.set(1.5, 3, 5);
    camera.position.set(50, 100, 135);
    camera.lookAt(look_x, look_y, look_z);
    scene.add(camera);
    window.camera = camera;

    //AXES HELPER
    // var axes = new THREE.AxisHelper(25);
    // scene.add(axes);

    // render
    var renderer = new THREE.WebGLRenderer({antialias:true});
    // var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.getElementById('robot').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    
    // controls
    //var controls = new OrbitControls(camera, renderer.domElement);
    var controls = new MapControls(camera, renderer.domElement);
    controls.target.set(look_x, look_y, look_z);
    controls.update();
    // var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    // app loop
    

    // socket.on("serverMovesRobot",(direction)=>{
    //     if (window.rotate_y_left) window.rotate_y_left = false;
    //     if (window.rotate_y_right) window.rotate_y_right = false;

    //     if (direction=="upAxis") {
    //         if (window.upAxisCount == 0) {
    //             changeAxis(1)
    //             window.upAxisCount += 1;
    //         }
    //         if (window.downAxisCount > 0) window.downAxisCount = 0;
    //     }else if(direction=="downAxis"){
    //         if (window.downAxisCount == 0)  {
    //             changeAxis(-1)
    //             window.downAxisCount += 1;
    //         }
    //         if (window.upAxisCount > 0) window.upAxisCount = 0;

    //     }else{
    //         //set axis count to 0
    //         if (window.downAxisCount > 0) window.downAxisCount = 0;
    //         if (window.upAxisCount > 0) window.upAxisCount = 0;

    //         if(direction=="moveLeft") window.rotate_y_left = true;
    //         else if(direction=="moveRight") window.rotate_y_right = true;
    //     }
       
    // });

    // CREATE A COLLADALOADER INSTANCE
    var loader = new ColladaLoader();
    // CALL THE LOAD METHOD, PASS THE ABSOLUTE OR RELATIVE PATH
    // TO THE *.DAE FILE AS THE FIRST ARGUMENT, AND A DONE CALLBACK
    // AS THE SECOND ARGUMENT
    loader.load("./ur10_2.dae", function (result) {
        // adding the child that I want to the scene
        scene.add(result.scene);
        window.robot = result.scene;
        window.robot.position.x=10;
        window.robot.position.z= 10;
        window.dae_obj = result;
        window.dae_obj.library.visualScenes.ID2.build.quaternion.x=0;


        print_model_information();

        //Create pivot points 
        setPivots();

        //Create Controls
        // var gui = createControls();

        // start the app loop
        loop();
    });
    var loop = function () {
        let posPivot = 0;
        // camera.lookAt(look_x, look_y, look_z);
        if (window.actualAxisIndex==0) {
            if(window.rotate_y_left == true){
                window.robot_parts[window.actualAxis].rotation.y+=0.01;
            }
            if(window.rotate_y_right == true){
                window.robot_parts[window.actualAxis].rotation.y-=0.01;
            }
            
            window.actual_move_robot = {
                axis: window.actualAxis,
                axisIndex: window.actualAxisIndex,
                y: window.robot_parts[window.actualAxis].rotation.y,
                z: window.robot_parts[window.actualAxis].rotation.z
            }

        } else {
            posPivot = window.robot_parts[window.actualAxis].children.length -1;

            if(window.rotate_y_left == true){
                window.robot_parts[window.actualAxis].children[posPivot].rotation.y+=0.01;
            }
            if(window.rotate_y_right == true){
                window.robot_parts[window.actualAxis].children[posPivot].rotation.y-=0.01;
            }
            if(window.rotate_z_left == true){
                window.robot_parts[window.actualAxis].children[posPivot].rotation.z+=0.01;
            }
            if(window.rotate_z_right == true){
                window.robot_parts[window.actualAxis].children[posPivot].rotation.z-=0.01;
            }

            window.actual_move_robot = {
                axis: window.actualAxis,
                axisIndex: window.actualAxisIndex,
                y: window.robot_parts[window.actualAxis].children[posPivot].rotation.y,
                z: window.robot_parts[window.actualAxis].children[posPivot].rotation.z
            }
        }
        if(Date.now() - window.lastMovement > 100){
            window.rotate_y_left = false;
            window.rotate_y_right = false;
            window.rotate_z_right = false;
            window.rotate_z_left = false;
            window.finalGestureName = "idle"
            //document.querySelector("#result").textContent = window.finalGestureName
        }

        

        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        controls.update();

        // if(window.boxHelper){
        //     window.boxHelper.update();
        // }
    };
 
}());

function print_model_information(){
    var controls = document.getElementById("controls");
    // panel.innerHTML="Works!!";
    controls.innerHTML="";
    var componentsArray = [];
    componentsArray = recursive_robot_print(window.robot, componentsArray);
    window.robot_parts = componentsArray;
    //console.log(componentsArray);
}

function recursive_robot_print(object_group, componentsArray){
    object_group.children.forEach(function (item){
        var temp_componentsArray = [];

        if(item.type=="Group" && !item.name.includes("ur10")){
            componentsArray[item.name] = item;
            temp_componentsArray = recursive_robot_print(item, componentsArray);
        }
        componentsArray = Object.assign({},componentsArray, temp_componentsArray);
    });
    return componentsArray;
}

function setPivots(){
    //set pivot2
    var pivot = new THREE.Object3D();
    pivot.name = "pivot2"
    pivot.position.set(0,5,0);
    window.robot_parts["ArmBase2"].add(pivot)
    window.robot_parts["SubArm2"].position.set(0,-5,0)
    pivot.add(window.robot_parts["SubArm2"])

    //set pivot3
    var pivot2 = new THREE.Object3D();
    pivot2.name = "pivot2"
    pivot2.position.set(0,29.2,0);
    window.robot_parts["ArmBase3"].add(pivot2)
    window.robot_parts["SubArm3"].position.set(0,-29.2,0)
    pivot2.add(window.robot_parts["SubArm3"])

    //set pivot4
    var pivot3 = new THREE.Object3D();
    pivot3.name = "pivot3"
    pivot3.position.set(0,51.7,0);
    window.robot_parts["ArmBase4"].add(pivot3)
    window.robot_parts["SubArm4"].position.set(0,-51.7,0)
    pivot3.add(window.robot_parts["SubArm4"])

    //set pivot5
    var pivot4 = new THREE.Object3D();
    pivot4.name = "pivot4"
    pivot4.position.set(0,51.7,-6.5);
    window.robot_parts["ArmBase5"].add(pivot4)
    window.robot_parts["SubArm5"].position.set(0,-51.7,6.5)
    pivot4.add(window.robot_parts["SubArm5"])
}

function createControls() {
    var gui = new dat.GUI();
    
    let armBaseFolder = gui.addFolder("ArmBase");
    armBaseFolder.add(window.robot_parts["ArmBase2"].rotation, "y", -Math.PI, Math.PI).onChange((e) => {
        window.robot_parts["ArmBase2"].rotation.y = e;
    });

    for (let i = 2; i <= 5; i++) {
        let pivotFolder = gui.addFolder("pivot"+i);
        let childrens = window.robot_parts["ArmBase"+i].children
        let pivotPos = childrens.length -1;
        if(i!=5)
        pivotFolder.add(window.robot_parts["ArmBase"+i].children[pivotPos].rotation, "z", -Math.PI, Math.PI).onChange((e) => {
            window.robot_parts["ArmBase"+i].children[pivotPos].rotation.z = e;
        });
        else
        pivotFolder.add(window.robot_parts["ArmBase"+i].children[pivotPos].rotation, "y", -Math.PI, Math.PI).onChange((e) => {
            window.robot_parts["ArmBase"+i].children[pivotPos].rotation.y = e;
        });

    }
    return gui;
}