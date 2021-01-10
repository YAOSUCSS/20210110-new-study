function defineReactive(obj, key, value) {
    Object.defineProperty(obj, key, {
        get() {
            console.log("get", key)
            return value
        },
        set (v) {
            if (value !== v) {
                console.log("set", key)
                value = v
            }
        }
    })
}

function $set(obj, key, value) {
    defineReactive(obj,key,value)
}

function $delete(obj, key) {
  delete obj[key]
}
class Observe { // 观察者，监听数据。
    constructor(obj) {
        this.value = obj
        if (Array.isArray(obj)) {

        } else {
            this.observe(obj)
        }
    }
    observe(obj) {
        if (obj === null || !obj instanceof Object) return
        Object.keys(obj).forEach((key) => {
            if (obj[key] instanceof Object) {
                observe(obj[key])
            }
            defineReactive(obj, key, obj[key])
        })
    }
}
class Vue{ 
    constructor(options) {
        // 1响应式
        this.$el = options.el
        this.$data = options.data
        new Observe(this.$data)
        // 2编译
    }
}
