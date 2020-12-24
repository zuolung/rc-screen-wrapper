import React from 'react';
import fullScreen from './components/fullScreen';

class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { screenScale, setScale } = this.props;
    return (
      <div
        style={{
          width: 1920, height: 1280, backgroundColor: "green", textAlign: "center", lineHeight: "1205px",
          color: "#fff", fontSize: 30, ...this.props.style, position: "relative",
          backgroundImage: `url(https://staticfile.xiaofubao.com/center/assets/yx/backgroundImage.png)`,
          backgroundSize: "100% 100%",
        }}
      >
        <div
          style={{ position: "absolute", right: 100, top: 20, lineHeight: "40px", cursor: "pointer" }}
          onClick={this.props.switchFullScreen}
        >
          {this.props.isFullScreen ? "" : "全屏"}
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
});