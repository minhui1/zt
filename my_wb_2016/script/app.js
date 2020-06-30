;(function(win,doc){
        var mod={
                init:function(){
                        doc.onreadystatechange = mod.completeLoading;
                        win.addEventListener('touchmove',function(e){
                                e.stopPropagation();
                                e.preventDefault();
                        });
                        this.loading();
                },
                completeLoading:function() {
                	//
        },
        loading:function(){

        	 function ImagePreloader(images,path,callback){
		          this.callback=callback;
		          this.nLoad=0;
		          this.nProcessed=0;
		          this.aImages = new Array;
		          this.nImages=images.length;
		          for(var i=0;i<images.length;i++){
		            this.preload(path,images[i]);
		          }
		        }
		        ImagePreloader.prototype.preload = function (path,image) {
		          var oImage = new Image;
		          this.aImages.push(oImage);
		          oImage.onload = ImagePreloader.prototype.onload;
		          oImage.onerror = ImagePreloader.prototype.onerror;
		          oImage.onabort = ImagePreloader.prototype.onabort;
		          oImage.oImagePreloader = this;
		          oImage.bLoaded = false;
		          oImage.src =path+image;
		        };
		        ImagePreloader.prototype.onComplete = function(){
		          this.nProcessed++;
		          if(this.nProcessed == this.nImages){
		            this.callback(this.aImages, this.nLoaded);
		          }
		        }
		        ImagePreloader.prototype.onload = function(){
		          this.bLoaded = true;
		          this.oImagePreloader.nLoaded++;
		          this.oImagePreloader.onComplete();
		        }
		        ImagePreloader.prototype.onerror = function(){
		          this.bError = true;
		          this.oImagePreloader.onComplete();
		        }
		        ImagePreloader.prototype.onabort = function(){
		          this.bAbort = true;
		          this.oImagePreloader.onComplete();
		        }

		        //调用
		         var imgArr=[
		         'secn1_jump_pic.png?id=201612281400',
		         'secn1_title_pic.png?id=201612281400',
		         'secn1_twist_pic.png?id=201612281400',
		         'secn3_bounce_konami_pic.png?id=201612281400',
		         'secn3_shift_pic.png?id=201612281400',
		         'secn4_bamboo1_pic.png?id=201612281400',
		         'secn4_bamboo2_pic.png?id=201612281400',
		         'secn4_bamboo3_pic.png?id=201612281400',
		         'secn4_suspen_pic.png?id=201612281400',
		         'secn5_ic_dz.png?id=201612281400',
		         'secn5_ic_pl.png?id=201612281400',
		         'secn5_ic_zf.png?id=201612281400',
		         'secn6_rocket_pic.png?id=201612281400',
		         'secn6_tips_pic.png?id=201612281400'
		         ];
		         function now() {
				        return Date.now ? Date.now() : +new Date();
				    };
				 var startTime = now();
				 var minTime = 617;
		         var path='http://img.t.sinajs.cn/t4/appstyle/zt/images/my_wb_2016/common/';
		         var len=imgArr.length;
		         var logo = document.getElementById('logo');
				 var loading_figure = document.getElementById('loading_figure');
				 var s=false;
				 var ip =new ImagePreloader(imgArr,path,function(nImages){
			      		if(nImages = len){
			      			setTimeout(function(){
			      			    s=true;
			      			},100);
			      		}
			      });

				 //loading动画加载
				 var loading = document.getElementById('loading');
		         loopCheck();
		         function loopCheck() {
		          	var timer=null;
			        var idx = 0, time = 200;
			        var bar=document.getElementById('bar');
				    var setValue = function(pst){
				         //logo.style.height = parseInt(pst * 3.75 )/100+ 'rem';
	            		 loading_figure.innerHTML = parseInt(pst) + '%';
				      };
			      void function(){
			      		if(!s){
			      			setValue(idx += (100 - idx) * .4);
			      			timer = setTimeout(arguments.callee,time += 100);
			      			mod.swiper();
			      		}else{
			      			clearTimeout(timer);
			      			setValue(100);
			      			loading.style.display='none';
			      			mod.swiper();
			      		}
			      }();
		        }
			},

        swiper:function(){
                var ele=doc.querySelector('.swiper-container');
                var mySwiper = new Swiper(ele,{
                        direction: 'vertical',
                        initialSlide: 0,
                        parallax : true,
                        calculateHeight: false,
                        resizeReInit : false
                });
                //开启按钮
                var btn = document.getElementById("btn");
					btn.onclick = function(){
				    	mySwiper.slideNext();
				}
				//箭头跳到下一页
				var arrow = document.getElementsByClassName("secn-arrow-bottom");
					for(i=0; i<arrow.length; i++){
						arrow[i].onclick = function(){	
						    	mySwiper.slideNext();
						}
					}
                
                

                
        },
        wxshare:function(){
                var u = navigator.userAgent,
                        mobile=!!u.match(/AppleWebKit.*Mobile.*/);
                if(mobile){
                         var ua = u.toLowerCase();
	                if (ua.match(/MicroMessenger/i) == "micromessenger") {
	                    var bodys=doc.querySelector('body');
	                                var div=document.createElement("div");
	                                div.setAttribute("id","share-box");
	                                div.innerHTML='<img src="../../images/bangdan_9/share.jpg" />';
	                                bodys.insertBefore(div,bodys.childNodes[0]);
	                }
                }else{
                        //console.log('请使用手机浏览');
                }
        }

       
    }
    mod.init();
})(window,document)