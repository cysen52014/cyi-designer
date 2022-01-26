
'use strict';

const Service = require('egg').Service;
const beautify = require('js-beautify');
const Outf = require('../../utils/outf');

class TplService extends Service {
  // 更新用户信息
  async getTplFile() {
    const { ctx } = this;
    Outf.sn = {};
    Outf.cn = '';
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

    console.log(Outf, 'Outf===111');

    for (const key in ctx.request.body.info) {
      const a = ctx.request.body.info[key];
      const d = a.list;
      if (a.type === 'formsearch') {
        const css = Outf.getCssText(d, 1);
        const dq = d.map((r, i) => {
          delete r.css;
          Outf.createApi(r, a.css.name + 0, 'S' + i);
          return r;
        });
        Outf.sn[a.css.name + 0] = {
          list: dq,
          btns: a.btns,
          direction: a.direction,
          pointer: a.pointer,
        };
        Outf.cn += '>>> .' + (a.css.name + 0) + '{\r\n' + css + '\r\n}\r\n';
        Outf.getPageData(a, a.css.name + 0);
      } else {
        const css = Outf.getCssText(d, 2);
        for (let i = 0; i < d.length; i++) {
          const r = d[i];
          delete r.css;
          Outf.sn[a.css.name + i] = r;
          Outf.cn += '>>> .' + (a.css.name + i) + '{\r\n' + css + '\r\n}\r\n';
          await Outf.createApi(r, a.css.name + i, i);
          Outf.getPageData(r, a.css.name + i);
        }
      }
    }
    Outf.tree.script.data = JSON.stringify(Outf.sn);

    Outf.tree.styles = Outf.cn.replace(/['"]/gi, '');
    const impt =
    Outf.api.fns.length > 0
      ? 'import { ' +
        Outf.api.fns.join(',') +
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
          Outf.tree.template.join('') +
            '</div>\r\n</template>') +
        '\r\n<script>\r\n' +
        beautify.js_beautify(
          '' +
            impt +
            'export default {\r\n data(){\r\nreturn' +
            (Outf.tree.script.data.length > 0 ? Outf.tree.script.data : ' {}') +
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
        '\r\n</style>',
    };

    return ctx.body;
  }
}
module.exports = TplService;
