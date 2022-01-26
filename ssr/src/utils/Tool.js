import router from "@/router";
/*-工具类-*/
export default class Tool {
  // 过滤空值
  static filterParams(params) {
    const p = {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const el = params[key];
        if (el !== "") {
          p[key] = el;
        }
      }
    }
    return p;
  }
  // sort
  static toTreeData(data, attr) {
    var pos = {};
    var tree = [];
    var i = 0;
    while (data.length > 0) {
      if (data[i][String(attr.parentId)] === String(attr.rootId)) {
        tree.push(data[i]);
        pos[data[i][String(attr.id)]] = [tree.length - 1];
        data.splice(i, 1);
        i--;
      } else {
        var posArr = pos[data[i][String(attr.parentId)]];
        if (posArr != undefined) {
          var obj = tree[posArr[0]];
          for (var j = 1; j < posArr.length; j++) {
            obj = obj.children[posArr[j]];
          }
          obj.children = obj.children ? obj.children : [];
          obj.children.push(data[i]);
          pos[data[i][String(attr.id)]] = posArr.concat([obj.children.length - 1]);
          data.splice(i, 1);
          i--;
        }
      }
      i++;
      if (i > data.length - 1) {
        i = 0;
      }
    }
    return tree;
  }

  // json对象排序
  static compare(arr, key) {
    return arr.sort(function(a, b) {
      var value1 = a[key];
      var value2 = b[key];
      return value1 - value2;
    });
  }

  static checkPhone(value) {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  static payType() {
    // 支付类型 0 岗亭 1 微信 2支付宝',
    return {
      0: "岗亭",
      1: "微信",
      2: "支付宝"
    };
  }

  static payChannel() {
    // 0 岗亭 1 百联 2随行付，3微信原生
    return {
      0: "岗亭",
      1: "百联",
      2: "随行付",
      3: "微信原生"
    };
  }

  static reconciliationType() {
    // 对账方式：1-官方对账，2-本地对账
    return {
      1: "官方对账",
      2: "本地对账"
    };
  }
}
