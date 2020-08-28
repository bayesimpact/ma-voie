// Skills related helper functions.

export interface SkillType {
  codeOgr: string
  isPriority?: boolean
  name: string
}

const getSkills = (romeId?: string): Promise<readonly SkillType[]> => {
  if (!romeId) {
    return Promise.resolve([])
  }
  // TODO(cyrille): Rather fetch from static values in production assets.
  return import(`skills/skills_${romeId}.json`).then(({default: list}) => list)
}

export {getSkills}
