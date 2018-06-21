export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author
  const hasAnswered = optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
  console.log(hasAnswered)

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    optionOneText: optionOne.text,
    optionOneVotes: optionOne.votes.length,
    optionTwoText: optionTwo.text,
    optionTwoVotes: optionTwo.votes.length,
    hasAnswered: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
    answer: hasAnswered ? optionOne.votes.includes(authedUser) ? 'optionOne' : 'optionTwo' : null,
  }
}

export function formatUser (user, rank) {
  const { answers, avatarURL, id, name, questions } = user
  const numAnswered = Object.keys(answers).length
  const numQuestions = questions.length
  console.log(`${name} answered ${numAnswered} questions and asked ${numQuestions} questions.`)

  return {
    id,
    rank,
    name,
    avatar: avatarURL,
    numAnswered,
    numQuestions,
  }
}
