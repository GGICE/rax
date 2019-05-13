import * as Rax from 'rax';
import * as CSS from 'csstype';

export interface Props extends Rax.RenderableProps<{}> {
  style?: CSS.Properties;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  onAppear?: (e: Event) => void;
}
