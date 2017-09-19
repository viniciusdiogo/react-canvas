import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CanvasRectangle from './CanvasRectangle';

import { shallow } from 'enzyme';

class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value
  }

  removeItem(key) {
    delete this.store[key]
  }
}

function mockItem(overrides) {
  global.window.localStorage = new LocalStorageMock
}

describe('<App />', () => {
  it('renders without crashing', () => {
    const item = mockItem();
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('box with correct size', () => {
    const item = mockItem();
    let canvasix = 0
    let boxWidth = 200;
    const wrapper = shallow(<CanvasRectangle key={canvasix} width={boxWidth} />);
    expect(wrapper.find('canvas').props().width).toBe(boxWidth);
    expect(wrapper.find('canvas').props().height).toBe(boxWidth);
  });
});