

$('.add-photo-btn').on('click', addPhoto)
$('.delete-btn').on('click', deletePhoto)

getPhotos()

function addPhoto(event) {
  event.preventDefault()



  console.log("click")
}

async function getPhotos() {

  const response = await fetch('/api/v1/photos')
  const photos = await response.json()

  photos.forEach(photo => {
    const { title, url, id } = photo

    $('.display-photos').append(`
      <article class="photo-card" data-id=${id}>
        <img class="image-output" src=${url}>
        <h5 class="title-output">${title}</h5>
        <button class="delete-btn">x</button>
      </article>
    `)
  })
}

function deletePhoto() {
  
}