const app = require('./app/app')
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>console.log(`we ar live on http://localhost:${PORT}`))