// defineProperty proxy
class Observer {
  constructor(obj) {
    this.respond(obj);
  }

  respond(obj) {
    /**
     *  Object.defineProperty
     */
    for (let key in obj) {
      let currentKeyVal = obj[key];
      const fnsList = new Set();
      Object.defineProperty(obj, key, {
        get() {
          // 收集依赖
          window.__fn && fnsList.add(window.__fn);
          return currentKeyVal;
        },
        set(val) {
          // 执行依赖
          fnsList.forEach(item => {
            item();
          })
          currentKeyVal = val;
        }
      })
    }
  }
}

function autoRun(fn) {
  window.__fn = fn;
  fn();
  window.__fn = null;
}

// new proxy
function observerProxy(obj) {
  const fnsList = [];
 return new Proxy(obj, {
    get(target, prop) {
      if (window.__fn && !fnsList.includes(window.__fn)) fnsList.push(window.__fn);
      return target[prop];
    },
    set(target, prop, value) {
      fnsList.forEach(item => {
        item();
      })
      target[prop] = value;
    }
  })
}