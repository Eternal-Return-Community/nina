import express, { Router } from 'express';
import Index from '@nina/router/public/index';
import Token from './admin/token';

const router = Router()

router.use('/', Index.home);
router.use('/admin', Token.create);

export default router;