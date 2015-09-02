module game {
	/**
	 *
	 * @author peng
	 *
	 */
	export class Airport {
        public static address: egret.DisplayObjectContainer;
        public static speed: number=1;
        //对象池
        private static cacheDict: Object = {
            "Airplane": new Array<Airplane>(),
            "NormalEnemyFighter": new Array<fighter.NormalEnemyFighter>(),
            "MyFighter":new Array<fighter.MyFighter>()
        };
       //create
        public static produceAirplane():Airplane{
                var dict: Airplane[] = Airport.cacheDict["Airplane"];
                var theFighter: Airplane;
                if(dict.length>0){
                    theFighter = dict.pop();
                }else{
                        theFighter = new Airplane(RES.getRes("f1"));    
                    }
                theFighter.blood=10;//回血
                return theFighter;
                }
                
        public static produceNormalEnemyFighter(fireDelay:number):fighter.NormalEnemyFighter{
                var dict: fighter.NormalEnemyFighter[] = Airport.cacheDict["NormalEnemyFighter"];
                var theFighter: fighter.NormalEnemyFighter;
                if(dict.length>0){
                    theFighter = dict.pop();
                }else{
                    theFighter = new fighter.NormalEnemyFighter(RES.getRes("f2"),fireDelay);
                           }
                    theFighter.blood=10;//回血
                    return theFighter;
                    }
                    
        public static produceMyFighter(fireDelay:number):fighter.MyFighter{
                var dict: fighter.MyFighter[] = Airport.cacheDict["MyFighter"];
                var theFighter: fighter.MyFighter;
                if(dict.length>0){
                    theFighter = dict.pop();
                }else{
                    theFighter = new fighter.MyFighter(RES.getRes("f3"),fireDelay);    
                        }
                    theFighter.blood=10;//回血
                    return theFighter;
                    }
                    
                public static reclaim(theFighter:Airplane):void{
                    // if(Airplane.cacheDict[textureName]==null){
                    //     Airplane.cacheDict[textureName] = [];}
                    var kindName: string = theFighter.getKindName();
                    var dict: Airplane[] = Airport.cacheDict[kindName];
                    //  if(dict.indexOf(theFighter) == -1)
                    dict.push(theFighter);
                }
            }
	
}
