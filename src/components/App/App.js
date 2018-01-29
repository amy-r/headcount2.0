import React, { Component } from 'react';
import './App.css';
import DistrictRepository from '../../helper.js';
import kinderData from '../../kindergartners_in_full_day_program.js';
import CardContainer from '../CardContainer/CardContainer';
import SearchBar from '../searchbar/SearchBar';
import Header from '../Header/Header';

class App extends Component {
  constructor() {
    super();
    
    this.district = new DistrictRepository(kinderData);

    this.state = {
      data: this.district.findAllMatches(),
      selected: [],
      headerSize: 'large',
      compared: []
    };
  }

  filterCards = (searchValue = '') => {
    const foundItems = this.district.findAllMatches(searchValue);
    this.setState({
      data: foundItems
    });
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    let posY = parseInt(e.currentTarget.scrollY);

    const headerSize = posY > 85 ? 'small' : 'large'
    this.setState({
      headerSize
    })
  }

  handleClick = (e) => {
    const truth = this.state.selected; 
    const selectedDistrict = this.district.findByName(e.target.id);

    selectedDistrict.style = 'selected';

    this.manageSelected(truth, selectedDistrict);
  }

  manageSelected = (truth, selectedDistrict) => {
    switch (truth.length) {
      case 2:
        truth.shift();
        truth.push(selectedDistrict);
        this.makeComparison(truth[0], truth[1])
        break;
      case 1:
        truth.unshift(selectedDistrict)
        this.makeComparison(truth[0], truth[1])
        break
      default:
        truth.unshift(selectedDistrict)
    }
    this.setState({
      selected: truth
    });
  }

  makeComparison = (dist1, dist2) => {
    const compared = Object.entries(
      this.district.compareDistrictAverages(
        dist1.location, 
        dist2.location
      )
    );

    this.setState({
      compared
    });
  }

  render() {
    return (
      <div className='App'>
        <Header size= {this.state.headerSize} /> 
        <SearchBar className='SearchBar' filterCards={this.filterCards} />
        <CardContainer {...this.state} handleClick={this.handleClick}/>
      </div>
    );
  }
}

export default App;
