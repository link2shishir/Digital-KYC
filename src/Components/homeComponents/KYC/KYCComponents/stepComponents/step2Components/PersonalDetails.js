import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';

import {Select, Option} from 'react-native-chooser';
import step2Styles from './Step2.styles';
import styles from '../../../KYCSteps.styles';

import GetDropdownOptions from './../../../../../../utils/getDropdownOptions';

const PersonalDetails = (props) => {
  const filledData = props.formData.getData();

  const [nationality, _setNationality] = useState(
    filledData.Nationality || 'Select your nationality',
  );
  const [nationalityOp, setNationalityOp] = useState(null);

  const [maritalStatus, _setMaritalStatus] = useState(
    filledData.MaritalStatus || 'Select your Marital Status',
  );
  const [maritalStatusMenu, setMaritalStatusmenu] = useState(null);

  const [education, _setEducation] = useState(
    filledData.Education || 'Select Your Education',
  );
  const [educationMenu, setEducationMenu] = useState(null);

  const [occupation, _setOccupation] = useState(
    filledData.Occupation || 'Select Your Occupation',
  );
  const [occupationOp, setOccupationOp] = useState(null);

  const [menu, setMenu] = useState(false);
  const [birthPlace, setBirthPlace] = useState('');
  const [state, setState] = useState('');
  const [data, setData] = React.useState({
    place: filledData.Placeborn || '',
    check_textInputChange: false,
    isValidPlace: true,
    isvalidOccuption: true,
  });
  const textInputChange = (val) => {
    if (val.trim().length >= 10) {
      setData({
        ...data,
        place: val,
        check_textInputChange: true,
        isValidPlace: true,
      });
    } else {
      setData({
        ...data,
        place: val,
        check_textInputChange: false,
        isValidPlace: false,
      });
    }

    props.formData.addData({Placeborn: val});
  };
  const handleValidplace = (val) => {
    if (val.trim().length >= 7) {
      setData({
        ...data,
        isValidPlace: true,
      });
    } else {
      setData({
        ...data,
        isValidPlace: false,
      });
    }
  };

  const textInputChange2 = (val) => {
    if (val.trim().length >= 5) {
      setData({
        ...data,
        occuption: val,
        check_textInputChange: true,
        isValidOccuption: true,
      });

      props.formData.addData({Occupation: val});
    } else {
      setData({
        ...data,
        occuption: val,
        check_textInputChange: false,
        isValidOccuption: false,
      });
    }
  };
  const handleValidOccuption = (val) => {
    if (val.trim().length >= 5) {
      setData({
        ...data,
        isValidOccuption: true,
      });
    } else {
      setData({
        ...data,
        isValidOccuption: false,
      });
    }
  };

  const setNationality = (data) => {
    _setNationality(data);
    props.formData.addData({Nationality: data});
  };
  const setOccupation = (data) => {
    _setOccupation(data);
    props.formData.addData({Occupation: data});
  };
  const setMaritalStatus = (data) => {
    _setMaritalStatus(data);
    props.formData.addData({MaritalStatus: data});
  };
  const setEducation = (data) => {
    _setEducation(data);
    props.formData.addData({Education: data});
  };

  useEffect(() => {
    GetDropdownOptions([
      'Nationality',
      'MaritalStatus',
      'Education',
      'Occupation',
    ])
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const Nationality = [],
            MaritalStatus = [],
            Education = [],
            Occupation = [];

          res.data.forEach((op) => {
            switch (op.ColumnName) {
              case 'Nationality':
                Nationality.push(
                  <Option key={op.Value} value={op.Value}>
                    {op.Title}
                  </Option>,
                );
                break;
              case 'MaritalStatus':
                MaritalStatus.push(
                  <Option key={op.Value} value={op.Value}>
                    {op.Title}
                  </Option>,
                );
                break;
              case 'Education':
                Education.push(
                  <Option key={op.Value} value={op.Value}>
                    {op.Title}
                  </Option>,
                );
                break;
              case 'Occupation':
                Occupation.push(
                  <Option key={op.Value} value={op.Value}>
                    {op.Title}
                  </Option>,
                );
                break;
              default:
                break;
            }
          });

          setNationalityOp(Nationality);
          setMaritalStatusmenu(MaritalStatus);
          setEducationMenu(Education);
          setOccupationOp(Occupation);
        }
      })
      .catch((err) => {
        console.log('PersonalDetail Dropdown err:', err);
        console.dir(err);
      });
  }, [
    setNationalityOp,
    setMaritalStatusmenu,
    setEducationMenu,
    setOccupationOp,
  ]);

  return (
    <View style={{marginBottom: 20}}>
      <View style={step2Styles.textContainer}>
        <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
          Personal Details
        </Text>
      </View>
      <View style={step2Styles.detailsContainer}>
        <Text style={{fontSize: 20, marginBottom: 10}}>Nationality</Text>
        <View style={step2Styles.dropdown1}>
          <Select
            onSelect={(val) => setNationality(val)}
            defaultText={nationality}
            style={{borderWidth: 0}}
            textStyle={{fontSize: 17}}
            backdropStyle={{backgroundColor: 'transparent'}}
            optionListStyle={[step2Styles.dropdownItem1, {height: 'auto'}]}
            transparent={true}
            selectedStyle={{backgroundColor: 'red'}}>
            {nationalityOp}
          </Select>
        </View>

        <Text style={styles.textInputTitle}>Place of Birth</Text>
        <TextInput
          style={styles.textInputStyle}
          value={data.place}
          placeholder="Enter your place of birth"
          //   value={birthPlace}
          //   onChangeText={(birthPlace) => setBirthPlace(birthPlace)}
          // />
          onChangeText={(val) => textInputChange(val)}
          onEndEditing={(e) => handleValidplace(e.nativeEvent.text)}
        />
        {data.isValidPlace ? null : (
          <Text style={{color: '#FF0000', fontSize: 14}}>
            Please Enter Your BirthPlace
          </Text>
        )}

        <Text style={styles.textInputTitle}>Occupation</Text>
        <View style={step2Styles.dropdown1}>
          <Select
            onSelect={(val) => setOccupation(val)}
            defaultText={occupation}
            style={{borderWidth: 0}}
            textStyle={{fontSize: 17}}
            backdropStyle={{backgroundColor: 'transparent'}}
            optionListStyle={[
              step2Styles.dropdownItem1,
              {height: 'auto', maxHeight: '80%'},
            ]}
            transparent={true}
            selectedStyle={{backgroundColor: 'red'}}>
            {occupationOp}
          </Select>
        </View>

        {data.isvalidOccuption ? null : (
          <Text style={{color: '#FF0000', fontSize: 14}}>your occuption</Text>
        )}
        <Text style={styles.textInputTitle}>Marital Status</Text>
        <View style={step2Styles.dropdown1}>
          <Select
            onSelect={(val) => setMaritalStatus(val)}
            defaultText={maritalStatus}
            style={{borderWidth: 0, width: '100%'}}
            textStyle={{fontSize: 17}}
            backdropStyle={{backgroundColor: 'transparent'}}
            optionListStyle={[step2Styles.dropdownItem1, {height: 'auto'}]}
            transparent={true}
            selectedStyle={{backgroundColor: 'red'}}>
            {maritalStatusMenu}
          </Select>
        </View>

        <Text style={styles.textInputTitle}>Education</Text>
        <View style={step2Styles.dropdown1}>
          <Select
            onSelect={(val) => setEducation(val)}
            defaultText={education}
            style={{borderWidth: 0, width: '100%'}}
            textStyle={{fontSize: 17}}
            backdropStyle={{backgroundColor: 'transparent'}}
            optionListStyle={[
              step2Styles.dropdownItem1,
              {height: 'auto', maxHeight: '80%'},
            ]}
            transparent={true}
            selectedStyle={{backgroundColor: 'red'}}>
            {educationMenu}
          </Select>
        </View>
      </View>
    </View>
  );
};

export default PersonalDetails;
