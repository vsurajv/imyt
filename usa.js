const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyD5dF_Vpzn3vacXU15k2PDo-RqkU4uVeBU";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'US'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
     
    <img width=100% src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt=""> 
    
    <h4 style="background-color:blue; color:#fff; font-size:30px;" class="title">${data.snippet.title}</h4>   
    <div  class="content">
            <div>
            <img width=50 src="${data.channelThumbnail}" class="channel-icon" alt="">
            <p class="channel-name">  <span style="color:#fff; background-color:blue;"> Uploaded by</span> <span style="color:white; background-color:red;">${data.snippet.channelTitle}</span></p>    </div>
            <div class="info">
                
               
                
                
            </div>
        </div>
    </div>
    `;
}

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})
