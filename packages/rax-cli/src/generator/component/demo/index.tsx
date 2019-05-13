import {createElement, render} from 'rax';
import * as DriverDOM from 'driver-dom';
import MyComponent from '../src/index';

render(<MyComponent />, document.body, { driver: DriverDOM });
