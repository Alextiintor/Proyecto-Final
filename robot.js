import 'regenerator-runtime/runtime'

import * as THREE from 'three'

import { OrbitControls, MapControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import * as dat from 'dat.gui'

// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/GLTFLoader.js'; 
// import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/RGBELoader.js'; 
// import { RoughnessMipmapper } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/utils/RoughnessMipmapper.js'; 
//window.three = THREE;
window.robot_parts = [];
window.camera = null;
window.dae_obj = null;
window.boxHelper  = null;
window.robot = null;
window.rotate_y_left = false;
window.rotate_y_right = false;
window.rotate_z_left = false;
window.rotate_z_right = false;

window.last_robot_move = {
    axis: "ArmBase2",
    axisIndex: 0,
    y: 0,
    z: 0
}

window.actual_robot_move = {
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

    window.rotate_y = false; 
    window.rotate_x = false;

    // point light
    var pl = new THREE.PointLight(0xffffff);
    pl.position.set(30, 60, 40);
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( pl, sphereSize, 0x000000 );

    var pr = new THREE.PointLight(0xffffff,0.5);
    pr.position.set(-10, 60, -30);
    const pointLightHelperLeft = new THREE.PointLightHelper( pr, sphereSize, 0x000000 );

    scene.add(pl);
    scene.add(pr);
    // scene.add(pointLightHelper);
    // scene.add(pointLightHelperLeft);


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
    // var renderer = new THREE.WebGLRenderer();W
    renderer.setSize(window.innerWidth/3.5, window.innerHeight/3);
    document.getElementById('robot').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    
    // controls
    var controls = new MapControls(camera, renderer.domElement);
    controls.target.set(look_x, look_y, look_z);
    controls.update();
 
    // app loop

    // CREATE A COLLADALOADER INSTANCE
    var loader = new ColladaLoader();
    // CALL THE LOAD METHOD, PASS THE ABSOLUTE OR RELATIVE PATH
    // TO THE *.DAE FILE AS THE FIRST ARGUMENT, AND A DONE CALLBACK
    // AS THE SECOND ARGUMENT
    loader.load("./ur10_2.dae", function (result) {
        // adding the child that I want to the scene
        scene.add(result.scene);
        window.robot = result.scene;
        window.robot.position.x= 0;
        window.robot.position.z= 0;
        window.dae_obj = result;
        window.dae_obj.library.visualScenes.ID2.build.quaternion.x=0;


        print_model_information();
        
        /**
         * Crea los ejes que rotaran, arreglando asi el fallo de rotacion sobre el centro de la escena
         */
        //set pivot2
        createPivot("2",5,0)
        
        //set pivot3
        createPivot("3",29.2,0)

        //set pivot4
        createPivot("4",51.7,0)

        //set pivot5
        createPivot("5",51.7,6.5)


        //Create Controls
        // var gui = createControls();

        // start the app loop
        loop();
    });
    var loop = function () {
        let posPivot = 0;
        // camera.lookAt(look_x, look_y, look_z);

        //Comprueba el eje del robot, en el if comprueba si es la base sino son el resto de ejes
        if (window.actualAxisIndex==0) {
            /**
             * Comprueba si hay alguna variable en T/F, 
             * Mientras este en true el robot girara sumandole 0.01 a la posicion de la rotacion actual
             * en este caso y
             */
            if(window.rotate_y_left == true){
                window.robot_parts[window.actualAxis].rotation.y+=0.01;
            }
            if(window.rotate_y_right == true){
                window.robot_parts[window.actualAxis].rotation.y-=0.01;
            }
            
            window.actual_robot_move = {
                axis: window.actualAxis,
                axisIndex: window.actualAxisIndex,
                y: window.robot_parts[window.actualAxis].rotation.y,
                z: window.robot_parts[window.actualAxis].rotation.z
            }

        } else {
            /**
             * posPivot busca el pivot dentro del eje actual,
             * children es un array de objetos entre los cuales, esta el pivot en la ultima posicion siempre
             */
            posPivot = window.robot_parts[window.actualAxis].children.length -1;

            /**
             * Comprueba si hay alguna variable en T/F, 
             * Mientras este en true el robot girara sumandole 0.01 a la posicion de la rotacion actual
             * en este caso Y para el ultimo eje (4) y Z para el resto de ejes
             */
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

            window.actual_robot_move = {
                axis: window.actualAxis,
                axisIndex: window.actualAxisIndex,
                y: window.robot_parts[window.actualAxis].children[posPivot].rotation.y,
                z: window.robot_parts[window.actualAxis].children[posPivot].rotation.z
            }
        }

        /**
         * Si la diferencia (en milisegundos)
         * de la fecha actual y el ultimo movimiento supera los 100 milisegundos,
         * detiene cualquier movimiento en cualquier direccion y cualquier gesto
         */
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

function createPivot(number,y,z){
    //crear pivot y agregarle un nombre
    var pivot = new THREE.Object3D();
    pivot.name = "pivot"+number

    //situar el pivot para que rote en la altura que debe
    pivot.position.set(0,y,-z);

    //Agregar a la base del brazo el pivot
    window.robot_parts["ArmBase"+number].add(pivot)

    //restar la altura del pivot al brazo que rotara
    window.robot_parts["SubArm"+number].position.set(0,-y,z)

    //agregar al pivot el brazo que rotara
    pivot.add(window.robot_parts["SubArm"+number])
}

/**
 * Crear los controles para entorno de pruebas, no afecta en nada si no se llama
 */
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