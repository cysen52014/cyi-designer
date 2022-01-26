'use strict';
const Controller = require('egg').Controller;
const nunjucks = require('nunjucks');
const path = require('path');
// const beautify = require('js-beautify');
const webpack = require('webpack');
const fs = require('fs');

nunjucks.configure(path.resolve('./', 'app/tpl'), {
  autoescape: false,
});
class HomeController extends Controller {
  async index() {
    this.cn = '';
    this.sn = {};
    this.tree = {
      template: [],
      script: [],
      styles: [],
    };
    const { ctx } = this;
    const result = await ctx.service.home.render();
    if (result.length > 0) {
      const info = result[0];
      for (const key in info.data) {
        const a = info.data[key];
        if (a.type === 'formsearch') {
          this.sn[a.css.name + 0] = {
            list: a.list,
            btns: a.btns,
            direction: a.direction,
          };
          this.cn += '>>> .' + a.css.name + '{\r\n' + a.css.text + '\r\n}\r\n';
          this.getPageData(a, a.css.name + 0);
        } else {
          const d = a.list;
          for (let i = 0; i < d.length; i++) {
            const r = d[i];
            delete r.css;
            this.sn[a.css.name + i] = r;
            this.cn += '>>> .' + (a.css.name + i) + '{\r\n' + a.css.text + '\r\n}\r\n';
            this.getPageData(r, a.css.name + i);
          }
        }
      }

      ctx.body = await this.render(info);
      return ctx.body;

      // const ssr = beautify.html_beautify('<template>\r\n<div>' + tree.template.join('') + '</div>\r\n</template>') +
      // '\r\n<script>\r\n' + beautify.js_beautify('export default {\r\n data(){\r\nreturn' + tree.script + '}}') + '\r\n</script>\r\n' +
      // '<style lang="stylus" scoped>\r\n' + beautify.css_beautify(tree.styles) + '\r\n</style>';
      // console.log(111);


      // ctx.body = nunjucks.render('index.nj', {
      //   ssroutlet: ssr,
      //   title: info.title,
      // });
      // return ctx.body;
    }

  }
  async render(info) {
    const context = JSON.stringify({
      el: '#app',
      data: this.sn,
      template: '<div>' + this.tree.template.join('') + '</div>',
      methods: {
        aa: () => { console.log(0, 'aa'); },
      },
    });
    // const dom = await this.parkage(info);
    const dom = await this.writeTmpFile(context);
    return dom;
  }
  parkage(info) {
    const context = JSON.stringify({
      el: '#app',
      data: this.sn,
      template: '<div>' + this.tree.template.join('') + '</div>',
      methods: {
        aa: () => { console.log(0, 'aa'); },
      },
    });
    const webpackConfig = require(path.resolve('./webpack.config.js'));
    const file = './tmp/' + info.filename + '.js';
    return new Promise((resolve, reject) => {
      fs.readFile(path.resolve('app/main.js'), function(err, data) {
        if (err) {
          return reject(err);
        }
        const output = data.toString().replace('JSON.parse(context)', context);
        fs.writeFile(file, output, err => {
          if (err) {
            return err;
          }
          webpack(webpackConfig({ main: file }), err => {
            if (err) {
              return;
            }
            const html = nunjucks.render(path.resolve('./app/tpl/index.tmp.nj'), {
              run: '<script src="/public/bundle.js"></script>',
            });
            console.log('111===', html);
            resolve(html);
          });
        });
      });
    });
  }
  writeTmpFile(context) {
    return new Promise((resolve, reject) => {
      fs.readFile(path.resolve('app/client-entry.js'), function(err, data) {
        if (err) {
          return reject(err);
        }
        const output = '<script>' + data.toString().replace('new Vue();', 'new Vue(' + context + ')') + '</script>';
        const result = nunjucks.render(path.resolve('./app/tpl/index.nj'), {
          run: output,
        });
        resolve(result);
      });
    });
  }
  getPageData(a, cssname) {
    this.tree.template.push(this.createEnv(a.type, { key: cssname, label: a.label || '' }));
    this.tree.script = JSON.stringify(this.sn);
    this.tree.styles = this.cn.replace(/['"]/ig, '');
  }
  createEnv(filename, data) {
    const result = nunjucks.render(filename + '.nj', data);
    return result;
  }
}

module.exports = HomeController;
