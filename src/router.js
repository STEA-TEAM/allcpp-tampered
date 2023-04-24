import pages from './pages';

async function initRouter() {
  console.log('initRouter', location.href);
  if (location.href.includes('cp.allcpp.cn')) {
    await pages.cp();
  }
}

export { initRouter };
