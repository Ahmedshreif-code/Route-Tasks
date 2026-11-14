class App {
  constructor () {
    this.countryDetailsURL =
      'https://countriesnow.space/api/v0.1/countries/info?returns=capital,currency,flag,iso2,iso3'
    this.countryDetailsPromise = null
    this.availableCountriesURL =
      'https://date.nager.at/api/v3/AvailableCountries'
    this.cityRequestId = 0
    this.weatherCastEndPoint = `https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.006&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`

    this.currencyAPIKey = '82c7d5e4b54f55ada8c00be6'
    this.currencyBaseURL = `https://v6.exchangerate-api.com/v6/${this.currencyAPIKey}/`
    this.selectedCountryCurrency = null
    this.initCurrencyEventListeners()
    this.countryData = []
    this.weatherData = []
    this.holidayData = []
    this.eventsData = []
    this.sunTimesData = {}
    this.longWeekendsData = []

    this.savedPlans = JSON.parse(localStorage.getItem('wanderlust_plans')) || []
    this.selectCountrytEventListeners()
    this.clearSelectionEventListeners()
    this.exploreBtnEventListeners()
    this.setupMobileMenu()
    this.initRounting()
    this.setupMyPlansListeners()
    this.attachHeartListeners()
    this.fetchCountriesAvailable()
    this.updatePlansUI()
    this.selectedCountry = null
    this.selectedCity = null
    this.coords = null
    this.selectedYear = 2026
    this.selectedCountryTimezone = null
    this.updateDateTime()
    setInterval(this.updateDateTime, 60000)
  }
  fetchCountryDetailsData = async () => {
    if (!this.countryDetailsPromise) {
      this.countryDetailsPromise = fetch(this.countryDetailsURL)
        .then(async response => {
          if (!response.ok) {
            throw new Error(
              `Country details API error: ${response.status}`
            )
          }

          const data = await response.json()
          if (data.error || !Array.isArray(data.data)) {
            throw new Error(data.msg || 'Invalid country details response')
          }
          return data.data
        })
        .catch(error => {
          this.countryDetailsPromise = null
          throw error
        })
    }

    return this.countryDetailsPromise
  }
  fetchCountryCities = async countryCode => {
    const countryDetails = await this.fetchCountryDetailsData()
    const country = countryDetails.find(item => item.iso2 === countryCode)
    if (!country) {
      throw new Error(`No country details found for ${countryCode}`)
    }

    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries/cities',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: country.name })
      }
    )
    if (!response.ok) {
      throw new Error(`Country cities API error: ${response.status}`)
    }

    const data = await response.json()
    if (data.error || !Array.isArray(data.data)) {
      throw new Error(data.msg || 'Invalid country cities response')
    }
    return data.data
  }
  fetchCurrencyConversion = async (amount, fromCode, toCode) => {
    const response = await fetch(
      `${this.currencyBaseURL}pair/${fromCode}/${toCode}/${amount}`
    )
    if (!response.ok) {
      throw new Error(`Currency API error: ${response.status}`)
    }

    const data = await response.json()
    if (
      data.result !== 'success' ||
      !Number.isFinite(data.conversion_rate) ||
      !Number.isFinite(data.conversion_result)
    ) {
      throw new Error(
        data['error-type'] || 'Invalid currency conversion response'
      )
    }

    return data
  }
  handleConversion = async (notifyInvalidInput = false) => {
    const amount = Number(document.querySelector('#currency-amount').value)
    const from = document.querySelector('#currency-from').value
    const to = document.querySelector('#currency-to').value

    if (!Number.isFinite(amount) || amount < 0 || !from || !to) {
      if (notifyInvalidInput) {
        this.showToast(
          'Enter a valid amount and select both currencies.',
          'error'
        )
      }
      return
    }

    try {
      const { conversion_rate: rate, conversion_result: result } =
        await this.fetchCurrencyConversion(amount, from, to)
      const resultContainer = document.querySelector('#currency-result')
      resultContainer.querySelector('.conversion-from .amount').textContent =
        amount.toFixed(2)
      resultContainer.querySelector(
        '.conversion-from .currency-code'
      ).textContent = from
      resultContainer.querySelector('.conversion-to .amount').textContent =
        result.toFixed(2)
      resultContainer.querySelector(
        '.conversion-to .currency-code'
      ).textContent = to
      resultContainer.querySelector(
        '.exchange-rate-info p'
      ).textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`
    } catch (error) {
      console.error('Currency conversion failed:', error)
      this.showToast('Unable to convert currencies. Please try again.', 'error')
    }
  }
  initCurrencyEventListeners = () => {
    const convertBtn = document.querySelector('#convert-btn')
    const swapBtn = document.querySelector('#swap-currencies-btn')

    document
      .querySelector('#currency-from')
      .addEventListener('change', () => this.handleConversion())
    document
      .querySelector('#currency-to')
      .addEventListener('change', () => this.handleConversion())
    convertBtn.addEventListener('click', () => this.handleConversion(true))

    swapBtn.addEventListener('click', () => {
      const fromEle = document.querySelector('#currency-from')
      const toEle = document.querySelector('#currency-to')
      const temp = fromEle.value
      fromEle.value = toEle.value
      toEle.value = temp
      this.handleConversion() 
    })
  }
  populateCurrencySelectors = async availableCountries => {
    const fromSelect = document.querySelector('#currency-from')
    const toSelect = document.querySelector('#currency-to')
    const previousFrom = fromSelect.value || 'USD'
    const previousTo = toSelect.value || 'EGP'
    const availableCountryCodes = new Set(
      availableCountries.map(country => country.countryCode.toUpperCase())
    )
    const countryDetails = await this.fetchCountryDetailsData()
    const currencyCodes = [
      ...new Set(
        countryDetails
          .filter(country =>
            availableCountryCodes.has(country.iso2?.toUpperCase())
          )
          .map(country => country.currency?.trim().toUpperCase())
          .filter(Boolean)
      )
    ].sort()

    if (currencyCodes.length === 0) {
      throw new Error('No currencies found for available countries')
    }

    const currencyNames = new Intl.DisplayNames(['en'], {
      type: 'currency'
    })

    fromSelect.replaceChildren()
    toSelect.replaceChildren()

    currencyCodes.forEach(code => {
      const name = currencyNames.of(code) || code
      fromSelect.add(new Option(`${code} - ${name}`, code))
      toSelect.add(new Option(`${code} - ${name}`, code))
    })

    const fallbackFrom = currencyCodes.includes('USD')
      ? 'USD'
      : currencyCodes[0]
    const fallbackTo = currencyCodes.includes('EGP')
      ? 'EGP'
      : currencyCodes.find(code => code !== fallbackFrom) || fallbackFrom

    fromSelect.value = currencyCodes.includes(previousFrom)
      ? previousFrom
      : fallbackFrom
    toSelect.value = currencyCodes.includes(previousTo) ? previousTo : fallbackTo
  }
  fetchCountriesAvailable = async () => {
    try {
      const response = await fetch(this.availableCountriesURL)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      const text = await response.text()
      if (!text) {
        throw new Error('Empty response from Available countries API')
      }
      const data = JSON.parse(text)
      const selectCountryEle = document.querySelector('#global-country')
      const selectedCountryCode = selectCountryEle.value
      selectCountryEle
        .querySelectorAll('option:not(:first-child)')
        .forEach(option => option.remove())
      const countriesSorted = data.sort((a, b) => a.name.localeCompare(b.name))
      countriesSorted.forEach(country => {
        const option = document.createElement('option')
        option.value = country.countryCode
        option.textContent = country.name
        selectCountryEle.append(option)
      })
      selectCountryEle.value = selectedCountryCode
      this.renderCountryOptions()
      this.populateCurrencySelectors(countriesSorted).catch(error => {
        console.error('Currency selectors fetch failed:', error)
        this.showToast('Unable to load currencies for available countries.', 'error')
      })
    } catch (error) {
      console.error('Available Countries fetch failed:', error.message)
    }
  }
  fetchHolidayData = async () => {
    this.showLoading('Fetching holidays...')
    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${this.selectedYear}/${this.selectedCountry}`
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const text = await response.text()
      if (!text) {
        throw new Error('Empty response from holiday API')
      }

      const data = JSON.parse(text)
      if (!Array.isArray(data)) {
        throw new Error('Invalid holiday response')
      }
      this.holidayData = data
      document.querySelector('#stat-holidays').textContent = data.length
      this.displayHolidayInfo(this.holidayData)
    } catch (error) {
      console.error('Holiday fetch failed:', error.message)
      console.error('Error details:', error)
      document.querySelector('#stat-holidays').textContent = '17'
      document.querySelector('#holidays-content').innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-calendar-xmark"></i></div>
        <h3>Unable to Load Holidays</h3>
        <p>Could not retrieve holidays for ${this.selectedYear}. Please try again later.</p>
      </div>`
    } finally {
      const holidayView = document.querySelector('#holidays-view')
      const holidayHeader = holidayView.querySelector('.view-header-content')
      const holidayBadge = holidayView.querySelector('.current-selection-badge')
      holidayHeader.querySelector(
        'p'
      ).textContent = `Browse public holidays for ${this.countryData.name.common} and plan your trips around them`

      holidayBadge.querySelector('img').src = this.countryData.flags.png
      holidayBadge.querySelector('img').alt = this.countryData.name.common
      holidayBadge.querySelector('span').textContent =
        this.countryData.name.common
      holidayBadge.querySelector('.selection-year').textContent =
        this.selectedYear

      holidayView.querySelector('.view-header-selection').style.display = 'flex'
      this.hideLoading()
    }
  }

  fetchEventsData = async () => {
    const eventsContainer = document.querySelector('#events-content')
    if (!this.selectedCity) {
      eventsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-ticket"></i></div>
        <h3>No City Selected</h3>
        <p>Select a country and city from the dashboard to discover events</p>
        <button class="btn btn-primary" id="event-redirect">
          <i class="fa-solid fa-globe"></i> Go to Dashboard
        </button>
      </div>`
      document.querySelector('#event-redirect').onclick = () =>
        this.mapViews(
          'dashboard',
          document.querySelector('[data-view="dashboard"]')
        )
      return
    }
    this.showLoading('Loading events details...')
    const apiKey = 'VwECw2OiAzxVzIqnwmKJUG41FbeXJk1y'
    const city = this.selectedCity || 'New York'
    const countryCode = this.selectedCountry || 'US'
    try {
      const fetchEvents = async includeCity => {
        const eventsURL = new URL(
          'https://app.ticketmaster.com/discovery/v2/events.json'
        )
        eventsURL.searchParams.set('apikey', apiKey)
        eventsURL.searchParams.set('countryCode', countryCode)
        eventsURL.searchParams.set('size', '20')
        if (includeCity) eventsURL.searchParams.set('city', city)

        const response = await fetch(eventsURL)
        if (!response.ok) {
          throw new Error(`Events API error: ${response.status}`)
        }

        const data = await response.json()
        return data._embedded?.events || []
      }

      let events = await fetchEvents(true)
      let showingCountryEvents = false
      if (events.length === 0) {
        events = await fetchEvents(false)
        showingCountryEvents = events.length > 0
      }

      const eventsView = document.querySelector('#events-view')
      const eventsHeader = eventsView.querySelector('.view-header-content')
      const eventsBadge = eventsView.querySelector('.current-selection-badge')

      eventsHeader.querySelector(
        'p'
      ).textContent = showingCountryEvents
        ? `No events found in ${city}. Showing events across ${this.countryData.name.common}.`
        : `Discover concerts, sports, theatre and more in ${city}`

      eventsBadge.querySelector('img').src = this.countryData.flags.png
      eventsBadge.querySelector('img').alt = this.countryData.name.common
      eventsBadge.querySelector('span').textContent =
        this.countryData.name.common
      eventsBadge.querySelector(
        '.selection-city'
      ).textContent = ` • ${city}`

      eventsView.querySelector('.view-header-selection').style.display = 'flex'
      this.eventsData = events
      this.displayEventsInfo(this.eventsData)
    } catch (error) {
      console.error('Events fetch failed:', error.message)
      console.error('Error details:', error)
      document.querySelector('#events-content').innerHTML = `
      <div class="event-error" style="padding: 2rem; text-align: center; color: var(--text-secondary);">
        <i class="fa-solid fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <p>Unable to load events for ${city}, ${countryCode}.</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">The Ticketmaster API may be temporarily unavailable. Please try again later or select a different city.</p>
      </div>
    `
    } finally {
      this.hideLoading()
    }
  }

  fetchSunTimesData = async () => {
    try {
      if (!this.coords) {
        throw new Error('No coordinates available')
      }

      const lat = this.coords[0]
      const lng = this.coords[1]
      const today = new Date()
      const dateStr = today.toISOString().split('T')[0] // Format: YYYY-MM-DD

      const response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${dateStr}&formatted=0`
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const text = await response.text()
      if (!text) {
        throw new Error('Empty response from Sunrise-Sunset API')
      }

      const data = JSON.parse(text)
      if (data.status !== 'OK') {
        throw new Error('API returned error status')
      }

      this.sunTimesData = data.results
      this.displaySunTimesInfo(this.sunTimesData)
    } catch (error) {
      console.error('Sun times fetch failed:', error.message)
      document.querySelector('#sun-times-content').innerHTML = `
      <div class="sun-error" style="padding: 2rem; text-align: center; color: var(--text-secondary);">
        <i class="fa-solid fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <p>Unable to load sun times data for this location.</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Please select a country to view sun times.</p>
      </div>
    `
    }
  }

  fetchLongWeekendsData = async () => {
    this.showLoading('Loading long weekends details...')
    try {
      if (!this.selectedCountry) {
        throw new Error('No country selected')
      }

      const response = await fetch(
        `https://date.nager.at/api/v3/LongWeekend/${this.selectedYear}/${this.selectedCountry}`
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const text = await response.text()
      if (!text) {
        throw new Error('Empty response from Long Weekend API')
      }

      const data = JSON.parse(text)
      if (!data || data.length === 0) {
        this.displayNoLongWeekendsState()
        return
      }

      this.longWeekendsData = data
      this.displayLongWeekendsInfo(this.longWeekendsData)
    } catch (error) {
      console.error('Long weekends fetch failed:', error.message)
      this.displayNoLongWeekendsState()
    } finally {
      this.hideLoading()
    }
  }

  displayNoLongWeekendsState = () => {
    document.querySelector('#lw-content').innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">
        <i class="fa-solid fa-umbrella-beach"></i>
      </div>
      <h3>No Long Weekends</h3>
      <p>No long weekends found for ${this.selectedYear}</p>
    </div>
  `
  }

  fetchWeatherData = async () => {
    this.showLoading('Loading weather details...')
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${this.coords[0]}&longitude=${this.coords[1]}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`
      )
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      const text = await response.text()
      if (!text) {
        throw new Error('Empty response from Weather API')
      }
      const data = JSON.parse(text)
      this.weatherData = data
      this.displayWeatherInfo(this.weatherData)
    } catch (error) {
      console.error('Weather fetch failed:', error.message)

      document.querySelector('#weather-content').innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <i class="fa-solid fa-cloud-sun"></i>
        </div>
        <h3>No Weather Data Found</h3>
        <p>Unable to retrieve weather information for ${this.selectedCity} in ${this.selectedYear}. Please try again later.</p>
      </div>
    `
    } finally {
      this.hideLoading()
    }
  }
  fetchCountryData = async countryCode => {
    this.showLoading('Loading destination details...')
    try {
      const countryDetails = await this.fetchCountryDetailsData()
      const countryInfo = countryDetails.find(
        country => country.iso2 === countryCode
      )
      if (!countryInfo) {
        throw new Error(`No country details found for ${countryCode}`)
      }

      const cityName =
        document.querySelector('#global-city').value ||
        countryInfo.capital

      const geocodingURL = new URL(
        'https://geocoding-api.open-meteo.com/v1/search'
      )
      geocodingURL.searchParams.set('name', cityName)
      geocodingURL.searchParams.set('countryCode', countryCode)
      geocodingURL.searchParams.set('count', '10')
      geocodingURL.searchParams.set('language', 'en')
      geocodingURL.searchParams.set('format', 'json')

      const geocodingResponse = await fetch(geocodingURL)
      if (!geocodingResponse.ok) {
        throw new Error(`Geocoding API error: ${geocodingResponse.status}`)
      }

      const geocodingData = await geocodingResponse.json()
      const cityLocation = geocodingData.results?.find(
        location => location.country_code === countryCode
      )
      if (!cityLocation) {
        throw new Error(`No coordinates found for ${cityName}`)
      }

      let countryMetadata = null
      try {
        const metadataResponse = await fetch(
          'https://countries.trevorblades.com/',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `{ country(code: "${countryCode}") { phone continent { name } languages { code name } } }`
            })
          }
        )
        if (!metadataResponse.ok) {
          throw new Error(
            `Country metadata API error: ${metadataResponse.status}`
          )
        }

        const metadataData = await metadataResponse.json()
        if (metadataData.errors?.length || !metadataData.data?.country) {
          throw new Error('Invalid country metadata response')
        }
        countryMetadata = metadataData.data.country
      } catch (error) {
        console.error('Additional country metadata fetch failed:', error)
      }

      let countryBorders = []
      try {
        const bordersResponse = await fetch(
          `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
        )
        if (!bordersResponse.ok) {
          throw new Error(`Country borders API error: ${bordersResponse.status}`)
        }

        const bordersData = await bordersResponse.json()
        countryBorders = Array.isArray(bordersData.borders)
          ? bordersData.borders.map(border => border.countryCode)
          : []
      } catch (error) {
        console.error('Country borders fetch failed:', error)
      }

      const countryFlag =
        countryInfo.flag ||
        `https://flagcdn.com/w640/${countryCode.toLowerCase()}.png`
      const continent = countryMetadata?.continent?.name || 'Not available'
      const currencyCode = countryInfo.currency
      const currencyName = currencyCode
        ? new Intl.DisplayNames(['en'], { type: 'currency' }).of(currencyCode) ||
          currencyCode
        : ''
      const currencySymbol = currencyCode
        ? new Intl.NumberFormat('en', {
            style: 'currency',
            currency: currencyCode,
            currencyDisplay: 'narrowSymbol'
          })
            .formatToParts(0)
            .find(part => part.type === 'currency')?.value || ''
        : ''
      this.countryData = {
        name: { common: countryInfo.name, official: countryInfo.name },
        flags: {
          svg: countryFlag,
          png: `https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`,
          alt: `${countryInfo.name} flag`
        },
        region: continent,
        subregion: 'Not available',
        population: null,
        area: null,
        continents: [continent],
        idd: {
          root: countryMetadata?.phone ? `+${countryMetadata.phone}` : '',
          suffixes: []
        },
        car: { side: '' },
        startOfWeek: '',
        timezones: [cityLocation.timezone],
        currencies: currencyCode
          ? {
              [currencyCode]: {
                name: currencyName,
                symbol: currencySymbol
              }
            }
          : {},
        languages: Object.fromEntries(
          (countryMetadata?.languages || []).map(language => [
            language.code,
            language.name
          ])
        ),
        borders: countryBorders,
        capital: [countryInfo.capital]
      }
      this.selectedCountryTimezone = cityLocation.timezone
      this.updateCountryClock()
      this.coords = [cityLocation.latitude, cityLocation.longitude]
      this.selectedCity = cityName
      this.selectedCountryCurrency = Object.keys(this.countryData.currencies)[0]
      const countryCurrency = Object.keys(this.countryData.currencies)[0]
      const fromSelect = document.querySelector('#currency-from')
      if (fromSelect && countryCurrency) {
        fromSelect.value = countryCurrency
      }
      this.displayCountryInfo(this.countryData)
      // Update the flag in destination component
      const countryFlagInDestinationComponent = document.querySelector(
        '#selected-country-flag'
      )
      countryFlagInDestinationComponent.setAttribute(
        'src',
        `${this.countryData.flags.png}`
      )
      countryFlagInDestinationComponent.setAttribute(
        'alt',
        `${this.countryData.name.common} flag`
      )
      // update the country name
      document.querySelector('#selected-country-name').textContent =
        this.countryData.name.common
      // update the city name
      document.querySelector(
        '#selected-city-name'
      ).textContent = `• ${this.selectedCity}`
      // Show the selected destination component
      document.querySelector('#selected-destination').classList.remove('hidden')
      console.log(this.countryData)
      return true
    } catch (error) {
      console.error('Country fetch failed:', error)
      this.showToast(
        'Failed to load destination details. Please try again.',
        'error'
      )
      return false
    } finally {
      this.hideLoading()
    }
  }
  selectCountrytEventListeners = () => {
    const selectCountryEle = document.querySelector('#global-country')
    const selectWrapper = document.querySelector('#country-select-wrapper')
    const selectTrigger = document.querySelector('#country-select-trigger')
    const selectDropdown = document.querySelector('#country-select-dropdown')
    const selectedText = document.querySelector('#country-selected-text')
    const selectedFlag = document.querySelector('#country-select-flag')
    const countryOptions = document.querySelector('#country-select-options')
    const countrySearchInput = document.querySelector('#country-search')
    const citySelect = document.querySelector('#global-city')
    const closeCountryDropdown = () => {
      selectDropdown.classList.remove('open')
      selectTrigger.classList.remove('open')
      selectTrigger.setAttribute('aria-expanded', 'false')
    }

    selectTrigger.addEventListener('click', () => {
      const isOpen = selectDropdown.classList.toggle('open')
      selectTrigger.classList.toggle('open', isOpen)
      selectTrigger.setAttribute('aria-expanded', String(isOpen))
      if (isOpen) countrySearchInput.focus()
    })

    document.addEventListener('click', event => {
      if (!selectWrapper.contains(event.target)) closeCountryDropdown()
    })

    countrySearchInput.addEventListener('input', () => {
      this.renderCountryOptions(countrySearchInput.value)
    })
    countrySearchInput.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeCountryDropdown()
        selectTrigger.focus()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        countryOptions.querySelector('[role="option"]')?.focus()
      }
    })

    selectCountryEle.addEventListener('change', async () => {
      const countryCode = selectCountryEle.value
      const selectedOption = selectCountryEle.selectedOptions[0]
      selectedText.textContent = selectedOption?.textContent || 'Select Country'
      selectedText.classList.toggle('placeholder', !countryCode)
      selectedFlag.replaceChildren()
      if (countryCode) {
        const flag = document.createElement('img')
        flag.className = 'flag-img'
        flag.src = `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`
        flag.alt = ''
        selectedFlag.append(flag)
      }
      this.renderCountryOptions(countrySearchInput.value)
      closeCountryDropdown()

      const requestId = ++this.cityRequestId
      this.selectedCountry = null
      this.selectedCity = null
      this.coords = null
      this.countryData = null
      document.querySelector('#stat-holidays').textContent = '17'
      this.selectedCountryTimezone = null
      clearInterval(this.countryClockInterval)
      document.querySelector('#selected-destination').classList.add('hidden')
      document
        .querySelector('#dashboard-country-info-section')
        .classList.add('hidden')

      citySelect.replaceChildren(
        new Option(
          countryCode ? 'Loading popular cities...' : 'Select a country first',
          ''
        )
      )
      citySelect.disabled = true
      if (!countryCode) return

      try {
        const cities = await this.fetchCountryCities(countryCode)
        if (requestId !== this.cityRequestId) return

        citySelect.replaceChildren(new Option('Select a city (optional)', ''))
        cities.forEach(city => citySelect.add(new Option(city, city)))
        citySelect.disabled = false
        if (cities.length === 0) {
          citySelect.replaceChildren(
            new Option('No cities available; capital will be used', '')
          )
        }
      } catch (error) {
        if (requestId !== this.cityRequestId) return
        console.error('Cities fetch failed:', error)
        citySelect.replaceChildren(
          new Option('Cities unavailable; capital will be used', '')
        )
        citySelect.disabled = false
        this.showToast('Unable to load cities for this country.', 'error')
      }
    })
  }
  renderCountryOptions = (searchTerm = '') => {
    const countrySelect = document.querySelector('#global-country')
    const countryOptions = document.querySelector('#country-select-options')
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase()
    countryOptions.replaceChildren()

    const matchingOptions = Array.from(countrySelect.options)
      .slice(1)
      .filter(option =>
        `${option.value} ${option.textContent}`
          .toLocaleLowerCase()
          .includes(normalizedSearch)
      )

    if (matchingOptions.length === 0) {
      const noResults = document.createElement('div')
      noResults.className = 'custom-select-option no-results'
      noResults.textContent = 'No countries found'
      countryOptions.append(noResults)
      return
    }

    matchingOptions.forEach(option => {
      const countryOption = document.createElement('button')
      countryOption.type = 'button'
      countryOption.className = 'custom-select-option'
      countryOption.setAttribute('role', 'option')
      countryOption.setAttribute(
        'aria-selected',
        String(option.value === countrySelect.value)
      )
      if (option.value === countrySelect.value) {
        countryOption.classList.add('selected')
      }

      const flag = document.createElement('img')
      flag.className = 'flag-img'
      flag.src = `https://flagcdn.com/w40/${option.value.toLowerCase()}.png`
      flag.alt = ''
      flag.loading = 'lazy'

      const countryName = document.createElement('span')
      countryName.className = 'country-name'
      countryName.textContent = option.textContent

      const countryCode = document.createElement('span')
      countryCode.className = 'country-code'
      countryCode.textContent = option.value

      countryOption.append(flag, countryName, countryCode)
      countryOption.addEventListener('click', () => {
        countrySelect.value = option.value
        document.querySelector('#country-search').value = ''
        countrySelect.dispatchEvent(new Event('change', { bubbles: true }))
      })
      countryOption.addEventListener('keydown', event => {
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          countryOption.nextElementSibling?.focus()
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          if (countryOption.previousElementSibling) {
            countryOption.previousElementSibling.focus()
          } else {
            document.querySelector('#country-search').focus()
          }
        } else if (event.key === 'Escape') {
          document
            .querySelector('#country-select-dropdown')
            .classList.remove('open')
          const trigger = document.querySelector('#country-select-trigger')
          trigger.classList.remove('open')
          trigger.setAttribute('aria-expanded', 'false')
          trigger.focus()
        }
      })

      countryOptions.append(countryOption)
    })
  }
  clearSelectionEventListeners = () => {
    const closeBTN = document.querySelector('#clear-selection-btn')
    closeBTN.addEventListener('click', () => {
      const globalCountrySelection = document.querySelector('#global-country')
      globalCountrySelection.value = ''
      globalCountrySelection.dispatchEvent(new Event('change'))
      const globalCitySelection = document.querySelector('#global-city')
      globalCitySelection.innerHTML = `<option value='' selected disabled><i class="fa-solid fa-city"></i> Select a City</option>`
      document.querySelector('#selected-destination').classList.add('hidden')
      document
        .querySelector('#dashboard-country-info-section')
        .classList.add('hidden')
      this.selectedCountry = null
      this.selectedCity = null
      this.coords = null
      this.countryData = null
      document.querySelector('#stat-holidays').textContent = '17'
      this.cityRequestId++
      globalCitySelection.disabled = true
      clearInterval(this.countryClockInterval)
      this.selectedCountryTimezone = null
    })
  }
  exploreBtnEventListeners = () => {
    const exploreBTN = document.querySelector('#global-search-btn')
    const countrySelect = document.querySelector('#global-country')
    const citySelect = document.querySelector('#global-city')
    const clearSelectionButton = document.querySelector('#clear-selection-btn')
    exploreBTN.addEventListener('click', async () => {
      const countryCode = countrySelect.value
      if (!countryCode) {
        this.showToast('Please select a country before exploring.', 'error')
        return
      }
      exploreBTN.disabled = true
      countrySelect.disabled = true
      document.querySelector('#country-select-trigger').disabled = true
      citySelect.disabled = true
      clearSelectionButton.disabled = true
      this.selectedYear = document.querySelector('#global-year').value
      try {
        const loaded = await this.fetchCountryData(countryCode)
        if (!loaded) return

        this.selectedCountry = countryCode
        this.selectedCity =
          citySelect.value || this.countryData.capital[0]
        this.selectedYear = document.querySelector('#global-year').value
        document
          .querySelector('#dashboard-country-info-section')
          .classList.remove('hidden')
        document
          .querySelectorAll('.selection-year')
          .forEach(el => (el.textContent = this.selectedYear))

        document
          .querySelectorAll('.selection-city')
          .forEach(el => (el.textContent = ' • ' + this.selectedCity))

        // Update event header with current city
        const eventsHeader = document.querySelector(
          '#events-view .view-header-content'
        )
        if (eventsHeader) {
          eventsHeader.querySelector(
            'p'
          ).textContent = `Discover concerts, sports, theatre and more in ${this.selectedCity}`
        }
        await this.fetchHolidayData()
      } finally {
        exploreBTN.disabled = false
        countrySelect.disabled = false
        document.querySelector('#country-select-trigger').disabled = false
        citySelect.disabled = false
        clearSelectionButton.disabled = false
      }
    })
  }
  // Display Methods
  displayCountryInfo = countryData => {
    // 1- Country Flag image
    const countryFlagImg = document.querySelector('.dashboard-country-flag')
    countryFlagImg.setAttribute('src', countryData.flags.svg)
    countryFlagImg.setAttribute('alt', countryData.flags.alt)
    // 2- Country name
    const countryName = document.querySelector('.dashboard-country-title h3')
    countryName.textContent = countryData.name.common
    // 3- country official name
    const countryOfficialName = document.querySelector('.official-name')
    countryOfficialName.textContent = countryData.name.official
    // 4- country region
    const countryRegion = document.querySelector('.region')
    countryRegion.innerHTML = '<i class="fa-solid fa-location-dot"></i> '
    countryRegion.append(
      document.createTextNode(
        `${countryData.region} • ${countryData.subregion}`
      )
    )
    // 5- Country Details
    const countryDetails = document.querySelector(
      '.dashboard-country-grid'
    ).children
    const countryDetailsData = {
      capital: countryData.capital[0],
      population: countryData.population
        ? countryData.population.toLocaleString()
        : 'Not available',
      area: countryData.area
        ? countryData.area.toLocaleString()
        : 'Not available',
      continent: countryData.continents[0],
      'calling code': countryData.idd.root
        ? countryData.idd.root + [...countryData.idd.suffixes]
        : 'Not available',
      'driving side': countryData.car.side
        ? countryData.car.side.charAt(0).toUpperCase() +
          countryData.car.side.slice(1).toLowerCase()
        : 'Not available',
      'week starts': countryData.startOfWeek
        ? countryData.startOfWeek.charAt(0).toUpperCase() +
          countryData.startOfWeek.slice(1).toLowerCase()
        : 'Not available'
    }

    for (let countryDetail of countryDetails) {
      let keyName = countryDetail
        .querySelector('.label')
        .textContent.toLowerCase()
      countryDetail.querySelector('.value').textContent =
        countryDetailsData[keyName]
    }
    // 6- country Extras
    const countryExtraContainer = document.querySelector(
      '.dashboard-country-extras'
    ).children
    const countryExtraData = {
      currency: Object.values(countryData.currencies)[0],
      languages: Object.values(countryData.languages).join(', '),
      neighbors: countryData.borders
    }

    for (let counteryExtra of countryExtraContainer) {
      let keyName = counteryExtra.children[0].textContent.trim().toLowerCase()
      if (keyName !== 'neighbors') {
        if (keyName === 'currency') {
          const currency = countryExtraData[keyName]
          const currencyCode = Object.keys(countryData.currencies)[0]
          counteryExtra.children[1].children[0].textContent = currency
            ? `${currency.name} (${currencyCode}${
                currency.symbol ? ` ${currency.symbol}` : ''
              })`
            : 'Not available'
        } else if (keyName === 'languages') {
          counteryExtra.children[1].children[0].textContent =
            countryExtraData[keyName] || 'Not available'
        }
      } else {
        const bordersContainer = counteryExtra.children[1]
        bordersContainer.innerHTML = ''

        if (!countryExtraData[keyName]?.length) {
          bordersContainer.textContent = 'Not available'
          continue
        }

        const bordersElements = countryExtraData[keyName].map(
          border => `<span class="extra-tag border-tag">${border}</span>`
        )
        bordersContainer.innerHTML = [...bordersElements].join('')
      }
      // Map link
      document
        .querySelector('.btn-map-link')
        .setAttribute(
          'href',
          `https://www.google.com/maps/search/?api=1&query=${
            `${countryData.name.common} ${countryData.capital[0]}`
          }`
        )
    }
    // console.log(countryExtraContainer);
    // console.log(countryExtraData);
  }
  displayWeatherInfo = weatherData => {
    const weatherCodeDescriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Drizzle: Light',
      53: 'Drizzle: Moderate',
      55: 'Drizzle: Dense',
      61: 'Rain: Slight',
      63: 'Rain: Moderate',
      65: 'Rain: Heavy',
      71: 'Snow fall: Slight',
      73: 'Snow fall: Moderate',
      75: 'Snow fall: Heavy',
      80: 'Rain showers: Slight',
      81: 'Rain showers: Moderate',
      82: 'Rain showers: Violent',
      95: 'Thunderstorm: Slight',
      96: 'Thunderstorm: Moderate with hail',
      99: 'Thunderstorm: Moderate with hail'
    }
    const weatherStyles = {
      0: { class: 'weather-sunny', icon: 'fa-sun' },
      1: { class: 'weather-sunny', icon: 'fa-sun' },
      2: { class: 'weather-cloudy', icon: 'fa-cloud-sun' },
      3: { class: 'weather-cloudy', icon: 'fa-cloud' },
      45: { class: 'weather-foggy', icon: 'fa-water' }, 
      48: { class: 'weather-foggy', icon: 'fa-water' },
      51: { class: 'weather-rainy', icon: 'fa-cloud-rain' },
      61: { class: 'weather-rainy', icon: 'fa-cloud-rain' },
      71: { class: 'weather-snowy', icon: 'fa-snowflake' },
      80: { class: 'weather-rainy', icon: 'fa-cloud-showers-heavy' },
      95: { class: 'weather-stormy', icon: 'fa-bolt' }
    }

    const code = weatherData.current.weather_code
    const weatherViewComponent = document.querySelector('#weather-view')
    const viewHeaderContentEle = weatherViewComponent.querySelector(
      '.view-header-content'
    )
    viewHeaderContentEle.children[1].textContent = `Check 7-day weather forecasts for ${this.selectedCity}`
    // Change header style
    const style = weatherStyles[code] || {
      class: 'weather-default',
      icon: 'fa-question'
    }
    const heroCard = document.querySelector('.weather-hero-card')
    const heroIcon = document.querySelector('.weather-hero-icon i')

    heroCard.className = `weather-hero-card   ${style.class}`
    heroIcon.classList.remove(
      'fa-sun',
      'fa-cloud',
      'fa-cloud-sun',
      'fa-bolt',
      'fa-snowflake',
      'fa-cloud-rain',
      'fa-cloud-showers-heavy',
      'fa-water'
    )
    heroIcon.classList.add(style.icon)

    const weatherLocationEle =
      weatherViewComponent.querySelector('.weather-location')
    weatherLocationEle.children[1].textContent = this.selectedCity
    // Date
    const apiTime = weatherData.current.time
    const date = new Date(apiTime)
    const optionsDate = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const formattedDate = date.toLocaleDateString('en-US', optionsDate)
    weatherLocationEle.children[2].textContent = formattedDate
    // Temp and unit
    const temp = Math.round(weatherData.current.temperature_2m)
    const unit = weatherData.current_units.temperature_2m
    weatherViewComponent.querySelector('.temp-value').textContent = temp
    weatherViewComponent.querySelector('.temp-unit').textContent = unit
    // weather hero right element

    weatherViewComponent.querySelector('.weather-condition').textContent =
      weatherCodeDescriptions[code]
    const feelsLike = Math.round(weatherData.current.apparent_temperature)
    const feelsLikeUnit = weatherData.current_units.apparent_temperature
    weatherViewComponent.querySelector(
      '.weather-feels'
    ).textContent = `Feels like ${feelsLike}${feelsLikeUnit}`

    const high = Math.round(weatherData.daily.temperature_2m_max[0])
    const low = Math.round(weatherData.daily.temperature_2m_min[0])

    weatherViewComponent.querySelector(
      '.high'
    ).innerHTML = `<i class="fa-solid fa-arrow-up"></i> ${high}°`
    weatherViewComponent.querySelector(
      '.low'
    ).innerHTML = `<i class="fa-solid fa-arrow-down"></i> ${low}°`

    // Weather details grid
    const weatherDetailsContainer = weatherViewComponent.querySelector(
      '.weather-details-grid'
    )
    // Humidity
    const humidityCard = weatherDetailsContainer.children[0]
    humidityCard.querySelector(
      '.detail-value'
    ).textContent = `${weatherData.current.relative_humidity_2m}%`
    // Wind
    const windCard = weatherDetailsContainer.children[1]
    windCard.querySelector('.detail-value').textContent = `${Math.round(
      weatherData.current.wind_speed_10m
    )} km/h`
    // if uv available
    if (weatherData.current.uv_index !== undefined) {
      weatherDetailsContainer.children[2].querySelector(
        '.detail-value'
      ).textContent = weatherData.current.uv_index
    }

    // if Precipitation available

    if (weatherData.daily.precipitation_probability) {
      weatherDetailsContainer.children[3].querySelector(
        '.detail-value'
      ).textContent = `${weatherData.daily.precipitation_probability[0]}%`
    }

    // Hourly Forecast

    const weatherIcons = {
      0: 'fa-sun', // Clear sky
      1: 'fa-sun', // Mainly clear
      2: 'fa-cloud-sun', // Partly cloudy
      3: 'fa-cloud', // Overcast
      45: 'fa-smog', // Fog
      48: 'fa-smog', // Depositing rime fog
      51: 'fa-cloud-rain', // Drizzle
      61: 'fa-cloud-rain', // Rain
      71: 'fa-snowflake', // Snow
      80: 'fa-cloud-showers-heavy', // Rain showers
      95: 'fa-bolt' // Thunderstorm
    }

    const hourlyScroll = weatherViewComponent.querySelector('.hourly-scroll')
    hourlyScroll.innerHTML = ''
    const times = weatherData.hourly.time
    const codes = weatherData.hourly.weather_code
    const temps = weatherData.hourly.temperature_2m
    const precip = weatherData.hourly.precipitation_probability
    times.slice(0, 12).forEach((time, index) => {
      const date = new Date(time)
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true
      })
      const temp = Math.round(temps[index])
      const code = codes[index]
      const iconClass = weatherIcons[code] || 'fa-question'
      const item = document.createElement('div')
      item.classList.add('hourly-item')
      index === 0 ? item.classList.add('now') : ''
      item.innerHTML = ` <span class="hourly-time ">${
        index === 0 ? 'Now' : formattedTime
      }</span> <div class="hourly-icon"><i class="fa-solid ${iconClass}"></i></div> <span class="hourly-temp">${temp}°</span> <span class="hourly-precip">${
        precip[index]
      }%</span> `
      hourlyScroll.appendChild(item)
    })

    // 7-Day Forecast
    const forecastList = weatherViewComponent.querySelector('.forecast-list')
    forecastList.innerHTML = ''
    const days = weatherData.daily.time
    const maxTemps = weatherData.daily.temperature_2m_max
    const minTemps = weatherData.daily.temperature_2m_min
    const codesDaily = weatherData.daily.weather_code
    const precipDaily = weatherData.daily.precipitation_probability_max

    days.forEach((day, index) => {
      const date = new Date(day)
      const dayLabel =
        index === 0
          ? 'Today'
          : date.toLocaleDateString('en-US', { weekday: 'short' })
      const dayDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
      })
      const max = Math.round(maxTemps[index])
      const min = Math.round(minTemps[index])
      const code = codesDaily[index]
      const iconClass = weatherIcons[code] || 'fa-question'
      const precipVal = precipDaily[index] || 0
      const item = document.createElement('div')
      item.classList.add('forecast-day')
      if (index === 0) item.classList.add('today')
      item.innerHTML = ` <div class="forecast-day-name"> <span class="day-label">${dayLabel}</span> <span class="day-date">${dayDate}</span> </div> <div class="forecast-icon"><i class="fa-solid ${iconClass}"></i></div> <div class="forecast-temps"> <span class="temp-max">${max}°</span> <span class="temp-min">${min}°</span> </div> <div class="forecast-precip"> ${
        precipVal > 0
          ? `<i class="fa-solid fa-droplet"></i><span>${precipVal}%</span>`
          : ''
      } </div> `
      forecastList.appendChild(item)
    })
    // console.log(forecastList);
  }
  displayHolidayInfo = holidaysData => {
    const holidayCardsContainer = document.querySelector('#holidays-content')
    holidayCardsContainer.innerHTML = ''
    holidaysData.forEach(holiday => {
      const date = new Date(holiday.date)
      const day = date.getDate()
      const month = date.toLocaleString('en-US', { month: 'short' })
      const weekday = date.toLocaleString('en-US', { weekday: 'long' })
      const planData = {
        id: `holiday-${holiday.date}-${holiday.name}`,
        type: 'holiday',
        title: holiday.name,
        date: holiday.date
      }
      const isSaved = this.isPlanSaved(planData)
      const holidayCard = document.createElement('div')
      holidayCard.classList.add('holiday-card')
      holidayCard.dataset.date = holiday.date
      holidayCard.innerHTML = ` <div class="holiday-card-header"> <div class="holiday-date-box"> <span class="day">${day}</span><span class="month">${month}</span> </div> <button class="holiday-action-btn${
        isSaved ? ' saved' : ''
      }"> <i class="fa-${
        isSaved ? 'solid' : 'regular'
      } fa-heart"></i> </button> </div> <h3>${
        holiday.name
      }</h3> <p class="holiday-name">${
        holiday.localName
      }</p> <div class="holiday-card-footer"> <span class="holiday-day-badge"> <i class="fa-regular fa-calendar"></i> ${weekday} </span> <span class="holiday-type-badge">${holiday.types.join(
        ', '
      )}</span> </div> `
      holidayCardsContainer.appendChild(holidayCard)
    })
  }

  displayEventsInfo = eventsData => {
    const eventsContainer = document.querySelector('#events-content')
    eventsContainer.innerHTML = ''

    if (!eventsData || eventsData.length === 0) {
      eventsContainer.innerHTML = `
        <div class="event-error" style="padding: 2rem; text-align: center; color: var(--text-secondary);">
          <i class="fa-solid fa-calendar-xmark" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <p>No events found for this location.</p>
        </div>
      `
      return
    }

    eventsData.forEach(event => {
      const eventDate = new Date(event.dates.start.localDate)
      const eventTime = event.dates.start.localTime || 'Time TBA'
      const dateFormatted = eventDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })

      const eventImage =
        event.images?.[0]?.url ||
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=200&fit=crop'
      const eventCategory = event.classifications?.[0]?.segment?.name || 'Event'
      const eventName = event.name
      const venueName = event._embedded?.venues?.[0]?.name || 'Venue TBA'
      const venueCity =
        event._embedded?.venues?.[0]?.city?.name || this.selectedCity || ''
      const eventUrl = event.url || '#'
      const eventId =
        event.id ||
        [eventName, event.dates.start.localDate, venueName, venueCity, eventUrl].join(
          '|'
        )
      const planData = {
        id: `event-${eventId}`,
        type: 'event',
        eventId: String(eventId),
        title: eventName,
        date: `${dateFormatted} at ${eventTime}`,
        venue: `${venueName}, ${venueCity}`,
        url: eventUrl
      }
      const isSaved = this.isPlanSaved(planData)

      const eventCard = document.createElement('div')
      eventCard.classList.add('event-card')
      eventCard.dataset.eventId = String(eventId)
      eventCard.innerHTML = `
        <div class="event-card-image">
          <img
            src="${eventImage}"
            alt="${eventName}"
            onerror="this.src='https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=200&fit=crop'"
          />
          <span class="event-card-category">${eventCategory}</span>
          <button class="event-card-save${isSaved ? ' saved' : ''}" >
            <i class="fa-${isSaved ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>
        <div class="event-card-body">
          <h3>${eventName}</h3>
          <div class="event-card-info">
            <div>
              <i class="fa-regular fa-calendar"></i>${dateFormatted} at ${eventTime}
            </div>
            <div>
              <i class="fa-solid fa-location-dot"></i>${venueName}, ${venueCity}
            </div>
          </div>
          <div class="event-card-footer">
            <button class="btn-event${isSaved ? ' saved' : ''}">
              <i class="fa-${isSaved ? 'solid' : 'regular'} fa-heart"></i> ${
                isSaved ? 'In Plans' : 'Save'
              }
            </button>
            <a href="${eventUrl}" target="_blank" class="btn-buy-ticket">
              <i class="fa-solid fa-ticket"></i> Buy Tickets
            </a>
          </div>
        </div>
      `
      eventsContainer.appendChild(eventCard)
    })
  }

  displaySunTimesInfo = sunData => {
    const sunTimesContainer = document.querySelector('#sun-times-content')

    // Helper function to format time from ISO string to local time
    const formatTime = isoString => {
      const date = new Date(isoString)
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }

    // Helper function to calculate time difference in hours and minutes
    const calculateDuration = (start, end) => {
      const startTime = new Date(start)
      const endTime = new Date(end)
      const diffMs = endTime - startTime
      const hours = Math.floor(diffMs / (1000 * 60 * 60))
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      return `${hours}h ${minutes}m`
    }

    // Calculate day length
    const dayLength = calculateDuration(sunData.sunrise, sunData.sunset)
    const nightLength = calculateDuration(sunData.sunset, sunData.sunrise)

    // Calculate percentage of daylight
    const dayLengthMs = new Date(sunData.sunset) - new Date(sunData.sunrise)
    const dayPercentage = ((dayLengthMs / (1000 * 60 * 60 * 24)) * 100).toFixed(1)

    // Get current date
    const today = new Date()
    const dateFormatted = today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' })

    sunTimesContainer.innerHTML = `
      <div class="sun-main-card">
        <div class="sun-main-header">
          <div class="sun-location">
            <h2><i class="fa-solid fa-location-dot"></i> ${
              this.selectedCity || 'Selected Location'
            }</h2>
            <p>Sun times for your selected location</p>
          </div>
          <div class="sun-date-display">
            <div class="date">${dateFormatted}</div>
            <div class="day">${dayOfWeek}</div>
          </div>
        </div>

        <div class="sun-times-grid">
          <div class="sun-time-card dawn">
            <div class="icon"><i class="fa-solid fa-moon"></i></div>
            <div class="label">Civil Dawn</div>
            <div class="time">${formatTime(sunData.civil_twilight_begin)}</div>
            <div class="sub-label">Civil Twilight</div>
          </div>
          <div class="sun-time-card sunrise">
            <div class="icon"><i class="fa-solid fa-sun"></i></div>
            <div class="label">Sunrise</div>
            <div class="time">${formatTime(sunData.sunrise)}</div>
            <div class="sub-label">Golden Hour Start</div>
          </div>
          <div class="sun-time-card noon">
            <div class="icon"><i class="fa-solid fa-sun"></i></div>
            <div class="label">Solar Noon</div>
            <div class="time">${formatTime(sunData.solar_noon)}</div>
            <div class="sub-label">Sun at Highest</div>
          </div>
          <div class="sun-time-card sunset">
            <div class="icon"><i class="fa-solid fa-sun"></i></div>
            <div class="label">Sunset</div>
            <div class="time">${formatTime(sunData.sunset)}</div>
            <div class="sub-label">Golden Hour End</div>
          </div>
          <div class="sun-time-card dusk">
            <div class="icon"><i class="fa-solid fa-moon"></i></div>
            <div class="label">Civil Dusk</div>
            <div class="time">${formatTime(sunData.civil_twilight_end)}</div>
            <div class="sub-label">Civil Twilight</div>
          </div>
          <div class="sun-time-card daylight">
            <div class="icon">
              <i class="fa-solid fa-hourglass-half"></i>
            </div>
            <div class="label">Day Length</div>
            <div class="time">${dayLength}</div>
            <div class="sub-label">Total Daylight</div>
          </div>
        </div>
      </div>

      <div class="day-length-card">
        <h3>
          <i class="fa-solid fa-chart-pie"></i> Daylight Distribution
        </h3>
        <div class="day-progress">
          <div class="day-progress-bar">
            <div class="day-progress-fill" style="width: ${dayPercentage}%"></div>
          </div>
        </div>
        <div class="day-length-stats">
          <div class="day-stat">
            <div class="value">${dayLength}</div>
            <div class="label">Daylight</div>
          </div>
          <div class="day-stat">
            <div class="value">${dayPercentage}%</div>
            <div class="label">of 24 Hours</div>
          </div>
          <div class="day-stat">
            <div class="value">${nightLength}</div>
            <div class="label">Night Time</div>
          </div>
        </div>
      </div>
    `
  }

  displayLongWeekendsInfo = longWeekendsData => {
    const lwContainer = document.querySelector('#lw-content')
    lwContainer.innerHTML = ''

    if (!longWeekendsData || longWeekendsData.length === 0) {
      lwContainer.innerHTML = `
        <div class="lw-error" style="padding: 2rem; text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">
          <i class="fa-solid fa-calendar-xmark" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <p>No long weekends found for ${this.selectedCountry} in ${this.selectedYear}.</p>
        </div>
      `
      return
    }

    longWeekendsData.forEach((lw, index) => {
      const startDate = new Date(lw.startDate)
      const endDate = new Date(lw.endDate)

      const startFormatted = startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
      const endFormatted = endDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })

      const dayCount = lw.dayCount
      const needsBridge = lw.needBridgeDay

      const title = `Long Weekend #${index + 1}`
      const dateRange = `${startFormatted} - ${endFormatted}`
      const isSaved = this.isPlanSaved({
        id: `lw-${title}-${dateRange}`,
        type: 'longweekend'
      })

      // Generate visual days representation
      let daysVisual = ''
      const currentDate = new Date(startDate)
      for (let i = 0; i < dayCount; i++) {
        const dayName = currentDate.toLocaleDateString('en-US', {
          weekday: 'short'
        })
        const dayNum = currentDate.getDate()
        const isWeekend =
          currentDate.getDay() === 0 || currentDate.getDay() === 6

        daysVisual += `
          <div class="lw-day ${isWeekend ? 'weekend' : ''}">
            <span class="name">${dayName}</span><span class="num">${dayNum}</span>
          </div>
        `
        currentDate.setDate(currentDate.getDate() + 1)
      }

      const lwCard = document.createElement('div')
      lwCard.classList.add('lw-card')
      lwCard.innerHTML = `
        <div class="lw-card-header">
          <span class="lw-badge">
            <i class="fa-solid fa-calendar-days"></i> ${dayCount} Days
          </span>
          <button class="holiday-action-btn${
            isSaved ? ' saved' : ''
          }" >
            <i class="fa-${isSaved ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>
        <h3>${title}</h3>
        <div class="lw-dates">
          <i class="fa-regular fa-calendar"></i> ${dateRange}
        </div>
        <div class="lw-info-box ${needsBridge ? 'warning' : 'success'}">
          <i class="fa-solid fa-${
            needsBridge ? 'info-circle' : 'check-circle'
          }"></i> 
          ${
            needsBridge
              ? 'Requires taking a bridge day off'
              : 'No extra days off needed!'
          }
        </div>
        <div class="lw-days-visual">
          ${daysVisual}
        </div>
      `
      lwContainer.appendChild(lwCard)
    })
  }

  initRounting = () => {
    const navItems = document.querySelectorAll('.nav-item')
    navItems.forEach(navItem =>
      navItem.addEventListener('click', e => {
        e.preventDefault()
        const view = e.currentTarget.getAttribute('data-view')
        if (!view) return
        this.mapViews(view, e.currentTarget)
        window.location.hash = `#/${view}`
      })
    )
  }

  setupMobileMenu = () => {
    const menuButton = document.querySelector('#mobile-menu-btn')
    const sidebar = document.querySelector('#sidebar')
    const overlay = document.querySelector('#sidebar-overlay')

    if (!menuButton || !sidebar || !overlay) return

    const closeMenu = () => {
      sidebar.classList.remove('open')
      overlay.classList.remove('active')
      overlay.classList.add('hidden')
      menuButton.setAttribute('aria-expanded', 'false')
    }

    menuButton.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open')
      overlay.classList.toggle('active', isOpen)
      overlay.classList.toggle('hidden', !isOpen)
      menuButton.setAttribute('aria-expanded', String(isOpen))
    })

    overlay.addEventListener('click', closeMenu)
    document.querySelectorAll('.nav-item').forEach(navItem => {
      navItem.addEventListener('click', closeMenu)
    })
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu()
    })
  }

  clearActiveView = () => {
    const navItems = document.querySelectorAll('.nav-item')
    const viewSections = document.querySelectorAll('.view')
    viewSections.forEach(viewSection => viewSection.classList.remove('active'))
    navItems.forEach(navItem => navItem.classList.remove('active'))
  }
  updatePageTitle = viewName => {
    const titles = {
      dashboard: {
        title: 'Dashboard',
        subtitle: 'Welcome back! Ready to plan your next adventure?'
      },
      holidays: {
        title: 'Public Holidays',
        subtitle: 'Discover public holidays and plan your trips accordingly'
      },
      events: {
        title: 'Local Events',
        subtitle: 'Explore exciting events happening around the world'
      },
      weather: {
        title: 'Weather Forecast',
        subtitle: 'Check current weather conditions and forecasts'
      },
      'long-weekends': {
        title: 'Long Weekends',
        subtitle: 'Find the perfect long weekends for your getaway'
      },
      'sun-times': {
        title: 'Sunrise & Sunset Times',
        subtitle: 'Track daylight hours for your destination'
      },
      'my-plans': {
        title: 'My Travel Plans',
        subtitle: 'Manage and organize your upcoming trips'
      }
    }

    const pageData = titles[viewName] || {
      title: 'Wanderlust',
      subtitle: 'Your global travel planner'
    }

    document.querySelector('#page-title').textContent = pageData.title
    document.querySelector('#page-subtitle').textContent = pageData.subtitle
  }

  mapViews = (viewName, clickedLinkEle) => {
    this.clearActiveView()
    const viewComponent = document.querySelector(`#${viewName}-view`)
    clickedLinkEle.classList.add('active')
    viewComponent.classList.add('active')

    // Update page title and subtitle
    this.updatePageTitle(viewName)
    if (
      !this.selectedCountry &&
      viewName !== 'dashboard' &&
      viewName !== 'my-plans'
    ) {
      this.showEmptyState(viewName)
      return
    }
    // console.log(viewName);
    if (this.selectedCountry && viewName === 'weather') {
      if (this.coords) {
        // console.log("Loading weather for: " + this.selectedCountry);
        this.fetchWeatherData()
      }
    } else if (this.selectedCountry && viewName === 'holidays') {
      this.fetchHolidayData()
    } else if (viewName === 'events') {
      this.fetchEventsData()
    } else if (viewName === 'sun-times') {
      if (this.coords) {
        this.fetchSunTimesData()
      }
    } else if (this.selectedCountry && viewName === 'long-weekends') {
      this.fetchLongWeekendsData()
    } else if (viewName === 'currency') {
      this.handleConversion()
    }
  }

  showEmptyState = viewName => {
    const containerMap = {
      holidays: '#holidays-content',
      weather: '#weather-content',
      events: '#events-content',
      'long-weekends': '#lw-content',
      'sun-times': '#sun-times-content'
    }

    const containerSelector = containerMap[viewName]
    if (!containerSelector) return

    const container = document.querySelector(containerSelector)
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-calendar-xmark"></i></div>
        <h3>No Country Selected</h3>
        <p>Select a country from the dashboard to explore ${viewName.replace(
          '-',
          ' '
        )}</p>
        <button class="btn btn-primary" id="redirect-dashboard">
          <i class="fa-solid fa-globe"></i> Go to Dashboard
        </button>
      </div>
    `

    document
      .querySelector('#redirect-dashboard')
      .addEventListener('click', () => {
        const dashboardNav = document.querySelector('[data-view="dashboard"]')
        this.mapViews('dashboard', dashboardNav)
      })
  }

  saveToPlans = planData => {
    if (!this.isPlanSaved(planData)) {
      this.savedPlans.push(planData)
      localStorage.setItem('wanderlust_plans', JSON.stringify(this.savedPlans))
      this.updatePlansUI()
      this.showToast(`${planData.title} added to your plans!`, 'success')
      return true
    } else {
      this.showToast('Already in your plans', 'info')
      return false
    }
  }

  isPlanSaved = planData =>
    this.savedPlans.some(savedPlan => {
      if (savedPlan.id === planData.id) return true
      if (savedPlan.type !== 'event' || planData.type !== 'event') return false

      if (savedPlan.eventId && planData.eventId) {
        return String(savedPlan.eventId) === String(planData.eventId)
      }

      const normalize = value => String(value || '').trim().toLowerCase()
      return (
        normalize(savedPlan.title) === normalize(planData.title) &&
        normalize(savedPlan.date) === normalize(planData.date) &&
        normalize(savedPlan.venue) === normalize(planData.venue)
      )
    })

  removeFromPlans = async planId => {
    const result = await Swal.fire({
      title: 'Remove this plan?',
      text: 'This saved plan will be removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      reverseButtons: true
    })
    if (!result.isConfirmed) return

    this.savedPlans = this.savedPlans.filter(p => p.id !== planId)
    localStorage.setItem('wanderlust_plans', JSON.stringify(this.savedPlans))
    this.updatePlansUI()
    this.showToast('Removed from plans', 'success')
  }

  updatePlansUI = () => {
    // Update badge count
    const plansCount = this.savedPlans.length
    const plansBadge = document.querySelector('#plans-count')
    if (plansBadge) {
      if (plansCount > 0) {
        plansBadge.textContent = plansCount
        plansBadge.classList.remove('hidden')
      } else {
        plansBadge.classList.add('hidden')
      }
    }

    // Update dashboard stat card
    const statSaved = document.querySelector('#stat-saved')
    if (statSaved) {
      statSaved.textContent = plansCount
    }

    // Update filter counts
    const holidayCount = this.savedPlans.filter(
      p => p.type === 'holiday'
    ).length
    const eventCount = this.savedPlans.filter(p => p.type === 'event').length
    const lwCount = this.savedPlans.filter(p => p.type === 'longweekend').length

    const filterAllCount = document.querySelector('#filter-all-count')
    const filterHolidayCount = document.querySelector('#filter-holiday-count')
    const filterEventCount = document.querySelector('#filter-event-count')
    const filterLwCount = document.querySelector('#filter-lw-count')

    if (filterAllCount) filterAllCount.textContent = plansCount
    if (filterHolidayCount) filterHolidayCount.textContent = holidayCount
    if (filterEventCount) filterEventCount.textContent = eventCount
    if (filterLwCount) filterLwCount.textContent = lwCount

    // Display plans
    this.displayMyPlans()
  }

  updateCountryClock = () => {
    if (!this.selectedCountryTimezone) return

    const timeValueEle = document.querySelector('#country-local-time')
    const timeZoneEle = document.querySelector('.local-time-zone')

    if (this.countryClockInterval) clearInterval(this.countryClockInterval)

    const tick = () => {
      timeValueEle.textContent = new Intl.DateTimeFormat('en-US', {
        timeZone: this.selectedCountryTimezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(new Date())
      timeZoneEle.textContent = this.selectedCountryTimezone
    }

    tick()
    this.countryClockInterval = setInterval(tick, 1000)
  }

  displayMyPlans = (filter = 'all') => {
    const plansContent = document.querySelector('#plans-content')

    if (!plansContent) return

    if (this.savedPlans.length === 0) {
      plansContent.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <i class="fa-solid fa-heart-crack"></i>
          </div>
          <h3>No Saved Plans Yet</h3>
          <p>Start exploring and save holidays, events, or long weekends you like!</p>
          <button class="btn-primary" id="start-exploring-btn">
            <i class="fa-solid fa-compass"></i> Start Exploring
          </button>
        </div>
      `

      // Add event listener to start exploring button
      const startBtn = document.querySelector('#start-exploring-btn')
      if (startBtn) {
        startBtn.addEventListener('click', () => {
          const dashboardLink = document.querySelector(
            '[data-view="dashboard"]'
          )
          if (dashboardLink) dashboardLink.click()
        })
      }
      return
    }

    const filteredPlans =
      filter === 'all'
        ? this.savedPlans
        : this.savedPlans.filter(p => p.type === filter)

    plansContent.innerHTML = ''

    filteredPlans.forEach(plan => {
      const planCard = document.createElement('div')
      planCard.classList.add('plan-card')
      planCard.setAttribute('data-type', plan.type)

      if (plan.type === 'holiday') {
        planCard.innerHTML = `
          <span class="plan-card-type holiday">Holiday</span>
          <div class="plan-card-content">
            <h4>${plan.title}</h4>
            <div class="plan-card-details">
              <div><i class="fa-regular fa-calendar"></i>${plan.date}</div>
              <div><i class="fa-solid fa-circle-info"></i>${
                plan.localName || plan.title
              }</div>
            </div>
            <div class="plan-card-actions">
              <button class="btn-plan-remove" data-id="${plan.id}">
                <i class="fa-solid fa-trash"></i> Remove
              </button>
            </div>
          </div>
        `
      } else if (plan.type === 'event') {
        planCard.innerHTML = `
          <span class="plan-card-type event">Event</span>
          <div class="plan-card-content">
            <h4>${plan.title}</h4>
            <div class="plan-card-details">
              <div><i class="fa-regular fa-calendar"></i>${plan.date}</div>
              <div><i class="fa-solid fa-location-dot"></i>${plan.venue}</div>
            </div>
            <div class="plan-card-actions">
              <button class="btn-plan-remove" data-id="${plan.id}">
                <i class="fa-solid fa-trash"></i> Remove
              </button>
            </div>
          </div>
        `
      } else if (plan.type === 'longweekend') {
        planCard.innerHTML = `
          <span class="plan-card-type longweekend">Long Weekend</span>
          <div class="plan-card-content">
            <h4>${plan.title}</h4>
            <div class="plan-card-details">
              <div><i class="fa-regular fa-calendar"></i>${plan.dateRange}</div>
              <div><i class="fa-solid fa-circle-info"></i>${
                plan.needsBridge
                  ? 'Bridge day needed'
                  : 'No extra days off needed'
              }</div>
            </div>
            <div class="plan-card-actions">
              <button class="btn-plan-remove" data-id="${plan.id}">
                <i class="fa-solid fa-trash"></i> Remove
              </button>
            </div>
          </div>
        `
      }

      plansContent.appendChild(planCard)
    })

    // Add remove button event listeners
    document.querySelectorAll('.btn-plan-remove').forEach(btn => {
      btn.addEventListener('click', e => {
        const planId = e.currentTarget.getAttribute('data-id')
        this.removeFromPlans(planId)
      })
    })
  }

  setupMyPlansListeners = () => {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.plan-filter')
    filterButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        filterButtons.forEach(b => b.classList.remove('active'))
        e.currentTarget.classList.add('active')
        const filter = e.currentTarget.getAttribute('data-filter')
        this.displayMyPlans(filter)
      })
    })

    // Clear all button
    const clearAllBtn = document.querySelector('#clear-all-plans-btn')
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        this.showConfirmModal(
          'Clear All Plans?',
          'Are you sure you want to clear all saved plans? This action cannot be undone.',
          () => {
            this.savedPlans = []
            localStorage.setItem(
              'wanderlust_plans',
              JSON.stringify(this.savedPlans)
            )
            this.updatePlansUI()
            this.showToast('All plans cleared', 'success')
          }
        )
      })
    }
  }

  showConfirmModal = (title, message, onConfirm) => {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Clear All',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) onConfirm()
    })
  }

  attachHeartListeners = () => {
    // Holiday heart buttons
    document.addEventListener('click', e => {
      if (e.target.closest('.holiday-action-btn')) {
        const holidayCard = e.target.closest('.holiday-card')
        if (holidayCard) {
          const title = holidayCard.querySelector('h3').textContent
          const date =
            holidayCard.dataset.date ||
            holidayCard.querySelector('.holiday-day-badge').textContent.trim()
          const localName =
            holidayCard.querySelector('.holiday-name')?.textContent || title

          const planData = {
            id: `holiday-${date}-${title}`,
            type: 'holiday',
            title: title,
            date: date,
            localName: localName,
            savedAt: new Date().toISOString()
          }

          this.saveToPlans(planData)
          const saveButton = e.target.closest('.holiday-action-btn')
          saveButton.classList.add('saved')
          saveButton.innerHTML = '<i class="fa-solid fa-heart"></i>'
        }
      }

      // Event heart buttons
      if (
        e.target.closest('.event-card-save') ||
        e.target.closest('.btn-event')
      ) {
        const eventCard = e.target.closest('.event-card')
        if (eventCard) {
          const title = eventCard.querySelector('h3').textContent
          const dateInfo =
            eventCard
              .querySelector('.event-card-info div:first-child')
              ?.textContent.trim() || ''
          const venueInfo =
            eventCard
              .querySelector('.event-card-info div:last-child')
              ?.textContent.trim() || ''
          const ticketLink =
            eventCard.querySelector('.btn-buy-ticket')?.getAttribute('href') ||
            ''
          const eventId = eventCard.dataset.eventId

          const planData = {
            id: `event-${eventId}`,
            type: 'event',
            eventId: eventId,
            title: title,
            date: dateInfo,
            venue: venueInfo,
            url: ticketLink,
            savedAt: new Date().toISOString()
          }

          this.saveToPlans(planData)
          const heartBtn = eventCard.querySelector('.event-card-save')
          if (heartBtn) {
            heartBtn.classList.add('saved')
            heartBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
          }
          const saveBtn = eventCard.querySelector('.btn-event')
          if (saveBtn) {
            saveBtn.classList.add('saved')
            saveBtn.innerHTML = '<i class="fa-solid fa-heart"></i> In Plans'
          }
        }
      }

      // Long weekend heart buttons
      if (e.target.closest('.lw-card .holiday-action-btn')) {
        const lwCard = e.target.closest('.lw-card')
        if (lwCard) {
          const title = lwCard.querySelector('h3').textContent
          const dateRange = lwCard.querySelector('.lw-dates').textContent.trim()
          const dayCount = lwCard.querySelector('.lw-badge').textContent.trim()

          const planData = {
            id: `lw-${title}-${dateRange}`,
            type: 'longweekend',
            title: title,
            dateRange: dateRange,
            dayCount: dayCount,
            savedAt: new Date().toISOString()
          }

          this.saveToPlans(planData)
          const saveButton = e.target.closest('.holiday-action-btn')
          saveButton.classList.add('saved')
          saveButton.innerHTML = '<i class="fa-solid fa-heart"></i>'
        }
      }
    })
  }

  showToast = (message, type = 'info') => {
    const toastContainer = document.querySelector('#toast-container')
    if (!toastContainer) return

    const toast = document.createElement('div')
    toast.classList.add('toast', `toast-${type}`)
    toast.innerHTML = `
      <i class="fa-solid fa-${
        type === 'success'
          ? 'check-circle'
          : type === 'error'
          ? 'exclamation-circle'
          : 'info-circle'
      }"></i>
      <span>${message}</span>
    `

    toastContainer.appendChild(toast)

    setTimeout(() => {
      toast.classList.add('show')
    }, 10)

    setTimeout(() => {
      toast.classList.remove('show')
      setTimeout(() => {
        toast.remove()
      }, 300)
    }, 3000)
  }

  showLoading = (text = 'Loading...') => {
    const loadingOverlay = document.querySelector('#loading-overlay')
    const loadingText = document.querySelector('#loading-text')

    if (loadingOverlay) {
      if (loadingText) {
        loadingText.textContent = text
      }
      loadingOverlay.classList.remove('hidden')
    }
  }

  hideLoading = () => {
    const loadingOverlay = document.querySelector('#loading-overlay')
    if (loadingOverlay) {
      loadingOverlay.classList.add('hidden')
    }
  }
  updateDateTime = () => {
    const dateTimeSpan = document.querySelector('#current-datetime')

    const now = new Date()
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }

    dateTimeSpan.textContent = now.toLocaleString('en-US', options)
  }
}

const initApp = new App()