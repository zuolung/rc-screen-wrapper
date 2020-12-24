# rc-screen-wrapper
  全屏大数据使用全屏hock组件，根据适配的最大设计稿缩放的容器组件，非全屏组件下宽度占满可视区域，
  左右有其它内容的时候可以传入othersWidth来重新计算可利用区域宽度，全屏模式下，设计稿宽高比例大于
  可视区域宽高比例时宽度占满，小于等于的话则高度占满
### Demo查看
[在线查看](https://zuolung.github.io/rc-screen-wrapper/disk/index.html)
### 安装
    npm i rc-screen-wrapper -S
###  使用
```
import React from 'react';
import fullScreen from './components/fullScreen';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { screenScale, setScale, switchFullScreen, style, isFullScreen } = this.props;

    return (
      <div
        style={{
          width: 1920, height: 1280, backgroundColor: "green", textAlign: "center", lineHeight: "1205px",
          color: "#fff", fontSize: 30, ...style, position: "relative",
          backgroundImage: `url(https://staticfile.xiaofubao.com/center/assets/yx/backgroundImage.png)`,
          backgroundSize: "100% 100%",
        }}
      >
        <div
          style={{ position: "absolute", right: 100, top: 100 }}
          onClick={switchFullScreen}
        >
          {isFullScreen ? "" : "全屏"}
        </div>
        # 设计稿宽高比例{setScale} #
        可视区域{screenScale}
      </div>
    );
  }
}
export default fullScreen(Page)({
  width: 1920,
  height: 1280,
  // othersWidth: 非全屏模式下左右两侧有其它的内容占据的宽度
});
```
