const express = require('express')
const fs = require('fs')
const app = express()

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/video', function(req, res) {
  // 确保有范围
  const range = req.headers.range
  console.log(range)
  if (!range) {
    res.status(400).send('Requires Range Header')
  }

  // 获取视频信息
  const videoPath = 'bigbuck.mp4'
  const videoSize = fs.statSync(videoPath).size

  // 格式化 Range
  // 如："bytes=32422-"
  const CHUNK_SIZE = 10 ** 6
  const start = Number(range.replace(/\D/g, ''))
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

  // 请求头
  const contentLength = end - start + 1
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4'
  }

  // HTTP 206 状态码，分片传输
  res.writeHead(206, headers)

  // 创建视频可读流
  const videoStream = fs.createReadStream(videoPath, { start, end })

  // 返回客户端
  videoStream.pipe(res)
})

app.listen(8000, () => {
  console.log('listening on port 8000!')
})