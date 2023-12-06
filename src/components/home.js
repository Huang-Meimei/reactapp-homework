import React, { useState, useEffect, createRef, useRef } from "react";

import "./home.css";

// fetch the data of images
import * as imageAllData from "../data/imageData.json";

import circleImg from "../assets/circle.png";
// let the data of image transfer into information of image url
var imageData = (function getImageURL(imageDataArr) {
  for (var i in imageDataArr) {
    var singleImageData = imageDataArr[i];
    //to get the exact url path of each image
    singleImageData.imageURL = require("../images/" + singleImageData.fileName);

    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
})(imageAllData.default);

/*
 * to get random number within the specific range
 */
function getRangeRandom(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

/*
 * to get a random degree (negative or positive) between 0 and 30
 */
function get30DegRandom() {
  return (Math.random() > 0.5 ? "" : "-") + Math.ceil(Math.random() * 30);
}

//to generate an image object
function ImgFigure(props) {
  const [style, setstyle] = useState({});
  const [imgClassName, setimgClassName] = useState("img-figure");

  const handleClick = (e) => {
    if (props.arrange.isCenter) {
      props.inverse();
    } else {
      props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  };
  const dbhandleClick = (e) => {
    if (props.arrange.isCenter) {
      props.dbcl();
    }

    e.stopPropagation();
    e.preventDefault();
  };

  const styleHandle = () => {
    var oldatas = { ...style };

    // to set the position of image from props
    if (props.arrange.pos) {
      oldatas = { ...props.arrange.pos };
    }

    // to set the rotated angle of image
    if (props.arrange.rotate) {
      ["MozTransform", "msTransform", "WebkitTransform", "transform"].forEach(
        function (value) {
          oldatas[value] = "rotate(" + props.arrange.rotate + "deg)";
        }
      );
    }

    if (props.arrange.isCenter) {
      oldatas.zIndex = 11;
    }

    setstyle(oldatas);

    var namstr = imgClassName;
    // namstr += props.arrange.isInverse ? " is-inverse" : "";
    if (props.arrange.isInverse) {
      namstr += " is-inverse";
    } else {
      namstr = " img-figure";
    }

    setimgClassName(namstr);
  };

  useEffect(() => {
    styleHandle();
  }, [props]);

  return (
    <figure
      className={imgClassName}
      style={style}
      onClick={handleClick}
      onDoubleClick={dbhandleClick}
    >
      <img src={props.data.imageURL.default} alt={props.data.title} />
      <figcaption>
        <h2 className="img-title">{props.data.title}</h2>
        <div className="img-back" onClick={handleClick}>
          <p>{props.data.desc}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function BottomController(props) {
  const [bottomControllerClassName, setbottomControllerClassName] =
    useState("controller-unit");

  const handleClick = (e) => {
    // 如果点击的是当前正在选中态的按钮，则翻转图片，否则将对应的图片居中
    if (props.arrange.isCenter) {
      props.inverse();
    } else {
      props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  };

  const styleHandle = () => {
    // 如果对应的是居中的图片，显示控制按钮的居中态
    var namsstr = bottomControllerClassName;
    if (props.arrange.isCenter && !namsstr.includes("is-center")) {
      namsstr += " is-center";
    } else {
      namsstr = " controller-unit";
    }
    // 如果同时对应的翻转图片，显示控制按钮的翻转态
    if (props.arrange.isInverse) {
      namsstr += " is-inverse";
    }
    // else {
    //   namsstr = " controller-unit";
    // }

    setbottomControllerClassName(namsstr);
  };

  useEffect(() => {
    styleHandle();
  }, [props]);

  return (
    <span className={bottomControllerClassName} onClick={handleClick}>
      {
      props.arrange.isCenter ? <img src={circleImg} /> : null
      }
    </span>
  );
}

function App() {
  const [imgsArrangeArr, setimgsArrangeArr] = useState([]);
  const [bottomControllers, setbottomControllers] = useState([]);
  const [imgFigures, setimgFigures] = useState([]);
  const [Constant, setConstant] = useState({
    centerPos: {
      left: 0,
      right: 0,
    },
    hPosRange: {
      // 水平方向的取值范围
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0],
    },
    vPosRange: {
      // 垂直方向的取值范围
      x: [0, 0],
      topY: [0, 0],
    },
  });
  const stage = useRef();
  const imgFigure0 = useRef();

  const [modalVisible, setmodalVisible] = useState(false);
  const [dbclickObj, setdbclickObj] = useState({});

  const inverse = (index) => {
    var oldimgsArrangeArr = [...imgsArrangeArr];

    oldimgsArrangeArr[index].isInverse = !oldimgsArrangeArr[index].isInverse;

    setimgsArrangeArr([...oldimgsArrangeArr]);
  };

  const center = (index) => {
    return rearrange(index);
  };

  const datahandle = () => {
    var imgs = [];
    var imgUtils = [];

    imageData.forEach(function (value, index) {
      if (!imgsArrangeArr[index]) {
        imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0,
          },
          rotate: 0,
          isInverse: false,
          isCenter: false,
        };
      }

      imgs.push(
        <ImgFigure
          key={index}
          data={value}
          // ref={'imgFigure' + index}
          arrange={imgsArrangeArr[index]}
          inverse={() => inverse(index)}
          center={() => center(index)}
          dbcl={() => {
            setdbclickObj(value);
            setmodalVisible(true);
          }}
        />
      );

      imgUtils.push(
        <BottomController
          key={index}
          arrange={imgsArrangeArr[index]}
          inverse={() => inverse(index)}
          center={() => center(index)}
        />
      );
    });
    setbottomControllers(imgUtils);
    setimgFigures(imgs);
  };

  const fristHandle = () => {
    // 首先拿到舞台的大小
    var stageW = stage.current?.scrollWidth,
      stageH = stage.current?.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    // 拿到一个imageFigure的大小
    var imgW = 320,
      imgH = 360,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    var oldsetConstant = { ...Constant };

    // 计算中心图片的位置点
    oldsetConstant.centerPos = {
      left: halfStageW + imgW,
      top: halfStageH - halfImgH,
    };

    // 计算左右侧区域图片排布位置的取值范围
    oldsetConstant.hPosRange.leftSecX[0] = -halfImgW;
    oldsetConstant.hPosRange.leftSecX[1] = stageW - halfImgW * 5;
    oldsetConstant.hPosRange.y[0] = -halfImgH;
    oldsetConstant.hPosRange.y[1] = stageH - halfImgH;

    setConstant(oldsetConstant);

    rearrange(0, oldsetConstant.centerPos);
  };

  const rearrange = (centerIndex, centerPos) => {
    var oldimgsArrangeArr = [...imgsArrangeArr],
      oldsetConstant = { ...Constant },
      centerPos = centerPos || oldsetConstant.centerPos,
      hPosRange = oldsetConstant.hPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeY = hPosRange.y,
      imgsArrangeCenterArr = oldimgsArrangeArr.splice(centerIndex, 1);

    imgsArrangeCenterArr[0] = {
      // 首先居中centerIndex的图片
      pos: centerPos,
      //居中的centerIndex的图片不需要旋转
      rotate: 0,
      isCenter: true,
    };

    // 布局左右两侧的图片
    for (var i = 0, j = oldimgsArrangeArr.length, k = j / 2; i < j; i++) {
      oldimgsArrangeArr[i] = {
        pos: {
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLeftSecX[0], hPosRangeLeftSecX[1]),
        },
        rotate: get30DegRandom(),
        isCenter: false,
      };
    }

    oldimgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    setimgsArrangeArr([...oldimgsArrangeArr]);
  };

  useEffect(() => {
    datahandle();
  }, [imgsArrangeArr]);

  useEffect(() => {
    fristHandle();
  }, []);

  return (
    <>
      <section
        className="stage"
        ref={(f) => {
          stage.current = f;
        }}
      >
        <section className="img-sec">{imgFigures}</section>
        <nav className="controller-nav">{bottomControllers}</nav>
      </section>

      {modalVisible ? (
        <Modal
          data={dbclickObj}
          close={() => {
            setdbclickObj({});
            setmodalVisible(false);
          }}
        />
      ) : null}
    </>
  );
}

const Modal = ({ data, close }) => {
  const closeModal = () => {
    close();
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" onClick={closeModal} className="close">
              <span>×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{data.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
