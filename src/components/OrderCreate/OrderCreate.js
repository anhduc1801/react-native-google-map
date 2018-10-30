import React, {Component} from 'react';
import {Platform, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Dimensions, KeyboardAvoidingView} from 'react-native';
import {
  Container,
  Text,
  Content,
  Icon,
  Header,
  Right,
  Body,
  Title,
  Left,
  Footer,
  Image
} from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import GooglePlaceTextbox from "../GooglePlaceTexbox/GooglePlaceTextbox";
import MapViewDirections from 'react-native-maps-directions';
import imgHome from '../../assets/images/icon-home.png';
import imgThunder from '../../assets/images/icon-thunder.png';

// const GOOGLE_MAPS_APIKEY = 'AIzaSyBx2eWxTnrEBIsJPYY_lLtYgdXL0HcXoPY';
// const GOOGLE_MAPS_APIKEY = 'AIzaSyBi0JHchtgJ9ccRRTSz9kgHmo35R1Gjpts';
const GOOGLE_MAPS_APIKEY = 'AIzaSyDANYn9ocEBPczgn7bB9UkPIeCmT4jkgw8';

export default class OrderCreate extends Component {
  constructor(props) {
    super(props);
    this.getAddressReceive = this.getAddressReceive.bind(this);
    this.getAddressReturn = this.getAddressReturn.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.state = {
      addressReceive: {},
      addressReturn: {},
      coordinates: [
        {
          latitude: 20.999834,
          longitude: 105.841344,
        },
        {
          latitude: 21.024025,
          longitude: 105.853412,
        },
      ],
      coords: [],
      initialRegion: {
        latitude: 20.9948891,
        longitude: 105.799677,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
      },
      mapRegion: null,
      lastLat: null,
      lastLong: null,
    }
  }

  getAddressReceive(value) {
    this.setState({
      addressReceive: value
    })
  }

  getAddressReturn(value) {
    this.setState({
      addressReturn: value
    })
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      };
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onError = (errorMessage) => {
    console.log(JSON.stringify(errorMessage))
  };
  render() {
    return (
      <Container>
          <Header style={styles.header}>
            <Left>
              <TouchableOpacity>
                <Icon name="md-menu" style={{ color: Platform.OS === 'android' ? '#fff' : '#000' }} />
              </TouchableOpacity>
            </Left>
            <Body>
              <Title>Google Map API</Title>
            </Body>
            <Right/>
          </Header>

          <GooglePlaceTextbox getAddressReceive={this.getAddressReceive} type="receive" />
          <GooglePlaceTextbox getAddressReturn={this.getAddressReturn} type="return" />

          <View style={styles.mapWrap}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              // initialRegion={this.state.initialRegion}
              region={{latitude: this.state.addressReceive.lat || 20.9948891, longitude: this.state.addressReceive.lng || 105.799677, latitudeDelta: 0.002, longitudeDelta: 0.002}}
              zoomEnabled={true}
              // pitchEnabled={true}
              // showsUserLocation={true}
              // followsUserLocation={true}
              // showsCompass={true}
              // moveOnMarkerPress={true}
              rotateEnabled
              // showsMyLocationButton
              // maxZoomLevel={13}
            >
              <MapView.Marker
                coordinate={{
                  latitude: (this.state.lastLat + 0.00050) || -36.82339,
                  longitude: (this.state.lastLong + 0.00050) || -73.03569,
                }}
                title="Tôi đang ở đây"
              />
              {
                !!this.state.addressReceive.lat && this.state.addressReceive.lng &&
                <MapView.Marker
                  coordinate={{latitude: this.state.addressReceive.lat, longitude: this.state.addressReceive.lng}}
                  title="Địa điểm nhận hàng"
                  image={imgHome}
                />
              }
              {
                !!this.state.addressReturn.lat && this.state.addressReturn.lng &&
                <MapView.Marker
                  coordinate={{latitude: this.state.addressReturn.lat, longitude: this.state.addressReturn.lng}}
                  title="Địa điểm trả hàng"
                  image={imgThunder}
                />
              }
              <MapViewDirections
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="hotpink"
                origin={{latitude: this.state.addressReceive.lat, longitude: this.state.addressReceive.lng}}
                destination={{latitude: this.state.addressReturn.lat, longitude: this.state.addressReturn.lng}}
              />
            </MapView>
          </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'orange',
    zIndex: 999,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapWrap: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: -1,
  }
});