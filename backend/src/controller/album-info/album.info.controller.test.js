const { mockRequest, mockResponse } = require('jest-mock-req-res')

const albumInfoService = require('./album-info.service')
const albumInfoController = require('./album.info.controller')
const jestConfig = require('../../../jest.config')

jest.mock('./album-info.service')

describe('albumInfoController methods', () => {
  const nextFunction = jest.fn()
  let response

  beforeEach(() => {
    const mockData = [
      {
        _id: '1',
        name: 'Animals',
        artist: 'Pink Floyd',
        tracks: {
          track: [
            {
              _id: '1a',
              name: 'Pigs On The Wing, Part 1'
            }
          ]
        }
      },
      {
        _id: '2',
        name: 'Wish You Were Here',
        artist: 'Pink Floyd',
        tracks: {
          track: [
            {
              _id: '2a',
              name: 'Shine On You Crazy Diamond, Part 1'
            }
          ]
        }
      },

    ]
    albumInfoService.__setMockData(mockData)
    response = mockResponse()
  })

  test('add one track', () => {
    const ID = '1'
    const NEW_TRACK = {
      name: 'Dogs'
    }
    const request = mockRequest({
      params: {
        id: ID
      },
      body: NEW_TRACK
    })
    return albumInfoController.addTrack(request, response, nextFunction)
      .then(() => {
        expect(albumInfoService.addTrack).toHaveBeenCalledWith(ID, NEW_TRACK)
        const album = albumInfoService.mockData.find(album => album._id === ID)
        expect(album.tracks.track.length).toBe(2)
        expect(album.tracks.track[1]).toEqual(NEW_TRACK)
        expect(response.json).toHaveBeenCalledWith(album)
      })
  })

  test('update one track', () => {
    const ID = '1'
    const UPDATED_TRACK = {
      name: 'Dogs',
      _id: '1a'
    }
    const request = mockRequest({
      params: {
        id: ID
      },
      body: UPDATED_TRACK
    })
    return albumInfoController.updateTrack(request, response, nextFunction)
      .then(() => {
        expect(albumInfoService.updateTrack).toHaveBeenCalledWith(ID, UPDATED_TRACK)
        const album = albumInfoService.mockData.find(album => album._id === ID)
        expect(album.tracks.track[0]).toEqual(UPDATED_TRACK)
        expect(response.json).toHaveBeenCalledWith(album)
      })
  })
})