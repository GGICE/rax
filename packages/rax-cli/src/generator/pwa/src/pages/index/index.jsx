import { createElement, useState } from 'rax';
import { push } from 'rax-use-router';

function Index(props) {
  console.log(props);
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
}

Index.getInitialProps = async function() {
  return { data: {} };
};


export default Index;