import express from 'express'
import { authenticate, authorize } from '../middleware/roleAuth.js'
import {
  getConsultants,
  createBooking,
  getMyBookings,
  updateBookingStatus,
} from '../controllers/booking.controller.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

router.get('/consultants', getConsultants)
router.post('/create', authorize('student'), createBooking)
router.get('/my-bookings', getMyBookings)
router.patch('/:bookingId/status', authorize('consultant', 'admin'), updateBookingStatus)

export default router
