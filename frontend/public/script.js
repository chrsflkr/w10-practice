

console.log("error")  

fetch(`http://127.0.0.1:9000/data`)
.then(response =>{
   console.log(response)
   if (response.status === 201) {
      console.log('OK')
   }
   return response.json()
   })
.then(responseJson => {
  const data = responseJson
  data.forEach(element => {
    console.log(element.name)
    document.querySelector('#root').insertAdjacentHTML('beforeend', `<h2>${element.name}</h2>`
)});
})



