scrollIntoView = throttle(()=>{
    let target = document.getElementById(`map-position-${this.state.currentTag}`)
    if(!target){
      return
    }
    setTimeout(()=>{
      if(target && target.scrollIntoView){
          if(target && target.scrollIntoView){
            target.scrollIntoView({behavior: 'smooth'})
          }
      }else{
        let container = document.getElementById('map-container'),
            scrollTop = container.scrollTop,
            clientHeight = container.clientHeight,
            { top } = target.getBoundingClientRect();
        if(scrollTop < top || scrollTop > top + clientHeight ) {
          if (window.requestAnimationFrame) {
            this.smoothMove(top - 60);
          } else {
            container.scrollTop = `${top - 60}px`;
          }
        }
      }
    },500)
  },1000)

  smoothMove = (final) => {//然后通过speed来设置平滑速度,requestAnimationFrame保证流畅度
    let container = document.getElementById('map-container'),
        now = container.scrollTop,
        speed = Math.floor((final - now) / 8);
    container.scrollTop = now + speed;
    if (now - final > 10 || final - now > 10) { //控制到什么位置之前一直滑动
        this.raf = window.requestAnimationFrame(this.smoothMove.bind(this, final))
    }else{//到位置后取消动画作为优化
        window.cancelAnimationFrame(this.raf);
    }
  }