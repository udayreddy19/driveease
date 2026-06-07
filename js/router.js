// ========================================
// DriveEase — Hash-based SPA Router
// ========================================

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.beforeEach = null;
    window.addEventListener('hashchange', () => this.resolve());
  }

  on(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, queryString] = hash.split('?');
    const params = {};

    // Parse query string
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value || '');
      });
    }

    // Try exact match
    if (this.routes[path]) {
      this.currentRoute = path;
      if (this.beforeEach) this.beforeEach(path, params);
      this.routes[path](params);
      return;
    }

    // Try dynamic routes (e.g., /car/:id)
    for (const route in this.routes) {
      const routeParts = route.split('/');
      const pathParts = path.split('/');

      if (routeParts.length !== pathParts.length) continue;

      let match = true;
      const dynamicParams = {};

      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
          dynamicParams[routeParts[i].slice(1)] = pathParts[i];
        } else if (routeParts[i] !== pathParts[i]) {
          match = false;
          break;
        }
      }

      if (match) {
        this.currentRoute = route;
        if (this.beforeEach) this.beforeEach(route, { ...params, ...dynamicParams });
        this.routes[route]({ ...params, ...dynamicParams });
        return;
      }
    }

    // 404
    if (this.routes['*']) {
      this.currentRoute = '*';
      if (this.beforeEach) this.beforeEach('*', params);
      this.routes['*'](params);
    }
  }

  navigate(path) {
    window.location.hash = path;
  }

  init() {
    this.resolve();
  }
}

if (typeof window !== 'undefined') {
  window.Router = Router;
}
