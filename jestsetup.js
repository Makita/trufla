// Make Enzyme functions available in all test files without importing
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.fetch = require('jest-fetch-mock');

// Configure an adapter
Enzyme.configure({ adapter: new Adapter() });
// Fail tests on any warning
console.error = message => {
   throw new Error(message);
};