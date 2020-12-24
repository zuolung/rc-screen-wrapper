/* eslint-disable */
import React from 'react';
function Page(Component) {
  /**
   * @param {Number} width               最大设计稿宽度
   * @param {Number} height              最大设计稿宽度
   * @param {Number} othersWidth         左右两侧其它内容的宽度以及magin
   * @param {Number} othersHeight        上下两侧其它内容的高度以及magin
   */
  return ({ width, height, othersWidth = 0, othersHeight = 0 }) => {
    return class Wrapper extends React.PureComponent {
      constructor(props) {
        super(props);
        this.state = {
          isFullScreen: false,
          othersWidth,
          othersHeight,
        }
        this.handleResize_ = this.debounce(this.handleResize, 100)
      }

      componentDidMount() {
        window.addEventListener('resize', this.handleResize_);
      }

      componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize_);
      }
      /**
       * @description: 防抖处理
       * @param {*} func
       * @param {*} time
       * @return {*}
       */
      debounce = (func, time) => {
        let timeOut;
        return function () {
          const args = arguments;
          if (timeOut) clearTimeout(timeOut);
          timeOut = setTimeout(() => {
            func.apply(this, args)
          }, time);
        }
      }
      /**
       * @description: 窗体大小变化触发组件更新
       * @param {*}
       * @return {*}
       */
      handleResize = () => {
        const resizeFlag = (this.state.resizeFlag || 0) + 1;
        this.setState({
          resizeFlag,
        })
      }
      /**
       * @description: 进入全屏方法
       * @param {*}
       * @return {*}
       */
      switchFullScreen = () => {
        if (!this.state.isChanging) {
          this.requestFullScreen();
        }
      };
      /**
       * @description: 进入全屏兼容性处理
       * @param {*}
       * @return {*}
       */
      requestFullScreen = () => {
        this.setState({ isChanging: true });
        var de = document.documentElement;
        if (de.requestFullscreen) {
          de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
          console.log('requestFullScreen2')
          de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
          console.log('requestFullScreen3')
          de.webkitRequestFullScreen();
        }
        setTimeout(() => {
          this.setState({ isChanging: false });
        }, 200)
      };
      /**
       * @description: 
       * @param {*}
       * @return {*} 返回是否全屏标识
       */
      isFullScreen = () => {
        return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
      }
      /**
       * @description: 设计稿设计适配的最大比例，以此计算缩放比例和左右上下拉升的距离
       * @param {*}
       * @return {*} 返回容器样式
       */
      countScaleStyle = () => {
        let scaleStyle = {};
        const originWidth = width || 1920, originHeight = height || 1205;
        let canUseWidth = document.body.offsetWidth - othersWidth;
        let canUseHeight = document.body.offsetHeight - othersHeight;
        // 当设计草图的宽高比大于可视区域的宽高比时，宽度占满
        let shouldFullWidth = (originWidth / originHeight) > (canUseWidth / canUseHeight);
        // 宽度占满
        if (!this.isFullScreen() || shouldFullWidth) {
          const currentWidth = canUseWidth;
          const scaleValue = (currentWidth / originWidth);
          const currentHeight = originHeight * scaleValue;
          const marginTop = (originHeight - currentHeight) / 2;
          const marginLeft = (originWidth - currentWidth) / 2;
          if (currentWidth <= 1920) {
            scaleStyle = {
              transform: `scale(${scaleValue})`,
              marginTop: - marginTop,
              marginLeft: - marginLeft,
            }
          }
        } else {
          // 高度占满
          const currentHeight = canUseHeight;
          const scaleValue = (currentHeight / originHeight);
          const currentWidth = originWidth * scaleValue;
          const marginTop = (originHeight - currentHeight) / 2;
          const marginLeft = (originWidth - canUseWidth) / 2;
          if (currentWidth <= 1920) {
            scaleStyle = {
              transform: `scale(${scaleValue})`,
              marginTop: - marginTop,
              marginLeft: - marginLeft,
            }
          }
        }

        return scaleStyle;
      }
      /**
       * @description: 注入组件的额外属性
       * @param {*}
       * @return {*} 返回容器样式、全屏方法、是否进入全屏标识
       */
      addtionalProps = () => {
        const screenScale = document.body.offsetWidth / document.body.offsetHeight;
        const setScale = (width || 1920) / (height || 1205);

        return {
          style: this.countScaleStyle(),
          switchFullScreen: this.switchFullScreen,
          isFullScreen: this.isFullScreen(),
          screenScale,
          setScale,
        }
      }

      render() {
        return (
          <Component
            {...this.props}
            {...this.addtionalProps()}
          />
        );
      }
    }
  }
}
export default Page;