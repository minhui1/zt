(function(doc){
					function eraser(param){
						this.id = param.id;
						this.oCon = this.id.parentNode;
						this.txt = doc.getElementById('txt');
						this.ctx = this.id.getContext("2d");
						this.cW=this.oCon.offsetWidth;
						this.cH=this.oCon.offsetHeight;
						this.img=new Image();
						//设置画布大小
						this.id.width=this.cW*2;
						this.id.height=this.cH*2;
						canvas.style.width = this.cW + "px"
						canvas.style.height = this.cH + "px"
						this.img.src='../../images/my_wb_2016/secn_07_maskbg.png';
						var _this=this;
						this.img.onload=function(){
							var sW=(_this.img.width-_this.cW)/2;
							var sH=(_this.img.height-_this.cH)/2;
							_this.ctx.drawImage(_this.img,0,0,_this.id.width,_this.id.height);
							_this.txt.style.display='block';
							//ctx.drawImage(img,sW,0,img.width,img.height,0,0,img.width,img.height);
						}
						// //添加蒙版
						// ctx.beginPath();
						// ctx.fillStyle = "#333";
						// ctx.fillRect(0,0,id.width,id.height);
						this.move=function(e){
							e.preventDefault();
							e.stopPropagation();
							var	x = parseInt(e.touches[0].clientX - _this.oCon.offsetLeft);
							var	y = parseInt(e.touches[0].clientY - _this.oCon.offsetTop);
							var dataArea = _this.ctx.getImageData(0,0,_this.id.width,_this.id.height);
							var num = 0;
							var len=dataArea.data.length;
							// //添加蒙版
							_this.ctx.globalCompositeOperation = "destination-out";
							_this.ctx.beginPath();
							_this.ctx.arc(x,y,20,0,Math.PI*2);
							_this.ctx.fill();
							_this.ctx.closePath();
							for(var i = 0; i <len; i+=4){
								if (dataArea.data[i]&&dataArea.data[i+1]&&dataArea.data[i+2]&&dataArea.data[i+3]){
									num ++;
								};
							};
							if(num <=_this.id.width*_this.id.height*param.num){
									_this.ctx.fillRect(0,0,_this.id.width,_this.id.height);
									_this.oCon.removeChild(_this.id);
									_this.txt.style.zIndex='999';
									param.fn();
								};
						}
						_this.id.addEventListener("touchmove",_this.move,false);
					}
				/*
				id: canvas的id
				num: 最后剩余的百分百
				fn: 回调
				*/
				var cvs=doc.getElementById('canvas');
				var e=new	eraser({
						id:cvs,
						num:0.1,
						fn:function(){
							alert('已经擦完了');
						}
					});
})(document);