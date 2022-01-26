'use strict';
const fs = require('fs');
const stat = fs.stat;
const Service = require('egg').Service;
class CreateProjectService extends Service {
  // 创建项目
  async create() {
    const { ctx } = this;
    let result = await ctx.model.Project.find({ name: ctx.query.name });
    if (result.length < 1) {
      this.createProjectFile();
      result = await ctx.model.Project.create({
        name: ctx.query.name,
        hostname: ctx.query.hostname,
        port: ctx.query.port,
        apiurl: ctx.query.apiurl,
      });
      ctx.body = {
        code: 0,
        message: '项目创建成功！',
        data: result,
      };
    } else {
      ctx.body = {
        code: -1,
        message: '项目已存在！',
        data: [],
      };
    }
    return ctx.body;
  }
  async getPageList(name) {
    return await this.ctx.model.Pageinfo.find({ name });
  }
  async getPageInfo(project) {
    const cac = [];
    for (let index = 0; index < project.length; index++) {
      const pj = project[index];
      const c = {};
      c.label = pj.name;
      c.value = pj.name;
      const page = await this.getPageList(pj.name);
      c.children = page.map(r => {
        return {
          label: r.path,
          value: r.path,
        };
      });
      cac.push(c);
    }
    return cac;
  }
  async getProjectList() {
    const { ctx } = this;
    const result = await ctx.model.Project.find();
    if (result.length > 0) {
      const pageinfo = await this.getPageInfo(result);
      console.log(pageinfo, 'cas====');
      ctx.body = {
        code: 0,
        message: '执行成功！',
        data: pageinfo,
      };
    } else {
      ctx.body = {
        code: -1,
        message: '执行成功！',
        data: result,
      };
    }
    return ctx.body;
  }
  copy(self, src, dst) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, (err, paths) => {
      if (err) {
        throw err;
      }
      paths.forEach(path => {
        const _src = src + '/' + path,
          _dst = dst + '/' + path;
        let readable = '',
          writable = '';

        stat(_src, (err, st) => {
          if (err) {
            throw err;
          }

          // 判断是否为文件
          if (_src.indexOf('node_modules') > -1) {
            return;
          }
          if (st.isFile()) {
            // 创建读取流
            readable = fs.createReadStream(_src);
            // 创建写入流
            writable = fs.createWriteStream(_dst);
            if (_src.indexOf('ecosystem.config') > 0) {
              readable.on('data', data => {
                const str = data.toString();
                writable.write(
                  str.replace(
                    'const port = 80;',
                    'const port = ' + self.ctx.query.port + ';'
                  )
                );
              });
            }
            // 通过管道来传输流
            readable.pipe(writable);
          } else if (st.isDirectory()) {
            // 如果是目录则递归调用自身
            self.exists(_src, _dst, self.copy);
          }
        });
      });
    });
  }
  exists(src, dst, callback) {
    fs.exists(dst, exists => {
      // 已存在
      if (exists) {
        callback(this, src, dst);
      } else {
        // 不存在
        fs.mkdir(dst, () => {
          callback(this, src, dst);
        });
      }
    });
  }
  createProjectFile() {
    const query = this.ctx.query;
    this.exists('../ssr', '../' + query.name, this.copy);
  }
}

module.exports = CreateProjectService;
