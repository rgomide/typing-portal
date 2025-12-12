const { Stage } = require('@server/models')
const AppError = require('@server/utils/AppError')

const findAll = async () => {
  const stages = await Stage.findAll({
    order: [
      ['difficulty', 'ASC'],
      ['title', 'ASC']
    ]
  })

  return stages
}

const findById = async (id) => {
  const stage = await Stage.findByPk(id, {})

  if (!stage) {
    throw new AppError('Stage not found', 404)
  }

  return stage
}

const create = async (stage) => {
  const newStage = await Stage.create(stage)
  return newStage
}

module.exports = { findAll, findById, create }
