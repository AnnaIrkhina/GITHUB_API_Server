import axios from "axios";

export default function makeRequest(url, params) {

    return axios.get(url, params)
        .then((res) => {
           // console.log(res.data);
            return res;
        })
        .catch((error) => {
            //console.log(error)
            return {error:error};
        });


}







