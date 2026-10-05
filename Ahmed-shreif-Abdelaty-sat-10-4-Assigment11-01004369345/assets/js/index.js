// active nav links
let appSections = document.querySelectorAll('.app-section');
let navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        let targetSection = document.getElementById(this.getAttribute('data-section'));
        appSections.forEach(function(section) {
            section.classList.add("hidden");
        });
        navLinks.forEach(function(link) {
            link.classList="nav-link flex items-center space-x-3 px-3 py-2.5 text-gray-400 rounded-lg font-medium transition-colors hover:bg-gray-800/50 hover:text-gray-300"
        });
        targetSection.classList.remove("hidden");
        this.classList="nav-link flex items-center space-x-3 px-3 py-2.5 bg-blue-500/10 text-blue-400 rounded-lg font-medium transition-colors"
    
    });
});

// fetch Get today apod data

async function fetchApodData() {
    let url = "https://api.nasa.gov/planetary/apod?api_key=03Hv2ilV5cuh2C9MvgWJKsvY5IIzMYgHvBjJqC5B";
   
    const response = await fetch(url);

    const data = await response.json();
    displayTodayInspace(data);
    console.log(data);
}
function displayTodayInspace(data) {
    let apodContainer = document.getElementById("today-in-space");
let { title, explanation, url,media_type,date } = data;
const dateObj = new Date(date);
const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"})
    
    let temp=`
     <div class="max-w-7xl mx-auto">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
          >
            <div>
              <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
                Today in Space
              </h2>
              <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
                Astronomy Picture of the Day - ${formattedDate}
              </p>
            </div>
            <div class="flex items-center space-x-2 md:space-x-3">
              <label for="apod-date-input" class="date-input-wrapper">
                <input
                  type="date"
                  id="apod-date-input"
                  class="custom-date-input"
                  value="${getToday()}"
                  max="${getToday()}"
                  min="1995-06-16"
                />
                <span class="text-sm">${formattedDate}</span>
              </label>
              <button
                id="load-date-btn"
                class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2"
              >
                <i class="fas fa-search"></i>
                <span class="hidden sm:inline">Load</span>
              </button>
              <button
                id="today-apod-btn"
                class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm"
              >
                Today
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div class="xl:col-span-2">
              <div
                id="apod-image-container"
                class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center"
              >
                <div id="apod-loading" class="text-center hidden">
                  <i
                    class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"
                  ></i>
                  <p class="text-slate-400">Loading today's image...</p>
                </div>
                <!-- Using a placeholder image or one from assets if available. Using a reliable external placeholder for now or a relative path if we knew one. Sticking to a colored placeholder div if no image, but let's try a realistic placeholder or just the rocket icon style used elsewhere if we want to be safe. But user wants design. I'll use a relative path assuming assets exist or a generic space placeholder. -->
                <img
                  id="apod-image"
                  class="w-full h-full object-cover"
                  src="${url}"
                  alt="Astronomy Picture of the Day"
                />
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div class="absolute bottom-6 left-6 right-6">
                    <button
                      class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors"
                    >
                      <i class="fas fa-expand mr-2"></i>View Full Resolution
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-4 md:space-y-6">
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6"
              >
                <h3
                  id="apod-title"
                  class="text-lg md:text-2xl font-semibold mb-3 md:mb-4"
                >
                  ${title}
                </h3>
                <div
                  class="flex items-center space-x-4 mb-4 text-sm text-slate-400"
                >
                  <span id="apod-date-detail"
                    ><i class="far fa-calendar mr-2"></i>${date}</span
                  >
                </div>
                <p
                  id="apod-explanation"
                  class="text-slate-300 leading-relaxed mb-4"
                >
                    ${explanation}
                </p>
                <div
                  id="apod-copyright"
                  class="text-xs text-slate-400 italic mb-4"
                >
                  &copy; NASA/JPL
                </div>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                  Image Details
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-slate-400">Date</span>
                    <span id="apod-date-info" class="font-medium"
                      >${date}</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Media Type</span>
                    <span id="apod-media-type" class="font-medium">${media_type}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Source</span>
                    <span class="font-medium">NASA APOD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `
    if(data.code!==500){
    apodContainer.innerHTML=temp;
    setupDatePicker();
let viewFullResBtn = document.querySelector("#apod-image-container button");
viewFullResBtn.addEventListener("click", viewFullResolution);
}
    

}
function getToday(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function setupDatePicker() {
    const dateInput = document.getElementById("apod-date-input");
    const dateText = document.querySelector(".date-input-wrapper .text-sm");
    const loadBtn = document.getElementById("load-date-btn");
    const todayBtn = document.getElementById("today-apod-btn");

    dateInput.addEventListener("change", function () {
        const selectedDate = this.value;

        const formattedDate = new Date(selectedDate).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

        dateText.textContent = formattedDate;

      
    });

  loadBtn.addEventListener("click", function () {

        const selectedDate = dateInput.value;

        fetchApodDataByDate(selectedDate);

    });
    todayBtn.addEventListener("click", function () {
        const todayDate = getToday();
        dateInput.value = todayDate;
         fetchApodDataByDate(todayDate);
    });
}
fetchApodData()

async function fetchApodDataByDate(date) {
    let url=`https://api.nasa.gov/planetary/apod?api_key=03Hv2ilV5cuh2C9MvgWJKsvY5IIzMYgHvBjJqC5B&date=${date}`
    const response = await fetch(url);
    const data = await response.json();
    displayTodayInspace(data);
    console.log(data);
    
}

function viewFullResolution() {
    const apodImage = document.getElementById("apod-image");
    const imageUrl = apodImage.src;
    window.open(imageUrl, "_blank");
}
