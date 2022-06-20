const { mockRequest, mockResponse } = require('jest-mock-req-res')

const topAlbumsService = require('./top-albums.service')
const topAlbumsController = require('./top-albums.controller')
const jestConfig = require('../../../jest.config')

jest.mock('./top-albums.service')

describe('top albums controller', () => {
  const nextFunction = jest.fn()
  let response

  beforeEach(() => {
    const mockData = [
      {
        _id: '1',
        '@attr': { artist: 'King Crimson' },
        album: [
          { _id: '2', name: 'In The Court Of The Crimson King' },
          { _id: '3', name: 'Red' },
        ]
      },
      {
        _id: '4',
        '@attr': { artist: 'Dream Theater' },
        album: [
          { _id: '5', name: 'Images And Words' },
          { _id: '6', name: 'Scenes From A Memory' },
        ]
      },
    ]

    topAlbumsService.__setMockData(mockData)
    response = mockResponse()
  })

  test('find top albums by artist', () => {
    const ARTIST = 'King Crimson'
    const request = mockRequest({
      params: {
        artist: ARTIST
      }
    })

    return topAlbumsController.findTopAlbumsByArtist(request, response, nextFunction)
      .then(() => {
        expect(topAlbumsService.findTopAlbumsByArtist).toHaveBeenCalledWith(ARTIST)
        expect(response.json).toHaveBeenCalledWith(topAlbumsService.mockData.find(albums => albums['@attr'].artist === ARTIST))
      })
  })

  test('update one album', () => {
    const ID = '1'
    const ALBUMID = '2'
    const UPDATE = { _id: ALBUMID, name: 'Lark\'s Tongues In Aspic' }
    const request = mockRequest({
      params: {
        id: ID
      },
      body: UPDATE
    })

    return topAlbumsController.updateOneAlbum(request, response, nextFunction)
      .then(() => {
        expect(topAlbumsService.updateOneAlbum).toHaveBeenCalledWith(ID, ALBUMID, UPDATE)
        const topAlbums = topAlbumsService.mockData.find(albums => albums._id === ID)
        expect(topAlbums.album.find(album => album._id === ALBUMID)).toEqual(UPDATE)
        expect(response.json).toHaveBeenCalledWith(topAlbums)
      })
  })

  test('add one album', () => {
    const ID = '1'
    const NEW_ALBUM = { name: 'Lark\'s Tongues In Aspic' }
    const request = mockRequest({
      params: {
        id: ID
      },
      body: NEW_ALBUM
    })

    return topAlbumsController.addOneAlbum(request, response, nextFunction)
      .then(() => {
        expect(topAlbumsService.addOneAlbum).toHaveBeenCalledWith(ID, NEW_ALBUM)
        const topAlbums = topAlbumsService.mockData.find(albums => albums._id === ID)
        expect(topAlbums.album.length).toBe(3)
        expect(topAlbums.album[2]).toEqual(NEW_ALBUM)
      })
  })

  test('delete one album', () => {
    const ID = '1'
    const ALBUMID = '3'
    const request = mockRequest({
      params: {
        id: ID,
        albumid: ALBUMID
      }
    })

    return topAlbumsController.deleteOneAlbum(request, response, nextFunction)
      .then(() => {
        expect(topAlbumsService.deleteOneAlbum).toHaveBeenCalledWith(ID, ALBUMID)
        const topAlbums = topAlbumsService.mockData.find(albums => albums._id === ID)
        expect(topAlbums.album.length).toBe(1)
        expect(response.json).toHaveBeenCalledWith(topAlbums)
      })
  })
})