const disk = $('.disk div');
const audio = $('audio');
const trackName = $('.info h3');
const artistName = $('.info h2');
let currentTrack = 0;

let music = [];

// This initPlayer fetches the lastest 14 tracks from kiwi6, but doesn't seem to work in CodePen due to the CORS restrictions. You can use this function on your local machine to see the functionality!

const initPlayer = () => {
  music = [
    {title: "Parachutes", artist: "Coldplay", music: "https://k003.kiwi6.com/hotlink/g15ynqmsal/Coldplay_-_Parachutes_www.jetune.ru_.mp3", img: "data:image/jpeg;base64,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"},
    {title: "Where They From", artist: "Missy Elliott", music: "https://k003.kiwi6.com/hotlink/l61q42ijz8/Missy_Elliott_feat_Pharrell_Williams_-_WTF_Where_They_From_playmus.cc_.mp3", img: "https://upload.wikimedia.org/wikipedia/en/f/f1/Missy_Elliott_-_WTF_%28Official_Single_Cover%29.png"},
    {title: "Lazarus", artist: "David Bowie", music: "https://k003.kiwi6.com/hotlink/zxkymksfd0/david_bowie_-_lazarus.mp3", img: "https://upload.wikimedia.org/wikipedia/ru/thumb/7/71/David_Bowie_-_Blackstar_song_cover_art.png/200px-David_Bowie_-_Blackstar_song_cover_art.png"},
    {title: "Little Islands", artist: "Stargroves", music: "https://k003.kiwi6.com/hotlink/nea14i03i9/Stargroves_Little_Islands_.mp3", img: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/Stargroves-album-cover.png?auto=format&q=60&fit=max&w=930"},
  ]
  setTrack(0)
	$('#next_track').on('click', nextTrack)
	$('#prev_track').on('click', prevTrack)
	$('#player').removeClass('loading')
	$('#toggle_state').on('click', playOrPause);
}

// const initPlayer = (sourcetype = 'kiwi6', source = 'https://kiwi6.com/api/v1/tracks') => {
//     $('#next_track').off('click', nextTrack)
//     $('#prev_track').off('click', prevTrack)
//     $('#player').addClass('loading')
//     $('#toggle_state').off('click', playOrPause)
//     fetch(source, {
//   mode: 'no-cors' // 'cors' by default
// })
//         .then(res => {
//       console.log(res)
//             return res.json()
//         })
//         .then(json => {
//         console.log('123')
//             return json.tracks.map(el => {
//                 return {
//                     title: el.track.title,
//                     artist: el.track.artist.username,
//                     music: el.track.upload.hotlink_path,
//                     img: null
//                 }
//             })
//         })
//         .then(list => {
//             let avatars = list.map(el => {
//                 return fetch('https://kiwi6.com/api/v1/artists/' + el.artist, {
//   mode: 'no-cors' // 'cors' by default
// })
//                     .then(res => {
//                         return res.json()
//                     })
//                     .then(json => {
//                         return json.avatar;
//                     })
//             })
//             Promise.all(avatars).then(res => {
//                     list.forEach((el, i) => {
//                         if (res[i].slice(0, 2) == "//") {
//                             el.img = "https:" + res[i]
//                         } else {
//                             el.img = res[i];
//                         }
//                     })
//                     return list;
//                 })
//                 .then((list) => {
//                     music = list
//                     setTrack(0)
//                     $('#next_track').on('click', nextTrack)
//                     $('#prev_track').on('click', prevTrack)
//                     $('#player').removeClass('loading')
//                     $('#toggle_state').on('click', playOrPause);
//                 })
//         })
//         .catch(console.log)

// }

const setTrack = (i) => {
    currentTrack = i;
    $('.disk div img').attr('src', music[i].img)
    audio.attr('src', music[i].music);
    audio[0].currentTime = 0;
    trackName.text(music[i].title);
    artistName.text(music[i].artist);
    if (active) audio[0].play();
    $('.disk div img').on('load', () => {
        if (active) {
            let avg = $('.player img').attr('avg').split('|');
            $('.disk').css('box-shadow', "0 15px 20px rgba(" + avg[0] + "," + avg[1] + "," + avg[2] + ", .6)");
        }
    })

}

const nextTrack = () => {
    if (currentTrack == music.length - 1) {
        setTrack(0)
    } else {
        setTrack(currentTrack + 1)
    }
    $('#next_track').addClass('goRight').delay(300).queue(function() {
        $(this).removeClass("goRight").dequeue();
    });

}
const prevTrack = () => {
    if (currentTrack == 0) {
        setTrack(music.length - 1)
    } else {
        setTrack(currentTrack - 1)
    }
    $('#prev_track').addClass('goLeft').delay(300).queue(function() {
        $(this).removeClass("goLeft").dequeue();
    });

}

const playOrPause = () => {
    if (!$('#toggle_state').hasClass('play')) {
        deactivate();
    } else {
        activate();
    }
    $('#toggle_state').toggleClass('play stop')
}


let active = false;
let rotation = 0;

const rotateDisk = () => {
    if (active) {
        rotation += 30;
        disk.css('transform', 'rotate(' + rotation + 'deg)');
        $('.progress div').css('width', audio[0].currentTime / audio[0].duration * 100 + "%")
    }
    setTimeout(rotateDisk, 1000)
}

rotateDisk();


const activate = () => {
    active = true;
    audio[0].play();
    let avg = $('.player img').attr('avg').split('|');
    $('.disk').css('box-shadow', "0 15px 20px rgba(" + avg[0] + "," + avg[1] + "," + avg[2] + ", .6)");
    $('.info, .player').addClass('active')


}

const deactivate = () => {
    active = false;
    audio[0].pause();
    let avg = $('.player img').attr('avg').split('|');
    $('.disk').css('box-shadow', "0 15px 20px rgba(" + avg[0] + "," + avg[1] + "," + avg[2] + ", 0)");
    $('.info, .player').removeClass('active')
}


const disks = document.querySelectorAll('.player img');
disks.forEach(function(e) {
    e.addEventListener('load', function() {
        let rgb = getAverageColourAsRGB(e);
        e.setAttribute('avg', rgb.r + "|" + rgb.g + "|" + rgb.b)
    })
})

function getAverageColourAsRGB(img) {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        rgb = {
            r: 102,
            g: 102,
            b: 102
        }, // Set a base colour as a fallback for non-compliant browsers
        pixelInterval = 5, // Rather than inspect every single pixel in the image inspect every 5th pixel
        count = 0,
        i = -4,
        data, length;

    // return the base colour for non-compliant browsers
    if (!context) {
        alert('Your browser does not support CANVAS');
        return rgb;
    }

    // set the height and width of the canvas element to that of the image
    var height = canvas.height = img.naturalHeight || img.offsetHeight || img.height,
        width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;

    context.drawImage(img, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        // catch errors - usually due to cross domain security issues
        return rgb;
    }

    data = data.data;
    length = data.length;
    while ((i += pixelInterval * 4) < length) {
        count++;
        rgb.r += data[i];
        rgb.g += data[i + 1];
        rgb.b += data[i + 2];
    }

    // floor the average values to give correct rgb values (ie: round number values)
    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);

    return rgb;

}

initPlayer();