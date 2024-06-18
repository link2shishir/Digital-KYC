import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import colors from '../../../../../../styles/Colors';
import styles from '../../../KYCSteps.styles';
import step2Styles from '../step2Components/Step2.styles';
import {Select, Option} from 'react-native-chooser';
import {Country} from '../step2Components/Dropdown';

import GetDropdownOptions from './../../../../../../utils/getDropdownOptions';

const CorrespondanceAdd = (props) => {

  const [data, setData] = React.useState({
    street: '',
   Address: '',
   Ward: '',
   
    check_textInputChange: false,

    isValidstreets: true,
    isValidAddresss: true,
    isValidWards: true,
});
  const filledData =
    (props.formData.getData().KYCAddresses &&
      props.formData
        .getData()
        .KYCAddresses.find((add) => add.AddressType === 'Correspondence')) ||
    {};

  const [countryMenu, setCountnryMenu] = useState(null);
  const [country, setCountry] = useState(filledData.Country || 'Country');

  const [state, setState] = useState(filledData.State || 'Select Your State');
  const [stateOp, setStateOp] = useState(null);

  const [district, setDistrict] = useState(
    filledData.District || 'Select Your District',
  );
  const [districtOp, setDistrictOp] = useState(null);

  const [city, setCity] = useState(filledData.Town || 'Select your town/city');

  const [Street, setStreet] = useState(filledData.Street || '');
  const [address, setAddress] = useState(filledData.Address || '');
  const [ward, setWard] = useState(filledData.WardNumber || '');

  const nepal = () => {
    setCountry('Nepal');
    setCountnryMenu(false);
  };
  const onSelectState = (value, label) => {
    setState(value);
  };
  const onSelectDistrict = (value, label) => {
    setDistrict(value);
  };
  const onSelectCity = (value, label) => {
    setCity(value);
  };

  useEffect(() => {
    GetDropdownOptions(['Country', 'District', 'State'])
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const Country = [],
            District = [],
            State = [];

          res.data.forEach((op) => {
            switch (op.ColumnName) {
              case 'Country':
                Country.push(
                  <Option key={op.Value} value={op.Value}>
                    {op.Title}
                  </Option>,
                );
                break;
              case 'District':
                District.push(
                  <Option key={op.Value} value={op.Value}>
                    {op.Title}
                  </Option>,
                );
                break;
              case 'State':
                State.push(
                  <Option key={op.Value} value={op.Value}>
                    {op.Title}
                  </Option>,
                );
                break;
              default:
                break;
            }
          });

          setCountnryMenu(Country);
          setDistrictOp(District);
          setStateOp(State);
        }
      })
      .catch((err) => {
        console.log('CorrespondanceAdd Dropdown err:', err);
        console.dir(err);
      });
  }, [setCountnryMenu, setStateOp, setDistrictOp]);

  useEffect(() => {
    const add = props.formData.getData().KYCAddresses;
    const old = add ? [...add] : [];

    const KYCAddresses = old.filter(
      (add) => add.AddressType !== 'Correspondence',
    );

    KYCAddresses.push({
      AddressType: 'Correspondence',
      Street: Street,
      Town: city,
      District: district,
      State: state,
      Country: country,
      Address: address,
      WardNumber: ward,
    });

    props.formData.addData({KYCAddresses});
  }, [props.formData, Street, city, district, state, country, address, ward]);

  const textInputChange = (val) => {
    if( val.trim().length >= 10 ) {
        setData({
            ...data,
            street: val,
            check_textInputChange: true,
            isValidstreets: true
        });
    } else {
        setData({
            ...data,
            street: val,
            check_textInputChange: false,
            isValidstreets: false
        });
    }
}
const handleValidstreets = (val) => {
  if( val.trim().length >= 10 ) {
      setData({
          ...data,
          isValidstreets: true
      });
  } else {
      setData({
          ...data,
          isValidstreets: false
      });
  }
}
const textInputChange1 = (val) => {
  if( val.trim().length >= 10 ) {
      setData({
          ...data,
          Address: val,
          check_textInputChange: true,
          isValidAddresss: true
      });
  } else {
      setData({
          ...data,
          Address: val,
          check_textInputChange: false,
          isValidAddresss: false
      });
  }
}
const handleValidAddresss = (val) => {
if( val.trim().length >= 10 ) {
    setData({
        ...data,
        isValidAddresss: true
    });
} else {
    setData({
        ...data,
        isValidAddresss: false
    });
}
}

const textInputChange2 = (val) => {
  if( val.trim().length >= 1 ) {
      setData({
          ...data,
          Ward: val,
          check_textInputChange: true,
          isValidWards: true
      });
  } else {
      setData({
          ...data,
          Ward: val,
          check_textInputChange: false,
          isValidWards: false
      });
  }
}
const handleValidWards = (val) => {
if( val.trim().length >= 1) {
    setData({
        ...data,
        isValidWards: true
    });
} else {
    setData({
        ...data,
        isValidWards: false
    });
}
}
  return (
    <View style={{marginBottom: 20}}>
      <View style={step2Styles.textContainer}>
        <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
          Correspondance Address
        </Text>
      </View>
      <View style={step2Styles.detailsContainer}>
        <Text style={{fontSize: 20, marginBottom: 10}}>Country</Text>
        <View style={step2Styles.dropdown1}>
          <Select
            onSelect={(val) => setCountry(val)}
            defaultText={country}
            style={{borderWidth: 0, width: '100%'}}
            textStyle={{fontSize: 17}}
            backdropStyle={{backgroundColor: 'transparent'}}
            optionListStyle={[
              step2Styles.dropdownItem1,
              {height: 'auto', maxHeight: '80%'},
            ]}
            transparent={true}
            selectedStyle={{backgroundColor: 'red'}}>
            {countryMenu}
          </Select>
        </View>

        <Text style={styles.textInputTitle}>State</Text>
        <View style={step2Styles.dropdown1}>
          <Select
            onSelect={(val) => setState(val)}
            defaultText={state}
            style={{borderWidth: 0, width: '100%'}}
            textStyle={{fontSize: 17}}
            backdropStyle={{backgroundColor: 'transparent'}}
            optionListStyle={[
              step2Styles.dropdownItem1,
              {height: 'auto', maxHeight: '80%'},
            ]}
            transparent={true}
            selectedStyle={{backgroundColor: 'red'}}>
            {stateOp}
          </Select>
        </View>

        <Text style={styles.textInputTitle}>District</Text>
        <View style={step2Styles.dropdown1}>
          <Select
            onSelect={(val) => setDistrict(val)}
            defaultText={district}
            style={{borderWidth: 0, width: '100%'}}
            textStyle={{fontSize: 17}}
            backdropStyle={{backgroundColor: 'transparent'}}
            optionListStyle={[
              step2Styles.dropdownItem1,
              {height: 'auto', maxHeight: '80%'},
            ]}
            transparent={true}
            selectedStyle={{backgroundColor: 'red'}}>
            {districtOp}
          </Select>
        </View>

        <Text style={styles.textInputTitle}>Town/ City</Text>
        <View style={step2Styles.dropdown1}>
          <Select
            onSelect={(val) => setCity(val)}
            defaultText={city}
            style={{borderWidth: 0, width: '100%'}}
            textStyle={{fontSize: 17}}
            backdropStyle={{backgroundColor: 'transparent'}}
            optionListStyle={[
              step2Styles.dropdownItem1,
              {height: 'auto', maxHeight: '80%'},
            ]}
            transparent={true}
            selectedStyle={{backgroundColor: 'red'}}>
            {districtOp}
          </Select>
        </View>

        <Text style={styles.textInputTitle}>Street Name/ Tol</Text>
        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your street name/tol"
            onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidstreets(e.nativeEvent.text)}
          />
        </View>
        { data.isValidstreets ? null : 
           
            <Text style={{color: '#FF0000',marginBottom:10}}>Please Enter Street or Tole Name</Text>
    
            }
        <Text style={styles.textInputTitle}>Address</Text>
        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your address"
            onChangeText={(val) => textInputChange1(val)}
                    onEndEditing={(e)=>handleValidAddresss(e.nativeEvent.text)}
          />
        </View>
        { data.isValidAddresss ? null : 
           
           <Text style={{color: '#FF0000',marginBottom:10}}>Please Enter Address</Text>
   
           }
        <Text style={styles.textInputTitle}>Ward</Text>
        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your ward"
            keyboardType="numeric"
            maxLength={2}
            onChangeText={(val) => textInputChange2(val)}
                    onEndEditing={(e)=>handleValidWards(e.nativeEvent.text)}
          />
        </View>
        { data.isValidWards ? null : 
           
           <Text style={{color: '#FF0000',marginBottom:10}}>Please enter ward</Text>
   
           }
      </View>
    </View>
  );
};

export default CorrespondanceAdd;
