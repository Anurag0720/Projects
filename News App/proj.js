const API_Key ="5894b5c5980e4ded8628588d3b77adc8"
const url ="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=>
    fetchNews("India"))

async function fetchNews(query){
   const res = await fetch(` ${url}${query}&apiKey=${API_Key}`)
   const data = await res.json();
   bindData(data.articles);
   console.log(data)
function bindData(articles){
    const cardsConatiner=document.getElementById("cards-container")
    const newsCardTemplate=document.getElementById("template-news-card")

    cardsConatiner.innerHTML ="";
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone =newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardsConatiner.appendChild(cardClone)
    });
}
function fillDataInCard(cardClone,article){
    const newsImg= cardClone.querySelector('#news-img')
    const newsTittle= cardClone.querySelector('#news-title')
    const newssource=cardClone.querySelector('#news-source')
    const newsDescription= cardClone.querySelector('#news-desc')
    
    newsImg.src=article.urlToImage;
    newsTittle.innerHTML=article.title;
    newsDescription.innerHTML=article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
        
    });
    newssource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank")
    })
   
}

}
let cusSelecctedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id)
    cusSelecctedNav?.classList.remove('active');
    cusSelecctedNav=navItem;
    cusSelecctedNav.classList.add('active')

}
const searchButton=document.getElementById('search-button')
const searchText=document.getElementById('search-text')

searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return
    fetchNews(query)
    cusSelecctedNav?.classList.remove('active');
})
function reload(){
    window.location.reload()
}