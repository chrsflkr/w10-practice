console.log('loaded')

const formComponent = () => `
  <form>
    <input type="text"  name="img name" placeholder="image name">
    <input type="file" name="file">
    <button>SEND</button>
  </form>
`
const rootElement = document.querySelector('#root')

rootElement.insertAdjacentHTML('beforeend', formComponent())

const formElement = document.querySelector('form')

formElement.addEventListener('submit', (event) => {
   event.preventDefault()
   console.log("Submit!")

   const formData = new FormData()
   formData.append('name', document.querySelector("input[type='text']").value) 
   formData.append('image', document.querySelector("input[type='file']").files[0])
   fetch('/upload', {
      method: 'POST',
      body: formData
   })
   .then(res => {
      if (res.status === 200) {
         console.log('success')
         return res.json() // return "pelda"
      } else {
         console.log('ERROR!!!')
      }
   })
   .then(resData => {   //resData= "pelda"
      rootElement.insertAdjacentHTML('beforeend', `<img class="uploadedImg" src="./public/${resData}.jpg">`)     
   })

   .catch(error => console.log(error))
})