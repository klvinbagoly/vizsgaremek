const axios = require('axios');
const fsp = require('fs').promises

const urls = [
  'https://ws.audioscrobbler.com/2.0/?method=library.getartists&api_key={your_api_key}&user=joanofarctan&format=json&limit=100',
  'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key={your_api_key}&format=json',
  'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key={your_api_key}&format=json&limit=10',
  'https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key={your_api_key}&format=json&limit=100',
  'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key={your_api_key}&artist=Cher&album=Believe&format=json',
  'https://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=disco&api_key={your_api_key}&format=json'
];

(async () => {
  // const albums = await fsp.readFile('../frontend/temp/albums', 'utf-8')
  // const albumArray = JSON.parse(albums).albums.flatMap(albums => albums.album)
  // console.log(albumArray.length);
  // albumArray.forEach(album => {
  //   if (album.name === '(null)') return;
  //   axios.get(urls[4].replace('Cher', encodeURIComponent(album.artist.name)).replace('Believe', encodeURIComponent(album.name)))
  //     .then(async res => {
  //       // console.log(res.data.album.name, res.data.album.artist)
  //       await fsp.appendFile(
  //         '../frontend/temp/albumInfo',
  //         JSON.stringify(res.data.album) + ', ',
  //         { encoding: 'utf-8' }
  //       )
  //     })
  // })
  // const albums = await fsp.readFile('../frontend/temp/albumInfo', 'utf-8')
  // const albumArray = JSON.parse(albums).albums
  // console.log(albumArray.length)
  const artists = await fsp.readFile('../frontend/temp/artistInfo.json', 'utf-8')
  const artistArray = JSON.parse(artists).artist
  let tagArray = new Set();
  artistArray.forEach(artist => {
    // console.log(artist.tags.tag)
    artist.tags.tag.forEach(tag => tagArray.add(tag.name))
  })
  tagArray.forEach(tag => {
    axios.get(urls[5].replace('disco', encodeURIComponent(tag)))
      .then(async res => {
        // console.log(res.data.tag.name)
        // await fsp.appendFile(
        //   '../frontend/temp/tagInfo',
        //   JSON.stringify(res.data.tag) + ', ',
        //   { encoding: 'utf-8' }
        // )
      })
  })
  // const albums = await fsp.readFile('../frontend/temp/tagInfo', 'utf-8')
  // const albumArray = JSON.parse(albums).tags
  // console.log(albumArray.length)
})()