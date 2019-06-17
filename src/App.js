import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';
import MapNav from"./Components/MapNav";
import * as FourSquareAPI from './APIs/FourSquare';

class App extends Component {
  state = {
    places: [
      {
        name: "Mountaineer Field at Mylan Puskar Stadium",
        location: {
          lat: 39.650161,
          lng: -79.955009
        },
        img: '',
        likes: ''
      },
      {
        name: "WVU Mountainlair",
        location: {
          lat: 39.635023,
          lng: -79.954471
        },
        img: '',
        likes: ''
      },
      {
        name: "123 Pleasant Street",
        location: {
          lat: 39.629401,
          lng: -79.957834
        },
        img: '',
        likes: ''
      },
      {
        name: "WVU Coliseum",
        location: {
          lat: 39.649188,
          lng: -79.981125
        },
        img: '',
        likes: ''
      },
      {
        name: "Morgantown Municipal Airport",
        location: {
          lat: 39.645201,
          lng: -79.920372
        },
        img: '',
        likes: ''
      },
      {
        name: "Marilla Park",
        location: {
          lat: 39.627299,
          lng: -79.939895
        },
        img: '',
        likes: ''
      }
    ],
    currentPlaces: [],
    requestAvailable: true
  };

  componentDidMount() {
    this.getFourSquareData();
  }

  // Fetch FourSquare data from API
  getFourSquareData = () => {
    const newPlaces = this.state.places.map((place) => {
      const size = 150
      FourSquareAPI.getFourSquareVenueID(place.location.lat, place.location.lng, place.name)
        .then((venueId) => {
          FourSquareAPI.getFourSquareVenueInfo(venueId)
            .then((venueInfo) => {
              place.likes = venueInfo.likes.count
              place.img = venueInfo.bestPhoto.prefix + size + venueInfo.bestPhoto.suffix
            })
            .catch(() => this.setState({ requestAvailable: false })
        )})
        .catch((e) => alert(e));
      return place;
    });
    this.setState({ currentPlaces: newPlaces });
  }

  // Filter a new array of current places based on user query
  filterPlaces = (query) => {
    if (!query) {
      this.setState({ currentPlaces: [] });
    }
    const filteredPlaces = this.state.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));
    this.setState({ currentPlaces: filteredPlaces });
  }

  // Set active marker when clicking list item
  setActiveMarker = (marker) => {
    document.querySelector(`[title="${marker}"]`).click();
  }

  render() {
    return (
      <div className="App">
        <MapNav places={this.state.currentPlaces} onQuery={this.filterPlaces} setActiveMarker={this.setActiveMarker}/>
        <MapContainer places={this.state.currentPlaces} centerCoords={this.state.places[0].location} activeMarker={this.state.activeMarker} showingInfoWindow={this.state.showingInfoWindow} requestAvailable={this.state.requestAvailable}/>
      </div>
    );
  }
}

export default App;
