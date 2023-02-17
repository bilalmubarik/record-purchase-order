import express, { Router } from 'express';
import vendorRoute from './vendor.route';

const router: Router = express.Router();

router.use('/vendor', vendorRoute);

export default router;