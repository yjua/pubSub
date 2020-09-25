let isArray = list => Array.isArray(list)

let isFn = fn => typeof fn === 'function'

function checkFnList(fn) {
  let list = []
  if (isArray(fn)) {
    list = fn
  } else if (isFn(fn)) {
    list = [fn]
  }
  return list.filter(fn => isFn(fn))
}

class EventBus {
  constructor(options) {
    this.listenerMap = new Map()
  }

  /**
   * 支持 单个监听或者多个监听
   *
   */
  on(event, fn) {
    let { listenerMap } = this
    let list = checkFnList(fn)
    if (listenerMap.has(event)) {
      list = listenerMap.get(event).concat(list)
    }
    listenerMap.set(event, list)
  }

  // 触发条件
  emit(event, ...args) {
    let { listenerMap } = this
    if (!listenerMap.has(event)) {
      return
    }
    let listenerList = listenerMap.get(event)
    listenerList.forEach(listener => listener(...args))
  }

  // 取消
  // 取消单个  取消所有
  off(event, fn) {
    let { listenerMap } = this
    if (!listenerMap.has(event)) {
      return
    }
    if (isFn(fn)) {
      let listenerList = listenerMap.get(event)
      for (let i = 0; i < listenerList.length; i++) {
        if (listenerList[i] === fn) {
          listenerList.splice(i, 1)
          i--
        }
      }
    } else {
      listenerMap.delete(event)
    }
  }
}

export default EventBus
