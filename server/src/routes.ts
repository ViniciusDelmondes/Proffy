import express from 'express'
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';



const routes = express.Router();
// Chamando todo o código que foi jogado para ClassesController para o post abaixo.
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

//index é usado para listar
routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index);

routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)
export default routes;