import routes from './routes';

async function initRouter() {
  console.log('initRouter', location.href);
  if (location.href.includes('cp.allcpp.cn')) {
    await routes.cp();
  }
}

export { initRouter };
