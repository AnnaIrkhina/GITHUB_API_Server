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
   //
   //  const URL = ' https://api.github.com/search/repositories?';
   //  const params = {
   //      headers: {Authorization: 'token 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'},
   //      params: {
   //          q: `language:${language}`,
   //          sort: 'stars',
   //          page: 1,
   //          per_page: numRepos,
   //      }
   //  }
   //
   //
   //  result = {
   //      commit_count: numCommits,
   //      repo_count: numRepos,
   //      results: [],
   //  }
   //  const repoRes = await makeRequest(URL, params);
   //  //console.log("!!!!!!!!!!!!!!!!!!!!",repoRes);
   //  if(!repoRes.hasOwnProperty("data") || !repoRes.data.hasOwnProperty("items") ){
   //      res.send({error:"Wrong data format contains, check your request"});
   //      return;
   //  }
   //
   //  const asyncRes = await Promise.all(repoRes.data.items.map( async(repo, index)=>{
   //      const {name} = (repo||""), {commits_url} = (repo||""), {stargazers_count}= (repo||"");
   //
   //      result.results.push({
   //          repository_name: name,
   //          Star_count: stargazers_count,
   //          authors: [],
   //      });
   //      const commURL = commits_url.replace('{/sha}', '');
   //
   //      const commitParams = {
   //          headers: {Authorization: 'token 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'},
   //          params: {
   //              page: 1,
   //              per_page: numCommits,
   //              sort: 'committer-date',
   //          }
   //      }
   //     // const commitRes = await makeCommitsRequest (commURL, commitParams);
   //      //console.log('commitRes', commitRes);
   //
   //      const commits =  await makeRequest(commURL, commitParams);
   //      // console.log("!!!!!!!!!!!commits",commits);
   //          if(!commits.hasOwnProperty("data") ){
   //              res.send({error:"Wrong data format contains, check your request"});
   //              return;
   //          }
   //      const commitsArr = []
   //      commits.data.map((commit) => {
   //          const {sha} = (commit||"");
   //          const {author} = (commit||"");
   //          const {login} =  (author||"");;
   //         // console.log(sha, login);
   //          result.results[index].authors.push({Name: login, commit_hash:sha});
   //
   //      });//commits.map
   //
   //
   //
   //  })//repoRes.items.map
   //  )//await Promise.all
   //  //console.log("FINAL RESULT!!!!!",result)
   // // console.log('asyncRes', asyncRes);
    res.send(result);

    }


    app.use('/api', router)
    app.listen(port)
    console.log(`API running at localhost:${port}/api`)
