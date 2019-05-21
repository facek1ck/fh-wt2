const jsonfile = require('jsonfile')
const fs = require('fs')

const validate = (userFileName, testName) => {
    let path = 'serverdata/testAnswers/' + testName + '.json'
    let correct = jsonfile.readFileSync(path)
    let userResultFile = jsonfile.readFileSync(
        'serverdata/testResults/' + userFileName
    )

    correct.answers.forEach((ca, caIdx) => {
        const uaIdx = userResultFile.answers.findIndex(ans => ans.id === ca.id)
        const isCorrect = ca.correct === userResultFile.answers[uaIdx].choice
        userResultFile.answers[uaIdx].correct = isCorrect

        if (!correct.answers[caIdx].results) {
            correct.answers[caIdx].results = {}
            correct.answers[caIdx].results.correct = 0
            correct.answers[caIdx].results.false = 0
        }

        if (isCorrect) {
            correct.answers[caIdx].results.correct += 1
        } else {
            correct.answers[caIdx].results.false += 1
        }
    })

    fs.writeFile(
        'serverdata/testAnswers/' + testName + '.json',
        JSON.stringify(correct, null, 2),
        err => (err ? console.log(err) : null)
    )
    fs.writeFile(
        'serverdata/testResults/' + userFileName,
        JSON.stringify(userResultFile, null, 2),
        err => (err ? console.log(err) : null)
    )
}

module.exports = {
    validate,
}
