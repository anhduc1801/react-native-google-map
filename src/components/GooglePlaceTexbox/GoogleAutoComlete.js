import React, {Component} from 'react';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import {TextInput, ScrollView, Dimensions} from 'react-native';
import LocationItem from '../OrderCreate/LocationItem';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBx2eWxTnrEBIsJPYY_lLtYgdXL0HcXoPY';

export default class GoogleAutoComlete extends Component {
  render() {
    return (
      <GoogleAutoComplete apiKey={GOOGLE_MAPS_APIKEY} debounce={300} components="country:vn">
        {({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
        <React.Fragment>
          <TextInput
            style={{
            height: 40,
            width: Dimensions.get('window').width,
            borderWidth: 1,
            paddingHorizontal: 16,
            zIndex: 2,
            backgroundColor: '#fff',
            borderColor: '#ccc',
            }}
            value={inputValue}
            onChangeText={handleTextChange}
            placeholder="Nhập địa chỉ nhận hàng..."
          />
          <ScrollView style={{ zIndex: 99999 }}>
            {locationResults.map((el, i) => (
            <LocationItem
              {...el}
              el={el}
              fetchDetails={fetchDetails}
              key={String(i)}
              style={{ zIndex: 1000 }}
            />
            ))}
          </ScrollView>
        </React.Fragment>
        )}
    </GoogleAutoComplete>
    )
  }
}