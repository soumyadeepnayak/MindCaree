import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

// Import routes
import chatRoutes from './routes/chat.routes.js'
import bookingRoutes from './routes/booking.routes.js'
import resourceRoutes from './routes/resource.routes.js'
import communityRoutes from './routes/community.routes.js'
import adminRoutes from './routes/admin.routes.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Security middleware
app.use(helmet())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://mind-caree.vercel.app',
     process.env.CLIENT_URL?.replace(/\/$/, ''),
  ].filter(Boolean),
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.send('backend is running')
})

// API Routes
app.use('/api/chat', chatRoutes)
app.use('/api/booking', bookingRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/community', communityRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined 
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MindCare server running on port ${PORT}`)
  console.log(`📅 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/health`)
})

export default app;

