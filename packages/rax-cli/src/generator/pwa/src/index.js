import { createElement, render } from 'rax';
import * as DriverDOM from 'driver-dom';
import App from './pages/index/index';

if (App.getInitialProps) {
  App.getInitialProps().then((props = {}) => {
    render(<App {...props}></App>, document.body, { driver: DriverDOM });
  });
} else {
  render(<App />, document.body, { driver: DriverDOM });
}