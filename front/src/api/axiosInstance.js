import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

// import axios from 'axios'
// import { TOKEN } from '../utils/constants/general'
// import { getFromLocalStorage } from '../utils/helpers/localstorege/localStorege'

// const token = getFromLocalStorage(TOKEN)
// const headers = {
//    Authorization: `Bearer ${token}`,
// }

// export const axiosInstance = axios.create({
//    baseURL: 'http://3.65.208.103/',
// })

// axiosInstance.interceptors.request.use(
//    async (config) => {
//       // eslint-disable-next-line no-param-reassign
//       config.headers = headers
//       return config
//    },
//    (error) => {
//       Promise.reject(error)
//    }
// )
