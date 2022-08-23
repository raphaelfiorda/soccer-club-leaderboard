import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import 'express-async-errors';

const router = Router();

const teamController = new TeamController();

router.get('/', (req, res) => teamController.list(req, res));
router.get('/:id', (req, res) => teamController.get(req, res));

export default router;
