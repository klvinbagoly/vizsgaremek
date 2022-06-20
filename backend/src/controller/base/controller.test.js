const { mockRequest, mockResponse } = require('jest-mock-req-res')

const baseService = require('./service')()
const baseController = require('./controller')()
const jestConfig = require('../../../jest.config')

jest.mock('./service')

describe('base controller', () => {
  const nextFunction = jest.fn()
  let response

  beforeEach(() => {

    const mockData = [
      {
        _id: '1',
        name: 'Michael Jackson',
        tags: {
          tag: [
            { name: 'pop' }
          ]
        }
      },
      {
        _id: '2',
        name: 'Nirvana',
        tags: {
          tag: [
            { name: 'rock' }
          ]
        }
      },
    ]

    baseService.__setMockData(mockData)
    response = mockResponse()
  })

  test('findAll', () => {
    const request = mockRequest()

    return baseController.findAll(request, response, nextFunction)
      .then(() => {
        expect(baseService.findAll).toHaveBeenCalled()
        expect(response.json).toHaveBeenCalledWith(baseService.mockData)
      })
  })

  test('findOne', () => {
    const ID = '1'
    const request = mockRequest({
      params: {
        id: ID
      }
    })

    return baseController.findOne(request, response, nextFunction)
      .then(() => {
        expect(baseService.findOne).toHaveBeenCalledWith(ID)
        expect(response.json).toHaveBeenCalledWith(baseService.mockData.find(item => item._id === ID))
      })
  })

  test('findOneByName', () => {
    const NAME = 'Michael Jackson'
    const request = mockRequest({
      params: {
        name: NAME
      }
    })

    return baseController.findByName(request, response, nextFunction)
      .then(() => {
        expect(baseService.findByName).toHaveBeenCalledWith(NAME)
        expect(response.json).toHaveBeenCalledWith(baseService.mockData.find(item => item.name === NAME))
      })
  })

  test('create', () => {
    const newData = {
      _id: '3',
      name: 'Björk',
      tags: {
        tag: [
          { name: 'electronic' }
        ]
      }
    }
    const request = mockRequest({
      body: newData
    })

    return baseController.create(request, response, nextFunction)
      .then(() => {
        expect(baseService.create).toHaveBeenCalledWith(newData)
        expect(response.status).toHaveBeenCalledWith(201)
        expect(response.json).toHaveBeenCalledWith(newData)
        expect(baseService.mockData.length).toBe(3)
        expect(baseService.mockData[2]).toEqual(newData)
      })
  })

  test('update', () => {
    const UPDATE = {
      _id: '1',
      name: 'Björk',
      tags: {
        tag: [
          { name: 'electronic' }
        ]
      }
    }

    const request = mockRequest({
      params: {
        id: UPDATE._id
      },
      body: UPDATE
    })

    return baseController.update(request, response, nextFunction)
      .then(() => {
        expect(baseService.update).toHaveBeenCalledWith(UPDATE._id, UPDATE)
        expect(response.json).toHaveBeenCalledWith(UPDATE)
        expect(baseService.mockData.find(item => item._id === UPDATE._id)).toEqual(UPDATE)
      })
  })

  test('delete', () => {
    const ID = '1'
    const DELETED = baseService.mockData.find(item => item._id === ID)
    const request = mockRequest({
      params: {
        id: ID
      }
    })

    return baseController.delete(request, response, nextFunction)
      .then(() => {
        expect(baseService.delete).toHaveBeenCalledWith(ID)
        expect(response.json).toHaveBeenCalledWith(DELETED)
        expect(baseService.mockData.length).toBe(1)
      })
  })

  test('addTag', () => {
    const ID = '1'
    const TAG = { name: 'dance' }
    const request = mockRequest({
      params: {
        id: ID
      },
      body: TAG
    })
    return baseController.addTag(request, response, nextFunction)
      .then(() => {
        expect(baseService.addTag).toHaveBeenCalledWith(ID, TAG)
        expect(baseService.mockData.find(item => item._id === ID).tags.tag.length).toBe(2)
        expect(baseService.mockData.find(item => item._id === ID).tags.tag[1]).toEqual(TAG)
        expect(response.json).toHaveBeenCalledWith(baseService.mockData.find(item => item._id === ID))
      })
  })


})
