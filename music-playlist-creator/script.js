
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  let curModal = document.getElementById("modal-content-id");
  curModal.innerHTML = "";
  let curSongs = document.getElementById("songsList");
  curSongs.innerHTML = "";
}


// MODAL CONTENT / FUNCTIONALITY
function handleClick(playlistIndex) {
    // for the modal to appear
    modal.style.display = "block"


    const currentPlaylist = data.playlists[playlistIndex]
    const currentModal = document.getElementById("modal-content-id")

    let songsList = document.getElementById("songsList")
    currentModal.innerHTML += `
                <div class = "modal-head-left">
                    <img src = "${currentPlaylist.playlist_art}">
                    <button class = "shuffle-btn" id = "shuffle-id" onclick = "handleShuffle(${playlistIndex})">SHUFFLE</button>
                </div>
                
                <div class = "modal-head-right">
                    <h1 >${currentPlaylist.playlist_name}</h1>
                    <p>${currentPlaylist.playlist_creator}</p>
                </div>
    
        `
    // iterate over list of songs in the playlist and adds each song to the grid

    for (let index = 0; index < currentPlaylist.songs.length; index++) {
        let currentSong = currentPlaylist.songs[index]
       

        songsList.innerHTML += `
                <div class = "song-row">
                        <div class = "song-left">
                            <div class = "song-left-row">
                                <div class = "song-col">
                                    <img src = "${currentSong.cover_art}">
                                </div>
                                <div class = "song-details">
                                    <h4>${currentSong.title}</h4>
                                    <p>${currentSong.artist}</p>
                                    <p>${currentSong.album}</p>
                                </div>
                            </div>
                        </div>
                        <div class = "song-time">
                            <p>${currentSong.duration}</p>
                        </div>
                    </div>
        
        `

    }


}

// SHUFFLE 
function handleShuffle(index) {
    const currentPlaylist = data.playlists[index]
    let songsList = document.getElementById("songsList")
    songsList.innerHTML = ""

    // An array of numbers from 0 to the length of the songs in a random order
    visited = [];
    while (visited.length < currentPlaylist.songs.length) {
        let randomNumber = Math.floor(Math.random()*(currentPlaylist.songs.length))
        if (!visited.includes(randomNumber)) {
            visited.push(randomNumber)
        }

    }

    // Add the songs back to the array in the random order 
    for (let i=0; i < currentPlaylist.songs.length; i++) {
        let newPlaylistIndex = visited[i]
        let currentSong = currentPlaylist.songs[newPlaylistIndex]
        songsList.innerHTML += `
        <div class = "song-row">
                <div class = "song-left">
                    <div class = "song-left-row">
                        <div class = "song-col">
                            <img src = "${currentSong.cover_art}">
                        </div>
                        <div class = "song-details">
                            <h4>${currentSong.title}</h4>
                            <p>${currentSong.artist}</p>
                            <p>${currentSong.album}</p>
                        </div>
                    </div>
                </div>
                <div class = "song-time">
                    <p>${currentSong.duration}</p>
                </div>
            </div>

`
    }       
        
    }



// Creates the array of the cards to be displayed

let containerDiv = document.getElementById("cardsContainer")

for (let index =0; index < data.playlists.length; index++){
    const playlist = data.playlists[index]
    containerDiv.innerHTML += `
       <div class="card" id = "card-${playlist.playlistID}">
                <img src = "${playlist.playlist_art}">
                <h3 class = "card-names" >${playlist.playlist_name}</h3>
                <p>${playlist.playlist_creator}</p>
                <div class = "likes">
                    <div class = "likes-im" onclick = "handleLikes(event, ${index})"></div>
                    <div class = "unlike-im" onclick = "handleUnlike(event, ${index})"></div>
                    <p id = "likes-count-${index}">${playlist.likeCount}</p>
                </div>
                <button class = "delete-btn" id = "delete-id" onclick = "handleDelete(event, ${index})">DELETE</button>
            </div>
    
    `

}

// adds event listener to each card
for (let index =0; index < data.playlists.length; index++) {
    const playlist = data.playlists[index]
    document.getElementById(`card-${playlist.playlistID}`).addEventListener("click", function () {handleClick(playlist.playlistID)});

}

// Handles the deleted button
const deleted = []
function handleDelete(event, index) {
    event.target.parentNode.remove()
    event.stopPropagation()
}


// Handles likes and unlikes
function handleLikes(event, index) {
    event.stopPropagation()
    const currentPlaylist = data.playlists[index]
    const currentLikeCount = document.getElementById(`likes-count-${index}`)

    currentLikes = Number(currentLikeCount.innerText)
    currentLikeCount.innerText = currentLikes + 1
    currentPlaylist.likeCount = currentLikes + 1

}

function handleUnlike(event, index) {
    event.stopPropagation()
    const currentPlaylist = data.playlists[index]
    const currentLikeCount = document.getElementById(`likes-count-${index}`)

    currentLikes = Number(currentLikeCount.innerText)
    if (currentLikes != 0){
        currentLikeCount.innerText = currentLikes - 1
        currentPlaylist.likeCount = currentLikes - 1

    }
}




// Allows users to search through the playlists
function search_playlist() {
    let input = document.getElementById('searchbar').value
    let playlistCards = document.getElementsByClassName("card")
    let cards = document.getElementsByClassName('card-names');
    input = input.toLowerCase()

    let cardNames = []
    for (let index = 0; index < cards.length; index++){
        cardNames.push(cards[index].innerText.toLowerCase())
    }
  
    for (i = 0; i < cardNames.length; i++) {
      if (!cardNames[i].includes(input)) {
        playlistCards[i].style.display = "none";
        continue
      }
      else {
        playlistCards[i].style.display = "block";
      }
    }
  }

function sortFunc() {
    document.getElementById("dropdown").classList.toggle("show")
}

// Click on window to exit
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


  // Sort alphabetically 
  const alphaSort = document.getElementById("alpha")
  let cardsCount = document.getElementsByClassName("card-names")
  alphaSort.addEventListener('click', function(){
    let cardNames = []
    for (let index = 0; index < cardsCount.length; index++){
        cardNames.push(cardsCount[index].innerText)
    }
    cardNames.sort()
    let alphacontainerDiv = document.getElementById("cardsContainer")
    alphacontainerDiv.innerHTML = ""

    for (let ind = 0; ind < cardNames.length; ind++){
        for (let i = 0; i < data.playlists.length; i++) {
            if (data.playlists[i].playlist_name == cardNames[ind]){
                alphacontainerDiv.innerHTML += `
                <div class="card" id = "card-${data.playlists[i].playlistID}">
                         <img src = "${data.playlists[i].playlist_art}">
                         <h3 class = "card-names" >${data.playlists[i].playlist_name}</h3>
                         <p>${data.playlists[i].playlist_creator}</p>
                         <div class = "likes">
                             <div class = "likes-im" onclick = "handleLikes(event, ${data.playlists[i].playlistID})"></div>
                             <div class = "unlike-im" onclick = "handleUnlike(event, ${data.playlists[i].playlistID})"></div>
                             <p id = "likes-count-${data.playlists[i].playlistID}">${data.playlists[i].likeCount}</p>
                         </div>
                         <button class = "delete-btn" id = "delete-id" onclick = "handleDelete(event, ${data.playlists[i].playlistID})">DELETE</button>
                     </div>
             `
                
        }
    }

}
    for (let index =0; index < data.playlists.length; index++) {
        const playlist = data.playlists[index]
        document.getElementById(`card-${playlist.playlistID}`).addEventListener("click", function () {handleClick(playlist.playlistID)});

}
        

  })

  

  // Sort from least to most liked
  const leastSort = document.getElementById("least")
  leastSort.addEventListener('click', function(){
    let leastcontainerDiv = document.getElementById("cardsContainer")
    leastcontainerDiv.innerHTML = ""
    leastLikes = []
    visited = []
    for (let index =0; index < data.playlists.length; index++) {
        leastLikes.push(data.playlists[index].likeCount)

    }
    leastLikes.sort()
    for (let i = 0; i < data.playlists.length; i++) {
        for (let ind = 0; ind < data.playlists.length; ind++){
            if (leastLikes[i]==data.playlists[ind].likeCount && !visited.includes(ind)){
                leastcontainerDiv.innerHTML += `
                <div class="card" id = "card-${data.playlists[ind].playlistID}">
                     <img src = "${data.playlists[ind].playlist_art}">
                     <h3 class = "card-names" >${data.playlists[ind].playlist_name}</h3>
                     <p>${data.playlists[ind].playlist_creator}</p>
                     <div class = "likes">
                         <div class = "likes-im" onclick = "handleLikes(event, ${data.playlists[ind].playlistID})"></div>
                         <div class = "unlike-im" onclick = "handleUnlike(event, ${data.playlists[ind].playlistID})"></div>
                         <p id = "likes-count-${data.playlists[ind].playlistID}">${data.playlists[ind].likeCount}</p>
                     </div>
                     <button class = "delete-btn" id = "delete-id" onclick = "handleDelete(event, ${data.playlists[ind].playlistID})">DELETE</button>
                 </div>
         `
                visited.push(ind)
            }
            
        }
    }
    for (let index =0; index < data.playlists.length; index++) {
        const playlist = data.playlists[index]
        document.getElementById(`card-${playlist.playlistID}`).addEventListener("click", function () {handleClick(playlist.playlistID)});

    }



  })


  // Sort from most to least liked
  const mostSort = document.getElementById("most")
  mostSort.addEventListener('click', function(){
    let mostcontainerDiv = document.getElementById("cardsContainer")
    mostcontainerDiv.innerHTML = ""
    mostLikes = []
    visited = []
    for (let index =0; index < data.playlists.length; index++) {
        mostLikes.push(data.playlists[index].likeCount)

    }
    mostLikes.sort((a, b) => b - a)
    for (let i = 0; i < data.playlists.length; i++) {
        for (let ind = 0; ind < data.playlists.length; ind++){
            if (mostLikes[i]==data.playlists[ind].likeCount && !visited.includes(ind)){
                mostcontainerDiv.innerHTML += `
                <div class="card" id = "card-${data.playlists[ind].playlistID}">
                     <img src = "${data.playlists[ind].playlist_art}">
                     <h3 class = "card-names" >${data.playlists[ind].playlist_name}</h3>
                     <p>${data.playlists[ind].playlist_creator}</p>
                     <div class = "likes">
                         <div class = "likes-im" onclick = "handleLikes(event, ${data.playlists[ind].playlistID})"></div>
                         <div class = "unlike-im" onclick = "handleUnlike(event, ${data.playlists[ind].playlistID})"></div>
                         <p id = "likes-count-${data.playlists[ind].playlistID}">${data.playlists[ind].likeCount}</p>
                     </div>
                     <button class = "delete-btn" id = "delete-id" onclick = "handleDelete(event, ${data.playlists[ind].playlistID})">DELETE</button>
                 </div>
         `
                visited.push(ind)
            }
            
        }
    }
    for (let index =0; index < data.playlists.length; index++) {
        const playlist = data.playlists[index]
        document.getElementById(`card-${playlist.playlistID}`).addEventListener("click", function () {handleClick(playlist.playlistID)});

    }



  })
  

