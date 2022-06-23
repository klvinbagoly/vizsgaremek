const albumInfoService = jest.createMockFromModule('../album-info.service')

albumInfoService.__setMockData = (data) => albumInfoService.mockData = data

albumInfoService.addTrack = jest.fn((id, track) => {
  const index = albumInfoService.mockData.findIndex(album => album._id === id)
  albumInfoService.mockData[index].tracks.track.push(track)
  return Promise.resolve(albumInfoService.mockData[index])
})

albumInfoService.updateTrack = jest.fn((id, track) => {
  const index = albumInfoService.mockData.findIndex(album => album._id === id)
  const trackIndex = albumInfoService.mockData[index].tracks.track.findIndex(_track => _track._id = track._id)
  albumInfoService.mockData[index].tracks.track[trackIndex] = track
  return Promise.resolve(albumInfoService.mockData[index])
})

module.exports = albumInfoService