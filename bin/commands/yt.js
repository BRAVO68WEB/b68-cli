import fetch from "node-fetch";
import APIURL from "../../api.config.js";
import fs from "fs";
import Configstore from 'configstore';
import URLParse from "url-parse";
import QueryString from "query-string"

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const configStore = new Configstore(packageJson.name);

export const videoInfo = async (url) => {
    if(!configStore.has("email" || !configStore.has("apiKey"))){
        console.log("Please authenticate first!");
        process.exit(1);
    }
    const ytURL = URLParse(url);
    const q = QueryString.parse(ytURL.query)
    if((ytURL.hostname !== "www.youtube.com" && ytURL.hostname !== "youtube.com") || !q.v){
        console.log("Invalid YT URL or no video ID found!");
        process.exit(1);
    }
    var options = {
        'method': 'GET',
        'url': APIURL+'/api/private/yt/video/'+q.v,
        'headers': {
          'apikey': configStore.get('apiKey'),
          'email': configStore.get('email')
        }
    };

    const response = await fetch(options.url, {
        method: 'GET',
        headers: options.headers
    });
    const data = await response.json();
    console.log("Title: "+data.snippet.title);
    console.log("Description: "+data.snippet.description);
    console.log("Published at: "+data.snippet.publishedAt);
    console.log("Channel: "+data.snippet.channelTitle);
    console.log("Views: "+data.statistics.viewCount);
    console.log("Likes: "+data.statistics.likeCount);
    process.exit(0)
}

export const channelInfo = async (url) => {
    // if(!configStore.has("email" || !configStore.has("apiKey"))){
    //     console.log("Please authenticate first!");
    //     process.exit(1);
    // }
    // const ytURL = URLParse(url);
    // const q = QueryString.parse(ytURL.query)
    // if((ytURL.hostname !== "www.youtube.com" && ytURL.hostname !== "youtube.com") || !q.channelId){
    //     console.log("Invalid YT URL or no channel ID found!");
    //     process.exit(1);
    // }
    // var options = {
    //     'method': 'GET',
    //     'url': APIURL+'/api/private/yt/channel/'+q.channelId,
    //     'headers': {
    //       'apikey': configStore.get('apiKey'),
    //       'email': configStore.get('email')
    //     }
    // };

    // await fetch(options.url, {
    //     method: 'GET',
    //     headers: options.headers
    // }).then(res => res.json())
    // .then(data => {
    //     console.log("Title: "+data.snippet.title);
    //     console.log("Description: "+data.snippet.description);
    //     console.log("Published at: "+data.snippet.publishedAt);
    //     console.log("Channel: "+data.snippet.channelTitle);
    //     console.log("Views: "+data.statistics.viewCount);
    //     console.log("Likes: "+data.statistics.likeCount);
    //     process.exit(0)
    // }).catch(err => {
    //     console.log(err);
    //     process.exit(1);
    // })
    console.log("Not implemented yet!");
    process.exit(1);
}

export const playlistInfo = async (url) => {
    if(!configStore.has("email" || !configStore.has("apiKey"))){
        console.log("Please authenticate first!");
        process.exit(1);
    }
    const ytURL = URLParse(url);
    const q = QueryString.parse(ytURL.query)
    if((ytURL.hostname !== "www.youtube.com" && ytURL.hostname !== "youtube.com") || !q.list){
        console.log("Invalid YT URL or no channel ID found!");
        process.exit(1);
    }
    var options = {
        'method': 'GET',
        'url': APIURL+'/api/private/yt/playlist/'+q.list,
        'headers': {
          'apikey': configStore.get('apiKey'),
          'email': configStore.get('email')
        }
    };
    const response = await fetch(options.url, {
        method: 'GET',
        headers: options.headers
    }).then(res => res.json())
    // console.log(response)
    console.log("Title: "+response.snippet.title);
    console.log("Description: "+response.snippet.description);
    console.log("Published at: "+response.snippet.publishedAt);
    console.log("Channel: "+response.snippet.channelTitle);
    console.log("Items: "+response.contentDetails.itemCount);
    process.exit(0)
}

export const playlistItems = async (url) => {
    if(!configStore.has("email" || !configStore.has("apiKey"))){
        console.log("Please authenticate first!");
        process.exit(1);
    }
    const ytURL = URLParse(url);
    const q = QueryString.parse(ytURL.query)
    if((ytURL.hostname !== "www.youtube.com" && ytURL.hostname !== "youtube.com") || !q.list){
        console.log("Invalid YT URL or no channel ID found!");
        process.exit(1);
    }
    var options = {
        'method': 'GET',
        'url': APIURL+'/api/private/yt/playlist/'+q.list+'/items',
        'headers': {
          'apikey': configStore.get('apiKey'),
          'email': configStore.get('email')
        }
    };
    const response = await fetch(options.url, {
        method: 'GET',
        headers: options.headers
    }).then(res => res.json())
    // console.log(response)
    console.log(response.length);
    for(const item of response){
        console.log("\n");
        console.log("Title: "+item.snippet.title);
        console.log("Published at: "+item.snippet.publishedAt);
        console.log("Channel: "+item.snippet.channelTitle);
        console.log("URL: "+ "https://youtube.com/watch?v="+item.snippet.resourceId.videoId);
    }
    process.exit(0)
}

export const spotify = async (url) => {
    if(!configStore.has("email" || !configStore.has("apiKey"))){
        console.log("Please authenticate first!");
        process.exit(1);
    }
    const spotURL = URLParse(url);
    const trackID = spotURL.pathname.split("/")[2];
    if(spotURL.hostname !== "open.spotify.com" || !trackID || spotURL.pathname.split("/")[1] !== "track"){
        console.log("Invalid Spotify URL or no tracks found!");
        process.exit(1);
    }
    var options = {
        'method': 'GET',
        'url': APIURL+'/api/private/yt/convertSpotify/'+trackID,
        'headers': {
          'apikey': configStore.get('apiKey'),
          'email': configStore.get('email')
        }
    };
    const response = await fetch(options.url, {
        method: 'GET',
        headers: options.headers
    }).then(res => res.json())
    console.log("Youtube URL: "+response.videoURL);
    process.exit(0)
}

export default {
    videoInfo,
    channelInfo,
    playlistInfo,
    playlistItems,
    spotify
};