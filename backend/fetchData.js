const axios = require('axios')
const fsp = require('fs').promises

const urls = [
  'https://ws.audioscrobbler.com/2.0/?method=library.getartists&api_key={your_api_key}&user=joanofarctan&format=json&limit=100',
  'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key={your_api_key}&format=json',
  'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key={your_api_key}&format=json&limit=10',
  'https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key={your_api_key}&format=json&limit=100',
  'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key={your_api_key}&artist=Cher&album=Believe&format=json',

]

axios.get(urls[3])
  .then(async res => {
    // console.log(`statusCode: ${res.status}`)
    // console.log(res.data.artists.artist)
    // await fsp.writeFile('../frontend/temp/artists.json', JSON.stringify(res.data.artists), { encoding: 'utf-8' })

    // await fsp.appendFile('../frontend/temp/artistInfo.json', '{"artist":[', { encoding: 'utf-8' })
    res.data.artists.artist.forEach((artist, index) => {
      axios.get(urls[1].replace('Cher', encodeURIComponent(artist.name)))
        .then(async (res) => {
          // console.log(res.data.artist.name)
          //   await fsp.appendFile(
          //     '../frontend/temp/artistInfo.json',
          //     JSON.stringify(res.data.artist) + ', ',
          //     { encoding: 'utf-8' })
        })

      axios.get(urls[2].replace('cher', encodeURIComponent(artist.name)))
        .then(async res => {
          // console.log(artist.name + ': ' + res.data.topalbums.album.length)
          // await fsp.appendFile(
          //   '../frontend/temp/albums',
          //   JSON.stringify(res.data.topalbums) + ', ',
          //   { encoding: 'utf-8' }
          // )

          res.data.topalbums.album.forEach(album => {
            axios.get(urls[4].replace('Cher', encodeURIComponent(artist.name)).replace('Believe', encodeURIComponent(album.name)))
              .then(async res => {
                // console.log(res.data.album.name, res.data.album.artist)
              })
          })
        })
    })
    // await fsp.appendFile('../frontend/temp/artistInfo.json', ']}', { encoding: 'utf-8' })
  })
  .catch(error => {
    console.error(error)
  })