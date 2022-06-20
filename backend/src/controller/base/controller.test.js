const { mockRequest, mockResponse } = require('jest-mock-req-res')
const httpErrors = require('http-errors')

const baseService = require('./service')()
// const baseServiceFactory = require('./service')
const baseController = require('./controller')()
const jestConfig = require('../../../jest.config')

jest.mock('./service')

// const baseService = baseServiceFactory()


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


})
