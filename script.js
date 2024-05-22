
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const country = "in";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

let requestURL;

const generateUI = (articles) => {
  container.innerHTML = "";
  articles.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
      <div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg"}" alt="News Image" />
      </div>
      <div class="news-content">
        <div class="news-title">
          ${item.title || "No title available"}
        </div>
        <div class="news-description">
          ${item.description || item.content || "No description available"}
        </div>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>`;
    container.appendChild(card);
  });
};

const getNews = async () => {
  try {
    const response = await fetch(requestURL);
    if (!response.ok) throw new Error("Data unavailable at the moment. Please try again later");
    const data = await response.json();
    if (!data.articles || data.articles.length === 0) throw new Error("No articles available");
    generateUI(data.articles);
  } catch (error) {
    alert(error.message);
  }
};

const selectCategory = (e, category) => {
  document.querySelectorAll(".option").forEach(element => element.classList.remove("active"));
  e.target.classList.add("active");
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  getNews();
};

const createOptions = () => {
  optionsContainer.innerHTML = options.map(option => 
    `<button class="option ${option === "general" ? "active" : ""}" onclick="selectCategory(event,'${option}')">${option}</button>`
  ).join('');
};

const init = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  createOptions();
  getNews();
};

window.onload = init;
