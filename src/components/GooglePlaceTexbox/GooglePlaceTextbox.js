import React, {Component} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDANYn9ocEBPczgn7bB9UkPIeCmT4jkgw8';

export default class GooglePlaceTextbox extends Component {
  constructor(props) {
    super(props);
  }
  getAddressReceive = (value) => {
    this.props.getAddressReceive(value);
  };
  getAddressReturn = (value) => {
    this.props.getAddressReturn(value);
  };
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder={this.props.type === 'receive' ? 'Nhập điểm nhận hàng' : 'Nhập điểm trả hàng'}
        minLength={1} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='false'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(details.geometry.location, this.props.type);
          if (this.props.type === 'receive') {
            this.getAddressReceive(details.geometry.location);
          };
          if (this.props.type === 'return') {
            this.getAddressReturn(details.geometry.location)
          }
        }}
        getDefaultValue={() => ''}

        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: GOOGLE_MAPS_APIKEY,
          language: 'en', // language of the results
          // types: '(cities)', // default: 'geocode'
          components: "country:vn",
        }}
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth:0,
            zIndex: 1,
            postion: 'absolute',
            top: this.props.type === 'receive' ? -8 : 30,
            bottom: 0,
            left: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 14,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 0
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          listView: {
            color: 'black', //To see where exactly the list is
            zIndex: 9999, //To popover the component outwards
            position: 'absolute',
            top: 76,
            backgroundColor: '#fff',
          },
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        // predefinedPlaces={[homePlace, workPlace]}
        debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    )
  }
}