const jwt = require('jsonwebtoken')
const { JWT } = require('@server/config/constants')
const { User, Role } = require('@server/models')
const { faker } = require('@faker-js/faker')
const {
  ROLES: { ADMIN, MANAGER, GUEST }
} = require('@server/config/constants')

const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT.SECRET, { expiresIn: JWT.EXPIRES_IN })
}

const createUser = async (roleName) => {
  await createRoles()

  const role = await Role.findOne({ where: { name: roleName } })

  const user = await User.create({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    userName: faker.internet.username(),
    email: faker.internet.email(),
    password: '111'
  })

  await role.addUser(user, { through: { userId: user.id, roleId: role.id } })

  return user
}

const createRoles = async () => {
  if ((await Role.count()) > 0) {
    return await Role.findAll()
  }

  const roles = await Promise.all([
    Role.create({ name: ADMIN }),
    Role.create({ name: MANAGER }),
    Role.create({ name: GUEST })
  ])

  return roles
}

module.exports = {
  createToken,
  createUser,
  createRoles
}
