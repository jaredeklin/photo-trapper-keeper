

$('.add-photo-btn').on('click', addPhoto)
$('.display-photos').on('click', '.delete-btn', deletePhoto)

getPhotos()

async function addPhoto(event) {
  event.preventDefault()

  const photo = {
    title: $('.title-input').val(),
    url: $('.url-input').val()
  }

  const response = await fetch('/api/v1/photos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(photo)
  })

  const photoData = await response.json();

  appendPhoto(photoData)
}

async function getPhotos() {
  $('.display-photos').empty()

  const response = await fetch('/api/v1/photos')
  const photos = await response.json()

  photos.forEach(photo => {
    appendPhoto(photo)
  })
}

async function deletePhoto() {
  const id = $(this).parent().data('id')

  await fetch(`/api/v1/photos/${id}`, {
    method: 'DELETE'
  })

  $(this).parent().remove()
}

function appendPhoto(photo) {
  $('.display-photos').append(`
      <article class="photo-card" data-id=${photo.id}>
        <img class="image-output" src=${photo.url}>
        <h5 class="title-output">${photo.title}</h5>
        <button class="delete-btn">x</button>
      </article>
    `)
}