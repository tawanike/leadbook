import React from 'react';
import { shallow } from 'enzyme';
import Activate from '../../Activate/Container';

describe('Activate', () => {
  it('should render correctly.', () => {
    const component = shallow(<Activate />);

    expect(component).toMatchSnapshot();
  });
});
