import{a as P,S as B,i as y}from"./assets/vendor-DirGshhi.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))g(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&g(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function g(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const m=15,M="31763497-bdd76f24c07d5bc4c9ffc4065",S="https://pixabay.com/api/",p=async(e,r)=>(await P.get(S,{params:{key:M,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:m}})).data,a={searchInput:document.querySelector('input[name="search-text"]'),galleryList:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector('button[data-action="load-more"]'),form:document.querySelector(".form")},q=new B(".gallery a",{captionsData:"alt",captionDelay:250}),h=e=>{const r=e.map(o=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${o.largeImageURL}">
          <img class="gallery-image" src="${o.webformatURL}" alt="${o.tags}">
        </a>
        <div class="gallery-info">
          <div class="gallery-info-item">
            <p class="info-title">Likes</p>
            <p class="info-value">${o.likes}</p>
          </div>
          <div class="gallery-info-item">
            <p class="info-title">Views</p>
            <p class="info-value">${o.views}</p>
          </div>
          <div class="gallery-info-item">
            <p class="info-title">Comments</p>
            <p class="info-value">${o.comments}</p>
          </div>
          <div class="gallery-info-item">
            <p class="info-title">Downloads</p>
            <p class="info-value">${o.downloads}</p>
          </div>
        </div>
      </li>
    `).join("");a.galleryList.insertAdjacentHTML("beforeend",r),q.refresh()},C=()=>{a.galleryList.innerHTML=""},v=()=>{a.loader.classList.add("is-visible")},b=()=>{a.loader.classList.remove("is-visible")},x=()=>{a.loadMoreBtn.classList.contains("is-visible")||a.loadMoreBtn.classList.add("is-visible")},l=()=>{a.loadMoreBtn.classList.contains("is-visible")&&a.loadMoreBtn.classList.remove("is-visible")},L={position:"topRight",maxWidth:432},f=e=>{y.error({...L,message:e,backgroundColor:"#ef4040",messageColor:"#fafafb",iconColor:"#fafafb",progressBarColor:"#b51b1b"})},w=e=>{y.warning({...L,message:e,title:"Warning",backgroundColor:"#aedbf9ff",messageColor:"#242424",iconColor:"#242424",progressBarColor:"#242424"})},E=e=>Math.ceil(e/m);let i=1,n=1,c="",u=!1;a.form.addEventListener("submit",async e=>{if(e.preventDefault(),n=1,i=1,c=e.target.elements["search-text"].value.trim(),c==="")return w("Please enter a search query!");C(),v(),l();try{const r=await p(c,i);if(r.hits.length===0){u=!0,f("Sorry, there are no images matching your search query. Please, try again!"),l();return}n=E(r.totalHits),h(r.hits),i===n?(u=!0,l()):x()}catch(r){console.dir(r),f("Something went wrong. Please try again later.")}finally{b(),e.target.reset()}});a.loadMoreBtn.addEventListener("click",async()=>{v();try{const e=await p(c,i+1);h(e.hits),i++;const o=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"}),i===n&&(u=!0,w("We're sorry, but you've reached the end of search results."),l())}catch{f("Something went wrong. Please try again later.")}finally{b()}});
//# sourceMappingURL=index.js.map
