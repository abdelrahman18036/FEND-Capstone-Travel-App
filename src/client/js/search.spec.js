import {renderSearch} from './search'

describe('search.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `<main>
    <section id="search">
      <form id="search-trip-form">
        <fieldset>
          <label id="search-trip-location-label" for="search-trip-location"
            >My trip to:</label
          >
          <input
            type="text"
            id="search-trip-location"
            placeholder="Enter location"
            list="search-trip-locations"
            autocomplete="on"
          />
        </fieldset>
        <fieldset>
          <label id="search-trip-date-label" for="search-trip-date"
            >Departing:</label
          >
          <input type="date" id="search-trip-date" />
        </fieldset>
        <div id="search-trip-buttons">
          <button id="search-trip-save" type="submit">Save trip</button>
          <button id="search-trip-reset" type="reset">Reset</button>
        </div>
      </form>
    </section>
  </main>`
  })
  test("minimum date should've been set", () => {
    // Mock Date function
    global.Date = jest.fn(() => ({
      getFullYear: () => 2019,
      getMonth: () => 5,
      getDate: () => 11,
    }))
    renderSearch()
    const minDate = document
      .getElementById('search-trip-date')
      .getAttribute('min')
    const current = `${2019}-${6}-${11}`

    expect(current).toMatch(minDate)
  })
})
