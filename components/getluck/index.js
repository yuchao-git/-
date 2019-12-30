// components/getluck/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //礼物数组
    list: {
      type: Array,
      value: [{
        id: 1,
        value: '礼物1'
      }, {
        id: 2,
        value: '礼物2'
      }, {
        id: 3,
        value: '礼物3'
      }]
    },
    // 颜色数组(没有就会随机取)
    colorList: {
      type: Array,
      value: null
    },
    // 圆盘的半径
    raduis: {
      type: Number,
      value: 375 / 2,
    },
    // 获取的奖项
    prize: {
      type: Number,
      value: null,
    }
  },
  observers: {
    prize: function(prize) {
      if (!prize && prize !== 0) {
        return;
      }
      let list = this.data.list;
      let needRotateAngle = 0; // 这次需要旋转的角度（从0开始算）
      let rotateAll = 360 * 5; // 旋转的圈数
      let stepAngle = 360 / this.data.list.length;
      let rotateAngle = 0; //最终旋转角度
      let prizeObj = {};

      list.forEach((item, index) => {
        if (item.id === prize) {
          needRotateAngle = 360 - index * stepAngle 
          rotateAngle = Math.floor(this.data.rotateAngle / rotateAll) * rotateAll + rotateAll + needRotateAngle
          prizeObj = item;
        }
      });

      this.setData({
        rotateAngle,
        prizeObj
      });
      this.animation();
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    luckRotate: '',
    rotateAngle: 0,
    prizeObj: {},
    animation: {}
  },

  ready() {
    this.renderCanvas();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getRandomColor: () => {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      return `rgb(${r},${g},${b})`;
    },
    renderCanvas: function() {
      let list = this.data.list;
      let stepAngle = 2 * Math.PI / this.data.list.length;
      let initAngle = -Math.PI / 2 + stepAngle / 2;
      let radius = this.data.raduis; // 半径
      let ctx = wx.createCanvasContext('getluck', this);
      let w = 2 * radius;
      let h = 2 * radius;

      // 将坐标轴原点移到中间
      ctx.translate(w / 2, h / 2);
      // 渲染扇形
      list.forEach((element, index) => {
        let startAngle = index * stepAngle + initAngle;
        let endAngle = (index + 1) * stepAngle + initAngle;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.setFillStyle(this.data.colorList ? this.data.colorList[index] : this.getRandomColor());
        ctx.fill();
      });

      ctx.setStrokeStyle('#fff');
      ctx.setTextAlign('center');
      ctx.setFontSize(radius / 12)
      // 渲染文字
      list.forEach((element, index) => {
        ctx.lineWidth = 1;
        ctx.strokeText(element.value, 0, -radius * 0.8);
        ctx.rotate(stepAngle);
      });

      ctx.draw(true, () => {

        wx.canvasToTempFilePath({
          canvasId: 'getluck',
          x: 0,
          y: 0,
          width: 2 * radius,
          height: 2 * radius,
          destWidth: 2 * radius,
          destHeight: 2 * radius,
          success: (res) => {
            let imgPath = res.tempFilePath;
            this.setData({
              luckRotate: imgPath
            })
          }
        }, this)
      });
    },
    animation: function() {
      let animate = wx.createAnimation({
        duration: 5000,
        timingFunction: 'ease',

      });
      animate.rotate(this.data.rotateAngle).step();

      this.setData({
        animation: animate.export()
      });

    },
    transitionend: function () {
      this.triggerEvent('getPrizeEnd',{prize:this.data.prizeObj});
    },
    getPrize: function() {
      this.triggerEvent('getPrize');
    }
  }
})