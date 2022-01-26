'use strict';
const Controller = require('egg').Controller;

class CreateProjectController extends Controller {
  async view() {
    const { ctx } = this;
    const html = await ctx.render('createProject.nj');
    console.log(html);
  }
  async create() {
    const { ctx } = this;
    const result = await ctx.service.project.create();
    return result;
  }
  package() {
    const { ctx } = this;
    if (!ctx.wsocket) {
      throw new Error('this function can only be use in egg-wsocket router');
    }
    const os = require('os');
    const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
    const pty = require('node-pty');
    const ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env,
    });
    console.log('client connected');

    ctx.wsocket
      .on('message', res => {
        console.log('client message==', res);
        ptyProcess.write(res);
      });
    ptyProcess.on('data', data => {
      if (data) {
        process.stdout.write(data);
        console.log(data);
        ctx.wsocket.send(data);
      }
    });

  }
  async getProjectList() {
    const { ctx } = this;
    const result = await ctx.service.project.getProjectList();
    return result;
  }
}

module.exports = CreateProjectController;
