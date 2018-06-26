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

export function calculatePercent (optionOneVotes, optionTwoVotes) {
  // Calculate percentages to render
  const total = optionOneVotes + optionTwoVotes
  let optionOnePercent
  let optionTwoPercent
  if (total !== 0) {
      optionOnePercent = Math.round(optionOneVotes * 100 / total)
      optionTwoPercent = Math.round(optionTwoVotes * 100 / total)
  } else {
      optionOnePercent = 0
      optionTwoPercent = 0
  }
  return ({
    optionOnePercent,
    optionTwoPercent
  })
}
