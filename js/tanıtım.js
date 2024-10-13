 // Replace this with the YouTube video ID
        var videoId = 'OeunFYXLcVc'; // For example, 'kJQP7kiw5Fk' is the video ID for the "Despacito" music video

        var player;

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '360',
                width: '640',
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady
                }
            });
        }

        function onPlayerReady(event) {
            event.target.playVideo();
        }

        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
