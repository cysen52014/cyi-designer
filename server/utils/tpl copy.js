
'use strict';

const Service = require('egg').Service;
const nunjucks = require('nunjucks');
const path = require('path');
const beautify = require('js-beautify');

nunjucks.configure(path.resolve('./', 'app/tpl'), {
  autoescape: false,
});

class TplService extends Service {
  // 更新用户信息
  async getTplFile() {
    const { ctx } = this;
    this.api = {
      txt: '', // api文件内容
      fns: [], // api文件函数名称
    };
    this.verifys = {};
    this.tree = {
      template: [],
      script: {
        data: [],
        methods: '',
        created: '',
      },
      styles: [],
    };
    const sn = {};
    let cn = '';

    for (const key in ctx.request.body) {
      const a = ctx.request.body[key];
      const d = a.list;
      if (a.type === 'formsearch') {
        const css = this.getCssText(d, 1);
        const dq = d.map((r, i) => {
          delete r.css;
          this.createApi(r, a.css.name + 0, 'S' + i);
          return r;
        });
        sn[a.css.name + 0] = {
          list: dq,
          btns: a.btns,
          direction: a.direction,
          pointer: a.pointer,
        };
        cn += '>>> .' + (a.css.name + 0) + '{\r\n' + css + '\r\n}\r\n';
        this.getPageData(a, a.css.name + 0);
      } else {
        const css = this.getCssText(d, 2);
        for (let i = 0; i < d.length; i++) {
          const r = d[i];
          delete r.css;
          sn[a.css.name + i] = r;
          cn += '>>> .' + (a.css.name + i) + '{\r\n' + css + '\r\n}\r\n';
          await this.createApi(r, a.css.name + i, i);
          this.getPageData(r, a.css.name + i);
        }
      }
    }
    this.tree.script.data = JSON.stringify(sn);

    this.tree.styles = cn.replace(/['"]/gi, '');
    const impt =
      this.api.fns.length > 0
        ? 'import { ' +
          this.api.fns.join(',') +
          ' } from "@/api' +
          this.ctx.request.body.path +
          '.js";'
        : '';

    ctx.body = {
      code: 0,
      message: '执行成功！',
      data:
        beautify.html_beautify(
          '<template>\r\n<div>' +
            this.tree.template.join('') +
            '</div>\r\n</template>'
        ) +
        '\r\n<script>\r\n' +
        beautify.js_beautify(
          '' +
            impt +
            'export default {\r\n data(){\r\nreturn' +
            (this.tree.script.data.length > 0 ? this.tree.script.data : ' {}') +
            '}, methods: { ' +
            this.tree.script.methods +
            ' }, created() { ' +
            this.tree.script.created +
            ' }}'
        ) +
        '\r\n</script>\r\n' +
        '<style lang="stylus" scoped>\r\n' +
        (this.tree.styles.length > 0 &&
          beautify.css_beautify(this.tree.styles)) +
        '\r\n</style>',
    };

    return ctx.body;
  }
  toHump(s) {
    const a = s.split(/[\/]/gi);
    let result = a[0];
    for (let i = 1; i < a.length; i++) {
      result = result + a[i].slice(0, 1).toUpperCase() + a[i].slice(1);
    }
    return result;
  }
  setApiFuncs(r, fn, name, si, md) {
    this.api.fns.push(fn);

    const drq = {
      1: 'params',
      2: 'data',
    }[r.apiDRq || 1];
    this.api.txt +=
      'export const ' +
      fn +
      ' = ' +
      drq +
      ' => {' +
      'return request({' +
      'responseType: "' +
      (r.apiDRp || 'json') +
      '",' +
      'method: "' +
      (r.apiType || 'get') +
      '",' +
      'url: "' +
      r.apiUrl +
      '",' +
      drq +
      '});' +
      '}';

    if (md === 'modal') {
      console.log(md, 'md ===');
      const code = r.code || 'errorCode';
      const codeValue = r.codeValue || '0';
      this.tree.script.methods +=
          'async ' +
          fn +
          '() { const { ' + code + ', data, message } = await ' +
          fn +
          '();' +
          'if (' +
          code +
          ' === ' +
          codeValue +
          ') {' +
          'this.' +
          name +
          '.visibel = false;' +
          '} else { this.$cysMessage({ type: "error",  message: message }); }' +
          '},';
    } else if (r.type !== 'table') {
      const code = r.code || 'errorCode';
      const codeValue = r.codeValue || '0';
      console.log('ss====', si);
      const qf = String(si).match(/S/ig) ? 'this.' + name + 'list[' + String(si).replace(/S/ig, '') + '].options = data;' : 'this.' + name + '.options = data;';
      this.tree.script.methods +=
        'async ' +
        fn +
        '() { const { ' + code + ', data } = await ' +
        fn +
        '();' +
        'if (' +
        code +
        ' === ' +
        codeValue +
        ') { ' + qf + ' }' +
        '},';
    } else {
      this.tree.script.methods +=
        fn +
        '() { this.' +
        name +
        '.options.method.interface = ' +
        fn +
        '; this.$refs["' +
        name +
        '"].getTableData();},';
    }
  }
  createApi(r, name, i) {
    if (r.apiUrl) {
      const fn = this.toHump(r.apiUrl);
      this.setApiFuncs(r, fn, name, i);
      this.tree.script.created += 'this.' + fn + '();';
    } else if (r.type === 'modal') {
      const pms = {};
      r.options = r.options.map((op, ii) => {
        console.log(op, 'op.verify===');
        pms[op.field] = op.value;
        if (op.apiUrl) {
          const fn = this.toHump(op.apiUrl);
          this.setApiFuncs(op, fn, name, i, 'modal');
          this.tree.script.created += 'this.' + fn + '();';
        } else {
          if (op.verify) {
            // 验证方法
            if (op.verifyFunc) {
              const f = op.verifyFunc.replace(
                /\bfunction\s+([a-zA-Z0-9]+)/gi,
                (word, $1) => {
                  this.verifys['do' + ii] = $1;
                  return $1;
                }
              );
              op.verifyFunc = this.verifys['do' + ii];
              this.tree.script.methods += f + ',';
            }
          }
        }
        return op;
      });
      if (r.btns) {
        this.setModalFunc(r, name, JSON.stringify(pms));
      }
    }
  }
  setModalFunc(r, name, params) {
    const btns = r.btns;
    if (Object.keys(btns).length > 0) {
      Object.keys(btns).forEach((key, i) => {
        const r = btns[key];
        const code = r.code || 'errorCode';
        const codeValue = r.codeValue || '0';
        if (r.visible) {
          const nm = name.replace('cs_', '');
          if (key === 'reset') {
            this.tree.script.methods +=
              nm + 'ModalReset =() => { this.' + nm + '.visible = false; },';
            r.fn = nm + 'ModalReset';
          } else {
            const fn = this.toHump(r.apiUrl);
            this.setApiFuncs(r, fn, name, i, 'modal');
            this.tree.script.methods +=
              nm +
              'ModalSubmit = async valid => { if(valid) { const { ' + code + ', data, message } = await this.' +
              fn +
              '(' + params + '); if (' +
              code +
              ' === ' +
              codeValue +
              ') { this.' + name + '.visible = false; } else { this.$cysMessage({ type: "error",  message: message }); } } },';
            r.fn = nm + 'ModalSubmit';
          }
        }
      });
    }
  }
  getPageData(a, cssname) {
    this.tree.template.push(
      this.createEnv(a.type, Object.assign({}, { key: cssname }, { o: a }))
    );
  }
  getCssText(list, ty) {
    let css = '';
    const cs = {};
    // const at = {};
    for (let index = 0; index < list.length; index++) {
      const a = list[index].css;
      for (const key in a) {
        const x = ty === 1 ? '.cys-form-search-item' : '.cp-item:nth-child';
        const n = x + ':nth-child(' + (index + 1) + ') ' + a[key].key;
        if (typeof cs[n] === 'undefined') cs[n] = '';
        // if (!at[a[key].key + '_' + a[key].c.k]) {
        // console.log(at);
        // at[a[key].key + '_' + a[key].c.k] = 1;
        cs[n] += a[key].c.k + ':' + a[key].c.v + a[key].c.u + ';';
        // }
      }
    }

    Object.keys(cs).forEach(key => {
      if (cs[key]) {
        if (typeof cs[key] === 'object') {
          css += JSON.stringify(cs[key]);
        } else {
          css += key + '{' + cs[key] + '}';
        }
      }
    });
    return css;
  }
  createEnv(filename, data) {
    const result = nunjucks.render(filename + '.nj', data);
    return result;
  }
}
module.exports = TplService;
