const { Machine } = require('xstate');
const { createModel } = require('@xstate/test');
import { of } from 'rxjs';

const initialContext = {
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
  errors: [],
};

describe('conduit authentication', () => {
  const testModel = createModel(
    Machine({
      id: 'auth',
      initial: 'unauthorized',
      context: initialContext,
      states: {
        unauthorized: {
          entry: 'resetUser',
          on: {
            SIGNIN: 'signing_in',
            SIGNUP: 'signing_up',
          },
          meta: ({ findByTestId }) => {
            findByTestId('email-inp').should('exist');
            findByTestId('password-int').should('exist');
          },
        },
        signing_in: {
          invoke: { src: 'signIn' },
          on: {
            SIGNIN_SUCCESS: { target: 'authorized', actions: 'assignUser' },
            SIGNIN_FAILURE: {
              target: 'unauthorized',
              actions: 'assignErrors',
            },
          },
          meta: ({ findByTestId }) => {
            findByTestId('submit-button').should('contain', 'Loading');
          },
        },
        signing_up: {
          invoke: { src: 'signUp' },
          on: {
            SIGNUP_SUCCESS: { target: 'authorized', actions: 'assignUser' },
            SIGNUP_FAILURE: {
              target: 'unauthorized',
              actions: 'assignErrors',
            },
          },
        },
        authorized: {
          entry: ['goToHomePage', 'assignUser'],
          on: {
            LOGOUT: { target: 'unauthorized', actions: 'logout' },
          },
          meta: ({ findByTestId }) => {
            findByTestId('username').should('exist');
          },
        },
        errors: {
          on: {
            SIGNIN: 'signing_in',
            SIGNUP: 'signing_up',
          },
          exit: 'resetErrors',
        },
      },
    })
  ).withEvents({
    SIGNIN: {
      exec: ({ findByTestId }, event) => {
        cy.visit('http://localhost:4200/#/login');
        findByTestId('email-input').type(event.data.email);
        findByTestId('password-input').type(event.data.password);
        findByTestId('submit-button').click();
      },
      cases: [
        {
          data: {
            email: 'stefanoslignos@gmail.com',
            password: 'wrong_password',
          },
        },
        {
          data: { email: 'stefanoslignos@gmail.com', password: '33@sthSEIRA' },
        },
      ],
    },
  });

  const testPlans = testModel.getSimplePathPlans();

  testPlans.forEach((plan, i) => {
    describe(plan.description, () => {
      plan.paths.forEach((path, i) => {
        it(path.description, () => {
          return cy.visit('http://localhost:4200/').then(() => {
            return path.test(cy);
          });
        });
      });
    });
  });

  describe('coverage', () => {
    it('should pass', () => {
      testModel.testCoverage();
    });
  });
});
