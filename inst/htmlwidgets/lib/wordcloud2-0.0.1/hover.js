// create element
function newlabel(el){
  var newDiv = document.createElement("div");
  var newSpan = document.createElement("span");
  newDiv.id = 'wcLabel';
  newSpan.id = "wcSpan";
  el.appendChild(newDiv);
  document.getElementById("wcLabel").appendChild(newSpan);
}

// hover function
function cv_handleHover(item, dimension, evt) {
  var el = document.getElementById("wcLabel");
  if (!item) {
    el.setAttribute('hidden', true);

    return;
  }

  el.removeAttribute('hidden');
  // console.log(evt.srcElement.offsetLeft);

  el.style.left = dimension.x + evt.srcElement.offsetLeft + 'px';
  el.style.top = dimension.y + evt.srcElement.offsetTop + 'px';
  el.style.width = dimension.w + 'px';
  el.style.height = dimension.h + 'px';

  this.hoverDimension = dimension;

  document.getElementById("wcSpan").setAttribute(
    'data-l10n-args', JSON.stringify({ word: item[0], count: item[1] }));
  document.getElementById("wcSpan").innerHTML =item[0]+":" + item[1];

}

//mask function
function maskInit(el,x){
  console.log(1)
  str = x.figBase64;
  //console.log(str)
  var newImg = new Image(); 
  newImg.src = str;
  newImg.onload = function(){
    // console.log(el.clientHeight);
    // newImg.style.position = 'absolute';
    // newImg.style.left = 0;  
    newImg.width = el.clientWidth;
    newImg.height = el.clientHeight;
    newImg.id = "mask_img";
    // newImg.style.visibility = 'hidden';
    // document.getElementsByTagName("body")[0].appendChild(newImg);

    // maskCanvas = init(el, x, newImg);
    vvalue = 128

    var canvas = el.firstChild;
    var ctx = canvas.getContext('2d');
    var cvsWidth = el.clientWidth;
    var cvsHeight = el.clientHeight;
    
    // ctx.fillStyle = x.backgroundColor;
    // ctx.fillrect(0, 0, cvsWidth, cvsHeight);
    ctx.drawImage(newImg, 0, 0, cvsWidth, cvsHeight);    
    var imageData = ctx.getImageData(0, 0, cvsWidth, cvsHeight);
    var data = imageData.data;

    var bgColor = x.backgroundColor == "white"?[255, 255, 255]: [0, 0, 0];
    for(var i = 0 ; i < data.length; i += 4){
      if(data[i+3] < 128){
        // regions that are not in mask are marked with non-background
        // color, which indicate they are already occupied. 
        // However, for presentation purpose, these regions should be 
        // visually similar to the "real background".
        data[i ] = bgColor[0] == 0? 1: bgColor[0]-1;
        data[i+1] = bgColor[1];
        data[i+2] = bgColor[2];
        data[i+3] = 255;   
      } else {
        data[i ] = bgColor[0];
        data[i+1] = bgColor[1];
        data[i+2] = bgColor[2];
        data[i+3] = 255;   
      }
         
    }

    ctx.putImageData(imageData, 0, 0);
    // document.getElementById("mask_img").remove();
    

    maskCanvasScaled = ctx = imageData = newImageData = bctx = bgPixel = undefined;
              WordCloud(el.firstChild, { list: listData,
                    fontFamily: x.fontFamily,
                    fontWeight: x.fontWeight,
                    color: x.color,
                    minSize: x.minSize,
                    weightFactor: x.weightFactor,
                    backgroundColor: x.backgroundColor,
                    gridSize: x.gridSize,
                    minRotation: x.minRotation,
                    maxRotation: x.maxRotation,
                    shuffle: x.shuffle,
                    shape: x.shape,
                    rotateRatio: x.rotateRatio,
                    ellipticity: x.ellipticity,
                    clearCanvas: false,
                    hover: x.hover || cv_handleHover,
                    abortThreshold: 3000
                    });
  }
}

