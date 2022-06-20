// const baseService = jest.createMockFromModule('../service')

module.exports = (model) => ({
  mockData: [],
  __setMockData(data) {
    this.mockData = data
    console.log(this.mockData)
  },
  findAll: jest.fn(async function () {
    return this.mockData
  }),
  findOne: jest.fn(async function (_id) {
    return this.mockData.find(item => item._id === _id)
  }),
  findOneByName: jest.fn(async function (name) {
    return this.mockData.find(item => item.name === name)
  }),
  create: jest.fn(async function (data) {
    this.mockData.push(data)
    return data
  }),
  update: jest.fn(async function (id, data) {
    const index = this.mockData.findIndex(item => item._id === id)
    this.mockData[index] = data
    return data
  }),
  delete: jest.fn(async function (id) {
    const index = this.mockData.findIndex(item => item._id === id)
    return this.mockData.splice(index, 1)
  }),
  addTag: jest.fn(async function (id, tag) {
    const index = this.mockData.findIndex(item => item._id === id)
    this.mockData[index].tags.tag.push(tag)
    return this.mockData[index]
  })
})