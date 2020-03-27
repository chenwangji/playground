const express = require('express')
const fetch = require('node-fetch')
const redis = require('redis')

const PORT = process.argv.PORT || 5000
const REDIS_PROT = process.argv.REDIS_PORT || 6379

const client = redis.createClient(REDIS_PROT)

const app = express()

async function getRepos(req, res, next) {
    try {
        console.log('Fetching data ...')
        const { username } = req.params
        const response = await fetch(`https://api.github.com/users/${username}`)
        const data = await response.json()
        const repos = data.public_repos
        
        // set data to redis
        client.setex(username, 3600, repos)
        res.send(setResponse(username, repos))

        next()
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

function setResponse(username, repos) {
  return `<h2>${username} has ${repos} repos.</h2>`
}

// cache middleware
function cache(req, res, next) {
  const { username } = req.params
  client.get(username, (err, data) => {
    if (err) throw err
    if (data !== null) {
      res.send(setResponse(username, data))
    } else {
      next()
    }
  })
}
 
app.get('/repos/:username', cache, getRepos)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
