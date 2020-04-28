require('dotenv').config()
const fetch = require('node-fetch')

module.exports.fetchCityProposals = async term => {
  const {GEO_BASEURL, GEO_USERNAME} = process.env
  try {
    const result = await fetch(
      `${GEO_BASEURL}/searchJSON?name=${term}&featureClass=P&fetureCode=PPLS&${GEO_USERNAME}`,
    )
    const cities = await result.json()
    return cities
  } catch (e) {
    throw e
  }
}

module.exports.fetchCityData = async (city, country) => {
  const {GEO_BASEURL, GEO_USERNAME} = process.env
  try {
    if (!city && !country) {
      throw 'Please provide a city!'
    }
    const result = await fetch(
      `${GEO_BASEURL}/searchJSON?name=${city}&country=${country}&featureClass=P&fetureCode=PPLS&${GEO_USERNAME}`,
    )
    const {geonames: cities} = await result.json()
    if (cities.length > 0) {
      const location = {
        location: `${cities[0].name}, ${cities[0].countryName}`,
        lat: cities[0].lat,
        lng: cities[0].lng,
      }
      return location
    }
    return {}
  } catch (e) {
    throw e
  }
}
