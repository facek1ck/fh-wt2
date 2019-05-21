// components/__tests__/test-list.test.jsx


import React from 'react';
import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AuthForm from '../auth-form/auth-form.jsx';
import SelectButton from '../select-button/select-button.jsx'
import Dashboard from '../dashboard/dashboard.jsx';
import DashboardStatisticCard from '../dashboard/dashboard-statistic-card.jsx';

import AnswerOption from '../quiz/quiz-components/answer-option.jsx';
import QuestionCount from '../quiz/quiz-components/question-count';
import Question from '../quiz/quiz-components/question';

Enzyme.configure({ adapter: new Adapter() });

/* describe('BaseButton', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<TestList />);
    expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
}); */



describe('Render Tests', () => {
  test('AUTH FORM renders correctly', () => {
    const wrapper = shallow(<AuthForm />);
    expect(wrapper).toMatchSnapshot();
  });

  test('SELECT BUTTON renders correctly', () => {
    const wrapper = shallow(<SelectButton />);
    expect(wrapper).toMatchSnapshot();
  });

  /* test('DASHBOARD renders correctly', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
  });

  test('DASHBOARD STATISTIC CARD renders correctly', () => {
    const wrapper = shallow(<DashboardStatisticCard />);
    expect(wrapper).toMatchSnapshot();
  }); */

  test('questioncounter rendered', () => {
    const wrapper = shallow(<QuestionCount />);
    expect(wrapper).toMatchSnapshot();

  })

  test('question rendered', () => {
    const wrapper = shallow(<Question />);
    expect(wrapper).toMatchSnapshot();
  })


});


describe('Exam components test', () => {


  /* 
  test('answers rendered', () => {
  
      const 
        ids = [
          'Visual Phone Network', 
          'Virtual Private Network', 
          'Virtual Public Network', 
          'Visual Pro Network'
        ],
        answerVals = ['0', '1', '2', '3'], 
        undef = undefined;
        
      const wrapper = shallow(<AnswerOption />);
      expect(wrapper).toMatchSnapshot();
  
    }) 
    */
});

