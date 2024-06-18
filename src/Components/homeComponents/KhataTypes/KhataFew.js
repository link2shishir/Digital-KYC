import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Pressable} from 'react-native';
import styles from './Khata.styles';
import Icon from 'react-native-vector-icons/Fontisto';
import colors from '../../../styles/Colors';
import EyeIcon from 'react-native-vector-icons/Entypo';
import CheckIcon from 'react-native-vector-icons/Feather';
import api from '../../../Services/ApiServices'
import Token from './../../../utils/token';
import {LearnMoreLinks} from 'react-native/Libraries/NewAppScreen';

const LIMIT = 3;

const KhataFew = ({KYCSteps, navigation}) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    // const token = await getAccessToken();
    const token = Token.token;

    if (!token) {
      console.log('Error while fetchonig product');
      console.log(error);
      Alert.alert('NO TOKEN');
    }

    var config = {
      method: 'get',
      url:
        '/productsetup/GetOnlineProductSetupList',
      headers: {
        Authorization: token,
        Cookie:
          '.AspNet.ApplicationCookie=thyfaIEtArbHRiZ8ldtBi8ORRz2OUELmhUEQuwiLDaPk36nFpODEhsASRhQ-luJ9IIWgmMVYNPbkIVyHjLqOarfn4h8mIqUxkTFOhbLv2g4YSFwtdd-b99YrbRJaLvVCvGRfgtgvBMbfxj35eDRxOY7Np14NWkPGSZemr9BMWTK0Dw6PigiG4Sq1QTlznJq4KC2h36ix4K4nbWIVTNbxpGastZCw4HO7ydxwggNfcZbgix5DJweH-vBp-Nc2pLcSnPtDcPdxJAyOP994DuNdqbEBkpMK8wbbiSIHguivek8K9qmR9YrIVolK_KSyMgTI_S2eR11tYrSSYBmBu-tIQF16aldXCCVgshJ2lDbYbRml3H_0rwgMOVzaHCalQ-AI4elDZ_y0Qyfwg7Sjs91hfQOTQqJMge2sK4n-5bJwpIcSMK9eHTv_NGDXQh_dq-z-B6FTJybdOz9zs_ripP4QXKOPyjHbhN-d1hAxPggq5w9IX6VHw6P-t3gb8yLvvnEarKO__CUNEMZRdn4IuZ2ZtOaufr1WFeXaSPsl3yL2XbXC8zybRhXSKFX_iLSGOCbexcWVorW945cug0AYaVx1TA',
      },
      // data: data1
    };
    // console.log(token)
    try {
      const response = await api(config);
      //   console.log('get online token data:', response)

      setProducts(response.data);
      return response.data;
    } catch (error) {
      console.log('Error while fetchonig product');
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log({ products })

  const displayKhata = useCallback(
    (len) => {
      const arr = [];

      for (let i = 0; i < len; i++) {
        const item = products[i];

        arr.push(
          <View key={item.Id}>
            <View style={styles.container}>
              <View style={styles.items}>
                <View style={styles.iconContainer}>
                  <Icon
                    name="credit-card"
                    size={40}
                    color={colors.secondary}></Icon>
                </View>
                <View style={styles.detailContainer}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.khataTitle}>{item.Name}</Text>
                    <Text style={{color: 'gray'}}>{item.ShortDescription}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.horizontalLine}></View>
              <View
                style={{flexDirection: 'row', marginLeft: 20, marginRight: 20}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('LearnMore', {item})}
                  style={styles.learnMoreButton}>
                  <EyeIcon
                    name="eye"
                    size={20}
                    style={{color: colors.secondary}}
                  />
                  <Text style={styles.learnMoreButtonText}>Learn More</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() =>
                    navigation.navigate('KYCSteps', {
                      item,
                      type: 'init',
                      data: null,
                    })
                  }>
                  <CheckIcon name="check" size={30} style={{color: '#fff'}} />
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>,
        );
      }

      return arr;
    },
    [products],
  );

  if (products && products.length >= LIMIT) {
    return (
      <>
        {displayKhata(LIMIT)}
        <Pressable
          style={{
            width: '40%',
            height: 45,
            marginLeft: 115,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            backgroundColor: '#001370',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
          }}
          onPress={() => navigation.navigate('Forms')}>
          <Text
            style={{
              color: '#fff',

              fontWeight: '600',
              fontSize: 18,
            }}>
            Load More 
          </Text>
        </Pressable>
      </>
    );
  } else {
    return displayKhata(products.length);
  }
};
export default KhataFew;
