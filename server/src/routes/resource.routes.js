import express from 'express'
import { authenticate, authorize } from '../middleware/roleAuth.js'
import {
  getResources,
  searchYouTube,
  createResource,
  deleteResource,
  uploadFile,
} from '../controllers/resource.controller.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

// Get resources - all authenticated users
router.get('/', authenticate, getResources)
router.get('/youtube', authenticate, searchYouTube)

// Admin only routes
router.post('/upload', authenticate, authorize('admin'), upload.single('file'), uploadFile)
router.post('/create', authenticate, authorize('admin'), createResource)
router.delete('/:resourceId', authenticate, authorize('admin'), deleteResource)

export default router
