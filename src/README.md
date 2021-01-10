① 创建Vue实例，vue实例接受一个options对象，options对象包含el,data,methods等。
    class Vue{
        constructor(options) {
            this.$options = options //new Vue(options); 
            this.$data = options.data // new Vue({ data: {}}) data() { return {} }写成函数形式是利用了闭包机制。
        }
    }
② 做数据响应式处理。利用Object.definedProperty()监听数据。创建Observe类.
    class Observe{
        constructor(obj) {

        }
        observe(obj) {
            if (obj === null || !obj instanceof Object) return
            Object.keys(obj).forEach((key) => {
                if(obj[key] instanceof Object) {
                    observe(obj[key])
                }
                defineReactive(obj,key, obj[key])
            })
        }
    }
    function defineReactive(obj, key, value) {
        Object.defineProperty(obj,key, {
            get() {
                return value
            },
            set (v) {
                if (v !== value) {
                    value = v
                }
            }
        })
    }