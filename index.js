import express from 'express';
import {JWT} from 'google-auth-library';

const app = express()
app.use(express.json())
const PORT = 3001

app.post('/get-accesstoken', (req, res) => {

  const body = req.body
  const {email, key} = body

  new Promise(() => {
    const jwtClient= new JWT(
      email,
      null,
      key,
      ['https://www.googleapis.com/auth/cloud-platform'],
      null
    )

    jwtClient.authorize((err, tokens) => {
      if (err) {
        console.log(err)
        throw new Error(err.message)
      }

      res.status(200).json({
        message: 'accesstoken',
        data: tokens
      })
    })
  })

})

app.listen(PORT, (error) => {
  if (error) {
    throw new Error(error.message)
  }

  console.log(`Server stating at http://localhost:${PORT}`)
})