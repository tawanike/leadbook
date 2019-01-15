import React from 'react';
import { shallow } from 'enzyme';
import ResetPassword from '../../ResetPassword/Container';

describe('ResetPassword', () => {
  it('should render correctly.', () => {
    const component = shallow(<ResetPassword />);

    expect(component).toMatchSnapshot();
  });
});
