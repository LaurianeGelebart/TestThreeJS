import { loaderGLTF } from '@/three/loaders'; 
import { getModels } from '@/api/getData';

export const retrieveData = async (scene, interactableObjects) => 
{
  const models = await getModels();
  models.objects.forEach(obj => loaderGLTF(obj.path, obj.position, scene, interactableObjects, false));
  models.letters.forEach(letter => loaderGLTF(letter.path, letter.position, scene, interactableObjects, true));
}
