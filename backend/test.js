const axios = require('axios')

const urls = [
  'https://ws.audioscrobbler.com/2.0/?method=library.getartists&api_key=ea05e61f97b09de9c5ef2e7a4d8366d6&user=joanofarctan&format=json&limit=100',
  'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=ea05e61f97b09de9c5ef2e7a4d8366d6&format=json',
  'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=ea05e61f97b09de9c5ef2e7a4d8366d6&format=json',
  'https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=ea05e61f97b09de9c5ef2e7a4d8366d6&format=json&limit=100',
  'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=ea05e61f97b09de9c5ef2e7a4d8366d6&artist=Cher&album=Believe&format=json',

]

axios.get(urls[2])
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    console.log(res.data.topalbums.album)
  })
  .catch(error => {
    console.error(error)
  })