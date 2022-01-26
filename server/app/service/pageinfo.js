'use strict';
const fs = require('fs');
const Service = require('egg').Service;
const beautify = require('js-beautify');
const mkdirp = require('mkdirp');
const Outf = require('../../utils/outf');


class CreatePageInfoService extends Service {
  // 更新用户信息
  async add() {
    const { ctx } = this;
    const D = {};
    for (const key in ctx.request.body.data) {
      const d = ctx.request.body.data[key];
      const css = Outf.getCssText(d.list, d.type === 'formsearch' ? 1 : 2);
      d.list = d.list.map(function(r) {
        delete r.css;
        return r;
      });
      d.css.text = css;
      D[key] = d;
    }

    const exist = await ctx.model.Project.find({ name: ctx.request.body.name });
    if (exist.length < 1) {
      ctx.body = {
        code: -1,
        message: '项目不存在！',
        data: [],
      };
    } else {
      const list = await ctx.model.Pageinfo.find({
        path: ctx.request.body.path,
      });
      if (list.length < 1) {
        const result = await ctx.model.Pageinfo.create({
          path: ctx.request.body.path,
          name: ctx.request.body.name,
          filename: ctx.request.body.filename,
          title: ctx.request.body.title,
          data: D,
        });
        const path = ctx.request.body.path;
        const arr = ctx.request.body.path.split(/[\/]/gi);
        const fold =
          '../' +
          ctx.request.body.name +
          '/src/views' +
          arr.slice(0, arr.length - 1).join('/');
        const file = fold + '/' + arr[arr.length - 1] + '.vue';
        this.createFile(file, fold, path);
        ctx.body = {
          code: 0,
          message: '页面创建成功！',
          data: result,
        };
      } else {
        ctx.body = {
          code: 0,
          message: '页面存在！',
          data: [],
        };
      }
    }
    return ctx.body;
  }
  async exportTemplate(url) {
    Outf.cn = ''; // 页面样式
    Outf.sn = {}; // 页面脚本
    Outf.api = {
      txt: '', // api文件内容
      fns: [], // api文件函数名称
    };
    Outf.verifys = {};
    Outf.tree = {
      template: [],
      script: {
        data: [],
        methods: '',
        created: '',
      },
      styles: [],
    };
    return new Promise(async (resolve, reject) => {
      const result = await this.ctx.model.Pageinfo.find({ path: url });
      if (result.length > 0) {
        const info = result[0];
        for (const key in info.data) {
          const a = info.data[key];
          if (a.type === 'formsearch') {
            Outf.sn[a.css.name + 0] = {
              list: a.list,
              btns: a.btns,
              direction: a.direction,
              pointer: a.pointer,
            };
            a.list.forEach((rc, i) => {
              Outf.createApi(rc, a.css.name + 0, 'S' + i);
            });
            Outf.cn +=
              '>>> .' + (a.css.name + 0) + '{\r\n' + a.css.text + '\r\n}\r\n';
            Outf.getPageData(a, a.css.name + 0);
          } else {
            const d = a.list;
            for (let i = 0; i < d.length; i++) {
              const r = d[i];
              delete r.css;
              Outf.sn[a.css.name + i] = r;
              Outf.cn +=
                '>>> .' + (a.css.name + i) + '{\r\n' + a.css.text + '\r\n}\r\n';
              await Outf.createApi(r, a.css.name + i, i);
              Outf.getPageData(r, a.css.name + i);
            }
          }
        }

        Outf.tree.script.data =
          Object.keys(Outf.sn).length > 0 ? JSON.stringify(Outf.sn) : [];
        Outf.tree.styles = Outf.cn ? Outf.cn.replace(/['"]/gi, '') : [];
        const impt =
        Outf.api.fns.length > 0
          ? 'import { ' +
            Outf.api.fns.join(',') +
              ' } from "@/api' +
              this.ctx.request.body.path +
              '.js";'
          : '';
        const ssr =
          beautify.html_beautify(
            '<template>\r\n<div>' +
            Outf.tree.template.join('') +
              '</div>\r\n</template>'
          ) +
          '\r\n<script>\r\n' +
          beautify.js_beautify(
            '' +
              impt +
              'export default {\r\n data(){\r\nreturn' +
              (Outf.tree.script.data.length > 0
                ? Outf.tree.script.data
                : ' {}') +
              '}, methods: { ' +
              Outf.tree.script.methods +
              ' }, created() { ' +
              Outf.tree.script.created +
              ' }}'
          ) +
          '\r\n</script>\r\n' +
          '<style lang="stylus" scoped>\r\n' +
          (Outf.tree.styles.length > 0 &&
            beautify.css_beautify(Outf.tree.styles)) +
          '\r\n</style>';
        resolve({
          tmp: ssr,
          api: Outf.api,
        });
      } else {
        reject(new Error('err'));
      }
    });
  }
  async createFile(file, fold, path) {
    const { tmp, api } = await this.exportTemplate(path);
    this.createApiFile(api.txt);
    mkdirp(fold, err => {
      // 已存在
      if (err) {
        // callback(this, src, dst);
      } else {
        // 不存在
        fs.exists(file, exists => {
          if (!exists) {
            fs.writeFile(file, tmp, err => {
              if (err) {
                return console.log(err);
              }
              console.log('The file was saved!');
            });
          }
        });
      }
    });
  }
  createApiFile(api) {
    const arr = this.ctx.request.body.path.split(/[\/]/gi);
    const fold =
      '../' +
      this.ctx.request.body.name +
      '/src/api/' +
      arr.slice(0, arr.length - 1).join('/');
    const file = fold + '/' + arr[arr.length - 1] + '.js';
    mkdirp(fold, err => {
      if (err) {
        // callback(this, src, dst);
      } else {
        fs.exists(file, async exists => {
          if (!exists) {
            await fs.writeFile(
              file,
              beautify.js_beautify(
                'import request from "@/utils/request";' + api
              ),
              err => {
                if (err) {
                  return console.log(err);
                }
              }
            );
          }
        });
      }
    });
  }
}
module.exports = CreatePageInfoService;
