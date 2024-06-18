import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  LogBox,
} from 'react-native';
import StepInfo from '../Components/homeComponents/KYC/KYCComponents/StepIndicator';

import FormData from './../utils/formData';

const KYCSteps = ({route, navigation}) => {
  const params = route.params;
  console.log('KYCsteps:', params, params.item.Id);

  const formData = new FormData({
    CustomerType: 'Individual',
  });

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <ScrollView>
      <StepInfo
        formData={formData}
        type={params.type}
        data={
          params.type === 'init'
            ? {ProductSetupId: params.item.Id}
            : params.data
        }
        goBack={navigation.goBack}
      />
    </ScrollView>
  );
};

export default KYCSteps;
