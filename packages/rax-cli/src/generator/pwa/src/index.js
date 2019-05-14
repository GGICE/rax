import { createElement, render } from 'rax';
import * as DriverDOM from 'driver-dom';
import App from './layouts/index';
import Router from './router';

render(<App><Router /></App>, document.body, { driver: DriverDOM });