/*
 * @Author: iuukai
 * @Date: 2023-10-05 21:58:07
 * @LastEditors: iuukai
 * @LastEditTime: 2023-10-05 22:21:03
 * @FilePath: \node\day-crawler\server.js
 * @Description:
 * @QQ/微信: 790331286
 */
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const url = 'https://bing.xinac.net/' // 要爬取的图片网站

axios
	.get(url, { responseType: 'stream' })
	.then(response => {
		const links = []
		const regex = /<img[^>]+src="([^">]+)"/ // 图片链接正则表达式
		const html = response.data.toString()
		const result = html.match(regex)
		if (result) {
			for (let i = 0; i < result.length; i++) {
				const link = result[i].match(regex)[1]
				if (link.startsWith('http')) {
					links.push(link)
				}
			}
		}
		for (let i = 0; i < links.length; i++) {
			const link = links[i]
			axios({
				method: 'get',
				url: link,
				responseType: 'stream'
			})
				.then(response => {
					const filePath = path.resolve(__dirname, `${Date.now()}-${i}.jpg`)
					response.data.pipe(fs.createWriteStream(filePath))
					console.log(`Downloaded ${filePath}`)
				})
				.catch(error => {
					console.error(`Failed to download ${link}: ${error}`)
				})
		}
	})
	.catch(error => {
		console.error(`Failed to crawl ${url}: ${error}`)
	})
