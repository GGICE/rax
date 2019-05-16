import { createElement, render } from 'rax';
import * as DriverWeex from 'driver-weex';
import * as DriverDom from 'driver-dom';
import { isWeex } from 'universal-env';
import MyComponent from '../src/index';

if (isWeex) {
  render(<MyComponent />, document.body, { driver: DriverWeex });
} else {
  render(<MyComponent />, document.body, { driver: DriverDom });
}
