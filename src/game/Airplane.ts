module game {
	/**
	 *@飞机基类
	 * 
	 *@小伙子有对象池不用？注意textureName在池中缺少飞机时会作为创建飞机时的图像资源名
	 */
    export class Airplane extends egret.DisplayObjectContainer {
        //photo
        private bmp: egret.Bitmap;
        
        private static className: string = "Airplane";
        
        public blood: number = 10;
        
        public constructor(texture: egret.Texture,blood?: number) {
            super();
            this.bmp = new egret.Bitmap(texture);
            this.addChild(this.bmp);
            if(blood != null && blood != 0) {
                this.blood = blood;
            }
        }
   
        //返回飞机类型（对象池使用）
        public getKindName():string{
            return Airplane.className;
        }
    }
	}

