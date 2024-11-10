import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

/**
 * Charge un modèle GLTF à partir d'un chemin donné et l'ajoute à la scène.
 *
 * @param {string} path - Le chemin du fichier GLTF à charger.
 * @param {Array<number>} position - La position [x, y, z] où placer le modèle dans la scène.
 * @param {THREE.Scene} scene - La scène Three.js où le modèle sera ajouté.
 * @param {Set} interactableObjects - Ensemble des objets interactifs de la scène.
 * @param {boolean} isLetter - Indique si le modèle est une lettre (true) ou non (false).
 *
 * @example
 * loaderGLTF('models/lamp.glb', [0, 0, 0], scene, interactableObjects, false);
 */
export const loaderGLTF = (path, position, scene, interactableObjects, isLetter) => 
{
  const loader = new GLTFLoader();
  loader.load(
    path,
    (gltf) => {
      const model = gltf.scene;
      if (model) {
        setupModel(model, isLetter);
        setupPivot(model, position, scene, interactableObjects, isLetter);
      } else {
        console.error('Erreur de chargement du modèle');
      }
    },
    undefined,
    (error) => {
      console.error('Erreur de chargement du modèle : ' + error);
    }
  );
};

/**
 * Configure les propriétés du modèle chargé, compreanat la position, la rotation et les ombres.
 *
 * @param {THREE.Object3D} model - Le modèle 3D chargé.
 * @param {boolean} isLetter - Indique si le modèle est une lettre (true) ou non (false).
 *
 * @example
 * setupModel(model, true);
 */
const setupModel = (model, isLetter) => 
{
  const box = new THREE.Box3().setFromObject(model);
  box.getCenter(model.position);
  model.position.multiplyScalar(-1);
  model.isLetter = isLetter;
  model.rotationTime = 0;
  model.isHovered = 0;

  shadowsSetUp(model);

  if (!isLetter && model.name !== "etu") {
    model.rotation.y -= 0.15;
  }
};

/**
 * Crée un pivot pour le modèle, ajuste sa position, rotation, et l'ajoute à la scène.
 *
 * @param {THREE.Object3D} model - Le modèle 3D chargé.
 * @param {Array<number>} position - La position [x, y, z] du pivot dans la scène.
 * @param {THREE.Scene} scene - La scène Three.js où le pivot sera ajouté.
 * @param {Set} interactableObjects - Ensemble des objets interactifs de la scène.
 * @param {boolean} isLetter - Indique si le modèle est une lettre (true) ou non (false).
 *
 * @example
 * setupPivot(model, [0, 0, 0], scene, interactableObjects, false);
 */
const setupPivot = (model, position, scene, interactableObjects, isLetter) => 
{
  const pivot = new THREE.Object3D();
  pivot.position.set(...position);
  pivot.rotation.y = -Math.PI / 2;
  pivot.scale.set(1, 1, 1);
  pivot.add(model);

  scene.add(pivot);

  if (isLetter || /lampe|guitare|cadre|livre/i.test(model.name)) {
    interactableObjects.add(pivot);
  }
};

/**
 * Configure les ombres du modèle, permettant à certains objets de projeter ou recevoir des ombres.
 *
 * @param {THREE.Object3D} model - Le modèle 3D sur lequel configurer les ombres.
 *
 * @example
 * shadowsSetUp(model);
 */
const shadowsSetUp = (model) => 
{
  model.traverse((node) => {
    if (node.isMesh) {
      if (/sol/i.test(node.name)) {
        node.receiveShadow = true;
      } else if (!model.isLetter) {
        node.castShadow = true;
      }
    }
  });
};
