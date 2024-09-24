/* ---------------------------------------------- */
/* -- TREE VIEW */
/* ---------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const treeview = document.getElementById("treeview");
  const items = document.querySelectorAll(".folder, .playlist");
  treeview.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("folder")) {
      const ul = target.querySelector("ul");
      if (ul) {
        ul.classList.toggle("open");
        target.classList.toggle("open");
      }
    }
  });
  items.forEach(function (item) {
    item.draggable = true;
    item.addEventListener("dragstart", function (e) {
      if (!e.target.classList.contains("album-cover")) {
        e.dataTransfer.setData("text/plain", "");
        e.target.classList.add("dragging");
      } else {
        e.preventDefault();
      }
    });
    item.addEventListener("dragend", function (e) {
      e.target.classList.remove("dragging");
    });
  });
  treeview.addEventListener("dragover", function (e) {
    e.preventDefault();
    const targetFolder = e.target.closest(".folder");
    const targetTreeView = e.target.closest("#treeview");
    const target = targetFolder || targetTreeView;
    if (target && target.classList.contains("folder")) {
      const ul = target.querySelector("ul");
      if (!ul) {
        const newUl = document.createElement("ul");
        newUl.classList.add("placeholder");
        newUl.textContent = "Drop Here";
        target.appendChild(newUl);
      }
    }
  });
  treeview.addEventListener("drop", function (e) {
    e.preventDefault();
    const targetFolder = e.target.closest(".folder");
    const targetTreeView = e.target.closest("#treeview");
    const target = targetFolder || targetTreeView;
    if (target) {
      const item = document.querySelector(".dragging");
      if (target.classList.contains("folder")) {
        const ul = target.querySelector("ul");
        if (!ul) {
          const newUl = document.createElement("ul");
          newUl.classList.add("placeholder");
          newUl.textContent = "Drop Here";
          target.appendChild(newUl);
        }
        const nextItem = getNextItemAfterDropPosition(ul || newUl, e.clientY);
        if (nextItem) {
          (ul || newUl).insertBefore(item, nextItem);
        } else {
          (ul || newUl).appendChild(item);
        }
      } else {
        let ul = target.querySelector("ul");
        if (!ul) {
          ul = document.createElement("ul");
          target.appendChild(ul);
        }
        const nextItem = getNextItemAfterDropPosition(ul, e.clientY);
        if (nextItem) {
          ul.insertBefore(item, nextItem);
        } else {
          ul.appendChild(item);
        }
      }
    }
  });
  function getNextItemAfterDropPosition(ul, y) {
    const items = Array.from(ul.children);
    const targetY = y - ul.getBoundingClientRect().top;
    let closestItem = null;
    let closestDistance = Number.POSITIVE_INFINITY;
    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenterY = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(targetY - itemCenterY);

      if (targetY > itemCenterY && distance < closestDistance) {
        closestItem = item;
        closestDistance = distance;
      }
    });
    return closestItem;
  }
});
document.addEventListener('DOMContentLoaded', function() {
  var col1 = document.querySelector('.column');
  var toggleWidthBtn = document.getElementById('togglewidth');
  toggleWidthBtn.addEventListener('click', function() {
    if (col1.style.width === '496px') {col1.style.width = '296px';} 
    else {col1.style.width = '496px';}
  });
});

/* ---------------------------------------------- */
/* -- LIBRARY FILTER */
/* ---------------------------------------------- */
document.getElementById("fsearch").addEventListener("input", function () {
  var searchTerm = this.value.toLowerCase();
  document.querySelectorAll(".playlist, .folder").forEach(function (item) {
    var title = item.querySelector(".playlist-title").textContent.toLowerCase();
    var description = item
      .querySelector(".playlist-description")
      .textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});
document.querySelector("#fsearchicon").addEventListener("click", function () {
  var searchBox = document.querySelector(".fsearch");
  var libraryHead = document.querySelector(".fhead");
  searchBox.classList.toggle("active");
  libraryHead.classList.toggle("hide");
  showFilter();
});
function showFilter() {
  var element = document.querySelector(".libfilter");
  var currentHeight = window.getComputedStyle(element).height;
  element.style.height = currentHeight === "39px" ? "72px" : "39px";
}
document.querySelectorAll(".ftype li").forEach(function (item) {
  item.addEventListener("click", function () {
    if (this.classList.contains("active")) {
      this.classList.remove("active");
    } else {
      document.querySelectorAll(".ftype li").forEach(function (li) {
        li.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});
function updateSearchWidth() {
  var libfilterWidth = document.querySelector(".libfilter").offsetWidth;
  var searchInput = document.querySelector(".fsearch.active");
  if (searchInput) searchInput.style.width = libfilterWidth - 101 + "px";
}
function observeLibfilterWidth() {
  var resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => updateSearchWidth());
  });
  resizeObserver.observe(document.querySelector(".libfilter"));
}
window.addEventListener("DOMContentLoaded", () => {
  updateSearchWidth();
  observeLibfilterWidth();
});
window.addEventListener("resize", updateSearchWidth);
function addMenu() {
  var addMenu = document.querySelector(".addmenu");
  addMenu.classList.toggle("show");
}

/* ---------------------------------------------- */
/* -- LIBRARY BUILDER */
/* ---------------------------------------------- */
function generateLibrary(data) {
  var playlistElement = document.getElementById("playlist");
  data.forEach(function (item) {
    var li = document.createElement("li");
    li.className = item.type;
    if (item.type === "folder") {
      var folderInfo = document.createElement("div");
      folderInfo.className = "folder-info";
      var img = document.createElement("img");
      img.className = "album-cover";
      img.src = item.image;
      img.alt = "Folder";
      var playlistInfo = document.createElement("div");
      playlistInfo.className = "playlist-info";
      var h3 = document.createElement("h3");
      h3.className = "playlist-title";
      h3.textContent = item.title;
      var p = document.createElement("p");
      p.className = "playlist-description";
      p.textContent = item.description;
      playlistInfo.appendChild(h3);
      playlistInfo.appendChild(p);
      folderInfo.appendChild(img);
      folderInfo.appendChild(playlistInfo);
      var ul = document.createElement("ul");
      item.playlists.forEach(function (playlist) {
        var playlistLi = document.createElement("li");
        playlistLi.className = "playlist";
        playlistLi.dataset.playlistid = playlist.id;
        playlistLi.dataset.type = playlist.type;
        var playlistImg = document.createElement("img");
        playlistImg.className = "album-cover";
        playlistImg.src = playlist.image;
        playlistImg.alt = playlist.title;
        var playlistInfo = document.createElement("div");
        playlistInfo.className = "playlist-info";
        var h3 = document.createElement("h3");
        h3.className = "playlist-title";
        h3.textContent = playlist.title;
        var p = document.createElement("p");
        p.className = "playlist-description";
        p.textContent = playlist.description;
        playlistInfo.appendChild(h3);
        playlistInfo.appendChild(p);
        playlistLi.appendChild(playlistImg);
        playlistLi.appendChild(playlistInfo);
        ul.appendChild(playlistLi);
      });
      li.appendChild(folderInfo);
      li.appendChild(ul);
    } else {
      var playlistImg = document.createElement("img");
      playlistImg.className = "album-cover";
      playlistImg.src = item.image;
      playlistImg.alt = item.title;
      var playlistInfo = document.createElement("div");
      playlistInfo.className = "playlist-info";
      var h3 = document.createElement("h3");
      h3.className = "playlist-title";
      h3.textContent = item.title;
      var p = document.createElement("p");
      p.className = "playlist-description";
      p.textContent = item.description;
      playlistInfo.appendChild(h3);
      playlistInfo.appendChild(p);
      li.className = "playlist";
      li.appendChild(playlistImg);
      li.appendChild(playlistInfo);
    }
    playlistElement.appendChild(li);
  });
}
var playlistData = [
  {
    type: "folder",
    title: "Rock",
    description: "2 Playlists",
    image: "https://via.placeholder.com/50/green/",
    playlists: [
      {
        id: 1,
        title: "Classic Rock",
        description: "The best classic rock hits of all time.",
        type: "private",
        image: "https://via.placeholder.com/50"
      },
      {
        id: 2,
        title: "Rock Ballads",
        description: "Emotional and powerful rock ballads.",
        type: "public",
        image: "https://via.placeholder.com/50"
      }
    ]
  },
  {
    type: "folder",
    title: "Pop",
    description: "2 Playlists",
    image: "https://via.placeholder.com/50/green/",
    playlists: [
      {
        id: 3,
        title: "Top 40 Hits",
        description: "The hottest pop hits of the moment.",
        type: "private",
        image: "https://via.placeholder.com/50"
      },
      {
        id: 4,
        title: "Pop Divas",
        description: "The best songs from female pop artists.",
        type: "shared",
        image: "https://via.placeholder.com/50"
      }
    ]
  },
  {
    type: "folder",
    title: "Jazz",
    description: "2 Playlists",
    image: "https://via.placeholder.com/50/green/",
    playlists: [
      {
        id: 5,
        title: "Smooth Jazz",
        description: "Smooth and relaxing jazz tunes.",
        type: "public",
        image: "https://via.placeholder.com/50"
      },
      {
        id: 6,
        title: "Jazz Classics",
        description: "Timeless jazz classics for any occasion.",
        type: "shared",
        image: "https://via.placeholder.com/50"
      }
    ]
  },
  {
    type: "folder",
    title: "Electronic",
    description: "2 Playlists",
    image: "https://via.placeholder.com/50/green/",
    playlists: [
      {
        id: 7,
        title: "EDM Party",
        description: "Get the party started with these EDM bangers.",
        type: "private",
        image: "https://via.placeholder.com/50"
      },
      {
        id: 8,
        title: "Chill Electronic",
        description: "Relaxing electronic beats for chilling out.",
        type: "public",
        image: "https://via.placeholder.com/50"
      }
    ]
  },
  {
    type: "playlist",
    id: 9,
    title: "Chill Out",
    description: "Relax and unwind with these chill tracks.",
    type: "private",
    image: "https://via.placeholder.com/50"
  },
  {
    type: "playlist",
    id: 10,
    title: "Workout Mix",
    description: "Energetic tunes to keep you motivated during your workout.",
    type: "shared",
    image: "https://via.placeholder.com/50"
  },
  {
    type: "playlist",
    id: 11,
    title: "Road Trip Songs",
    description: "Perfect road trip soundtrack for your next adventure.",
    type: "private",
    image: "https://via.placeholder.com/50"
  },
  {
    type: "playlist",
    id: 12,
    title: "Throwback Hits",
    description: "Nostalgic hits from the past to bring back memories.",
    type: "private",
    image: "https://via.placeholder.com/50"
  },
  {
    type: "playlist",
    id: 13,
    title: "Study Playlist",
    description: "Background music to help you focus and concentrate.",
    type: "shared",
    image: "https://via.placeholder.com/50"
  },
  {
    type: "playlist",
    id: 14,
    title: "Sleep Sounds",
    description: "Relaxing sounds to help you fall asleep faster.",
    type: "public",
    image: "https://via.placeholder.com/50"
  },
  {
    type: "playlist",
    id: 15,
    title: "Party Mix",
    description: "The ultimate party playlist for any celebration.",
    type: "public",
    image: "https://via.placeholder.com/50"
  },
  {
    type: "playlist",
    id: 16,
    title: "Acoustic Vibes",
    description: "Acoustic songs to set a relaxed and cozy atmosphere.",
    type: "shared",
    image: "https://via.placeholder.com/50"
  }
];
generateLibrary(playlistData);

/* ----------------------------------------------------- */
/* -- ??? */
/* ----------------------------------------------------- */
