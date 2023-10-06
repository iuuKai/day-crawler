const express = require('express')
const axios = require('axios')
const fs = require('fs')

const app = express()

app.get('/', async (req, res) => {
	try {
		const response = await axios(
			'https://cn.bing.com/HPImageArchive.aspx?format=js&mkt=zh-CN&idx=5&n=5'
		)
		const data = response.data

		// 将数据保存到文件
		fs.writeFileSync('/crawler/demo.json', JSON.stringify(data))

		res.send(data)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.listen(3000, () => {
	console.log('Crawler is running on port 3000')
})
