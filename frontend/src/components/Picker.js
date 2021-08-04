import React, { Component } from 'react';
import {connect} from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import {
  chooseArchive
} from '../actions/archives'



const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});


class CreatableAdvanced extends Component {
  state = {
    isLoading: false,
  };
  
  handleChange = (newValue, actionMeta) => {
  
    this.setState({ value: newValue });
    this.props.dispatch(chooseArchive(newValue))
  };
  handleCreate = (inputValue) => {
    this.setState({ isLoading: true });
    console.group('Option created');
    console.log('Wait a moment...');
    setTimeout(() => {
      const { options } = this.props;
      const newOption = createOption(inputValue);
      console.log(newOption);
      console.groupEnd();
      this.setState({
        isLoading: false,
        options: [...options, newOption],
        value: newOption,
      });
    }, 1000);
  };
  render() {
    const { isLoading, value } = this.state;
    const {  options } = this.props
    return (
      <CreatableSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={this.handleChange}
        onCreateOption={this.handleCreate}
        options={options}
        value={value}
      />
    );
  }
}

const mapStateToProps = state => ({
  
  
})

export default connect(mapStateToProps)(CreatableAdvanced);