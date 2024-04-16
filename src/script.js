document.addEventListener('DOMContentLoaded', function() {
    function getRandomSearchQuery() {
        const words = ['programming', 'tech', 'football', 'music', 'basketball'];
        return words[Math.floor(Math.random() * words.length)];
    }
    async function fetchRandomYouTubeVideos() {
        const searchQuery = getRandomSearchQuery();
        const apiKey = ''; 
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${searchQuery}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const videos = data.items;

            const randomVideosDiv = document.querySelector('#randoms-list');

            videos.forEach(video => {
                const listItem = document.createElement('li');
                const videoElement = document.createElement('img');
                videoElement.src = video.snippet.thumbnails.medium.url; 
                videoElement.alt = video.snippet.title;
                videoElement.width = 320;
                videoElement.height = 240;

                const titleElement = document.createElement('p');
                titleElement.textContent = video.snippet.title;

                listItem.appendChild(videoElement);
                listItem.appendChild(titleElement);

                listItem.addEventListener('click', function() {
                    playVideoInIframe(video.id.videoId);
                });

                randomVideosDiv.appendChild(listItem);

            });

        } catch (error) {
            console.error('Error fetching random YouTube videos:', error);
        }
    }
    async function fetchYouTubeVideos(searchQuery) {
        const apiKey = '';
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${searchQuery}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const videos = data.items;

            const videosList = document.querySelector('#randoms-list');
            videosList.innerHTML = '';

            videos.forEach(video => {
                const listItem = document.createElement('li');
                const videoElement = document.createElement('img');
                videoElement.src = video.snippet.thumbnails.medium.url; 
                videoElement.alt = video.snippet.title;
                videoElement.width = 320;
                videoElement.height = 240;

                const titleElement = document.createElement('p');
                titleElement.textContent = video.snippet.title;

                listItem.appendChild(videoElement);
                listItem.appendChild(titleElement);

                listItem.addEventListener('click', function() {
                    playVideoInIframe(video.id.videoId);
                });
                
                videosList.appendChild(listItem);
            });

        } catch (error) {
            console.error('Error fetching YouTube videos:', error);
        }
    }
    function playVideoInIframe(videoId) {
        var iframe = document.createElement('iframe');
        iframe.width = '640';
        iframe.height = '390';
        iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        var playerContainer = document.querySelector('.youtube-player');
        playerContainer.innerHTML = ''; 
        playerContainer.appendChild(iframe);
    }
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault(); 
        const searchQuery = document.querySelector('#search-form input[type="text"]').value;
        fetchYouTubeVideos(searchQuery);
        this.reset()
    });

    fetchRandomYouTubeVideos();
});
