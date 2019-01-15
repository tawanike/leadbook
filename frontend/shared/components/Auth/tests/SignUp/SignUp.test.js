import React from 'react';
import { shallow } from 'enzyme';
import SignUp from '../../SignUp/Container';

describe('SignUp', () => {
  it('should render correctly.', () => {
    const component = shallow(<SignUp />);

    expect(component).toMatchSnapshot();
  });
});
