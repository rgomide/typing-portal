class StageVO {
  constructor(stage) {
    this.stageModel = stage
  }

  toJSON() {
    const {
      id,
      title,
      description,
      difficulty,
      enabled,
      thumbUrl,
      textChallenge,
      createdAt,
      updatedAt
    } = this.stageModel

    return {
      id,
      title,
      description,
      difficulty,
      enabled,
      thumbUrl,
      textChallenge,
      createdAt,
      updatedAt
    }
  }

  static parseCollection(stages) {
    return stages.map((stage) => new StageVO(stage).toJSON())
  }
}

module.exports = StageVO
