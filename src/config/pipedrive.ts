import axios from 'axios'
const pipedriveApi = axios.create({
  baseURL:`https://${process.env.PIPEDRIVE_DOMAIN}.pipedrive.com/api/v1`
})

export default pipedriveApi;