import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import CheckBox from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../../KYCSteps.styles';
import step2Styles from '../step2Components/Step2.styles';
import colors from '../../../../../../styles/Colors';
import EmploymentType from './EmploymentType';
import Button from '../step1Components/Checkbox';
import {Select, Option} from 'react-native-chooser';

import GetDropdownOptions from './../../../../../../utils/getDropdownOptions';

const EmploymentDetails = (props) => {

  const [data, setData] = React.useState({
    Employment: '',
  OfficeName: '',
  OfficeAddress: '',
  Income: '',

    check_textInputChange: false,
  
    isValidEmployments: true,
    isValidOfficeNames: true,
    isValidOfficeAddresss: true,
    isValidIncomes: true,
});

const textInputChange = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          Employment: val,
          check_textInputChange: true,
          isValidEmployments: true
      });
  } else {
      setData({
          ...data,
          Employment: val,
          check_textInputChange: false,
          isValidEmployments: false
      });
  }
}
const handleValidEmployments = (val) => {
if( val.trim().length >= 5 ) {
    setData({
        ...data,
        isValidEmployments: true
    });
} else {
    setData({
        ...data,
        isValidEmployments: false
    });
}
}
const textInputChange1 = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          OfficeName: val,
          check_textInputChange: true,
          isValidOfficeNames: true
      });
  } else {
      setData({
          ...data,
          OfficeName: val,
          check_textInputChange: false,
          isValidOfficeNames: false
      });
  }
}
const handleValidOfficeNames = (val) => {
if( val.trim().length >= 5 ) {
    setData({
        ...data,
        isValidOfficeNames: true
    });
} else {
    setData({
        ...data,
        isValidOfficeNames: false
    });
}
}

const textInputChange2 = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
          OfficeAddress: val,
          check_textInputChange: true,
          isValidOfficeAddresss: true
      });
  } else {
      setData({
          ...data,
          OfficeAddress: val,
          check_textInputChange: false,
          isValidOfficeAddresss: false
      });
  }
}
const handleValidOfficeAddresss = (val) => {
if( val.trim().length >= 5 ) {
    setData({
        ...data,
        isValidOfficeAddresss: true
    });
} else {
    setData({
        ...data,
        isValidOfficeAddresss: false
    });
}
}
const textInputChange3 = (val) => {
  if( val.trim().length >= 5 ) {
      setData({
          ...data,
       Income: val,
          check_textInputChange: true,
          isValidIncomes: true
      });
  } else {
      setData({
          ...data,
          Income: val,
          check_textInputChange: false,
          isValidIncomes: false
      });
  }
}
const handleValidIncome = (val) => {
if( val.trim().length >= 5 ) {
    setData({
        ...data,
        isValidIncomes: true
    });
} else {
    setData({
        ...data,
        isValidIncomes: false
    });
}
}


  const filledData = props.formData.getData();

  const [empType, setEmpType] = useState(filledData.EmploymentType || '');
  const [name, setName] = useState(filledData.CompanyName || '');
  const [address, setAddress] = useState(filledData.CompanyAddress || '');

  const [purpose, setPurpose] = useState(filledData.Purpose || 'Purpose');
  const [purposeOp, setPurposeOp] = useState(null);

  const [source, setSource] = useState(
    filledData.SourceOfFund || 'Source of Funds',
  );
  const [sourceOp, setSourceOp] = useState(null);

  const [income, setIncome] = useState(filledData.MaximumAmount || '');
  const [isChecked, setIsChecked] = useState([
    {id: 1, value: false, name: 'Salaried', selected: false},
    {id: 2, value: true, name: 'Retired', selected: false},
    {id: 3, value: false, name: 'Salaried', selected: false},
    {id: 4, value: false, name: 'Retired', selected: false},
    {id: 5, value: false, name: 'Salaried', selected: false},
    {id: 6, value: false, name: 'Retired', selected: false},
    {id: 7, value: false, name: 'Salaried', selected: false},
  ]);
  const onBtnClick = (item) => {
    let updatedState = isChecked.map((isCheckedItem) =>
      isCheckedItem.id === item.id
        ? {...isCheckedItem, selected: true}
        : {...isCheckedItem, selected: false},
    );
    setIsChecked(updatedState);
  };

  useEffect(() => {
    GetDropdownOptions(['Purpose', 'Sourceoffund'])
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const Purpose = [],
            Sourceoffund = [];

          res.data.forEach((op) => {
            switch (op.ColumnName) {
              case 'Purpose':
                Purpose.push(
                  <Option key={op.Value} value={op.Value}>
                    {op.Title}
                  </Option>,
                );
                break;
              case 'Sourceoffund':
                Sourceoffund.push(
                  <Option key={op.Value} value={op.Value}>
                    {op.Title}
                  </Option>,
                );
                break;
              default:
                break;
            }
          });

          setPurposeOp(Purpose);
          setSourceOp(Sourceoffund);
        }
      })
      .catch((err) => {
        console.log('EmploymentDetails Dropdown err:', err);
        console.dir(err);
      });
  }, [setPurposeOp, setSourceOp]);

  useEffect(() => {
    props.formData.addData({
      EmploymentType: empType,
      MaximumAmount: income,
      CompanyName: name,
      CompanyAddress: address,
      Purpose: purpose,
      SourceOfFund: source,
    });
  }, [props.formData, empType, name, address, income, purpose, source]);

  return (
    <View style={{marginBottom: 20, marginTop: 20}}>
      <View style={step2Styles.textContainer}>
        <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
          Employment Details
        </Text>
      </View>

      <View style={step2Styles.detailsContainer}>
        {/* <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          {isChecked.map((item) => (
            <Button
              onPress={() => onBtnClick(item)}
              selected={item.selected}
              key={item.id}>
              {item.name}
            </Button>
          ))}
        </View> */}

        <Text style={{fontSize: 20, marginBottom: 10}}>Employment Type</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter employment type"
          onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidEmployments(e.nativeEvent.text)}
        />
 { data.isValidEmployments ? null : 
           
           <Text style={{color: '#FF0000',marginBottom:10}}>Please Enter Name</Text>
   
           }
        <Text style={{fontSize: 20, marginBottom: 10}}>Office Name</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter office name"
          onChangeText={(val) => textInputChange1(val)}
                    onEndEditing={(e)=>handleValidOfficeNames(e.nativeEvent.text)}
        />
{ data.isValidOfficeNames ? null : 
           
           <Text style={{color: '#FF0000',marginBottom:10}}>Please Enter Office Name</Text>
   
           }
        <Text style={styles.textInputTitle}>Office Address</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter your office address"
          onChangeText={(val) => textInputChange2(val)}
                    onEndEditing={(e)=>handleValidOfficeAddresss(e.nativeEvent.text)}
        />
{ data.isValidOfficeAddresss ? null : 
           
           <Text style={{color: '#FF0000',marginBottom:10}}>Please Enter Office Address</Text>
   
           }
        <Text style={styles.textInputTitle}>Purpose</Text>
        <View style={step2Styles.dropdown1}>
          <Select
            onSelect={(val) => setPurpose(val)}
            defaultText={purpose}
            style={{borderWidth: 0, width: '100%'}}
            textStyle={{fontSize: 17}}
            backdropStyle={{backgroundColor: 'transparent'}}
            optionListStyle={[
              step2Styles.dropdownItem1,
              {height: 'auto', maxHeight: '80%'},
            ]}
            transparent={true}
            selectedStyle={{backgroundColor: 'red'}}>
            {purposeOp}
          </Select>
        </View>

        <Text style={styles.textInputTitle}>Source of Funds</Text>
        <View style={step2Styles.dropdown1}>
          <Select
            onSelect={(val) => setSource(val)}
            defaultText={source}
            style={{borderWidth: 0, width: '100%'}}
            textStyle={{fontSize: 17}}
            backdropStyle={{backgroundColor: 'transparent'}}
            optionListStyle={[
              step2Styles.dropdownItem1,
              {height: 'auto', maxHeight: '80%'},
            ]}
            transparent={true}
            selectedStyle={{backgroundColor: 'red'}}>
            {sourceOp}
          </Select>
        </View>

        <Text style={styles.textInputTitle}>Estimated Annual Income</Text>
        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your annual Income"
            keyboardType="numeric"
            onChangeText={(val) => textInputChange3(val)}
                    onEndEditing={(e)=>handleValidIncome(e.nativeEvent.text)}
          />
        </View>
        { data.isValidIncomes ? null : 
           
           <Text style={{color: '#FF0000',marginBottom:10}}>Please Enter Office Address</Text>
   
           }
      </View>
    </View>
  );
};

export default EmploymentDetails;
