module physical {
	/**
	 *
	 * @author 
	 *
	 */
	export class GetBitmapSkeleton {
        public static bitmapSkeleton: Array<any> = [];
        //full bitmapSkeleton
        public static init(){
            GetBitmapSkeleton.bitmapSkeleton["f2"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("f2")));
            GetBitmapSkeleton.bitmapSkeleton["f3"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("f3")));
            GetBitmapSkeleton.bitmapSkeleton["b1"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("b1")));
            GetBitmapSkeleton.bitmapSkeleton["b2"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("b2")));
        }
        
        public static hitTest(obj1:egret.DisplayObject,name1:string,obj2:egret.DisplayObject,name2:string):Boolean{
            var bs1: Array<any> = GetBitmapSkeleton.bitmapSkeleton[name1];
            var bs2: Array<any> = GetBitmapSkeleton.bitmapSkeleton[name2];
            if(obj1.y > obj2.y)
                return GetBitmapSkeleton.realTest(obj2,obj1,bs2,bs1);
            else
                return GetBitmapSkeleton.realTest(obj1,obj2,bs1,bs2);                       
        }
        //1在2的上方
        public static realTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject,bs1:Array<any>,bs2:Array<any>):Boolean{
            obj1.y+obj1.width
            for(var i = 0;i<)
            
        }
        
		//刻画骨骼，在y轴上每隔一段距离测出图像在x轴上宽度
    	public static getBitmapSkeleton(bmp:egret.Bitmap):Array<any>{
            bmp.x = 0;
            bmp.y = 0;
            var rule: number=10;
            var data: Array<any> = [];
            var x: number;
            var y: number=bmp.y+10;
            for(var i=0;y >= (bmp.y + bmp.height);y+=rule){
                data[i] = [];
                data[i]["y"] = y;
                x = bmp.x;
                while(1){
                    if(bmp.hitTestPoint(x,y,true)){
                        data[i]["x1"] = x;
                        break;
                    }                 
                    x++;
                }
                while(2){
                    x++;
                    if(!bmp.hitTestPoint(x,y,true)){
                        data[i]["x2"] = x-1;
                        break;
                    }
                }
            }
            return data;
    	}
	}
}
