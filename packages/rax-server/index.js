const url = require('url');
const qs = require('querystring');
const { createElement } = require('rax');
const renderer = require('rax-server-renderer');
const handlebars = require('handlebars');

const ErrorComponent = require('./lib/Error');

module.exports = class Server {
  constructor(options = {}) {
    const {
      template,
      pages,
      layout
    } = options;

    if (template) {
      try {
        this.template = handlebars.compile(template);
      } catch (err) {
        console.log(err);
        throw new Error('template compile error');
      }
    }

    this.pages = pages || {};
    this.layout = layout;

    this.render = this.render.bind(this);
    this.renderToHTML = this.renderToHTML.bind(this);
    this.renderErrorToHTML = this.renderErrorToHTML.bind(this);
  }

  async render(page, req, res, options) {
    const html = await this.renderToHTML(page, req, res, options);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
  }

  async renderToHTML(page, req, res, options = {}) {
    let pageComponent;

    if (this.pages[page] && this.pages[page].bundle) {
      pageComponent = this.pages[page].bundle;
    } else {
      res.statusCode = 404;
      const err = pageNotFoundError(page);
      return this.renderErrorToHTML(err, req, res, parsedUrl);
    }

    const {
      pathname,
      query
    } = options;

    const parsedUrl = getParsedUrl(req, pathname, query);

    try {
      const html = await renderToHTML(req, res, {
        Component: pageComponent,
        template: this.pages[page].template || this.template,
        ...options,
        ...parsedUrl
      });
      return html;
    } catch (err) {
      this.logError(err);
      res.statusCode = 500;
      return this.renderErrorToHTML(err, req, res, parsedUrl);
    }
  }

  async renderErrorToHTML(err, req, res, parsedUrl) {
    let errorComponent;

    if (this.pages._error && this.pages._error.bundle) {
      errorComponent = this.pages._error.bundle;
    } else {
      errorComponent = ErrorComponent;
    }

    const html = await renderToHTML(req, res, {
      Component: errorComponent,
      template: this.pages._error.template || this.template,
      ...parsedUrl,
      err
    });

    return html;
  }

  logError(err) {
    console.log(err);
  }
};

function getParsedUrl(req, pathname, query) {
  if (!pathname || !query) {
    const parsedUrl = url.parse(req.url);

    pathname = pathname || parsedUrl.pathname;
    query = query || qs.parse(parsedUrl.query);
  }

  return {
    pathname,
    query
  };
}

function pageNotFoundError(page) {
  const err = new Error(`Cannot find module for page: ${page}`);
  err.code = 'ENOENT';
  return err;
}

async function renderToHTML(req, res, options) {
  const {
    Component,
    template,
    pathname,
    query,
    err
  } = options;

  const ctx = { req, res, pathname, query, err };

  let props;

  props = await getInitialProps(Component, { ctx });

  const element = createElement(Component, props);

  const content = renderer.renderToString(element, {
    remRatio: 100
  });

  const html = template({
    data: JSON.stringify(props),
    content,
    pathname
  });

  return html;
}

async function getInitialProps(Component, ctx) {
  if (!Component.getInitialProps) return {};

  const props = await Component.getInitialProps(ctx);

  if (!props) {
    const message = `"getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  return props;
}