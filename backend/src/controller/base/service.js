
module.exports = (model) => ({
  findAll() {
    return model.find()
  },
  findOne(id) {
    return model.findById(id)
  },
  findByName(name) {
    return model.findOne({ name: name })
  },
  create(data) {
    const newData = new model(data)
    const error = newData.validateSync()
    if (error) throw new Error(error)
    return newData.save()
  },
  update(id, data) {
    const newData = new model(data)
    const error = newData.validateSync()
    if (error) throw new Error(error)
    return model.findByIdAndUpdate(id, data, { new: true })
  },
  delete(id) {
    return model.findByIdAndRemove(id)
  },
  addTag(id, tag) {
    return model.findByIdAndUpdate(id, { $push: { 'tags.tag': tag } })
  }
})