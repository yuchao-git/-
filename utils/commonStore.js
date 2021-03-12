var {help} = require('./stateHelp');
var data = {
    a: 1,
    b: 2,
    c: {
        d: 123,
        e: {
            f: 4,
            g: 32
        },
        h: {
            k: 978,
            m: 456
        }
    }
};
help.data = data;
console.log('init')
var subEvent = {};
var proxyFn = function (commonState,page) {
    return new Proxy(data, {
        set: function (target, name, value, receiver) {
            // 如果不先声明不准修改
            if (!commonState.includes(name)) {
                throw new Error('修改的数据未在公共的state里面声明');
            }

            if (typeof name === 'string') {
                subEvent[name].forEach(item => {
                    item.setData({
                        [name]: value
                    });
                });
                // 赋值给help的active
                help.active.push({
                    key: name,
                    route: page.route,
                    from: target[name],
                    to: value
                });

                target[name] = value;

                // 赋值给help的data
                help.data = target;
               
                return true;
            }
            return false
        },
    })
}

var commonState = (component, commonState = []) => {
    return {
        ...component,
        onLoad(options) {
            let nowCommonData = {};// 注册的公共对象的值
            for (let i = 0; i < commonState.length; i++) {

                let key = commonState[i];
                // 判断重复声明
                if (component.data[key]) {
                    throw new Error('data的数据和公共的state重复声明');
                }

                // 判断未初始化
                if (data[key] === undefined) {
                    throw new Error('请先给公共的state初始化值');
                } else {
                    nowCommonData[key] = data[key];
                }

                if (subEvent[key]) {
                    subEvent[key].push(this);
                } else {
                    subEvent[key] = [this];
                }

            }
            // 将注册的公共属性赋值到this的data上
            this.setData({
                ...nowCommonData
            })
            // 赋值给help的map
            help.subEventFn(subEvent);
            component.onLoad.apply(this, [proxyFn(commonState,this), ...options]);
        },
        onUnload(){
            commonState.forEach(key => {
                subEvent[key] = subEvent[key].filter(item => {
                    return item != this;
                })
            })

            // 赋值给help的map
            help.subEventFn(subEvent);
            component.onUnload.apply(this);
        }
    }
}

module.exports = {
    commonState
}