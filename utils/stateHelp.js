var help = {
    data: {},
    subEventFn: function (subEvent) {
        let obj = {};
        for (const key in subEvent) {
            obj[key] = subEvent[key].map(item => {
                return item.route;
            });
        }
        this.subEventMap = obj;
    },
    subEventMap: {},
    active: [],
}

module.exports = {
    help
}