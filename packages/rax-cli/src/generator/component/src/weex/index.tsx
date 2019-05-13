import { createElement } from 'rax';
import { Props } from '../types';

const MyComponent = (props:Props) => {
  return <div {...props} >Hello World</div>;
};

export default MyComponent;
