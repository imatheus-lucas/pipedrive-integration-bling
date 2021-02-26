import axios from 'axios'

const pipedrive = axios.create({
  baseURL:`https://${process.env.PIPEDRIVE_DOMAIN}.pipedrive.com/api/v1`
})

const bling = axios.create({
  baseURL:`https://bling.com.br/Api/v2`
})

export { pipedrive, bling }
