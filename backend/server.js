const express = require("express"); //import
const path = require("path");
const fs = require("fs");
const app = express();
const fileUpload = require('express-fileupload')
const port = 9000

app.use(fileUpload());

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.use("/public", express.static(`${__dirname}/../frontend/public`))

app.get("/data", (req, res) => {
  res.sendFile(path.join(`${__dirname}/data/data.json`))
})

app.get("/data/:id", (req, res) => {
  //console.log(req.params)
  try {
    const searchId = parseInt(req.params.id);
    //console.log(searchId)
    if (isNaN(searchId)) {
      res.status(418).send("not a number");
    } else {
      fs.readFile(`${__dirname}data/data.json`, (err, data) => {
        if (err) {
          console.log(err)
          req.send(err)
        } else {
          let result = null;
          const fileData = JSON.parse(data);
          //console.log(fileData)
          for (let i = 0; i < fileData.length; i++) {
            const element = fileData[i];
            if (element.id === searchId) {
              console.log(element)
              result = element
            }
          }
          if (result === null) {
            res.status(404).send("User not found ")
          } else {
            res.send(result);
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send("we have a problem!");
  }
})

app.post('/upload', (req, res) => {
  let uploadedFile;
  let savePath;
  let imageName;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  uploadedFile = req.files.image;
  imageName = req.body.name;
  savePath = `${__dirname}/../frontend/public/${imageName}.jpg`;

  // Use the mv() method to place the file somewhere on your server
  uploadedFile.mv(savePath, (err) => {
    if (err)
      return res.status(500).send(err);

    res.json(imageName); //imageName= pelda
  });
});


app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});

//Users/chrs/Documents/codecool/practices/w10