const router = require('express').Router({ mergeParams: true })
const authorizationMiddleware = require('@server/middleware/authorization')
const {
  ROLES: { ADMIN, MANAGER, GUEST, PLAYER }
} = require('@server/config/constants')
const { findAll, findById } = require('@server/services/stage.service')
const StageVO = require('@server/vo/StageVO')

/**
 * @openapi
 * /api/stages:
 *   get:
 *     description: Get all stages
 *     tags:
 *       - Stages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of stages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             example:
 *               - id: "1"
 *                 title: "Beginner Basics"
 *                 description: "Start your typing journey with simple words and sentences. Perfect for absolute beginners."
 *                 difficulty: 1
 *                 enabled: true
 *                 thumbUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
 *                 textChallenge: "Hello, world!"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *               - id: "2"
 *                 title: "Common Words"
 *                 description: "Practice typing the most commonly used words in the English language."
 *                 difficulty: 2
 *                 enabled: true
 *                 thumbUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
 *                 textChallenge: "Hello, world!"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 */

router.get(
  '/',
  authorizationMiddleware([ADMIN, MANAGER, GUEST, PLAYER]),
  async (req, res, next) => {
    try {
      const stages = await findAll()
      const stagesVO = StageVO.parseCollection(stages)

      res.json(stagesVO)
    } catch (err) {
      next(err)
    }
  }
)

/**
 * @openapi
 * /api/stages/{stageId}:
 *   get:
 *     description: Get a stage by ID
 *     tags:
 *       - Stages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stage details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               id: "1"
 *               title: "Beginner Basics"
 *               description: "Start your typing journey with simple words and sentences. Perfect for absolute beginners."
 *               difficulty: 1
 *               enabled: true
 *               thumbUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
 *               textChallenge: "Hello, world!"
 *               createdAt: "2024-01-01T00:00:00.000Z"
 *               updatedAt: "2024-01-01T00:00:00.000Z"
 *       404:
 *         description: Stage not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               message: "Stage not found"
 *               status: "error"
 *               timestamp: "2024-01-01T00:00:00.000Z"
 */
router.get(
  '/:stageId',
  authorizationMiddleware([ADMIN, MANAGER, GUEST, PLAYER]),
  async (req, res, next) => {
    try {
      const { stageId } = req.params
      const stage = await findById(stageId)
      const stageVO = new StageVO(stage)
      res.json(stageVO.toJSON())
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
