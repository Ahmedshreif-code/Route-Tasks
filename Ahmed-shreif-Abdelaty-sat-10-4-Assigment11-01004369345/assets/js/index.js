// active nav links
let appSections = document.querySelectorAll('.app-section')
let navLinks = document.querySelectorAll('.nav-link')

navLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault()
    let targetSection = document.getElementById(
      this.getAttribute('data-section')
    )
    appSections.forEach(function (section) {
      section.classList.add('hidden')
    })
    navLinks.forEach(function (link) {
      link.classList =
        'nav-link flex items-center space-x-3 px-3 py-2.5 text-gray-400 rounded-lg font-medium transition-colors hover:bg-gray-800/50 hover:text-gray-300'
    })
    targetSection.classList.remove('hidden')
    this.classList =
      'nav-link flex items-center space-x-3 px-3 py-2.5 bg-blue-500/10 text-blue-400 rounded-lg font-medium transition-colors'
  })
})

// toggle sidebar
let sidebar = document.getElementById('sidebar')
let sidebarToggleBtn = document.getElementById('sidebar-toggle')
sidebarToggleBtn.addEventListener('click', function (event) {
  event.stopPropagation()

  sidebar.classList.toggle('sidebar-open')
})
document.addEventListener('click', function (event) {
  if (
    !sidebar.contains(event.target) &&
    sidebar.classList.contains('sidebar-open')
  ) {
    sidebar.classList.remove('sidebar-open')
  }
})

// fetch Get today apod data
async function fetchApodData () {
  const url =
    'https://api.nasa.gov/planetary/apod?api_key=03Hv2ilV5cuh2C9MvgWJKsvY5IIzMYgHvBjJqC5B'

  const response = await fetch(url)

  const data = await response.json()
  displayTodayInspace(data)
  console.log(data)
}

// Display Today in Space data
function displayTodayInspace (data) {
  let apodContainer = document.getElementById('today-in-space')
  let { title, explanation, url, media_type, date } = data
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  let temp = `
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
                  value="${date}"
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
  if (data.code === 500) {
    fetchApodData()
  } else {
    apodContainer.innerHTML = temp
    setupDatePicker()
    let viewFullResBtn = document.querySelector('#apod-image-container button')
    viewFullResBtn.addEventListener('click', viewFullResolution)
  }
}

// get today date in yyyy-mm-dd format
function getToday () {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// setup date picker
function setupDatePicker () {
  const dateInput = document.getElementById('apod-date-input')
  const dateText = document.querySelector('.date-input-wrapper .text-sm')
  const loadBtn = document.getElementById('load-date-btn')
  const todayBtn = document.getElementById('today-apod-btn')

  dateInput.addEventListener('change', function () {
    const selectedDate = this.value

    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    dateText.textContent = formattedDate
  })

  loadBtn.addEventListener('click', function () {
    const selectedDate = dateInput.value
    fetchApodDataByDate(selectedDate)
  })
  todayBtn.addEventListener('click', function () {
    const todayDate = getToday()
    dateInput.value = todayDate
    fetchApodDataByDate(todayDate)
  })
}

// fetch apod data by date
async function fetchApodDataByDate (date) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=03Hv2ilV5cuh2C9MvgWJKsvY5IIzMYgHvBjJqC5B&date=${date}`
  const response = await fetch(url)
  const data = await response.json()
  displayTodayInspace(data)
  console.log(data)
}

// view full resolution image
function viewFullResolution () {
  const apodImage = document.getElementById('apod-image')
  const imageUrl = apodImage.src
  window.open(imageUrl, '_blank')
}

// fetch launches data
async function fetchLaunchesData () {
  const url = 'https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10'
  const response = await fetch(url)
  const data = await response.json()
  console.log(data.results)
  displayLaunches(data.results)
}
let launchesContainer = document.getElementById('featured-launch')
function displayLaunches (data) {
  let {
    image: { image_url },
    name,
    mission: { description },
    pad: {
      country: { name: countryName },
      location: { name: locationName }
    },
    net,
    launch_service_provider: { name: launchServiceProviderName },
    rocket: {
      configuration: { name: rocketName }
    }
  } = data[0]
  netDate = new Date(net)
  const formattedNetDate = netDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  })
  const formattedNetTime = netDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  })
  let daysUntilLaunch = Math.ceil(
    (netDate - new Date()) / (1000 * 60 * 60 * 24)
  )

  let temp = `
        <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        Go
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${launchServiceProviderName}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${rocketName}</span>
                      </div>
                    </div>



                    ${
                      daysUntilLaunch > 0
                        ? `<div
class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">${daysUntilLaunch}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>`
                        : ''
                    }
                    
                  



                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${formattedNetDate}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${formattedNetTime} UTC</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">
                          ${locationName}
                        </p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">
                          ${countryName}
                        </p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <img src="${image_url}" onerror="this.onerror=null; this.src='./assets/images/launch-placeholder.png';" alt="Rocket" class="h-full w-full object-cover" />
                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
        </div>`
  launchesContainer.innerHTML = temp
  let launchesGridContainer = document.getElementById('launches-grid')
  dataRest = structuredClone(data)
  dataRest.shift()
  let temp2 = ``
  dataRest.forEach(launch => {
    let {
      image: { image_url },
      name,
      pad: {
        location: { name: locationName }
      },
      launch_service_provider: { name: launchServiceProviderName },
      net,
      rocket: {
        configuration: { name: rocketName }
      }
    } = launch
    netDate = new Date(net)
    const formattedNetDate = netDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const formattedNetTime = netDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
    temp2 += ` <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <i class="fas fa-space-shuttle hidden text-5xl text-slate-700"></i>
                <img
                  src="${
                    image_url
                      ? image_url
                      : './assets/images/launch-placeholder.png'
                  }"
                   onerror="this.onerror=null; this.src='./assets/images/launch-placeholder.png';"
                  alt="Rocket"
                  class="absolute inset-0 w-full h-full object-cover group-hover:opacity-100 transition-opacity"
                />
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    Go
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launchServiceProviderName}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formattedNetDate}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formattedNetTime}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${rocketName}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${locationName}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`
  })
  launchesGridContainer.innerHTML = temp2
}

// fetch planets data
async function fetchPlanetsData () {
  const url = 'https://solar-system-opendata-proxy.vercel.app/api/planets'
  const response = await fetch(url)
  const data = await response.json()
  console.log(data.bodies)
  displayPlanets(data.bodies)
}

function displayPlanets (data) {
  let planetsContainer = document.getElementById('planets-grid')
  let planetDetailContainer = document.getElementById('planet-detail-container')
  let planetsComparisonTableContainer = document.getElementById(
    'planet-comparison-tbody'
  )

  let temp = ``
  let temp2 = ``
  let temp3 = ``

  let planetColors = {
    Mercury: '#94a3b8',
    Venus: '#f59e0b',
    Earth: '#3b82f6',
    Mars: '#ef4444',
    Jupiter: '#d97706',
    Saturn: '#eab308',
    Uranus: '#06b6d4',
    Neptune: '#6366f1'
  }

  data.forEach(planet => {
    let {
      englishName,
      image,
      semimajorAxis,
      mass: { massValue, massExponent },
      sideralOrbit,
      moons,
      type
    } = planet

    let distanceFromSun = (semimajorAxis / 149597870.7).toFixed(2)
  

    // Our planet card template

    temp += `
      <div
        class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
        data-planet-id="${englishName.toLowerCase()}"
        style="--planet-color: ${planetColors[englishName] || '#eab308'};"
        onmouseover="this.style.borderColor='${
          planetColors[englishName] || '#eab308'
        }'"
        onmouseout="this.style.borderColor='#334155'"
      >

        <div class="relative mb-3 h-24 flex items-center justify-center">
          <img
            class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
            src="${image}"
            alt="${englishName}"
          />
        </div>

        <h4 class="font-semibold text-center text-sm">
          ${englishName}
        </h4>

        <p class="text-xs text-slate-400 text-center">
          ${distanceFromSun} AU
        </p>

      </div>
    `
    let diameter = (planet.meanRadius * 2).toLocaleString('en-US')
      let massKg = massValue * 10 ** massExponent
    let earthMass = 5.9722e24
    let massEarth = massKg / earthMass
let orbitalPeriodYears = (sideralOrbit /365.256);

console.log(sideralOrbit);
//  comparison table template
    temp3 += `
    <tr class="hover:bg-slate-800/30 transition-colors">
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color: ${
                              planetColors[englishName] || '#eab308'
                            }"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >${englishName}</span
                          >
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${distanceFromSun}
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${diameter}
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${massEarth.toFixed(3)} 
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${orbitalPeriodYears >= 1? orbitalPeriodYears.toFixed(1) + " years" : sideralOrbit.toFixed(0) + " days"} 
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${moons ? moons.length : 0}
                      </td>
                      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          class="px-2 py-1 rounded text-xs ${type === 'Terrestrial' ? 'bg-orange-500' : type === 'Gas Giant' ? 'bg-purple-500' : type === 'Ice Giant' ? 'bg-blue-500' : 'bg-gray-500'} text-white"
                          >${type}</span
                        >
                      </td>
                    </tr>
    
    `
  })

  // Display all cards
  planetsContainer.innerHTML = temp
  planetsComparisonTableContainer.innerHTML = temp3

  // Get all cards after creating them
  let planetCards = document.querySelectorAll('.planet-card')

  planetCards.forEach(card => {
    card.addEventListener('click', function () {
      let planetName = card.dataset.planetId

      // Find the clicked planet from API data
      let selectedPlanet = data.find(
        planet => planet.englishName.toLowerCase() === planetName
      )

      let {
        englishName,
        image,
        description,
        semimajorAxis,
        meanRadius,
        mass: { massValue, massExponent },
        density,
        sideralOrbit,
        sideralRotation,
        moons,
        gravity,
        discoveredBy,
        discoveryDate,
        bodyType,
        vol: { volValue, volExponent },
        axialTilt,
        perihelion,
        aphelion,
        eccentricity,
        inclination,
        escape,
        avgTemp
      } = selectedPlanet

      let semimajorAxisInKm =
        (semimajorAxis / 1000000).toFixed(1).toLocaleString() + 'M km'
      let meanRadiusInKm = meanRadius + ' km'
      let massInKg = `${massValue} × 10^${massExponent} kg`
      let densityInGPerCm3 = density.toFixed(2) + ' g/cm³'
      let sideralOrbitInDays = sideralOrbit.toFixed(2) + ' days'
      let sideralRotationInHours = sideralRotation.toFixed(2) + ' hours'
      let volumeInKm3 = `${volValue} × 10^${volExponent} km³`
      let perihelionInKm = (perihelion / 1000000).toFixed(1) + 'M km'
      let aphelionInKm = (aphelion / 1000000).toFixed(1) + 'M km'
      let escapeVelocityInKmPerS = (escape / 1000).toFixed(2) + ' km/s'
    //   template for planet detail view
      temp2 = `
        <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${image}"
                    alt="${englishName} planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${englishName}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${semimajorAxisInKm}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${meanRadiusInKm}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${massInKg}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${densityInGPerCm3}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${sideralOrbitInDays}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${sideralRotationInHours}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">
                    ${moons?.length ? moons.length : 0}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovered By</span>
                    <span
                      id="planet-discoverer"
                      class="font-semibold text-right"
                      >${
                        discoveredBy ? discoveredBy : 'Known since antiquity'
                      }</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold"
                      >${discoveryDate ? discoveryDate : 'Ancient times'}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold"
                      >${bodyType}</span
                    >
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${volumeInKm3}</span>
                  </div>
                </div>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >
                      Mass:${massInKg}
                    </span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >
                        Surface gravity: ${gravity} m/s²
                      </span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >
                    Density: ${density} g/cm³
                      </span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >
                    Axial tilt: ${axialTilt}°
                      </span
                    >
                  </li>
                </ul>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold"
                      >${perihelionInKm}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold"
                      >${aphelionInKm}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold"
                      >${eccentricity}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold"
                      >${inclination}°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold"
                      >${axialTilt}°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${avgTemp}°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold"
                      >${escapeVelocityInKmPerS}</span
                    >
                  </div>
                </div>
              </div>
              <button
                class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
      `
      planetDetailContainer.innerHTML = temp2
    })
  })
}

fetchApodData()
fetchLaunchesData()
fetchPlanetsData()
