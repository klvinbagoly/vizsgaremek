// const baseService = jest.createMockFromModule('../service')

const mockService = ({
  mockData: [],
  __setMockData(data) {
    mockService.mockData = data
    console.log(mockService.mockData)
  },
  findAll: jest.fn(async function () {
    return mockService.mockData
  }),
  findOne: jest.fn(async function (_id) {
    return mockService.mockData.find(item => item._id === _id)
  }),
  findByName: jest.fn(async function (name) {
    return mockService.mockData.find(item => item.name === name)
  }),
  create: jest.fn(async function (data) {
    mockService.mockData.push(data)
    return data
  }),
  update: jest.fn(async function (id, data) {
    const index = mockService.mockData.findIndex(item => item._id === id)
    mockService.mockData[index] = data
    return data
  }),
  delete: jest.fn(async function (id) {
    const index = mockService.mockData.findIndex(item => item._id === id)
    return mockService.mockData.splice(index, 1)
  }),
  addTag: jest.fn(async function (id, tag) {
    const index = mockService.mockData.findIndex(item => item._id === id)
    mockService.mockData[index].tags.tag.push(tag)
    return mockService.mockData[index]
  })
})

module.exports = () => mockService