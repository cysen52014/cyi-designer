<template>
  <div
    class="terminal-Container"
    style="height: 100%;"
  >
    <div id="terminal" ref="terminal"></div>
  </div>
</template>

<script>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

export default {
  name: 'Xterm',
  props: {
    socketURI: {
      type: String,
      default: 'ws://127.0.0.1:7001/project/package'
    }
  },
  mounted () {
    this.initSocket()
  },
  beforeDestroy () {
    this.socket.close()
    this.term.dispose()
  },
  methods: {
    initTerm () {
      const term = new Terminal({
        rendererType: 'canvas',
        fontSize: 14,
        cursorBlink: true
        // disableStdin: false // 是否应禁用输入。
        // cursorStyle: 'underline' // 光标样式
        // theme: {
        //   foreground: '#7e9192', // 字体
        //   background: '#002833', // 背景色
        //   cursor: 'help', // 设置光标
        //   lineHeight: 16
        // }
      })
      const attachAddon = new AttachAddon(this.socket)
      const fitAddon = new FitAddon()
      term.loadAddon(attachAddon)
      term.loadAddon(fitAddon)
      term.open(document.getElementById('terminal'))
      fitAddon.fit()
      term.focus()
      console.log(term, 'term')
      this.term = term
      this.initShell()
    },
    initShell () {
    //   this.socket.send('cd D:\\work\\cyi-web-designer\\' + this.$route.query.name + '\rnpm i\r')
    },
    initSocket () {
      this.socket = new WebSocket(this.socketURI)
      this.socketOnClose()
      this.socketOnOpen()
      this.socketOnError()
    },
    socketOnOpen () {
      this.socket.onopen = () => {
        // 链接成功后
        this.initTerm()
      }
    },
    socketOnClose () {
      this.socket.onclose = () => {
        // console.log('close socket')
      }
    },
    socketOnError () {
      this.socket.onerror = () => {
        // console.log('socket 链接失败')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.terminal-Container {
  width: 100%;
  height: 100%;
//   #terminal {
//     height: 100%;
//   }
}
</style>
