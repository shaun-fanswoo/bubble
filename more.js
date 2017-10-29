window.onload = function() {
    var canvas = document.querySelector('#bubble');
    if (null == canvas) {
      return false;
    }
    canvas.height = 400;
    var w = canvas.width;
    var h = canvas.height;
    var ctx = canvas.getContext('2d');
    var len = (w / 200) * 10;
  
    function resize_fn() {
      canvas.width = $(canvas).width();
      w = canvas.width;
      len = (w / 200) * 10;
    }
  
    $(window).resize(resize_fn);
    resize_fn();
  
    function set_bg() {
      ctx.fillStyle = '#f7f7f7';
      ctx.fillRect(0, 0, w, h);
      ctx.font = '20px 宋体';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#666';
      ctx.fillText('暂无数据', w / 2, h / 2);
    }
  
    set_bg();
  
    var pi = Math.PI;
  
    // 生成 min 到 max 之间的随机数
    function new_random(min, max, num) {
      if ('number' === typeof num) {
        return (Math.random() * (max - min) + min).toFixed(num);
      }
      return parseInt(Math.random() * (max - min) + min);
    }
  
    // 生成颜色
    function new_color() {
      var r = new_random(120, 220);
      var g = new_random(120, 220);
      var b = new_random(120, 220);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
  
    // 生成新的圆
    function new_circle(i) {
      ctx.beginPath();
      ctx.strokeStyle = arr_c[i];
      ctx.lineWidth = 2;
      var r = arr_r[i];
      var x = arr_x[i];
      var y = arr_y[i];
      ctx.arc(x, y, r, 0, 2 * pi);
      ctx.stroke();
      ctx.closePath();
    }
  
    // 各项变量数组
    var arr_r = [];
    var arr_x = [];
    var arr_y = [];
    var arr_speed = [];
    var arr_c = [];
    // 首屏
    for (var i = 0; i < len; i++) {
      arr_r.push(new_random(5, 40));
      arr_x.push(new_random(0, w));
      arr_y.push(new_random(0, h));
      arr_speed.push(new_random(1, 5, 2));
      arr_c.push(new_color());
      new_circle(i);
    }
  
    setInterval(function() {
      ctx.clearRect(0, 0, w, h);
      set_bg();
      for (var i = 0; i < len; i++) {
        arr_y[i] -= arr_speed[i];
        if (arr_y[i] < -arr_r[i]) {
          arr_x[i] = new_random(0, w);
          arr_y[i] = new_random(h, 2 * h);
        }
        new_circle(i);
      }
    }, 20);
  }