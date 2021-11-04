export const prepareQuizPayload = (userData, category, questionsData) => {
  const payload = {
    userId: userData.id,
    category,
    difficulty: userData.level,
    createdAt: new Date(),
    questions: questionsData.map((q) => {
      return {
        id: q.id,
        question: q.question,
        isSeen: Boolean(q.isSeen),
        items: q.items
      }
    })
  }

  return payload
}
