import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Threeasy from "threeasy";

const app = new Threeasy(THREE, { alpha: true });

const loader = new GLTFLoader();
const modelUrl = './black_credit_card/scene.gltf';

let model;

// Inside the loader callback function
// Inside the loader callback function
// Inside the loader callback function// Inside the loader callback function
loader.load(modelUrl, function (gltf) {
  model = gltf.scene;
  console.log(model);

  // Adjust scale to reduce the size of the model further
  model.scale.set(-0.01, -0.01, -0.01);

  // Set initial rotation
  model.rotation.set(1, 0.4, 0);

  app.scene.add(model);

  window.addEventListener('scroll', onScroll);

  function onScroll() {
      const scrollY = window.scrollY;
      const rotationSpeed = 0.001;
      model.rotation.x = scrollY * rotationSpeed;
      model.rotation.y = scrollY * rotationSpeed;
  }
  
  // Add click and mouseup event listeners to the renderer's DOM element
  app.renderer.domElement.addEventListener('click', onClick);
  app.renderer.domElement.addEventListener('mouseup', onMouseUp);

  function onClick(event) {
      // Stop propagation of click event to prevent it from affecting scroll
      event.stopPropagation();

      // Log to check if the click event is triggered
      console.log("Model clicked");

      // Add mouse move event listener
      window.addEventListener('mousemove', onMouseMove);
  }

  function onMouseMove(event) {
      // Calculate rotation angles based on mouse movement
      const rotationSpeed = 0.01;
      model.rotation.y += event.movementX * rotationSpeed;
      model.rotation.x += event.movementY * rotationSpeed;
  }

  function onMouseUp() {
      // Remove mouse move event listener
      window.removeEventListener('mousemove', onMouseMove);

      // Calculate new scroll position based on model rotation
      const rotationSpeed = 0.001;
      const newScrollY = model.rotation.x / rotationSpeed;
      
      // Animate scrolling to the new position
      scrollToPosition(newScrollY);
  }

  function scrollToPosition(scrollY) {
      window.scrollTo({
          top: scrollY,
          behavior: 'smooth' // Add smooth scrolling behavior
      });
  }
}, undefined, function (e) {
  console.error(e);
});




const light = new THREE.AmbientLight(0xffffff); // soft white light
light.intensity = 3;

app.scene.add(light);
