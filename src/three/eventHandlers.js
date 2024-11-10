import * as THREE from 'three';

/**
 * Gère le mouvement de la souris sur le canevas.
 *
 * @param {MouseEvent} event - L'événement de la souris contenant les coordonnées de la souris.
 * @param {THREE.Scene} scene - La scène Three.js où les objets sont présents.
 * @param {THREE.Camera} camera - La caméra de la scène.
 * @param {THREE.Raycaster} raycaster - Le raycaster utilisé pour les intersections.
 * @param {Object} state - L'état de la scène.
 * @param {HTMLCanvasElement} canvasElement - L'élément canvas où l'événement a eu lieu.
 */
export const onMouseMove = (event, scene, interactableObjects, camera, raycaster, state, canvasElement) => 
  {
  if(!state.isLoading && !state.panelIsOpen){

  const mouseVector = getNormalizedMousePosition(event, canvasElement);
  raycaster.setFromCamera(mouseVector, camera);
  const intersects = raycaster.intersectObjects(Array.from(interactableObjects));

  if (intersects.length > 0) {
    const hoveredObject = intersects[0].object.parent;
    handleHover(hoveredObject, intersects[0].object, state);
  } else {
    resetScaledObjects(scene);
  }

  }
};

/**
 * Gère le clic sur le canevas.
 *
 * @param {MouseEvent} event - L'événement de clic de la souris.
 * @param {THREE.Scene} scene - La scène Three.js où les objets sont présents.
 * @param {THREE.Camera} camera - La caméra de la scène.
 * @param {THREE.Raycaster} raycaster - Le raycaster utilisé pour les intersections.
 * @param {Object} state - L'état de la scène.
 */
export const onCanvasClick = (event, scene, camera, raycaster, state) => 
  {
    if(!state.isLoading && !state.panelIsOpen){
  
    const mouse = getNormalizedMousePosition(event, event.target);
    const rayOrigin = new THREE.Vector3();
    camera.getWorldPosition(rayOrigin);
  
    const rayDirection = new THREE.Vector3(mouse.x, mouse.y, 0.5)
      .unproject(camera)
      .sub(rayOrigin)
      .normalize();
    raycaster.set(rayOrigin, rayDirection);
  
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      handleClick(clickedObject, scene, state);
    }
  }
  };

/**
 * Gère les interactions de survol avec les objets.
 *
 * @param {Object} hoveredObject - L'objet qui est survolé.
 * @param {Object} intersectedObject - L'objet qui a été intersecté par le raycaster.
 * @param {Object} state - L'état de la scène.
 */
const handleHover = (hoveredObject, intersectedObject, state) => {
  if (hoveredObject.isLetter) {
    rotateLetter(hoveredObject, state);
  } else if (/lampe|guitare|cadre|livre/i.test(intersectedObject.name)) {
    scaleHoveredObject(hoveredObject);
  }
};

/**
 * Fait tourner une lettre lorsqu'elle est survolée.
 *
 * @param {Object} hoveredObject - L'objet représentant la lettre survolée.
 * @param {Object} state - L'état de la scène.
 */
const rotateLetter = (hoveredObject, state) => {
  if (hoveredObject.rotationTime === 0) {
    hoveredObject.rotationTime = state.time + Math.random() * 0.3 + 0.6;
  }
};

/**
 * Redimensionne l'objet survolé.
 *
 * @param {Object} hoveredObject - L'objet qui est survolé et qui doit être redimensionné.
 */
const scaleHoveredObject = (hoveredObject) => {
  if (!hoveredObject.parent.isHovered) {
    const pivot = hoveredObject.parent.parent;
    hoveredObject.parent.isHovered = true;
    pivot.scale.set(1.13, 1.13, 1.13);
    pivot.position.y *= 1.1; 
  }
};

/**
 * Réinitialise la taille des objets qui ne sont plus survolés.
 *
 * @param {THREE.Scene} scene - La scène où les objets sont présents.
 */
const resetScaledObjects = (scene) => {
  scene.children.forEach((pivot) => {
    if (pivot && pivot.children[0]) {
      const model = pivot.children[0];
      if (model.isHovered) {
        model.isHovered = false;
        pivot.scale.set(1, 1, 1);
        pivot.position.y /= 1.1; 
      }
    }
  });
};


/**
 * Gère le clic sur un objet.
 *
 * @param {Object} clickedObject - L'objet cliqué par l'utilisateur.
 * @param {THREE.Scene} scene - La scène où les objets sont présents.
 * @param {Object} state - L'état de la scène.
 */
const handleClick = (clickedObject, scene, state) => {
  if (/lampe/i.test(clickedObject.name)) {
    switchOffTheLight(clickedObject, state);
    toggleTheme(scene, state);
    state.lightIsOn = !state.lightIsOn;
  }
  else if (/guitare|livre|cadre/i.test(clickedObject.name)) {
    console.log("panelIsOpen is open");
    state.panelIsOpen = true;
  }
};

/**
 * Calcule la position normalisée de la souris par rapport à un élément canvas.
 *
 * @param {MouseEvent} event - L'événement de la souris contenant les coordonnées de la souris.
 * @param {HTMLCanvasElement} canvasElement - L'élément canvas dont les dimensions sont utilisées pour normaliser la position.
 * @returns {{ x: number, y: number }} - Les coordonnées normalisées de la souris, où x et y varient de -1 à 1.
 *
 * @example
 * const mousePos = getNormalizedMousePosition(event, canvas);
 */
const getNormalizedMousePosition = (event, canvasElement) => {
  const canvasBounds = canvasElement.getBoundingClientRect();
  return {
    x: ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1,
    y: -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1
  };
};

/**
 * Change le thème d'éclairage de la scène.
 *
 * @param {THREE.Scene} scene - La scène Three.js dont le thème doit être modifié.
 * @param {Object} state - L'état de la lumière.
 * @param {boolean} state.lightIsOn - Indique si la lumière est allumée (true) ou éteinte (false).
 *
 * @example
 * toggleTheme(scene, { lightIsOn: true });
 */
const toggleTheme = (scene, state) => {
  // console.log("Thème changé");
  scene.children.forEach((child) => {
    if (child instanceof THREE.PointLight) {
      updateLight(child, state.lightIsOn, 0.1, 2, 0xc1d5f7, 0xf7e3c1);
    } else if (child instanceof THREE.AmbientLight) {
      updateLight(child, state.lightIsOn, 0.1, 1.3, 0xc1d5f7, 0xffffff);
    }
  });
  scene.background = new THREE.Color(state.lightIsOn ? 0x4e5257 : 0xfafafa);
};

/**
 * Met à jour l'intensité et la couleur d'une source de lumière.
 *
 * @param {THREE.Light} light - La source de lumière à mettre à jour.
 * @param {boolean} isLightOn - Indique si la lumière doit être allumée (true) ou éteinte (false).
 * @param {number} lowIntensity - Intensité lorsque la lumière est éteinte.
 * @param {number} highIntensity - Intensité lorsque la lumière est allumée.
 * @param {THREE.Color} lowColor - Couleur lorsque la lumière est éteinte.
 * @param {THREE.Color} highColor - Couleur lorsque la lumière est allumée.
 */
const updateLight = (light, isLightOn, lowIntensity, highIntensity, lowColor, highColor) => {
  light.intensity = isLightOn ? lowIntensity : highIntensity;
  light.color = new THREE.Color(isLightOn ? lowColor : highColor);
};

/**
 * Allume ou éteint l'ampoule de la lampe.
 *
 * @param {Object} clickedObject - L'objet cliqué, représentant une lampe.
 * @param {Object} state - L'état de la lumière.
 * @param {boolean} state.lightIsOn - Indique si la lumière est allumée (true) ou éteinte (false).
 *
 * @example
 * switchOffTheLight(clickedLamp, { lightIsOn: true });
 */
const switchOffTheLight = (clickedObject, state) => {
  clickedObject.parent.children.forEach((child) => {
    if (/lampe_2/i.test(child.name)) {
      const ampouleMaterial = child.material;
      updateLightMaterial(ampouleMaterial, state.lightIsOn);
    }
  });
};

/**
 * Met à jour le matériau d'une ampoule.
 *
 * @param {THREE.Material} material - Le matériau de l'ampoule à mettre à jour.
 * @param {boolean} isLightOn - Indique si la lumière est allumée (true) ou éteinte (false).
 */
const updateLightMaterial = (material, isLightOn) => {
  if (isLightOn) {
    material.emissive.setRGB(0.1, 0.05, 0);
    material.emissiveIntensity = 1;
  } else {
    material.emissive.setRGB(1, 0.573, 0);
    material.emissiveIntensity = 17;
  }
};



// Fonction utilitaire de throttling
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
