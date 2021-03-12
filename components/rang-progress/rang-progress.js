/**
 * 将一个圆用坐标轴分割，起始点是x=0的位置，所以要注意startAngle和endAngle
 * startAngle：-1 - 1的区间
 * endAngle： -1 - 1的区间
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    percentage: {
      type: Number,
      value: 0.6
    }, //百分比
    animTime: {
      type: Number,
      value: 1000
    }, // 动画执行时间
    bgColor: {
      type: String,
      value: '#E9FBFF'
    },// 背景颜色
    rangColor: {
      type: Array,
      value: ['#00D0E8']
    },// 进度环的颜色
    startDrow: {
      type: Boolean,
      value: false
    }, // 是否开始绘画
    startAngle: {
      type: Number,
      value: -0.5
    },// 起始角度
    endAngle: {
      type: Number,
      value: 1.5
    },// 结束角度
    lineWidth: {
      type: Number,
      value: 10
    } // 描线的宽度
  },
  // startDrow为true才开始绘画
  observers: {
    startDrow: function (now, old) {
      if (now) {
        this.draw('rang', 40, 1000);
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    ctx: null,
    radius: 50,
    originX: 0,
    originY: 0
  },
  ready() {

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {

    },
    moved: function () { },
    detached: function () { }
  },

  /**
   * 组件的方法列表
   */

  methods: {

    renderRang() {
      var { startAngle, endAngle } = this.data
      var time = this.data.animTime;
      var percentage = this.data.percentage;
      var allPercentage = percentage * Math.PI * (endAngle - startAngle);
      var stepTime = 20;
      var step = (allPercentage / time) * stepTime;
     
      this.animate(startAngle * Math.PI, stepTime, step, allPercentage);

    },
    renderBg() {
      var {
        radius,
        originX,
        originY,
        ctx,
        bgColor,
        lineWidth,
        startAngle,
        endAngle
      } = this.data;
      ctx.translate(originX, originY);

      //绘制背景圆
      ctx.setLineWidth(lineWidth); // 设置圆环的宽度
      ctx.setStrokeStyle(bgColor);
      ctx.setLineCap('round') // 设置圆环端点的形状
      ctx.beginPath(); //开始一个新的路径

      ctx.arc(0, 0, radius, startAngle * Math.PI, endAngle * Math.PI, false);
      ctx.stroke(); //对当前路径进行描边
    },
    // 绘制彩色圆
    animate(end, stepTime, step, allPercentage) {
      var {
        radius,
        ctx,
        rangColor,
        lineWidth,
        startAngle,
        percentage
      } = this.data;

      var timer = setInterval(() => {

        this.renderBg();
        ctx.setLineWidth(lineWidth); // 设置圆环的宽度
        // 为了兼容安卓做区分渐变色还是纯色
        var gradient;
        if (rangColor.length > 1){
          gradient = ctx.createLinearGradient(200, 100, 100, 200);

          rangColor.forEach((element, index) => {
            gradient.addColorStop(`${index / rangColor.length}`, element)
          });
        }else{
          gradient = rangColor[0];
        }
       
        ctx.setStrokeStyle(gradient);
        ctx.setLineCap('round') // 设置圆环端点的形状
        ctx.beginPath(); //开始一个新的路径
        end = end + step;
        ctx.arc(0, 0, radius, startAngle * Math.PI, end, false);
        ctx.stroke(); //对当前路径进行描边
        ctx.draw();
 
        // 如果是0或者到达终点就清除定时器
        if (Math.abs(end - (allPercentage + startAngle * Math.PI)) < step || allPercentage == 0) {
          clearInterval(timer);
        }

      }, stepTime)
    },
    draw(id) {
      let { lineWidth } = this.data
      var ctx = wx.createCanvasContext(id, this);
      this.createSelectorQuery().select('#' + id).boundingClientRect((rect) => { //监听canvas的宽高
        var originX = parseInt(rect.width / 2);
        var originY = parseInt(rect.height / 2);
        // 取长度较小的作为半径(还要减去苗笔的宽度)
        var radius = (rect.width > rect.height ? rect.height / 2 : rect.width / 2) - lineWidth / 2;

        this.setData({
          ctx,
          radius,
          originX,
          originY
        });

        this.renderRang();
      }).exec();


    }
  },

})