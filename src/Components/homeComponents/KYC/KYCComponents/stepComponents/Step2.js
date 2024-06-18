import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import styles from '../../KYCSteps.styles';
import step2Styles from './step2Components/Step2.styles';
import GenderCheckbox from './step2Components/GenderCheckbox';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../../../../styles/Colors';
import AcceptTermsCheckBox from './step2Components/AcceptTermsCheckBox';
import TermsAndConditions from './step2Components/TermsAndConditions';
import DateTimePicker from '@react-native-community/datetimepicker';
import PersonalDetails from './step2Components/PersonalDetails';
import FamilyDetails from './step2Components/FamilyDetails';
import IdentificationDetails from './step2Components/IdentificationDetails';
import OTP from './step2Components/Verification';
import ScheduleCalendar from './step5Components/ScheduleCalendar';

import {Select, Option} from 'react-native-chooser';
import GetDropdownOptions from './../../../../../utils/getDropdownOptions';

const Step2 = (props) => {
  const filledData = props.formData.getData();

  const [branch, _setBranch] = useState(filledData.Branch || 'Select Branch');
  const [branchOp, setBranchOp] = useState(null);

  const today = new Date();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date(today));

  const [screen, setScreen] = useState(
    props.type === 'init' ? 'first-screen' : 'OTP',
  );
  const [regType, setRegType] = useState(
    props.type === 'init' ? null : props.type === 'cont-digital' ? 1 : 2,
  );

  const navigate = props.navigation;
  const [inputValue, setInputValue] = useState('');
  const [number, onChangeNumber] = React.useState(null);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShowCalendar(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);

    var dateSelected = currentDate
      .toISOString()
      .replace('-', '/')
      .split('T')[0]
      .replace('-', '/');
    console.log(dateSelected);
    setDob(dateSelected);
    yearRange: '-99:-18';
  };
  const [data, setData] = React.useState({
    name: '',
    number: '',
    gmail: '',

    check_textInputChange: false,
    isValidname: true,
    isValidNumber: true,
    isValidGmail: true,
  });
  const textInputChange = (val) => {
    if (val.trim().length >= 10) {
      setData({
        ...data,
        name: val,
        check_textInputChange: true,
        isValidname: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        check_textInputChange: false,
        isValidname: false,
      });
    }
  };

  const handleNumberChange = (val) => {
    if (val.trim().length >= 10) {
      setData({
        ...data,
        number: val,
        isValidNumber: true,
      });
    } else {
      setData({
        ...data,
        number: val,
        isValidNumber: false,
      });
    }
  };
  const textInputChange1 = (val) => {
    if (val.trim().length >= 10) {
      setData({
        ...data,
        number: val,
        check_textInputChange: true,
        isValidNumber: true,
      });
    } else {
      setData({
        ...data,
        number: val,
        check_textInputChange: false,
        isValidNumber: false,
      });
    }
  };
  const handleValidname = (val) => {
    if (val.trim().length >= 10) {
      setData({
        ...data,
        isValidname: true,
      });
    } else {
      setData({
        ...data,
        isValidname: false,
      });
    }
  };
  const textInputChange2 = (val) => {
    if (val.trim().length >= 14) {
      setData({
        ...data,
        gmail: val,
        check_textInputChange: true,
        isValidGmail: true,
      });
    } else {
      setData({
        ...data,
        gmail: val,
        check_textInputChange: false,
        isValidGmail: false,
      });
    }
  };

  const handleGmail = (val) => {
    if (val.trim().length >= 14) {
      setData({
        ...data,
        gmail: val,
        isValidGmail: true,
      });
    } else {
      setData({
        ...data,
        gmail: val,
        isValidGmail: false,
      });
    }
  };

  useEffect(() => {
    GetDropdownOptions(['Branch'])
      .then((res) => {
        const Branch = [];

        res.data.forEach((op) => {
          if (op.ColumnName === 'Branch') {
            Branch.push(
              <Option key={op.Value} value={op.Value}>
                {op.Title}
              </Option>,
            );
          }
        });

        setBranchOp(Branch);
      })
      .catch((err) => {
        console.log('Step2 Dropdown err:', err);
        console.dir(err);
      });
  }, [setBranchOp]);

  const setBranch = (data) => {
    _setBranch(data);
    props.formData.addData({Branch: data});
  };

  const [userData, setUserData] = useState(null);

  return (
    <View style={{marginTop: 7, marginLeft: 15, marginRight: 15}}>
      {screen === 'first-screen' ? (
        <View>
          <Text style={styles.titleText}>Personal Details</Text>
          <View>
            <Text style={{fontSize: 17, marginBottom: 7}}>Full Name *</Text>
            <View style={step2Styles.inputContainer}>
              <TextInput
                style={step2Styles.textInputStyle}
                value={data.name}
                placeholder="Full Name"
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidname(e.nativeEvent.text)}
              />
              <Icon
                name="user"
                size={25}
                color={colors.primary}
                style={{position: 'absolute', marginLeft: 8, top: 9}}
              />
            </View>
            {data.isValidname ? null : (
              <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
                Please Provide Valid Full Name
              </Text>
            )}
            <Text style={{fontSize: 17, marginBottom: 7}}>Date of Birth *</Text>
            <View style={step2Styles.inputContainer}>
              <TextInput
                placeholder="Date of Birth"
                style={step2Styles.textInputStyle}
                value={dob}
                onChangeText={(dob) => {
                  setDob(dob);
                }}
                onFocus={() => setShowCalendar(true)}></TextInput>
              <Icon
                name="calendar"
                size={25}
                color={colors.primary}
                style={{position: 'absolute', marginLeft: 8, top: 9}}
              />
            </View>

            {showCalendar ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
                yearRange="-99:-18"
              />
            ) : null}

            <Text style={{fontSize: 17, marginBottom: 7}}>Mobile Number *</Text>
            <View style={step2Styles.inputContainer}>
              <TextInput
                placeholder="Mobile Number"
                value={data.number}
                style={step2Styles.textInputStyle}
                keyboardType="numeric"
                maxLength={10}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange1(val)}
                onEndEditing={(e) => handleNumberChange(e.nativeEvent.text)}
              />
              <Icon
                name="phone"
                size={25}
                color={colors.primary}
                style={{position: 'absolute', marginLeft: 8, top: 9}}
              />
            </View>
            {data.isValidNumber ? null : (
              <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
                Please Enter Valid Number
              </Text>
            )}
            <Text style={{fontSize: 17, marginBottom: 7}}>E-mail Id *</Text>
            <View style={step2Styles.inputContainer}>
              <TextInput
                placeholder="Email Address"
                value={data.gmail}
                style={step2Styles.textInputStyle}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(val) => textInputChange2(val)}
                onEndEditing={(e) => handleGmail(e.nativeEvent.text)}
              />
              <Icon
                name="mail"
                size={25}
                color={colors.primary}
                style={{position: 'absolute', marginLeft: 8, top: 9}}
              />
            </View>
            {data.isValidGmail ? null : (
              <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
                Please Enter Valid E-mail
              </Text>
            )}
            <Text style={{fontSize: 17, marginBottom: 7}}>Gender</Text>

            <GenderCheckbox setGender={setGender} formData={props.formData} />

            <AcceptTermsCheckBox
              toggleModal={() => setModalVisible(!isModalVisible)}
              selection={selected}
              unCheckBox={() => setSelected(!selected)}
            />
            <TermsAndConditions
              visibility={isModalVisible}
              closeModal={() => setModalVisible(!isModalVisible)}
              acceptTerms={() => {
                setSelected(!selected);
                setModalVisible(!isModalVisible);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={step2Styles.prevBtn} onPress={props.prev}>
              <Text
                style={{color: '#dfa00a', fontWeight: 'bold', fontSize: 20}}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // style={[{ borderRadius: 25, padding: 10, alignSelf: 'stretch', alignItems: 'center'}, selected ? {backgroundColor: colors.secondary} : {backgroundColor: 'gray'}]}
              style={[
                step2Styles.nextBtn,
                selected
                  ? {backgroundColor: colors.secondary}
                  : {backgroundColor: 'gray', borderColor: 'gray'},
              ]}
              onPress={() => {
                if (data.name != '' && data.number != '' && data.gmail != '') {
                  console.log('success');
                  setScreen('second-screen');
                } else {
                  Alert.alert(
                    'Something went wrong!',
                    'Please fill all the empty fields properly.',
                    [{text: 'Okay'}],
                  );
                  return;
                }
              }}
              disabled={selected ? false : true}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : screen === 'second-screen' ? (
        <View style={step2Styles.box}>
          <View
            style={{flexDirection: 'column', marginTop: 25, marginLeft: 10}}>
            <Text style={step2Styles.text}>
              Do you want to fill form yourself?
            </Text>

            <Image
              source={require('../../../../../assets/satrter2.png')}
              style={step2Styles.Image}
            />
          </View>
          <Text style={step2Styles.text1}>
            Form can be filled by yourself or bank representative can do it for
            while at meeting.
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={step2Styles.prevBtn}
              onPress={() => {
                setRegType(1);
                setScreen('OTP');
                // props.formData.addData({
                //   CustomerName: data.name,
                //   DOB: dob,
                //   PhoneNumber: data.number,
                //   EmailAddress: data.gmail,
                //   Gender: data.setGender,
                //   RegistrationType: 1,
                // });
              }}>
              <Text
                style={{color: '#dfa00a', fontWeight: 'bold', fontSize: 20}}>
                Digital KYC
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={step2Styles.nextBtn}
              onPress={() => {
                setRegType(2);
                setScreen('OTP');
                // props.formData.addData({
                //   CustomerName: data.name,
                //   DOB: dob,
                //   PhoneNumber: data.number,
                //   EmailAddress: data.gmail,
                //   Gender: data.setGender,
                //   RegistrationType: 2,
                // });
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                I want to fill
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : screen === 'OTP' ? (
        <OTP
          type={props.type}
          data={
            props.type === 'init'
              ? {
                  CustomerName: data.name,
                  CustomerType: 'Individual',
                  EmailAddress: data.gmail,
                  PhoneNumber: data.number,
                  DOB: dob,
                  Gender: gender,
                  RegistrationType: regType,
                  ...props.data,
                }
              : props.data
          }
          next={(regType) => {
            if (props.type !== 'init') {
              setRegType(regType);
            }
            setScreen('last-screen');
          }}
          prev={
            props.type === 'init'
              ? () => setScreen('second-screen')
              : props.goBack
          }
          setUserData={(data) => setUserData(data)}
        />
      ) : regType === 1 ? (
        <ScheduleCalendar userDetail={userData} goBack={props.goBack} />
      ) : (
        <View>
          <View style={{marginBottom: 20}}>
            <View style={step2Styles.textContainer}>
              <Text
                style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
                Branch Details
              </Text>
            </View>
            <View style={step2Styles.detailsContainer}>
              <Text style={{fontSize: 20, marginBottom: 10}}>Branch</Text>

              <View style={step2Styles.dropdown1}>
                <Select
                  onSelect={(val) => setBranch(val)}
                  defaultText="Select Branch"
                  style={{borderWidth: 0, width: '100%'}}
                  textStyle={{fontSize: 17}}
                  backdropStyle={{backgroundColor: 'transparent'}}
                  optionListStyle={[
                    step2Styles.dropdownItem1,
                    {height: 'auto', maxHeight: '80%'},
                  ]}
                  transparent={true}
                  selected={branch}
                  selectedStyle={{backgroundColor: '#f0f0f0'}}>
                  {branchOp}
                </Select>
              </View>
            </View>
          </View>

          <PersonalDetails formData={props.formData} />
          <FamilyDetails formData={props.formData} />
          <IdentificationDetails formData={props.formData} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={step2Styles.prevBtn}
              onPress={() =>
                props.type === 'init'
                  ? setScreen('first-screen')
                  : props.goBack()
              }>
              <Text
                style={{color: '#dfa00a', fontWeight: 'bold', fontSize: 20}}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={step2Styles.nextBtn} onPress={props.next}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Step2;
