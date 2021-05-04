import axios from "axios";

//const {get} = require('lodash').default;
function parameterValidator(numRepos, numCommits, language){
    // console.log('typeof +numRepos', typeof numRepos)
    // console.log('typeof +numCommits', typeof numCommits)
    // console.log('typeof language', typeof language)
    return (typeof +numRepos) === 'number' && (typeof +numCommits) === 'number' && (typeof language) ==='string';
}

function pageCalculator(Num){ ///function return object with number of pages and number of items per_page
    let pages =  (Num - Num%100)/100;

    const per_page = pages > 0? 100:Num;

    if(Num % 100 > 0) pages++;//you need to process all 100 pre page + reminder
    return{pages, per_page}
}

function makeGitHubAPIRequest(url, params)
{
    console.log('return axios.get(url, params)', url, params)
        return axios.get(url, params)
        .then((res) => {
            // console.log(res.data);
            return res;
        })
        .catch((error) => {
            //console.log(error)
            return {error: error};
        });
}

function requestRepoParams(language, per_page, page){
    return {
        headers: {Authorization: 'token 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'},
        params: {
            q: `language:${language}`,
            sort: 'stars',
            page: page,
            per_page: per_page,
        }
    }
}
function requestCommitParams(per_page, page){

    return  {
        headers: {Authorization: 'token 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'},
        params: {
            sort: 'committer-date',
            page: page,
            per_page: per_page,
        }
    }
}

 async function makeCommentsRequest(url, pager, repoIndex){
    console.log('makeCommentsRequest');
    const authors = [];

    console.log('pager.pages', pager.pages);
    for(let i = 1; i <= pager.pages; i++) {
        const commitsData = await makeGitHubAPIRequest(url, requestCommitParams(pager.per_page, i));
        if (!commitsData || !commitsData.hasOwnProperty("data")) {
            // console.log(repoRes);
            return (commitsData);
        } else {
            commitsData.data.map(commit => {
                const {sha, login} = commit;
                authors.push({Name: login, commit_hash: sha});
            })
        }
    }
    return authors;
}


export default async function makeRepoRequest(numRepos, numCommits, language) {
    if (parameterValidator(numRepos, numCommits, language) == false) return {error: 'Error in parameters'}

    const URL = ' https://api.github.com/search/repositories?';


    const result = {//form result obect we suppose to return
        repo_count: numRepos,
        commit_count: numCommits,
        results: [],
    }

    const pager = pageCalculator(numRepos);
    for(let i = 1; i <= pager.pages; i++) {

        const repoRes = await makeGitHubAPIRequest(URL, requestRepoParams(language, pager.per_page, i));
        if(!repoRes ||!repoRes.hasOwnProperty("data") || !repoRes.data.hasOwnProperty("items") ){
           // console.log(repoRes);

            return(repoRes.error.response.statusText);
        }
        else{
            repoRes.data.items.map(repo=>{
                const {name, commits_url, stargazers_count} = repo;
                result.results.push( {name, commits_url, stargazers_count, authors:[]})//pushing necessary fields to result object
                })
        }
        //console.log(result.results)
    }
    console.log(result.results)
    ///////
    await Promise.all(
        result.results.map(async (repo, repoIndex)=>{
        const {commits_url} = repo;
        const commURL = commits_url.replace('{/sha}', '');
        console.log(commURL);
        const pagerCommit = pageCalculator(numCommits);
        console.log('pagerCommit', pagerCommit);
        const authors = await makeCommentsRequest(commURL, pagerCommit, repoIndex);
        if(authors.hasOwnProperty('error')){
            result.results[repoIndex].authors.push({Error:authors.error.code})
            console.log('ERROR authors',authors)
        } else {
            authors.map(author => result.results[repoIndex].authors.push(author));
            //console.log('author', result.results[repoIndex].authors)
        }


    })//result.results.map(
    )//const asyncRes = await Promise.all
//////



return result;

}







