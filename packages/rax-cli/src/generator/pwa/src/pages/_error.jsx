import { createElement, useState } from 'rax';
import { replace } from 'rax-use-router';

export default function Error() {
  return (
    <div>
      <h1>Error</h1>
      <button onClick={() => replace('/home')}>Go home</button>
    </div>
  );
}