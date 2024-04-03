import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Threeasy from "threeasy";

const app = new Threeasy(THREE, { alpha: true });
const loader = new GLTFLoader();
const modelUrl = './black_credit_card/plateUp.gltf';

let model;
let initialRotation;

loader.load(modelUrl, function (gltf) {

    model = gltf.scene;
    initialRotation = model.rotation.clone(); // Store initial rotation

    model.scale.set(0.6, 0.6, 0.6); // Adjust scale to reduce the size of the model further
    model.rotation.set(1, 0, 0.1); // Set initial rotation
    app.scene.add(model);

    updateModelRotation();

    function updateModelRotation() {
        const rotationSpeed = 0.0005;
        model.rotation.z += rotationSpeed;
        requestAnimationFrame(updateModelRotation);
    }

    window.addEventListener('scroll', onScroll);

    function onScroll() {
        const scrollY = window.scrollY;
        const rotationSpeed = 0.001;
        model.rotation.x = scrollY * rotationSpeed;
        model.rotation.y = scrollY * rotationSpeed;
    }

    // Dragging functionality
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    function onMouseMove(event) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        if (isDragging) {
            const deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    toRadians(deltaMove.y * 1),
                    toRadians(deltaMove.x * 1),
                    0,
                    'XYZ'
                ));

            model.quaternion.multiplyQuaternions(deltaRotationQuaternion, model.quaternion);
        }

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    function onMouseDown(event) {
        isDragging = true;
    }

    function onMouseUp(event) {
        isDragging = false;
    }

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);

},);

//lighting
const light = new THREE.AmbientLight(0xffffff); // soft white light
light.intensity = 1;

const pointLight = new THREE.PointLight(0xffffff, 1); // color, intensity
pointLight.position.set(0, 100, 500); // Set position
pointLight.castShadow = true; // Optionally, you can add shadows to the light

app.scene.add(pointLight); // Add the point light to the scene
app.scene.add(light);
