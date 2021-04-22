const headerLogoImg=document.querySelector(".header__logo-img"),headerTitle=document.querySelector(".header__title"),headerSpan=document.querySelector(".header__span-title"),header=document.querySelector(".header"),menuAnimation=()=>{const e=document.querySelector("main");window.pageYOffset>=355&&document.body.offsetWidth>=954?(header.classList.add("fixed","bg-steel-900","z-10","top-0","animate-menuAnimation"),headerLogoImg.classList.add("w-auto","max-h-28","min-w-0.5"),headerTitle.classList.add("text-xl","max-h-28"),headerSpan.classList.add("block","text-lg"),e.style.marginTop="13.5vh"):document.body.offsetWidth>954&&(header.classList.remove("fixed","bg-steel-900","z-10","top-0","animate-menuAnimation"),headerLogoImg.classList.remove("w-auto","max-h-28","min-w-0.5"),headerTitle.classList.remove("text-xl","max-h-28"),headerSpan.classList.remove("block","text-lg"),e.style.marginTop="0")};
const articlesNavigationBtn=document.querySelector(".navigation-aside__open-btn"),articlesNavigationList=document.querySelector(".navigation-aside__list");let openArticlesNavigationCounter=0;const openArticlesNavigation=()=>{0===openArticlesNavigationCounter?(articlesNavigationList.classList.add("block","animate-appear"),articlesNavigationList.classList.remove("opacity-1","animate-hidden","hidden"),openArticlesNavigationCounter++):(articlesNavigationList.classList.add("opacity-1","animate-hidden"),setTimeout((()=>{articlesNavigationList.classList.add("hidden")}),1e3),articlesNavigationList.classList.remove("animate-appear"),openArticlesNavigationCounter--)};
const burgerButton=document.querySelector(".phone-header__burger-menu"),phoneMenu=document.querySelector(".phone-menu");let openClosePhoneMenuCounter=0;const burgerButtonElements=Array.from(burgerButton.children),openClosePhoneMenu=()=>{0===openClosePhoneMenuCounter?(phoneMenu.setAttribute("style",""),phoneMenu.classList.remove("animate-closePhoneMenu"),phoneMenu.classList.add("animate-openPhoneMenu"),burgerButtonElements[0].classList.add("animate-burgerElement1"),burgerButtonElements[0].classList.remove("animate-unAnimateBurgerElement1"),burgerButtonElements[2].classList.add("animate-burgerElement3"),burgerButtonElements[2].classList.remove("animate-unAnimateBurgerElement3"),setTimeout((()=>{burgerButtonElements[1].classList.add("animate-hiddenBurgerElement2"),burgerButtonElements[1].classList.remove("animate-appearBurgerElement2")}),125),openClosePhoneMenuCounter++):(phoneMenu.setAttribute("style",""),phoneMenu.classList.add("animate-closePhoneMenu"),phoneMenu.classList.remove("animate-openPhoneMenu"),burgerButtonElements[0].classList.add("animate-unAnimateBurgerElement1"),burgerButtonElements[0].classList.remove("animate-burgerElement1"),burgerButtonElements[2].classList.add("animate-unAnimateBurgerElement3"),burgerButtonElements[2].classList.remove("animate-burgerElement3"),setTimeout((()=>{burgerButtonElements[1].classList.add("animate-appearBurgerElement2"),burgerButtonElements[1].classList.remove("animate-hiddenBurgerElement2")}),125),openClosePhoneMenuCounter--)};
const buttonTop=document.querySelector(".buttonTop"),clickButtonTop=()=>{window.scrollBy(0,-1*window.pageYOffset)},appearButtonTop=()=>{window.pageYOffset>=370?(buttonTop.classList.remove("animate-hidden"),buttonTop.classList.add("block","animate-appear")):(buttonTop.classList.add("animate-hidden"),buttonTop.classList.remove("block","animate-appear"))};
const sectionButtons=document.querySelectorAll(".navigation-aside__list-element");function clickedSectionButtons(){document.querySelectorAll(".navigation-aside__list-element").forEach((e=>{e.classList.remove("navigation-aside__list-element--clicked")})),this.classList.add("navigation-aside__list-element--clicked")}
const navigationAside=document.querySelector(".navigation-aside__list"),articleContainer=document.querySelector(".article-container"),fixedNavigationAside=()=>{const i=window.getComputedStyle(navigationAside).getPropertyValue("width");window.pageYOffset>=497?(navigationAside.classList.add("fixed","top-48"),navigationAside.style.width=i,articleContainer.style.marginLeft=parseInt(i+5)+"px"):(articleContainer.style.marginLeft="0",navigationAside.style.width="auto",navigationAside.classList.remove("fixed","top-48"))};
const targetLinks=()=>{document.querySelectorAll('a[href$="target=_blank"]').forEach((e=>{e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer");const t=e.getAttribute("href").replace("target=_blank","").replace("?","").trim();e.setAttribute("href",t)}))};
class AbstractView{constructor(t,e){this.title=e,this.prefix=t}getHtml(){return document.createDocumentFragment()}setTitle(){document.title=this.title}}
class Section{constructor(t,s,i){this.title=t,this.url=s,this.linkValue=i}}class Article{constructor(t,s,i,...c){this.title=t,this.url=s,this.span=i,this.sections=c}}
class AbstractLinkArticlesView extends AbstractView{constructor(t,i,e,s){super(e,s),this.articles=i,this.sectionTitle=t,this.i=0}getHtml(){const t=document.createDocumentFragment(),i=document.createElement("div");i.classList.add("title-container"),i.innerHTML=`<h1 class="title-container__title">${this.sectionTitle}</h1>\n        <button class="title-container__btn">\n            <img src="${this.prefix}img/south_white_24dp.svg" class="title-container__arrow" alt=""/>\n        </button>`;const e=document.createElement("div");return e.classList.add("section-articles"),this.articles.forEach((t=>{const i=this.createArticle(t.title,t.span,t.url,t.sections[0].url);e.appendChild(i)})),t.appendChild(i),t.appendChild(e),t}createArticle(t,i,e,s){if(0===this.i){const n=document.createElement("div");return n.classList.add("section-articles__link-article-container"),n.innerHTML=`<div class="section-articles__title-container">\n                <h2 class="section-articles__title-link"> ${t} </h2>\n                <span class="section-articles__span"> ${i} </span>\n            </div>\n            <a class="section-articles__link" href="${this.prefix}articles/${e}/${s}" data-link>\n                <img src="${this.prefix}img/chevron_left-24px.svg" class="section-articles__img" data-img></img>\n            </a>`,this.i++,n}{const n=document.createElement("div");return n.classList.add("section-articles__link-article-container","section-articles__link-article-container--right"),n.innerHTML=`<div class="section-articles__title-container">\n                <h2 class="section-articles__title-link"> ${t} </h2>\n                <span class="section-articles__span section-articles__span--right"> ${i} </span>\n            </div>\n            <a class="section-articles__link section-articles__link--right" href="${this.prefix}articles/${e}/${s}" data-link>\n                <img src="${this.prefix}img/chevron_right-24px.svg" class="section-articles__img section-articles__img--right" data-img></img>\n            </a>`,this.i--,n}}}
class AbstractSectionsView extends AbstractView{constructor(t,e,a){super(e,a),this.article=t}async getHtml(t){const e=document.createDocumentFragment(),a=document.createElement("div");a.classList.add("title-container"),a.innerHTML=`<h1 class="title-container__title">${this.article.title} ${this.article.span}</h1>\n        <button class="title-container__btn">\n            <img src="${this.prefix}img/south_white_24dp.svg" class="title-container__arrow" alt=""/>\n        </button>`;const i=document.createElement("div");i.classList.add("article-and-menu");const n=document.createElement("aside");n.classList.add("navigation-aside");const s=document.createElement("button");s.classList.add("navigation-aside__open-btn"),s.innerHTML=`Zobacz inne sekcje <img class="navigation-aside__img" src="${this.prefix}img/sort.svg" alt="" />`;const c=document.createElement("hr"),l=document.createElement("ul");l.classList.add("navigation-aside__list");const r=this.article.sections.map((({title:t,url:e})=>this.createLinkSection(t,e)));r[0].classList.add("navigation-aside__list-element--clicked"),r.forEach((t=>{l.appendChild(t)})),n.appendChild(s),n.appendChild(c),n.appendChild(l);const d=document.createElement("article");d.classList.add("article-container");const o=`<div class="loaderBox">\n        <img src="${this.prefix}img/loading-process.svg" class="loaderBox__loader"></img>\n        <span class="loaderBox__span"></span>\n\n        </div>`;return await this.getArticleValue(t),d.innerHTML=o+this.articleValue,i.appendChild(n),i.appendChild(d),e.appendChild(a),e.appendChild(i),e}createLinkSection(t,e){const a=document.createElement("li");return a.classList.add("navigation-aside__list-element"),a.innerHTML=`<a class="navigation-aside__link" href="./${e}" data-link> ${t} </a> `,a}async getArticleValue(t){let e=await this.article.sections.find((e=>e.linkValue===t.replace(".html",".md")));e||(e=this.article.sections[0]);const a=`/articleValue?${new URLSearchParams({articleName:this.article.url,sectionName:e.linkValue}).toString()}`,i=await fetch(a,{method:"GET"}).then((t=>{if(200!=t.status)throw new Error("Wystąpił błąd");return t.json()})).then((t=>t.articleValue)).catch((t=>{throw new Error("Wystąpił błąd")}));this.articleValue=i}}
const navigateTo=e=>{const t=location.pathname;history.pushState(null,null,e),router(t)},substringOfHrefAttributes=e=>{const t=document.querySelector(".header"),n=document.querySelector(".phone-header"),a=document.querySelector(".phone-menu"),o=document.querySelector(".footer");[Array.from(t.querySelectorAll("a")),Array.from(n.querySelectorAll("a")),Array.from(a.querySelectorAll("a")),Array.from(o.querySelectorAll("a"))].flat().forEach((t=>{const n=t.getAttribute("href"),a=n.indexOf(e),o=n.slice(0,a+e.length),i=t.getAttribute("target");if(-1===a&&"#"!==o){if("_blank"!==i)switch(e){case"./":const e=n.replace(/..\/..\//,"./").replace(/..\//,"./");t.setAttribute("href",e);break;case"../":const a=n.replace(/..\/..\//,"../").replace(/.\//,"../");t.setAttribute("href",a);break;case"../../":const o=n.replace(/..\//,"../../").replace(/.\//,"../../");t.setAttribute("href",o)}}else if("./"===e&&"#"!==o&&"_blank"!==i){const e=n.replace(/..\/..\//,"./").replace(/..\//,"./");t.setAttribute("href",e)}}))},router=async e=>{if(e===location.pathname)return;const t=[{path:"/",view:new AbstractLinkArticlesView("Informatyka kwantowa dla każdego",[new Article("Wprowadzenie do","introduction_to_quantum_compiuting","Informatyki kwantowej",new Section("Co to jest informatyka kwantowa?","whatIsTheQuantumCompiuting.html")),new Article("Obliczenia i Obwody","computing_and_Quantum_Circuits","kwantowe",new Section("Wprowadzenie","introdaction.html")),new Article("Algorytmy","quantum_algorithms","kwantowe",new Section("Wprowadzenie","introdaction.html"))],"./","Informatyka kwantowa dla każdego - konkurs IBM")},{path:"/index.html",view:new AbstractLinkArticlesView("Informatyka kwantowa dla każdego",[new Article("Wprowadzenie do","introduction_to_quantum_compiuting","Informatyki kwantowej",new Section("Co to jest informatyka kwantowa?","whatIsTheQuantumCompiuting.html")),new Article("Obliczenia i Obwody","computing_and_Quantum_Circuits","kwantowe",new Section("Wprowadzenie","introdaction.html")),new Article("Algorytmy","quantum_algorithms","kwantowe",new Section("Wprowadzenie","introdaction.html"))],"./","Informatyka kwantowa dla każdego - konkurs IBM")},{path:"/subpages/for_organisers.html",view:new AbstractLinkArticlesView("Dla Organizatorów",[],"../","Dla Organizatorów - konkurs IBM Informatyka kwantowa dla każdego")},{path:"/subpages/about_me.html",view:new AbstractLinkArticlesView("O Mnie",[],"../","O Mnie - konkurs IBM Informatyka kwantowa dla każdego")},{path:"/articles/introduction_to_quantum_compiuting/",view:new AbstractSectionsView(new Article("Wprowadzenie do","introduction_to_quantum_compiuting","Informatyki kwantowej",new Section("Co to jest informatyka kwantowa?","whatIsTheQuantumCompiuting.html","introduction.md"),new Section("Czym jest qubit?","whatIsAQubit.html","whatIsAQubit.md"),new Section("Co to jest splątanie kwantowe?","whatIsAQuantumEntanglement.html","whatIsAQuantumEntanglement.md"),new Section("Czym jest komputer kwantowy i jak działa?","whatIsAQuantumComputer.html","whatIsAQuantumComputer.md"),new Section("Jak zbudowany jest komputer kwantowy?","howAQuantumComputerIsBuilt.html","howAQuantumComputerIsBuilt.md")),"../../","Wprowadzenie do Informatyki kwantowej - konkurs IBM")},{path:"/articles/computing_and_Quantum_Circuits/",view:new AbstractSectionsView(new Article("Obliczenia i Obwody","computing_and_Quantum_Circuits","kwantowe",new Section("Wprowadzenie","introdaction.html","introdaction.md"),new Section("Bramka Not","not_gate.html","not_gate.md"),new Section("Tworzenie superpozycji i interferencji za pomocą bramki Hadamarda","H_gate.html","H_gate.md"),new Section("Faza kwantowa i kąt fazowy qubitu","phase_angle.html","phase_angle.md"),new Section("Bramki ROT","ROT_gates.html","ROT_gates.md"),new Section("Więcej o bramkach negujących","moreOfNegatingGates.html","moreOfNegatingGates.md"),new Section("Identyczność i bramka Unitary","I_and_U_gate.html","I_and_U_gate.md"),new Section("Splątania kwantowe w bramkach - CNOT i Toffoly","entanglement_in_quantum_gates.html","entanglement_in_quantum_gates.md"),new Section("Zamiana wartości stanów qubitów - SWAP i CS SWAP","Swap_and_Csswap_gates.html","Swap_and_Csswap_gates.md")),"../../","Obliczenia i Obwody kwantowe - konkurs IBM")},{path:"/articles/quantum_algorithms/",view:new AbstractSectionsView(new Article("Algorytmy kwantowe","quantum_algorithms","",new Section("Wprowadzenie","introdaction.html","introdaction.md"),new Section("Algorytm Deutscha-Jozsy","deutscha-jozsy-algorithm.html","deutscha-jozsy-algorithm.md")),"../../","Algorytmy kwantowe - konkurs IBM")}];let n=t.map((e=>"/"!==e.path?{route:e,isMatch:location.pathname===e.path||-1!==location.pathname.indexOf(e.path)}:{route:e,isMatch:location.pathname===e.path})).find((e=>e.isMatch));n||(n={route:t[1],isMatch:!0});const a=n.route.view;if(-1!==n.route.path.indexOf("/articles/")&&-1!==e.indexOf(n.route.path)){const e=location.pathname.slice(n.route.path.length),t=document.querySelector(".article-container"),o=Array.from(t.children),i=t.querySelector(".loaderBox");t.setAttribute("style","height: 215px; overflow: hidden;"),i.classList.add("flex");const r=setTimeout((()=>{i.querySelector("span").innerText="Strona ładuje się dłużej niż zwykle. Proszę sprawdzić swoje połączenie z internetem."}),5e3);for(let e=1;e<o.length;e++)o[e].remove();try{await a.getArticleValue(e),t.innerHTML=t.innerHTML+a.articleValue,clearTimeout(r);t.querySelector(".loaderBox").classList.remove("flex"),t.setAttribute("style","")}catch(e){return t.querySelector(".loaderBox").querySelector("span").innerHTML=`Nie udało mi się połączyć z serwerem. Proszę sprawdź swoje połączenie z internetem i spróbuj ponownie. <a href="${n.route.path}" class="loaderBox__btn" data-link>Try Again</a>`,void clearTimeout(r)}}else{const e=document.querySelector("main"),t=Array.from(e.children),o=document.querySelector(".loaderBox");e.setAttribute("style","height: 477px; overflow: hidden;"),o.classList.add("flex");const i=setTimeout((()=>{o.querySelector("span").innerText="Strona ładuje się dłużej niż zwykle. Proszę sprawdzić swoje połączenie z internetem."}),5e3);for(let e=1;e<t.length;e++)t[e].remove();try{if(-1!==n.route.path.indexOf("/articles/")){const t=await a.getHtml("introduction.html");e.appendChild(t),a.setTitle()}else{const t=await a.getHtml();e.appendChild(t),a.setTitle()}clearTimeout(i),o.classList.remove("flex"),e.setAttribute("style","")}catch(e){return o.querySelector("span").innerHTML=`Nie udało mi się połączyć z serwerem. Proszę sprawdź swoje połączenie z internetem i spróbuj ponownie. <a href="${n.route.path}" class="loaderBox__btn" data-link>Try Again</a>`,void clearTimeout(i)}}if(e!==n.route.path&&substringOfHrefAttributes(a.prefix),document.body.offsetWidth<=972){const e=document.querySelector(".phone-menu");e.setAttribute("style","transform: translateX(100%) !important;"),e.classList.add("animate-closePhoneMenu"),e.classList.remove("animate-openPhoneMenu"),burgerButtonElements[0].classList.add("animate-unAnimateBurgerElement1"),burgerButtonElements[0].classList.remove("animate-burgerElement1"),burgerButtonElements[2].classList.add("animate-unAnimateBurgerElement3"),burgerButtonElements[2].classList.remove("animate-burgerElement3"),setTimeout((()=>{burgerButtonElements[1].classList.add("animate-appearBurgerElement2"),burgerButtonElements[1].classList.remove("animate-hiddenBurgerElement2")}),125),openClosePhoneMenuCounter=0}const o=document.querySelectorAll(".navigation-aside__list-element");o&&o.forEach((e=>{e.addEventListener("click",clickedSectionButtons)}))};
window.onload=function(){document.body.addEventListener("click",(t=>{if(t.target.matches("[data-link]"))t.preventDefault(),navigateTo(t.target.href);else if(t.target.matches("[data-img]")){t.preventDefault();const e=t.target.parentNode.getAttribute("href");navigateTo(e)}else t.target.matches("[data-start]")&&(t.preventDefault(),navigateTo("/"))})),sectionButtons&&sectionButtons.forEach((t=>{t.addEventListener("click",clickedSectionButtons)})),targetLinks(),window.addEventListener("scroll",menuAnimation),window.addEventListener("scroll",appearButtonTop),null!=articlesNavigationList&&window.addEventListener("scroll",fixedNavigationAside),null!=articlesNavigationList&&articlesNavigationBtn.addEventListener("click",openArticlesNavigation),buttonTop.addEventListener("click",clickButtonTop),burgerButton.addEventListener("click",openClosePhoneMenu)};
//# sourceMappingURL=main.js.map
