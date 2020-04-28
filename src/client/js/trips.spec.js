import {renderTrips} from './trips'

const tripResponseMock = [
  {
    location: 'Test, TE',
    img: 'https://pic.img',
    date: '2019-02-11',
    id: '1234',
    difference: '20',
    weather: {
      summary: 'Test',
      high: 2,
      low: -1,
    },
  },
]

describe('search.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `<main><section id="results"></section></main>`
    fetch.resetMocks()
  })
  test('Renders without error', async () => {
    expect(renderTrips).toBeInstanceOf(Function)
  })
})
