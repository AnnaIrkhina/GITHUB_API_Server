# Backend APIs provided for you:
possibility to sent request to get the authors and hashes of most recent N commits for
the top M repositories by star count in a language 
N, M can be any natural numbers in range [1..100]
## Request API End pont 
send request to http://localhost:8080/api with parameters numRepos(M),numCommits (N), and language

there response from request if I want to 3 last commits of the get 5 the top starred repositories in a language 'Java.
 - http://localhost:8080/api?numRepos=5&numCommits=3&language=java
{"commit_count":"3",
  "repo_count":"5",
  "results":
  [
    {"repository_name":"linux",
     "Star_count":110659,
     "authors":[
        {"Name":"torvalds","commit_hash":"152d32aa846835987966fd20ee1143b0e05036a0"},
        {"Name":"torvalds","commit_hash":"4f9701057a9cc1ae6bfc533204c9d3ba386687de"},
        {"Name":"torvalds","commit_hash":"f34b2cf17825d69ae1e227871059ab18c2f57817"}]
        },
    {"repository_name":"netdata",
     "Star_count":53522,
     "authors":[
        {"Name":"netdatabot","commit_hash":"705a766c3fcea0df0b360b3ad858a2f5e2ee025b"},
        {"Name":"thiagoftsm","commit_hash":"1224b84483810ae780971e3bc8caf1113931d56e"},
        {"Name":"netdatabot","commit_hash":"a80a536f9444ff778c9c9408fecae87360a83135"}]
        },
    {"repository_name":"redis",
      "Star_count":48699,
      "authors":[
          {"Name":"huangzhw","commit_hash":"0b1b9edb2843730b03f78b6073cdd30873dbba95"},
          {"Name":"enjoy-binbin","commit_hash":"9c927e9de96b6457cc96e04c26ba6649b5325c8e"},
          {"Name":"enjoy-binbin","commit_hash":"1eff8564c78011f7257e485796990a0d4d607a5b"}]
          },
    {"repository_name":"scrcpy",
     "Star_count":48047,
     "authors":[
     {"Name":"Gelma","commit_hash":"498ad23e9804cd7d7bb56bb1cd0d26b88e1830b9"},
     {"Name":"rom1v","commit_hash":"07a85b7c94fc519c4950a12d7c992f51117b7e81"},
     {"Name":"rom1v","commit_hash":"2812de8a9a0f20fa17126924407ecb6f613ac7e4"}]
     },
     {"repository_name":"git",
      "Star_count":37803,
      "authors":[
      {"Name":"gitster","commit_hash":"7e391989789db82983665667013a46eabc6fc570"},
      {"Name":"gitster","commit_hash":"93e0b28dbb4c1a2cbdce1da8e229af075c2fa092"},
      {"Name":"gitster","commit_hash":"5980e0d44258a6cccf1e5995947d4cba15145924"}]
      }]
      }
my API sends request to https://api.github.com/search/repositories?
with parameters: q=language%3Ajava 
                 sort=stars
                 page=1 
                 per_page=numRepos and gets respond in JSON format, parses response,
                 then for each repository it takes commits_url adn sends request to 
                 https://api.github.com/repos/NameRepository/commits? 
                 with parameters 
                    page=1
                    per_page=numCommits
                    sort=author-date-ascfea
                    
##What I want to improve = if I want to get number of repositories more than 100, I need to send more requests 
## and recalculate parameters page and per_page  
## I want to use logash to get properties of object but for some reason could not import it.            


