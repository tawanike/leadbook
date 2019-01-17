import React from 'react';
import { shallow } from 'enzyme';
import Alerts from '../Container';

describe('Alerts', () => {
  it('should render correctly.', () => {
    const component = shallow(<Alerts />);

    expect(component).toMatchSnapshot();
  });
});
