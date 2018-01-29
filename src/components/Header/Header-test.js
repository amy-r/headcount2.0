/* eslint-disable */ 
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('Header', () => {

  test('it should render without crashing', () => {
    const renderedCard = shallow(<Header size='small' />);
    expect(renderedCard).toMatchSnapshot();   
  })

  test('it should still match the snapshot when size is large', () => {
    const renderedCard = shallow(<Header size='large' />);
    expect(renderedCard).toMatchSnapshot(); 
  })
})