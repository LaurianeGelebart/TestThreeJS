import * as THREE from 'three';

/**
 * Crée et configure une caméra Perspective pour la scène.
 *
 * @param {number} width - La largeur de la fenêtre.
 * @param {number} height - La hauteur de la fenêtre.
 * @returns {THREE.PerspectiveCamera} La caméra Perspective créée.
 *
 * @example
 * const camera = createCamera(window.innerWidth, window.innerHeight);
 */
export const createCamera = (width, height) => 
{
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
  camera.position.set(0, 0, 1);
  camera.lookAt(0.1, -0.1, 0);
  return camera;
};

/**
 * Crée et configure le renderer WebGL, y compris la taille, le ratio de pixel, et la gestion des ombres.
 *
 * @param {number} width - La largeur de la fenêtre.
 * @param {number} height - La hauteur de la fenêtre.
 * @param {HTMLElement} container - L'élément DOM dans lequel le renderer sera ajouté.
 * @returns {THREE.WebGLRenderer} Le renderer WebGL configuré.
 *
 * @example
 * const renderer = createRenderer(window.innerWidth, window.innerHeight, document.body);
 */
export const createRenderer = (width, height, container) => 
{
  const renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);
  return renderer;
};

/**
 * Crée une nouvelle scène Three.js avec des lumières configurées et une couleur de fond.
 *
 * @returns {THREE.Scene} La scène Three.js créée.
 *
 * @example
 * const scene = createScene();
 */
export const createScene = () => 
{
  const scene = new THREE.Scene();

  const shadowPointLight = createShadowLight();
  scene.add(shadowPointLight);

  const pointLight = createPointLight();
  scene.add(pointLight);

  const ambientLight = createAmbientLight();
  scene.add(ambientLight);

  scene.background = new THREE.Color(0xfafafa);

  return scene;
};

/**
 * Crée une source lumineuse avec des ombres douces et la configure pour une meilleure gestion des ombres.
 *
 * @returns {THREE.PointLight} La lumière ponctuelle avec ombres.
 *
 * @example
 * const shadowLight = createShadowLight();
 */
const createShadowLight = () => 
{
  const pointLight = new THREE.PointLight(0xf7e3c1, 2);
  pointLight.position.set(1, 0.5, -0.3);

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 400;
  pointLight.shadow.mapSize.height = 400;
  pointLight.shadow.camera.near = 0.5;
  pointLight.shadow.camera.far = 100;
  pointLight.shadow.radius = 8;

  return pointLight;
};

/**
 * Crée une source lumineuse ponctuelle sans ombres.
 *
 * @returns {THREE.PointLight} La lumière ponctuelle.
 *
 * @example
 * const pointLight = createPointLight();
 */
const createPointLight = () => 
{
  const pointLight = new THREE.PointLight(0xf7e3c1, 2);
  pointLight.position.set(-0.6, 0.2, 0.8);

  return pointLight;
};

/**
 * Crée une lumière ambiante pour illuminer la scène uniformément.
 *
 * @returns {THREE.AmbientLight} La lumière ambiante.
 *
 * @example
 * const ambientLight = createAmbientLight();
 */
const createAmbientLight = () =>
{
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);

  return ambientLight;
};
