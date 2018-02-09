export default (router) => {
  router.get('root', '/', (ctx) => {
    ctx.render('start/index', {
      welcome: 'Welcome to the ToDo Manager.',
      notes: 'Drive your tasks and make your things done!',
    });
  });
};
