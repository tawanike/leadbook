import React from 'react';
import { shallow } from 'enzyme';
import SignOut from '../../SignOut/Container';

describe('SignOut', () => {
  it('should render correctly.', () => {
    const component = shallow(<SignOut />);

    expect(component).toMatchSnapshot();
  });
});
