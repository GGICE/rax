import { createElement, render } from 'rax';
import * as DriverDOM from 'driver-dom';
import { hello } from '../src/';

const App = () => <div>{hello()}</div>;

render(<App />, document.body, { driver: DriverDOM });