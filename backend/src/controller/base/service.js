
module.exports = (model) => ({
  findAll() {
    return model.find()
  },
  findOne(id) {
    return model.findById(id)
  },
  findByName(name) {
    return model.findOne({ name: name })
  }
})