// Get venue ID
export const getFourSquareVenueID = (lat, lng, name) => {
  return fetch(`https://api.foursquare.com/v2/venues/search?client_id=PDWT4KJRJCFUC12WCLY3BIUFPX13LROWGA5AGVUX4TJ2QUQS&client_secret=PMJSLWFDH5PNT4YYBL0F2SHGBFPS4VTQBSD5KXDMIGU4LJ3M&v=20180323&limit=1&ll=${lat},${lng}&query=${name}`)
  .then((response) => response.json())
  .then((response) => response.response.venues[0].id);
}

// Get venue info data using the venue's ID
export const getFourSquareVenueInfo = (venueId) => {
  return fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=PDWT4KJRJCFUC12WCLY3BIUFPX13LROWGA5AGVUX4TJ2QUQS&client_secret=PMJSLWFDH5PNT4YYBL0F2SHGBFPS4VTQBSD5KXDMIGU4LJ3M&v=20180323`)
  .then((response) => response.json())
  .then((response) => response.response.venue);
}
