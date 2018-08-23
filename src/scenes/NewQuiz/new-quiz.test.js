import React from 'react';
import NewQuiz from './new-quiz';
import '../../test/helpers';

// wrapper.find('a').simulate('click');
// const wrapper = shallow(<Foo />);

// expect(wrapper.find('.clicks-0').length).to.equal(1);
// wrapper.find('a').simulate('click');
// expect(wrapper.find('.clicks-1').length).to.equal(1);

describe("NewQuiz", () => {
  const wrapper = shallow(<NewQuiz />)

  it("always renders a div", () => {
    const divs = wrapper.find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
  describe("handleChange", () => {
    it("should update state onChange", () => {
    const event = {
      target: {
        value: 'a',
        name: 'quizName'
      }
    }
    wrapper.find('.quiz-name').simulate('change', event) 
    console.log(wrapper.state())   
    expect(wrapper.state().quizName).toEqual(event.target.value)
    })
  })
  // describe("handleSubmit", () => {
  //   it("should be called on click of submit button", () => {
  //     const wrapper = shallow(<NewQuiz />)

  //     wrapper.instance().handleSubmit = jest.fn();
  //     wrapper.update();
  //     wrapper.find('button').simulate('click', { preventDefault() { } });
  //     expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
  //   })
  // })
  describe("handleSubmit", () => {
    it("should be called on click of submit button", () => {
      const wrapper = shallow(<NewQuiz />)
      const instance = wrapper.instance();
      let handleSubmitStub = sinon.stub(instance, 'handleSubmit').callsFake(() => { });
      instance.forceUpdate();
      wrapper.update();
      wrapper.find('form').simulate('submit');
      expect(handleSubmitStub.callCount).toEqual(1)
    })
  })
})