import { Edge, Node } from '@swimlane/ngx-graph';

export const nodes: { [key: string]: Node[] } = {
  unauthorized: [
    {
      id: 'unauthorized',
      label: 'unauthorized',
    },
  ],
  signin: [
    {
      id: 'unauthorized',
      label: 'unauthorized',
    },
    {
      id: 'signin',
      label: 'signin',
    },
  ],
  authorized: [
    {
      id: 'unauthorized',
      label: 'unauthorized',
    },
    {
      id: 'signin',
      label: 'signin',
    },
    {
      id: 'authorized',
      label: 'authorized',
    },
  ],
  unauthorized2: [
    {
      id: 'unauthorized',
      label: 'unauthorized',
    },
    {
      id: 'signin',
      label: 'signin',
    },
    {
      id: 'authorized',
      label: 'authorized',
    },
  ],
  signup: [
    {
      id: 'unauthorized',
      label: 'unauthorized',
    },
    {
      id: 'signin',
      label: 'signin',
    },
    {
      id: 'signup',
      label: 'signup',
    },
    {
      id: 'authorized',
      label: 'authorized',
    },
  ],
  authorized2: [
    {
      id: 'unauthorized',
      label: 'unauthorized',
    },
    {
      id: 'signin',
      label: 'signin',
    },
    {
      id: 'signup',
      label: 'signup',
    },
    {
      id: 'authorized',
      label: 'authorized',
    },
  ],
};

export const links: { [key: string]: Edge[] } = {
  unauthorized: [],
  signin: [
    {
      id: 'signin',
      source: 'unauthorized',
      target: 'signin',
      label: 'SIGNIN',
    },
  ],
  authorized: [
    {
      id: 'signin',
      source: 'unauthorized',
      target: 'signin',
      label: 'SIGNIN',
    },
    {
      id: 'authorized',
      source: 'signin',
      target: 'authorized',
      label: 'SIGNIN_SUCCESS',
    },
  ],
  unauthorized2: [
    {
      id: 'signin',
      source: 'unauthorized',
      target: 'signin',
      label: 'SIGNIN',
    },
    {
      id: 'authorized',
      source: 'signin',
      target: 'authorized',
      label: 'SIGNIN_SUCCESS',
    },
    {
      id: 'unauthorized',
      source: 'authorized',
      target: 'unauthorized',
      label: 'LOGOUT',
    },
  ],
  signup: [
    {
      id: 'signin',
      source: 'unauthorized',
      target: 'signin',
      label: 'SIGNIN',
    },
    {
      id: 'signup',
      source: 'unauthorized',
      target: 'signup',
      label: 'SIGNUP',
    },
    {
      id: 'authorized_signin',
      source: 'signin',
      target: 'authorized',
      label: 'SIGNIN_SUCCESS',
    },
    {
      id: 'unauthorized2',
      source: 'authorized',
      target: 'unauthorized',
      label: 'LOGOUT',
    },
  ],
  authorized2: [
    {
      id: 'signin',
      source: 'unauthorized',
      target: 'signin',
      label: 'SIGNIN',
    },
    {
      id: 'signup',
      source: 'unauthorized',
      target: 'signup',
      label: 'SIGNUP',
    },
    {
      id: 'authorized_signin',
      source: 'signin',
      target: 'authorized',
      label: 'SIGNIN_SUCCESS',
    },
    {
      id: 'authorized_signup',
      source: 'signup',
      target: 'authorized',
      label: 'SIGNUP_SUCCESS',
    },
    {
      id: 'unauthorized',
      source: 'authorized',
      target: 'unauthorized',
      label: 'LOGOUT',
    },
  ],
};
