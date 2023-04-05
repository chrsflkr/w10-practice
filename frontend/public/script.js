console.log('loaded')

const formComponent = () => `
  <form>
    <input type="text" placeholder="Image name" name="name">
    <input type="file" name="file">
    <button>SEND</button>
  </form>
`
const rootElement = document.querySelector('#root')

rootElement.insertAdjacentHTML('beforeend', formComponent())

const formElement =document.querySelector('form')

formElement.addEventListener('submit', (event) => {
   event.preventDefault()
   console.log("Submit?")

   const formData = new FormData()
   formData.append('name', document.querySelector(`input[type='text']`).value) 
   formData.append('image', document.querySelector(`input[type='file']`).files[0])
   //formData.append('age', '33')

   fetch('/upload', {
      method: 'POST',
      body: formData
   })

   .then(res => {
      if (res.status === 200) {
         console.log('success')
         return res.json()
      } else {
         console.log('ERORR!!!')
      }
   })
   .then(resJson => {   //resData= "pelda"
      console.log(resData)
      rootElement.insertAdjacentHTML('beforeend'), `
      <img src="./public/${resData}.jpg"> `
   })

   .catch(error => console.log(error))
})

