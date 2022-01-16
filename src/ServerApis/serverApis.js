import axios from "axios";
import {addTask} from "../features/Board/todoSlice";

const SERVER_BASE_URL = "http://localhost";
const SERVER_PORT = window.location.port;//"3001";
const SERVER_ADDRESS = SERVER_BASE_URL + ":" + SERVER_PORT;

const get = (route, onSuccess, onFail) => {
    const url = SERVER_ADDRESS + route;
    axios.get(url).then((result) => {
        onSuccess(result);
        // handle success
        console.log(result);
    }).catch(err => {
        // handle error`
        onFail(err);
        console.log(err);
    }).then(() => {
        // always executed
    });
}

const post = (route, data, headers, onSuccess, onFail) => {
    const url = SERVER_ADDRESS + route;
    axios.post(url, data, headers).then(result =>{
        console.log(result);
        onSuccess(result);
    }).catch(function (error) {
        console.log(error);
        onFail(error);
    });
}

const put = (route, data,  onSuccess, onFail) => {
    const url = SERVER_ADDRESS + route + data;
    axios.put(url).then(result =>{
        console.log(result);
        onSuccess(result);
    }).catch(function (error) {
        console.log(error);
        onFail(error);
    });
}

const del = (route, data, onSuccess, onFail) =>{
    const url = SERVER_ADDRESS + route + data;
    axios.delete(url).then(result=>{
        onSuccess(result);
    }).catch(err => {
        console.log(err);
        onFail(err);
    });

}

const getServerAddress = () => {
    return SERVER_ADDRESS;
}


export default {get, post,put, del, getServerAddress};