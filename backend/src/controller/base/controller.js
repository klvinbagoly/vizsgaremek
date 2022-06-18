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
    },
    async findByName(req, res, next) {
      const data = await service.findByName(req.params.name)
      res.json(data)
    },
    async create(req, res, next) {
      try {
        const newData = await service.create(req.body)
        res.status(201)
        res.json(newData)
      } catch (err) {
        res.status(501)
        res.json({ hasError: true, error: err.message })
      }
    },
    async update(req, res, next) {
      try {
        const newData = await service.update(req.params.id, req.body)
        res.json(newData)
      } catch (err) {
        res.status(501)
        res.json({ hasError: true, error: err.message })
      }
    },
    async delete(req, res, next) {
      try {
        const response = await service.delete(req.params.id)
        res.json(response)
      } catch (err) {
        res.status(501)
        res.json({ hasError: true, error: err.message })
      }
    },
    async addTag(req, res, next) {
      try {
        const response = await service.addTag(req.params.id, req.body)
        res.json(response)
      } catch (err) {
        res.status(501)
        res.json({ hasError: true, error: err.message })
      }
    }
  }
}