const {fetchCityForeCast} = require('./darksky')

const darkSkyMock = {
  daily: {
    data: [
      {
        summary: 'Test',
        temperatureMax: 1,
        temperatureMin: 2,
        icon: 'rain',
      },
    ],
  },
}

describe('DarkSkyApi', () => {
  const fetch = require('node-fetch')
  beforeEach(() => {
    fetch.resetMocks()
  })
  process.env.DARKSKY_BASEURL = 'https://test.com'
  process.env.DARKSKY_APIKEY = '1234'

  test('fetchCityForeCast success', async () => {
    fetch.mockResponseOnce(JSON.stringify(darkSkyMock))
    const expectedResponse = {summary: 'Test', high: 1, low: 2, icon: 'rain'}

    const data = await fetchCityForeCast(12.12, -6.5, 123123123)
    expect(data).toMatchObject(expectedResponse)
    expect(fetch.mock.calls[0][0]).toMatch(/12.12,-6.5,123123.123/)
    expect(fetch.mock.calls[0][0]).toMatch(/test.com/)
    expect(fetch.mock.calls[0][0]).toMatch(/1234/)
    expect(fetch).toHaveBeenCalled()
  })

  test('fetchCityForeCast fail', async () => {
    fetch.mockResponseOnce(JSON.stringify({}))
    const expectedResponse = {}

    const data = await fetchCityForeCast(12.12, -6.5, 123123123)
    expect(data).toMatchObject(expectedResponse)
  })
})
