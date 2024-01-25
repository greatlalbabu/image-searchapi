const accessKey = "980gDUzvngS-wqr1eKY67P9yFiP6dFWcf_KUehM8E-o" ;


const searchField = document.querySelector("form") ;
const inputEle = document.getElementById("search-input");
const searchResults = document.querySelector(".results");

const showMore = document.getElementById("show-more-btn");

let inputData = "" ;

let page = 1 ;

async function searchImages(){
    inputData = inputEle.value ;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json()

    const results = data.results ;

    if(page === 1){
        searchResults.innerHTML = "" ;
    }

    results.map(result =>{
       const imageContainer = document.createElement("div");
       imageContainer.classList.add("search-result");
    
       const image = document.createElement("img");
       image.src = result.urls.small ;
       image.alt = result.alt_description
       
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html 
        imageLink.target = "_blank" ;
        imageLink.textContent = result.alt_description

        imageContainer.appendChild(image);
        imageContainer.appendChild(imageLink);
        searchResults.appendChild(imageContainer); // Fixed this line
    })
    page++ ;

    if(page >= 1){
        showMore.style.display = "block" ;
    }
}

searchField.addEventListener("submit" , (e)=>{
    e.preventDefault();
    page = 1;

    searchImages() ;
})

showMore.addEventListener("click" , (e)=>{
    e.preventDefault();
    searchImages() ;
})