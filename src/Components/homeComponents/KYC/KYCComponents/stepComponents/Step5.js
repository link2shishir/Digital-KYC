import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from '../../KYCSteps.styles';
import step2Styles from './step2Components/Step2.styles';
import AccountSummary from './step5Components/AccountSummary';
import Camera from './step5Components/Camera';
import ScheduleCalendar from './step5Components/ScheduleCalendar';
import api from '../../../../../Services/ApiServices'
import PersonalDetails from './step2Components/PersonalDetails';
import FamilyDetails from './step2Components/FamilyDetails';

import Button from './step1Components/Checkbox';

import Token from './../../../../../utils/token';
import CustomerRegistrationId from './../../../../../utils/customerRegistrationId';

import IdentificationDetails from './step2Components/IdentificationDetails';
import EmploymentDetails from './step3Components/EmploymentDetails';
import CorrespondanceAdd from './step3Components/CorrespondanceAdd';
import PermanentAdd from './step3Components/PermanentAdd';

import Submitted from './step5Components/Submitted';

const Step5 = (props) => {
  const [state, setState] = useState(
    props.formData.getData().IsCorrespondenceAddress === 'true' ? 'yes' : 'no',
  );
  const [isChecked, setIsChecked] = useState(() => {
    return props.formData.getData().IsCorrespondenceAddress === 'false'
      ? [
          {id: 1, value: false, name: 'Yes', selected: false},
          {id: 2, value: true, name: 'No', selected: true},
        ]
      : [
          {id: 1, value: false, name: 'Yes', selected: true},
          {id: 2, value: true, name: 'No', selected: false},
        ];
  });
  const onBtnClick = (item) => {
    let updatedState = isChecked.map((isCheckedItem) =>
      isCheckedItem.id === item.id
        ? {...isCheckedItem, selected: true}
        : {...isCheckedItem, selected: false},
    );
    setIsChecked(updatedState);
    if (updatedState[0].selected === true) {
      setState('yes');

      const add = props.formData.getData().KYCAddresses;
      const old = add ? [...add] : [];

      const KYCAddresses = old.filter((add) => add.AddressType !== 'Permanent');

      props.formData.addData({IsCorrespondenceAddress: 'true', KYCAddresses});
    } else if (updatedState[1].selected === true) {
      setState('no');
      props.formData.addData({IsCorrespondenceAddress: 'false'});
    }
  };

  const [submitted, setSubmitted] = useState(false);

  const submitForm = useCallback(() => {
    const data = props.formData.getData();

    // Default data
    /*
      const data = {
        CustomerRegistrationId: 'aad65c07-ea8b-422d-b0a9-bcd44d4282a4',
        ShortName: null,
        Nationality: 'Nepali',
        Placeborn: 'kathmandu',
        MothersMaidenName: 'Manita',
        MaritalStatus: 'Single',
        Education: 'Attended University',
        Occupation: 'Politician',
        FatherFullName: 'Yogesh Bhatta',
        MotherFullName: 'Yogi Bhatta',
        GrandfatherFullName: 'Ram Bhatta',
        SpouseFullName: '',
        FatherinlawFullName: '',
        SecondaryMobileNumber: '9840015606',
        ResidentialLandlineNumber: '4001211',
        OfficeLandlineNumber: '',
        EmploymentType: 'Unemployed',
        PleaseSpecify: '',
        YearlyIncome: null,
        CompanyName: '',
        ServiceType: 'Debit cards',
        Branch: '17',
        BranchName: 'Teendhara,Kathmandu',
        ProductSetupId: 'abd9aceb-3989-4dfe-be27-0cf8452a81c2',
        Purpose: 'Credit Card',
        ProductName: 'General Savings',
        SourceOfFund: 'Salary and Benefits',
        MaximumAmount: 100000.0,
        IsConvicted: false,
        IsMember: false,
        IsConvictedHidden: false,
        IsMemberHidden: false,
        Declared: false,
        IsCorrespondenceAddress: 'false',
        CurrenDate: '2021-04-15T09:46:46.8268523+00:00',
        RegistrationType: 0,
        KYCAddresses: [
          {
            AddressType: 'Residential',
            Address: 'Mulpani',
            WardNumber: '7',
            Town: 'Bagmati',
            District: 'Dailekh',
            State: 'Gandaki Pradesh',
            Country: 'NP',
            States: null,
            Countries: null,
            Districts: null,
          },
          {
            AddressType: 'Permanent',
            Address: 'Mulpani',
            WardNumber: '7',
            Town: 'Bagmati',
            District: 'Dailekh',
            State: 'Gandaki Pradesh',
            Country: 'NP',
            States: null,
            Countries: null,
            Districts: null,
          },
          {
            AddressType: 'Correspondence',
            Address: 'SaD',
            WardNumber: '6',
            Town: 'Bagmati',
            District: 'Dailekh',
            State: 'Gandaki Pradesh',
            Country: 'NP',
            States: null,
            Countries: null,
            Districts: null,
          },
        ],
        KYCIdentification: {
          IDType: 'Citizenship',
          IDNumber: '12345',
          IssueDate: '2020-01-29T00:00:00',
          ValidTill: '2020-02-29T00:00:00',
          IssueState: 'SDA',
          IssueAuthority: 'District Administration Office',
          CurrentDate: '2021-04-15T09:46:46.8268523+00:00',
          IDTypes: null,
          IssueAuthorites: null,
        },
        CustomerDocuments: [],
      };
    */

    console.log('Form data in step 5:', data);

    const token = Token.token;
    if (!token) {
      console.log('Error while submitting data. No TOKEN');
      Alert.alert('NO TOKEN');

      return;
    }

    const id = CustomerRegistrationId.id;
    // const id = 'CFCF09A9-E1DD-4BB1-99D7-039AD04430FC';
    if (!id) {
      console.log('Error while submitting data. No TOKEN');
      Alert.alert('NO RegistrationId');

      return;
    }

    data.CustomerRegistrationId = id;
    // DEFAULT ADDED DATA
    // ==========================
    data.ProductSetupId = 'ABD9ACEB-3989-4DFE-BE27-0CF8452A81C2';
    // ==========================

    var config = {
      method: 'post',
      url:
        '/customerregistration/OmniChannelCustomerRegistration',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        Cookie:
          '.AspNet.ApplicationCookie=l6V_yMdpxh0Ngdee1LYi8yYm5zJZ-WTOIJkO9H5cz7IWNFC05Gg6zmKKzxl0LJcnQ0Il1LJVBiv5LOmw2qDV5Ae5TevRgmzL6kcrJOUk1T-ebkejAhtbUSV9rsZn5khtKFx9jWmswIo_pkQNI5lKt2gtk2OqdQfb6gtEXXJ7KEVqe3V8rhtvXURVWgDYByCtLSQA8AhSed2Vn7gIdafj2q4Fh9tlOGw3zkdRI7c8abv8cG0SeKyt5CBSu7mJs3fnRY0RbBUrSQILTEpyUtlfo1r5ns3VBjwWSUpjx_rr8wsiMajwVYuNlzuyWBwoHtoPvGQb-2cTorcetr-X0a6Zdv2EIDCbiospcTmR2xCD0jYd3VmXVkAZJnimi2WuDgNkA8b_fWjpygOrdRmw3IIxSTfXCYf-yMRZbWhua2eGnt1eWJ1awgmXMAr3kmU-uBmS79R4ZhzIjRDfIkdRFGZHm0pvdZoAjgzM1_ErOsLAvY8uvPiI8f2GEBAc14cQgsN2uLEcNo6I0UJW0qADgnM-2XE0oi-eksZB98MqYJFFFQ8rING3fnZz911lH6V3Rpkcq0JDrunpskggY4r7NPP1Bg',
      },
      data: JSON.stringify(data),
    };

    api(config)
      .then(function (response) {
        console.log(JSON.stringify(data));

        setSubmitted(true);
      })
      .catch(function (error) {
        console.log('Error while submitting data');
        console.dir(error);

        Alert.alert('There was and error in the form');
      });
  }, [props.formData]);

  return submitted ? (
    <Submitted goBack={props.goBack} />
  ) : (
    <View style={{marginTop: 7, marginLeft: 15, marginRight: 15}}>
      <PersonalDetails formData={props.formData} />
      <FamilyDetails formData={props.formData} />
      <IdentificationDetails formData={props.formData} />
      <EmploymentDetails formData={props.formData} />

      <CorrespondanceAdd formData={props.formData} />

      <Text style={styles.titleText}>
        Are the correspondence and permanent address same as residential
        address?
      </Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {isChecked.map((item) => (
          <Button
            onPress={() => onBtnClick(item)}
            selected={item.selected}
            key={item.id}>
            {item.name}
          </Button>
        ))}
      </View>

      {state === 'no' ? <PermanentAdd formData={props.formData} /> : null}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={step2Styles.nextBtn}
          onPress={() => submitForm()}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
            Submit Form
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step5;
