const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

const port = 8000

//Specify the directory to store the file for our operations
const Filedirectory = `${__dirname}/files`

//Home route
app.get('/', (req, res) => {
	res
		.status(200)
		.send('Use "/create" to create a new file and "/read" to read it')
})

//Route to Create a new file
app.get('/create', (req, res) => {
	const content = (+new Date()).toString()
	fs.appendFile(`${Filedirectory}/${+new Date()}.txt`, content, (err, data) => {
		if (err) console.log(err)
		res.status(201).send('File created successfully')
	})
})

//Read all the files from the directory
const filestoRead = fs.readdirSync(Filedirectory)
//Get the latest updated file
const latestFile = filestoRead.reverse()[0]

//Route to Read the contents of the file
app.get('/read', (req, res) =>
	fs.readFile(`${Filedirectory}/${latestFile}`, 'utf8', (err, data) => {
		if (err) res.status(500).send('An error occurred')
		else res.status(200).send(data)
	})
)

app.listen(port, () => {
	console.log('Listening on port ' + port)
})
