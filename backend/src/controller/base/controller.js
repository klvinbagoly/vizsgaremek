const baseService = require('./service')

module.exports = (model) => {
  const service = baseService(model)
  return {
    async findAll(req, res, next) {
      const data = await service.findAll()
      res.json(data)
    },
    async findOne(req, res, next) {
      const data = await service.findOne(req.params.id)
      res.json(data)
    }
  }
}