// const API_KEY = "0b7dd41d4d2a407bb258e514a7c914d1";
// const URL = `https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`;
// const SEARCH_URL = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${API_KEY}`;

const cards = document.querySelector(".cards");
const todayDate = document.querySelector(".date");
const searchBtn = document.getElementById("search-btn");
const input = document.querySelector("input");
const totalResults = document.querySelector(".total-results");

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// time
let date = new Date();
let month = months[date.getMonth()];
let day = date.getDay();
let yaer = date.getFullYear();

let now = `${month}/${day}/${yaer}`;

todayDate.textContent = now;

async function showMenu(q) {
  var url =
    "https://newsapi.org/v2/everything?" +
    `q=` +
    q +
    `&from=2024-03-29&` +
    "to=2024-03-28&" +
    "sortBy=popularity&" +
    "pageSize=20&" +
    "language=en&" +
    "apiKey=0b7dd41d4d2a407bb258e514a7c914d1";
  var req = new Request(url);

  const res = await fetch(req);
  const data = await res.json();
  console.log(data);

  // total results
  totalResults.textContent = `Total Search Results : /${data.totalResults}/`;

  let notAuthor = data.articles.filter((item) => item.author);

  let displayMenu = notAuthor
    .map((item) => {
      const { author, title, url, publishedAt, description, urlToImage } = item;
      return ` 

  
  
        <div class="card">
        <img
        src=${
          urlToImage
            ? urlToImage
            : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c3xlbnwwfHwwfHx8MA%3D%3D"
        }
            alt="mac"
            />
            <div class="card-info">
            <h2>${shortenText(title)}...</h2>
            <p class="description">${description.slice(0, 50)}...</p>
            <footer>
              <p>${author.slice(0, 24)}</p>
              <small>${publishedAt}</small>
            </footer>
            </div>
            <a href=${url} target="_blank">
            <button class="read-more">read more</button>
            </a>
        </div>
      
  
  `;
    })
    .join("");

  cards.innerHTML = displayMenu;
}
let TopHeadLines = "top-headlines";

showMenu(TopHeadLines);


function shortenText(title) {
  return title.split(" ").slice(0, 10).join(" ");
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let query = input.value;

  if (input.value) {
    showMenu(query);
  }
});
