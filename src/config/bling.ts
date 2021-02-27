import axios from 'axios'

const blingApI = axios.create({
  baseURL:`https://bling.com.br/Api/v2`
})

export default blingApI;
