import app from './app'

app.listen(Number(process.env.PORT)  | 3333, () => console.log('server started 🔥'))