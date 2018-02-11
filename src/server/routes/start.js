import path from 'path';

const indexPath = path.join(__dirname, '../../../public/index.html');
export default (router) => {
  router.get('root', '/', (ctx) => {
    ctx.res.sendFile(indexPath);
  });
};
