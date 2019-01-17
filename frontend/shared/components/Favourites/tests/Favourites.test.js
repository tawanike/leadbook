import React from 'react';
import { shallow } from 'enzyme';
import Favouries from '../Container';

describe('Favouries', () => {
  it('should render correctly.', () => {
    const component = shallow(<Favouries />);

    expect(component).toMatchSnapshot();
  });
});
