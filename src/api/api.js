import axios from 'axios'

const onFulfilled = (config) => {
  const accessToken = window.localStorage.getItem('token')
	if (accessToken) {
		config.headers = {
			Authorization: `Bearer ${accessToken}`
		}
	}

	return config
}

const setupInterceptor = (instance) => {
  instance.interceptors.request.use(onFulfilled)
}

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});
setupInterceptor(instance)

const api = {
  login: (data) => instance.post('/user/login', data),
  signup: (data) => instance.post('/user/signup', data),
  hotels: () => instance.get('/hotel'),
  hotelById: (id) => instance.get(`/hotel/${id}`),
  createTransaction: (data) => instance.post('/transactions', data),
  validRoomByHotelId: (data, id) => instance.post(`/hotel/${id}/checkroom`, data),
  getTransactionUser:  () => instance.get('/transactions'),
  searchHotels: (data) => instance.post('/hotel/search', data)
}

export default api