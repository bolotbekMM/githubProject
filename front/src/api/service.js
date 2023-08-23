import { axiosInstance } from './axiosInstance'

export const sendNewTestRequest = (newTest) => {
   return axiosInstance.post(`/api/admin/tests`, newTest)
}
export const getTestRequest = () => {
   return axiosInstance.get('/tests')
}
export const editQuestionRequest = (data) => {
   return axiosInstance.put(`api/put`, data)
}
export const deleteTestRequest = (id) => {
   return axiosInstance.delete(`/api/admin/tests/${id}`)
}
export const putQuestionActivationRequest = (isActivatedById) => {
   const { id, isActivee } = isActivatedById
   return axiosInstance.put(`/api/admin/tests/question/block/${id}`, isActivee)
}