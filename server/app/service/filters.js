'use strict';
const mkdirp = require('mkdirp');
const fs = require('fs');
const Service = require('egg').Service;
const beautify = require('js-beautify');

class FiltersService extends Service {
  // 更新过滤器
  async add() {
    const { ctx } = this;
    let result = await ctx.model.Filters.find();
    if (result.length < 1) {
      result = await ctx.model.Filters.create({
        name: ctx.request.body.name,
        list: ctx.request.body.list,
      });
    } else {
      result = await ctx.model.Filters.updateOne(
        { name: ctx.request.body.name },
        { $set: { list: ctx.request.body.list } }
      );
    }
    ctx.body = {
      code: 0,
      message: '过滤器保存！',
      data: [],
    };
    this.createFilterFile();
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
  createFilterApi(api) {
    const data = beautify.js_beautify('import request from "@/utils/request";' + api.join(''));
    const fold = '../' + this.ctx.request.body.name + '/src/api/';
    console.log(fold, data);
    mkdirp(fold, err => {
      // 已存在
      if (err) {
        // callback(this, src, dst);
      } else {
        // 不存在
        fs.writeFile(fold + 'gfilters.js', data, err => {
          if (err) {
            return console.log(err);
          }
          console.log('The file was saved!');
        });
      }
    });
  }
  createFilterFile() {
    const imt = [];
    const fns = [];
    const en = [];
    const api = [];
    this.ctx.request.body.list.forEach(r => {
      if (r.type === 1) {
        const obj2 = [];
        r.options.forEach(r2 => {
          obj2.push(r2.value + ':' + r2.label);
        });
        fns.push(
          'const ' +
            r.name +
            '= val => { return {' +
            obj2.join(',') +
            '}[val] }'
        );
        en.push(r.name);
      } else {
        const o = r.options[0];
        const fn = this.toHump(o.apiUrl);
        imt.push(fn);
        fns.push(
          'const ' +
            r.name +
            '= async val => { const { errorCode, data } = await ' +
            fn +
            '(); if(errorCode === "0") { return data[val] }; }'
        );
        en.push(r.name + ':' + r.name + '()');
        api.push(
          'export const ' + fn + ' = params => {' +
              'return request({' +
              'responseType: "json",' +
              'method: "' + o.apiType + '",' +
              'url: "' + o.apiUrl + '",' +
              'params' +
              '});' +
              '}'
        );
      }
    });
    const data = beautify.js_beautify(
      'import { ' +
        imt.join(',') +
        ' } from "@/api/gfilters";' +
        fns.join('\r\n') +
        'export default { ' +
        en.join(',') +
        ' }'
    );
    const fold = '../' + this.ctx.request.body.name + '/src/filters/global/';
    mkdirp(fold, err => {
      // 已存在
      if (err) {
        // callback(this, src, dst);
      } else {
        // 不存在
        fs.writeFile(fold + 'filter.js', data, err => {
          if (err) {
            return console.log(err);
          }
          console.log('The file was saved!');
        });
      }
    });
    this.createFilterApi(api);
  }
}
module.exports = FiltersService;
