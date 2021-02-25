import mongoose from 'mongoose'

const connection = mongoose.connect(process.env.DB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

export default connection;