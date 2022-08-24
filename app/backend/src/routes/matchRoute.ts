import { Router } from 'express';
import MatchController from '../controllers/MatchController';
// import LoginController from '../controllers/LoginController';
import 'express-async-errors';

const router = Router();

const matchController = new MatchController();
// const loginController = new LoginController();

router.get('/', (req, res) => matchController.list(req, res));
// router.use((req, res, next) => loginController.validateToken(req, res, next));
router.post('/', (req, res) => matchController.create(req, res));
// router.get('/:id', (req, res) => matchController.get(req, res));

export default router;
