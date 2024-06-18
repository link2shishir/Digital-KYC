import React, {Component} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import styles from './SearchComponent.styles';
import {SearchBar} from 'react-native-elements';

export default class SearchComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchId: null,
    };
  }

  render() {
    return (
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <TextInput
            value={this.state.searchId}
            onChangeText={(data) => this.setState({searchId: data})}
            style={styles.searchbar}
            placeholder="Enter Customer Id or Email address"
          />
        </View>
        <Pressable
          style={styles.searchme}
          onPress={() =>
            this.state.searchId && this.state.searchId.length > 0
              ? this.props.continue(this.state.searchId)
              : null
          }>
          <Text style={{fontSize: 16, color: '#fff'}}>Search me</Text>
        </Pressable>
      </View>
    );
  }
}
