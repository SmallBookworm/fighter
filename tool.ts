module tool {
	/**
	 * 只适用于一些凸多边形一类的形状，像凹的这种就不行了，还需要另外写，关键点在于在同一y坐标上图像所包含x区域的不连续性
	 *工具类
	 * @author 
	 *小渣渣
	 */
    export class GetBitmapSkeleton {
        public static bitmapSkeleton: Array<any> = [];
        /**
         * 2.5hitTestPoint暂时耍不了
         * 初始化图片参数（必须在本类碰撞检测中输入的参数），参数为对应资源图片名
         * 先生成好，由于是单机网页游戏，只能将数据写在程序里面
         */
        public static getData(name: string) {
            var bitmap = new egret.Bitmap(RES.getRes(name));
            GetBitmapSkeleton.bitmapSkeleton[name] = GetBitmapSkeleton.getBitmapSkeleton(bitmap);
        }
        public static initTank(){
            GetBitmapSkeleton.bitmapSkeleton["f2"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("f2_png")));
            GetBitmapSkeleton.bitmapSkeleton["f2"][0]["x1"] = 0;
            GetBitmapSkeleton.bitmapSkeleton["f2"][0]["x2"] = 192;
            GetBitmapSkeleton.bitmapSkeleton["f3"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("f3_png")));
            GetBitmapSkeleton.bitmapSkeleton["tentacle1"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("tentacleFlight1_png")));
            GetBitmapSkeleton.bitmapSkeleton["tentacle2"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("tentacleFlight2_png")));
            GetBitmapSkeleton.bitmapSkeleton["b1"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("b1_png")));
            GetBitmapSkeleton.bitmapSkeleton["b2"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("b2_png")));
            GetBitmapSkeleton.bitmapSkeleton["bullets"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("bullets_png")));
            
        }
        public static init1(){
            GetBitmapSkeleton.bitmapSkeleton["boss_png"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("boss_png")));
        }
        public static printData() {
            var i;
            var w;
            for(var key in GetBitmapSkeleton.bitmapSkeleton) {
                i = GetBitmapSkeleton.bitmapSkeleton[key].length;
                console.log("GetBitmapSkeleton.bitmapSkeleton[\"" + key + "\"] = [];");
                for(w = 0;w < i;w++) {
                    console.log("GetBitmapSkeleton.bitmapSkeleton[\"" + key + "\"][" + w + "] = [];");
                    console.log("GetBitmapSkeleton.bitmapSkeleton[\"" + key + "\"]["+ w + "][\"x1\"] = " + GetBitmapSkeleton.bitmapSkeleton[key][w]["x1"] + ";");
                    console.log("GetBitmapSkeleton.bitmapSkeleton[\"" + key + "\"][" + w + "][\"x2\"] = " + GetBitmapSkeleton.bitmapSkeleton[key][w]["x2"] + ";");
                }

            }
        }
        //使用前两个工具类生成
        public static init() {
        }
        //this is a important information for skeleton number
        public static rule: number = 4;
        //刻画骨骼，在y轴上每隔一段距离测出图像在x轴上宽度,x1和x2都是图像内边界点 
        public static getBitmapSkeleton(bmp: egret.Bitmap): Array<any> {
            var rule: number = GetBitmapSkeleton.rule;
            var data: Array<any> = [];
            var x: number;
            var y: number;
            var i;
            bmp.x = 0;
            bmp.y = 0;
            y = bmp.y + rule;
            //等于的情况不加，最后总有空一段没处理，最后处理
            for(i = 0;y < (bmp.y + bmp.height);y += rule) {
                data[i] = [];
                x = -bmp.width;
                while(1) {
                    if(bmp.hitTestPoint(x,y,true)) {
                        data[i]["x1"] = x;
                        break;
                    }
                    x++;
                }
                while(2) {
                    x++;
                    if(!bmp.hitTestPoint(x,y,true)) {
                        data[i]["x2"] = x - 1;
                        break;
                    }
                }
                i++;
            }
            //防止图像像素小于10，暂时没用到
            if(i == 0) {
                data[0] = [];
                data[0]["x1"] = bmp.x;
                data[0]["x2"] = bmp.x + bmp.width;
                i++;
            }
            //底部再加上一个
            data[i] = [];
            x = bmp.x;
            y = bmp.y + i * rule + (bmp.height - i * rule) / 2;
            while(1) {
                if(bmp.hitTestPoint(x,y,true)) {
                    data[i]["x1"] = x;
                    break;
                }
                x++;
            }
            while(2) {
                x++;
                if(!bmp.hitTestPoint(x,y,true)) {
                    data[i]["x2"] = x - 1;
                    break;
                }
            }


            return data;
        }
        
        //准备用来旋转图像获得各个旋转角度下图片数据，然而旋转后hitTestPoint就不支持了
        public static getBitmapAroundSkeleton(bmp: egret.Bitmap): Array<any> {
            var rule: number = GetBitmapSkeleton.rule;
            var data: Array<any> = [];
            var x: number;
            var y: number;
            var i;
            for(var rotation = -180;rotation <= 180;rotation++) {
                console.log(rotation);
                bmp.rotation = rotation;
                console.log(rotation);
                bmp.x = 0;
                bmp.y = 0;
                data[rotation] = [];
                y = bmp.y + rule;
                //等于的情况不加，最后总有空一段没处理，最后处理
                for(i = 0;y < (bmp.y + bmp.height);y += rule) {
                    data[rotation][i] = [];
                    x = -bmp.width;
                    console.log(rotation);
                    while(1) {
                        if(bmp.hitTestPoint(x,y,true)) {
                            console.log(rotation);
                            data[rotation][i]["x1"] = x;
                            break;
                        }
                        x++;
                    }
                    while(2) {
                        x++;
                        if(!bmp.hitTestPoint(x,y,true)) {
                            data[rotation][i]["x2"] = x - 1;
                            break;
                        }
                    }
                    i++;
                }
                //防止图像像素小于10，暂时没用到
                if(i == 0) {
                    data[rotation][0] = [];
                    data[rotation][0]["x1"] = bmp.x;
                    data[rotation][0]["x2"] = bmp.x + bmp.width;
                    i++;
                }
                //底部再加上一个
                data[rotation][i] = [];
                x = bmp.x;
                y = (bmp.y + bmp.height - i * rule) / 2;
                while(1) {
                    if(bmp.hitTestPoint(x,y,true)) {
                        data[rotation][i]["x1"] = x;
                        break;
                    }
                    x++;
                }
                while(2) {
                    x++;
                    if(!bmp.hitTestPoint(x,y,true)) {
                        data[rotation][i]["x2"] = x - 1;
                        break;
                    }
                }
            }
            return data;
        }
        //通过预处理获得旋转图像后的数据其他
        public static  getInitInformation(obj:egret.DisplayObject):any{
            var data = [];
            
        }
        //极坐标化为标准形式，由于精度问题对于有的图形无法准确转化
        public static changeSkeletonType(initialArray: Array<number>): Array<any> {
            var data = [];
            var ruler = 0;
            for(var i = -89;i < 90;i++) {
                

            }
            return
        }
        //在极坐标下获取360度的图片外边界数据,显然有的边边角角可能取不到，将来再做调整
        public static getBitmapAngleSkeleton(obj: egret.DisplayObject): any {
            var data = [];
            for(var i = -180;i <= 180;i++) {
                data[i] = GetBitmapSkeleton.getPerAngleAndLength(obj,i);
            }
            return data;
        }
        /**
        *获取纹理中心每个角度和对应角度的纹理中心到达纹理边缘的长度
        * @param obj
        * @param angle
        * @returns {{angle: number, length: number, x: number, y: number}}
        * 纹理中心开始为圆心，水平向右为angle起始角度，顺时针增加角度，每次增加1度，length为圆心到达纹理边缘轮廓的长度
        */
        public static getPerAngleAndLength(obj: egret.DisplayObject,angle: number): any {
            var data = { angle: 0,length: 0,x: 0,y: 0 };
            var length = 0;
            var x = 0;
            var y = 0;
            while(++length) {
                x = obj.x + obj.width * 0.5 + Math.cos(angle * Math.PI / 180) * length;
                y = obj.y + obj.height * 0.5 + Math.sin(angle * Math.PI / 180) * length;
                if(!obj.hitTestPoint(x,y,true)) {
                    data.angle = angle;
                    data.length = length;
                    data.x = x ;
                    data.y = y ;
                    break;
                }
            }
            return data.length;
        }
    }

}
