import express from 'express'
import { authenticate, authorize } from '../middleware/roleAuth.js'
import {
  getPosts,
  createPost,
  deletePost,
} from '../controllers/community.controller.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

router.get('/posts', getPosts)
router.post('/posts', createPost)
router.delete('/posts/:postId', deletePost) // User or admin can delete

export default router
