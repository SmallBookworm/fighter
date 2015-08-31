module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class Bullet extends egret.Bitmap{
        private static cacheDict: Object = {};
        public static produce(textureName:string):Bullet{
            if(Bullet.cacheDict[textureName] == null)
                Bullet.cacheDict[textureName] = [];
            var dict: Bullet[] = Bullet.cacheDict[textureName];
            var bullet: Bullet;
            if(dict.length>0){
                bullet = dict.pop();
            }else{
                bullet = new Bullet(RES.getRes(textureName),textureName);
            }
            return bullet;
        }
        public static reclaim(bullet:Bullet):void{
            var textureName: string = bullet.textureName;
           // if(Bullet.cacheDict[textureName] == null)
             //   Bullet.cacheDict[textureName] = [];
            var dict: Bullet[] = Bullet.cacheDict[textureName];
           // if(dict.indexOf(bullet) == -1)
                dict.push(bullet);
        }
        
        private textureName: string;//类型名（和资源组中同名纹理对应）
        
		public constructor(texture:egret.Texture,textureName: string) {
            super(texture);
            this.textureName = textureName;
		}
	}
}
