import express, { Router } from 'express';
import * as vendorController from '../../controllers/vendor.controller';

const router: Router = express.Router();

router
  .post('/', vendorController.createVendor)

export default router;