import 'dotenv/config'
import app from './src/app.js'
import connectDb from './src/db/db.js'

const port = process.env.PORT || 8000

connectDb().then(
    () => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    }
)
