export const animate = (scene, camera, renderer, state) => {
  let previousTime = 0; 

  const updateAnimation = (timestamp) => {
    requestAnimationFrame(updateAnimation); 

    const deltaTime = (timestamp - previousTime) / 1000; 
    previousTime = timestamp;

    state.time += deltaTime;

    console.log("Panel : " + state.panelIsOpen);
    console.log("Light : " + state.lightIsOn);

    scene.children.forEach(pivot => {
      if (pivot && pivot.children[0]) {
        const model = pivot.children[0];

        if (model.isLetter && model.rotationTime !== 0) {
          pivot.rotation.y += Math.PI *4 * deltaTime; 
          if (model.rotationTime < state.time) {
            model.rotationTime = 0;
          }
        }
      }
    });

    renderer.render(scene, camera);
  };

  requestAnimationFrame(updateAnimation);
};
