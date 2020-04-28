const {fetchCityImage} = require('./pixabay')

const pixabayMock = {
  hits: [
    {
      webformatURL: 'https://test.com/great-web-pictures.jpg',
    },
  ],
}

describe('PixaBayAPI', () => {
  const fetch = require('node-fetch')
  beforeEach(() => {
    fetch.resetMocks()
  })
  process.env.PIXABAY_BASEURL = 'https://test.com'
  process.env.PIXABAY_KEY = '1234'

  test('fetchCityForeCast success', async () => {
    fetch.mockResponseOnce(JSON.stringify(pixabayMock))
    const expectedResponse = 'https://test.com/great-web-pictures.jpg'

    const data = await fetchCityImage('Athens, GR')
    expect(data).toMatch(expectedResponse)
    expect(fetch.mock.calls[0][0]).toMatch(/Athens,%20GR/)
    expect(fetch.mock.calls[0][0]).toMatch(/test.com/)
    expect(fetch.mock.calls[0][0]).toMatch(/1234/)
    expect(fetch).toHaveBeenCalled()
  })

  test('fetchCityForeCast fail', async () => {
    fetch.mockResponseOnce(JSON.stringify({hits: []}))
    const expectedResponse = ''

    const data = await fetchCityImage('Athens, GR')
    expect(data).toMatch(expectedResponse)
  })
})
