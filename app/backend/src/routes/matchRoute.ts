import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import 'express-async-errors';

const router = Router();

const matchController = new MatchController();

router.get('/', (req, res) => matchController.list(req, res));
router.post('/', (req, res) => matchController.create(req, res));
router.patch('/:id', (req, res) => matchController.update(req, res));
router.patch('/:id/finish', (req, res) => matchController.finish(req, res));

export default router;
