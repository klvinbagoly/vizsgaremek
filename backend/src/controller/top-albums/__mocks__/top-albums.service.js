const topAlbumsService = jest.createMockFromModule('../top-albums.service')

topAlbumsService.__setMockData = (data) => topAlbumsService.mockData = data

topAlbumsService.findTopAlbumsByArtist = jest.fn((artist) => {
  return Promise.resolve(
    topAlbumsService.mockData.find(topAlbums => topAlbums['@attr'].artist === artist)
  )
})

topAlbumsService.updateOneAlbum = jest.fn((id, albumid, data) => {
  const index = topAlbumsService.mockData.findIndex(albums => albums._id === id)
  const albumIndex = topAlbumsService.mockData[index].album.findIndex(album => album._id === albumid)
  topAlbumsService.mockData[index].album[albumIndex] = data
  return Promise.resolve(topAlbumsService.mockData[index])
})

topAlbumsService.addOneAlbum = jest.fn((id, data) => {
  const index = topAlbumsService.mockData.findIndex(albums => albums._id === id)
  topAlbumsService.mockData[index].album.push(data)
  return Promise.resolve(topAlbumsService.mockData[index])
})

topAlbumsService.deleteOneAlbum = jest.fn((id, albumid) => {
  const index = topAlbumsService.mockData.findIndex(albums => albums._id === id)
  const albumIndex = topAlbumsService.mockData[index].album.findIndex(album => album._id === albumid)
  topAlbumsService.mockData[index].album.splice(albumIndex, 1)
  return Promise.resolve(topAlbumsService.mockData[index])
})