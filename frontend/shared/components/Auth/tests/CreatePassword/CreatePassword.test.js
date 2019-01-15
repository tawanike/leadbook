import React from 'react';
import { shallow } from 'enzyme';
import CreatePassword from '../../CreatePassword/Container';

describe('CreatePassword', () => {
  it('should render correctly.', () => {
    const component = shallow(<CreatePassword />);

    expect(component).toMatchSnapshot();
  });
});
