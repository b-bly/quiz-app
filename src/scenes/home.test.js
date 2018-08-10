import React from 'react';
import Home from './home';
import '../test/helpers';
import { Link } from 'react-router-dom'

it("always renders a div", () => {
  const divs = shallow(<Home />);
  expect(divs.length).toBeGreaterThan(0);
});

it("the rendered div contains everything else that gets rendered", () => {
  const home = shallow(<Home />);
  const divs = home.find('div');
  const wrappingDiv = divs.first();
  expect(wrappingDiv.children()).toEqual(home.children());
});

it("always renders a `Link`", () => {
  const home = shallow(<Home />);
  expect(home.find(Link).length).toBe(1);
});

describe("rendered `Link`", () => {
  it("does not receive any props", () => {
    const home = shallow(<Home />);
    const link = home.find(Link);
    console.log('props: ');
    console.log(Object.keys(link.props()));
    expect(Object.keys(link.props()).length).toBe(4);
  });
});