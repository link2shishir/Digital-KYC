import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../../KYCSteps.styles';
import AccountServices from './step4Components/AccountServices';
import step2Styles from './step2Components/Step2.styles';
import UploadDocument from './step4Components/UploadDocument';
import Button from './step1Components/Checkbox';

const Step4 = (props) => {
  console.log('step 4:', props.formData.getData());

  // DEFAULT ADDED DATA
  // ==========================
  props.formData.addData({
    CustomerDocument: {
      Id: '69B6D788-4B06-4A6F-8B7B-2FFA5E7996E3',
      DocumentType: '.jpg',
      DocumentName: 'biometrics',
    },
  });
  // ==========================

  return (
    <View style={{marginTop: 7, marginLeft: 15, marginRight: 15}}>
      <View style={step2Styles.textContainer}>
        <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
          Account Services
        </Text>
      </View>

      <AccountServices formData={props.formData} />
      <UploadDocument formData={props.formData} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={step2Styles.prevBtn} onPress={props.prev}>
          <Text style={{color: '#dfa00a', fontWeight: 'bold', fontSize: 20}}>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={step2Styles.nextBtn} onPress={props.next}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Review
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step4;
