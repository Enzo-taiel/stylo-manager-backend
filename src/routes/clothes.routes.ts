import { Router } from 'express'
// CONTROLLERS
import {
  GetShirtController,
  GetJacketController,
  GetPantController,
 GetSweatshirtController
} from '../controllers/clothes'

const routerClothes = Router()

routerClothes.get('/shirt', GetShirtController) // REMERAS 
routerClothes.get('/sweatshirt', GetSweatshirtController)  // BUZO
routerClothes.get('/jacket', GetJacketController) // CAMPERAS
routerClothes.get('/pant', GetPantController) // PANTALONES

export default routerClothes