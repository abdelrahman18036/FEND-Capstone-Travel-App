const {fetchCityProposals, fetchCityData} = require('./geonames')

const geonamesMock = {
  geonames: [{name: 'Test', countryName: 'TestLand', lat: 1.2, lng: 2.3}],
}

describe('GeonamesAPI', () => {
  const fetch = require('node-fetch')
  beforeEach(() => {
    fetch.resetMocks()
  })
  process.env.GEO_BASEURL = 'https://test.com'
  process.env.GEO_USERNAME = 'testuser'

  test('fetchCityData success case', async () => {
    fetch.mockResponseOnce(JSON.stringify(geonamesMock))
    const expectedResponse = {
      location: 'Test, TestLand',
      lat: 1.2,
      lng: 2.3,
    }

    const data = await fetchCityData('Athens', 'GR')
    expect(data).toMatchObject(expectedResponse)
    expect(fetch.mock.calls[0][0]).toMatch(/name=Athens&country=GR/)
    expect(fetch.mock.calls[0][0]).toMatch(/test.com/)
    expect(fetch.mock.calls[0][0]).toMatch(/testuser/)
    expect(fetch).toHaveBeenCalled()
  })

  test('fetchCityData failure case of invalid input', async () => {
    const expectedResponse = {}
    try {
      const data = await fetchCityData()
    } catch (e) {
      expect(e).toMatch('Please provide a city!')
    }
  })

  test('fetchCityData failure case of invalid received data', async () => {
    fetch.mockResponseOnce(JSON.stringify({geonames: []}))
    const expectedResponse = {}

    const data = await fetchCityData(12.12, -6.5, 123123123)
    expect(data).toMatchObject(expectedResponse)
  })
})
