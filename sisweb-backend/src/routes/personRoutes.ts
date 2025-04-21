import { Router } from 'express';
import {
  createPerson,
  deletePerson,
  getAllPerson,
  getPersonById,
  modifyPerson
} from '../controllers/personController';

const personRouter:Router = Router(); 

personRouter.get('/', getAllPerson);

personRouter.get('/:id', getPersonById);

personRouter.post('/', createPerson);

personRouter.patch('/:id', modifyPerson);

personRouter.delete('/:id', deletePerson);

export default personRouter;