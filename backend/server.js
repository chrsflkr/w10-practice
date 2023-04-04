const express = require('express') //import
const path= require('path')
const fs = require("fs")
const app = express()
const port = 9000

// add point
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
})

app.get('/pic/exam.png', (req, res) => {
	res.sendFile(path.join(`${__dirname}/../frontend/pic/exam.png`))
 })



app.use('/public', express.static(`${__dirname}/../frontend/public`))

app.get('/data', (req, res) => {
  res.sendFile(path.join(`${__dirname}/data/data.json`))
})

app.get('/data/:id', (req, res) => {
  
  //console.log(req.params)
try{
  const searchId = parseInt(req.params.id)
  //console.log(searchId)

  if (isNaN(searchId)  ) {
    res.status(418).send("not a number")
  } else {
    // res.send("ok")
    fs.readFile(`data/data.json`, (error, data) => {
      let result= null
      const fileData = JSON.parse(data)
      //console.log(fileData)
      for (let i =0; i < fileData.length; i++) {
        const element= fileData[i]
        if (element.id === searchId) {        
          console.log(element) 
          result = element
        }
      } 
      if (result === null) {
        res.status(404).send("not found user")
      } else {
        res.send(result)
      }
    })
  }

  
}catch(error){
  console.log(error)
  res.send("we have a problem")
}

})




app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`)
})