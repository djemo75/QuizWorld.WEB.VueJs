import { LETTER_GRADES } from "../constans/grades"

export const calculateScore = (questions) => {
  const points = questions.map((q) => {
    if (q.items.every((item) => item.isRight === item.isSelected)) {
      return true
    }
    return false
  })

  let correctCouuter = 0
  points.map((point) => point && correctCouuter++)
  const score = (correctCouuter / points.length) * 100
  return score
}

export const calculateLetterGrade = (questions) => {
  const percent = calculateScore(questions)

  const current = LETTER_GRADES.find(
    (g) => g.min <= percent && g.max >= percent
  )
  return current
}
