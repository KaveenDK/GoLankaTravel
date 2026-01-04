import axios from 'axios'
import AppError from '../utils/appError'

const GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api'

/**
 * Get Coordinates for an Address (Geocoding)
 * @param address - "Kandy, Sri Lanka"
 */
export const getGeocodeService = async (address: string) => {
  try {
    const response = await axios.get(`${GOOGLE_MAPS_BASE_URL}/geocode/json`, {
      params: {
        address,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    })

    if (response.data.status !== 'OK') {
      throw new Error(response.data.error_message || 'Failed to fetch coordinates')
    }

    // Extract relevant data
    const location = response.data.results[0].geometry.location
    const formattedAddress = response.data.results[0].formatted_address

    return {
      lat: location.lat,
      lng: location.lng,
      formattedAddress
    }

  } catch (error: any) {
    console.error('Maps Service Error (Geocode):', error.message)
    throw new AppError('Could not fetch location data', 502)
  }
}

/**
 * Get Nearby Places (Hotels, Attractions, Restaurants)
 * @param lat - Latitude
 * @param lng - Longitude
 * @param radius - Search radius in meters (default 1500)
 * @param type - 'tourist_attraction', 'lodging' (hotel), 'restaurant'
 */
export const getNearbyPlacesService = async (
  lat: number, 
  lng: number, 
  radius: number = 2000, 
  type: string = 'tourist_attraction'
) => {
  try {
    const response = await axios.get(`${GOOGLE_MAPS_BASE_URL}/place/nearbysearch/json`, {
      params: {
        location: `${lat},${lng}`,
        radius,
        type,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    })

    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
      throw new Error(response.data.error_message || 'Failed to fetch nearby places')
    }

    // Map the results to a cleaner format
    const places = response.data.results.map((place: any) => ({
      name: place.name,
      rating: place.rating,
      address: place.vicinity,
      location: place.geometry.location,
      placeId: place.place_id,
      photoReference: place.photos ? place.photos[0].photo_reference : null,
      isOpen: place.opening_hours ? place.opening_hours.open_now : null
    }))

    return places

  } catch (error: any) {
    console.error('Maps Service Error (Nearby):', error.message)
    throw new AppError('Could not fetch nearby places', 502)
  }
}