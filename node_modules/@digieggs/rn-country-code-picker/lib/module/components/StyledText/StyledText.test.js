import React from 'react';
import { render } from '@testing-library/react-native';
import StyledText from './';
test('renders correctly', () => {
  const text = 'Test Text';
  const {
    toJSON,
    getByText
  } = render( /*#__PURE__*/React.createElement(StyledText, null, text));
  const rendered = toJSON();
  expect(getByText(`${text} `)).toBeTruthy();
  expect(rendered).toMatchSnapshot();
});
//# sourceMappingURL=StyledText.test.js.map