import Joi from 'joi'

// Auth Validation Schemas

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Username is required',
    'string.min': 'Username must be at least 3 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
  }),
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
})

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
})

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
})


// Trip Validation Schemas


export const createTripSchema = Joi.object({
  name: Joi.string().required(),
  destination: Joi.string().required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  duration: Joi.number().integer().min(1).required(),
  category: Joi.string().required(),
  image: Joi.string().uri().optional(),
  
  // Validate the complex Itinerary Array structure
  itinerary: Joi.array().items(
    Joi.object({
      day: Joi.number().required(),
      theme: Joi.string().optional().allow(''),
      activities: Joi.array().items(
        Joi.object({
          time: Joi.string().optional().allow(''),
          activity: Joi.string().required(),
          description: Joi.string().optional().allow(''),
          location: Joi.string().optional().allow('')
        })
      ).optional()
    })
  ).optional()
})


// AI Planner Validation Schemas


export const aiGenerateSchema = Joi.object({
  destination: Joi.string().required(),
  days: Joi.number().integer().min(1).max(14).required(),
  budget: Joi.string().valid('Budget', 'Moderate', 'Luxury').required(),
  interests: Joi.array().items(Joi.string()).min(1).required()
})