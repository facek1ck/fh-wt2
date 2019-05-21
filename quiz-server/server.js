const validate = require('./utils/validate')
const jsonfile = require('jsonfile')
const fs = require('fs')
var cors = require('cors')
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({ dest: 'serverdata/testResults/' })

let userList = JSON.parse(fs.readFileSync('serverdata/userList.json'))

if (typeof localStorage === 'undefined' || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage
    localStorage = new LocalStorage('./scratch')
}

app.use(express.json())
app.use(cors())
app.options('*', cors())

app.get('/', (req, res) => {
    res.json({ message: 'Server is alive and running!' })
})

//GET all users
app.get('/users', (req, res) => {
    res.json(userList)
})

//GET a user by id
app.get('/users/:id', (req, res) => {
    let user = userList.filter(function(user) {
        return user.id == req.params.id
    })
    res.json(user)
})

//GET a user's open tests
app.get('/users/:id/open', (req, res) => {
    let user = userList.filter(function(user) {
        return user.id == req.params.id
    })

    let openTestNames = user[0].tests.filter(x => !user[0].taken.includes(x))
    let tests = []
    openTestNames.forEach(element => {
        let path = 'serverdata/testSpecs/' + element + '.JSON'
        tests.push(jsonfile.readFileSync(path))
    })
    res.json(tests)
})

app.get('/users/:id/tests', (req, res) => {
    let user = userList.filter(function(user) {
        return user.id == req.params.id
    })

    let testNames = user[0].tests
    let tests = []
    testNames.forEach(element => {
        let path = 'serverdata/testSpecs/' + element + '.JSON'
        tests.push(jsonfile.readFileSync(path))
    })
    res.json(tests)
})

//GET a test by name
app.get('/tests/:name', (req, res) => {
    let path = 'serverdata/testSpecs/' + req.params.name + '.JSON'
    let test = jsonfile.readFileSync(path)
    res.json(test)
})

//GET all questions of a test
app.get('/tests/:name/questions', (req, res) => {
    let path = 'serverdata/testSpecs/' + req.params.name + '.JSON'
    let test = jsonfile.readFileSync(path)
    let questions = []
    test.questions.forEach(element => {
        questions.push(element.question)
    })
    res.json(questions)
})

//GET a specific question by id (returns question Obejct with answers)
app.get('/tests/:name/questions/:id', (req, res) => {
    let path = 'serverdata/testSpecs/' + req.params.name + '.JSON'
    let test = jsonfile.readFileSync(path)
    let question = test.questions.filter(function(question) {
        return question.id == req.params.id
    })[0]
    res.json(question)
})

app.post('/requests/heartbeat', (req, res) => {
    localStorage.setItem(req.body.lastName, req.body.online)
    return res.status(201).send({
        success: 'true',
        message: 'successfully sent heartbeat',
    })
})

app.get('/tests', (req, res) => {
    const filenames = fs.readdirSync('serverdata/testSpecs')
    const tests = filenames.map(f => f.slice(0, -5))

    res.json({ tests })
})

app.get('/requests/online', (req, res) => {
    let count = 0
    let users = localStorage._keys
    users.forEach(x => {
        if (localStorage.getItem(x) == 'true') {
            count++
        }
    })
    return res.json(count)
})

app.post(
    '/tests/:name/:id/upload',
    upload.single('55CHbmatnFYH6UYy'),
    (req, res) => {
        if (req.file) {
            validate.validate(req.file.filename, req.params.name, req.params.id)
            return res.status(201).send({
                success: 'true',
                message: 'successfully uploaded result',
            })
        } else {
            return res.status(400).send({
                success: 'false',
                message: 'Please upload a valid file',
            })
        }
    }
)

const getResultScore = (userId, testName) => {
    return new Promise(res => {
        fs.readdir('serverdata/testResults', (err, fileNames) => {
            const validFile = fileNames
                .map(x => jsonfile.readFileSync('serverdata/testResults/' + x))
                .find(f => f.userid === userId && f.name === testName)

            if (!validFile) {
                res({ name: testName, score: 0 })
                return
            }
            const score = validFile.answers.reduce((acc, curr) => {
                if (curr.correct) {
                    acc += 1
                }
                return acc
            }, 0)
            res({ name: testName, score })
        })
    })
}

app.get('/stats/:userID/:testName', (req, res) => {
    getResultScore(req.params.userID, req.params.testName).then(score =>
        res.send(score)
    )
})

app.get('/stats/:testName', (req, res) => {
    return res.json(
        jsonfile.readFileSync(
            'serverdata/testAnswers/' + req.params.testName + '.json'
        )
    )
})

const server = app.listen(port)
module.exports = server

console.log('RESTful API server started on: ' + port)
