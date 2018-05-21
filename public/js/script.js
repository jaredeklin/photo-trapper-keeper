

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

  $('.display-photos').append(`
      <article class="photo-card" data-id=${photoData.id}>
        <img class="image-output" src=${photoData.url}>
        <h5 class="title-output">${photoData.title}</h5>
        <button class="delete-btn">x</button>
      </article>
    `)
}

async function getPhotos() {
  $('.display-photos').empty()

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

async function deletePhoto() {
  const id = $(this).parent().data('id')

  const response = await fetch(`/api/v1/photos/${id}`, {
    method: 'DELETE'
  })

  // const deleteData = await response.json()

  // console.log(deleteData)

  $(this).parent().remove()
}