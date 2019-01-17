import React from 'react';
import { shallow } from 'enzyme';
import Component from '../Container';

describe('Component', () => {
  it('should render correctly.', () => {
    const component = shallow(<Component />);

    expect(component).toMatchSnapshot();
  });
});
