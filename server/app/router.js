'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, wsocket } = app;
  router.get('/user/add', controller.user.add);
  router.get('/project/view', controller.project.view);
  router.post('/project/create', controller.project.create);
  // router.post('/project/package', controller.project.package);
  wsocket.route('/project/package', controller.project.package);
  router.get('/project/get', controller.project.getProjectList);
  router.post('/page/tpl', controller.tpl.exportTpl);
  router.post('/storage/page', controller.pageinfo.save);
  router.post('/storage/filters', controller.filters.save);
  router.get('*', controller.home.index);
};

