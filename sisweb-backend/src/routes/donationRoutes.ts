import { Router } from 'express';
import {
  createDonation,
  deleteDonation,
  getAllDonations,
  getDonationById,
  modifyDonation
} from '../controllers/donationController';

const donationRouter: Router = Router();

donationRouter.get('/', getAllDonations);

donationRouter.get('/:id', getDonationById);

donationRouter.post('/', createDonation);

donationRouter.patch('/:id', modifyDonation);

donationRouter.delete('/:id', deleteDonation);

export default donationRouter;