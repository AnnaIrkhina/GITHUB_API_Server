import express from 'express';
//import get from 'lodash/get'//could not import
import bodyParser from 'body-parser';

var app = express();


import makeRepoRequest from "./git_search.js";




app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var port = process.env.PORT || 8080

var router = express.Router()

// Unsafely enable cors
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// logging middleware
router.use(function (req, res, next) {

    next()
})


// API Routes
router.get('/', makeRepoRequestServ);

//async functions

async function makeRepoRequestServ(req, res) {

    const {numCommits}=(req.query||1), {numRepos}=(req.query||1), {language} = (req.query||'q');
    console.log('numCommits, numRepos, language', numCommits, numRepos, language)
    const result = await makeRepoRequest(numRepos, numCommits, language);
    res.send(result);

    }


    app.use('/api', router)
    app.listen(port)
    console.log(`API running at localhost:${port}/api`)
