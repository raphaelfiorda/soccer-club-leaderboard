import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import 'express-async-errors';

const router = Router();

const matchController = new MatchController();

router.get('/', (req, res) => matchController.list(req, res));
// router.get('/:id', (req, res) => matchController.get(req, res));

export default router;
