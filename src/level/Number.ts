module level {
	/**
	 *
	 * @author 
	 *
	 */
	export class Number extends Level{
        private _lastTime: number;
        public constructor() {
            super();
            this._lastTime = egret.getTimer();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        private onAddToStage(event:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            game.Airport.address = this;
        }
        private myFighter: game.fighter.MyFighter;
        private enemyFighters: game.fighter.NormalEnemyFighter[] = [];
        private enemyFightersTimer: egret.Timer = new egret.Timer(1000);
        
        private bg: game.BgMap;
        
        public gameStart():void{
            //put the background
            this.bg = new game.BgMap();
            this.addChild(this.bg);
            this.bg.start();
            //put the airplane
            this.myFighter = game.Airport.produceMyFighter(200);
            this.myFighter.y =this.stage.stageHeight-this.myFighter.height-30;
            this.addChild(this.myFighter);
            //开火
            this.myFighter.fire();
            //操纵飞机
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
            //产生敌机
            this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER,this.createEnemyFighter,this);
            this.enemyFightersTimer.start();
            //每帧变化
            this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
        }
               
      private createEnemyFighter():void{
            var enemyFighter: game.fighter.NormalEnemyFighter = game.Airport.produceNormalEnemyFighter(1000);
            enemyFighter.x = Math.random() * (this.stage.stageWidth - enemyFighter.width);
                enemyFighter.y = -enemyFighter.height - Math.random() * 300;
                    enemyFighter.fire();
                    this.addChildAt(enemyFighter,this.numChildren - 1);
                    this.enemyFighters.push(enemyFighter);
                }
                		
               //move my airplane
                private touchHandler(evt:egret.TouchEvent):void{
                    if(evt.type==egret.TouchEvent.TOUCH_MOVE)
                    {
                        var tx: number = evt.localX;
                        tx = Math.max(0,tx);
                        tx = Math.min(this.stage.stageWidth - this.myFighter.width,tx);
                        this.myFighter.x = tx;
                    }
                }
                //更新
                private gameViewUpdate(evt:egret.Event):void{
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
                    var nowTime: number = egret.getTimer();
                    var fps: number = 1000 / (nowTime - this._lastTime);
                    this._lastTime = nowTime;
                    var speedOffset: number = 60 / fps;
                    var i: number = 0;
                    var bullet: game.Bullet;
                    //my bullets
                    game.fighter.MyFighter.moveBullets();
                    //enemy bullets
                    game.fighter.NormalEnemyFighter.moveBullets();
                    //enemyFighter
                    var theFighter: game.fighter.NormalEnemyFighter;
                    var enemyFighterCount: number = this.enemyFighters.length;
                    for(i = 0;i < enemyFighterCount;i++){
                        theFighter = this.enemyFighters[i];
                        if(theFighter.y > this.stage.stageHeight) {
                            this.removeChild(theFighter);
                            game.Airport.reclaim(theFighter);
                            theFighter.stopFire();
                            this.enemyFighters.splice(i,1);
                            i--;
                            enemyFighterCount--;//数组长度已经改变
                        } 
                        theFighter.y += 4 * speedOffset;
                                        
                        }
                        this.gameHitTest();
                        this.bloodBarChange();
                    }
                    //血条变化
                    private bloodBarChange():void{
                        this.dispatchEventWith("bloodBarChange",false,this.myFighter.blood * 10);
                    }
                    //碰撞测试
                    private gameHitTest():void{
                        var i: number,j: number;
                        var bullet: game.Bullet;
                        var theFighter: game.fighter.NormalEnemyFighter;
                        var myBullets: game.Bullet[] = game.fighter.MyFighter.bullets;
                        var enemyBullets: game.Bullet[] = game.fighter.NormalEnemyFighter.bullets;
                        var myBulletsCount: number = myBullets.length;
                        var enemyFightersCount: number = this.enemyFighters.length;
                        var enemyBulletsCount: number = enemyBullets.length;
                        //enenmys bullets
                        for(i = 0;i < enemyBulletsCount;i++){
                            bullet = enemyBullets[i];
                            if(physical.GameUtil.hitTest(this.myFighter,bullet)){
                                if(physical.GetBitmapSkeleton.hitTest(this.myFighter,"f3",bullet,"b2")) {
                                    this.myFighter.blood -= 1;
                                    this.removeChild(bullet);
                                    game.Bullet.reclaim(bullet);
                                    enemyBullets.splice(i,1);
                                    i--;
                                    enemyBulletsCount--;
                                }
                            }
                        }
                        //撞机直接结束
                        for(i = 0;i < enemyFightersCount;i++){
                            theFighter = this.enemyFighters[i];
                            if(physical.GameUtil.hitTest(this.myFighter,theFighter)){
                                if(physical.GetBitmapSkeleton.hitTest(this.myFighter,"f3",theFighter,"f2")) {
                                    this.myFighter.blood -= 10;
                                    break;
                                }
                            }
                        }
                        if(this.myFighter.blood <= 0) {
                            this.gameOver();
                            return;
                        }
                        //my bullets
                        for(i = 0;i < myBulletsCount;i++){
                            bullet = myBullets[i];
                            for(j = 0;j < enemyFightersCount;j++){
                                theFighter = this.enemyFighters[j];
                                if(physical.GameUtil.hitTest(theFighter,bullet)) {
                                    if(physical.GetBitmapSkeleton.hitTest(theFighter,"f2",bullet,"b1")) {
                                        theFighter.blood -= 2;
                                        this.removeChild(bullet);
                                        game.Bullet.reclaim(bullet);
                                        myBullets.splice(i,1);
                                        i--;
                                        myBulletsCount--;
                                        if(theFighter.blood <= 0) {
                                            theFighter.stopFire();
                                            this.removeChild(theFighter);
                                            game.Airport.reclaim(theFighter);
                                            this.enemyFighters.splice(j,1);
                                            enemyFightersCount--;
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                                    
                        }
                        
                        private gameOver():void{
                            this.dispatchEventWith("gameOver");
                            this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
                            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
                            this.myFighter.stopFire();
                            this.removeChild(this.bg);
                            this.removeChild(this.myFighter);
                            game.Airport.reclaim(this.myFighter);
                            this.enemyFightersTimer.removeEventListener(egret.TimerEvent.TIMER,this.createEnemyFighter,this);
                            this.enemyFightersTimer.stop();
                            var i: number;
                            var bullet: game.Bullet;
                            i = game.fighter.MyFighter.bullets.length;
                            while(i--){
                                bullet = game.fighter.MyFighter.bullets.pop();
                                this.removeChild(bullet);
                                game.Bullet.reclaim(bullet);
                            }
                            i = game.fighter.NormalEnemyFighter.bullets.length;
                            while(i--){
                                bullet = game.fighter.NormalEnemyFighter.bullets.pop();
                                this.removeChild(bullet);
                                game.Bullet.reclaim(bullet);
                            }
                            var theFighter: game.fighter.NormalEnemyFighter;
                            i = this.enemyFighters.length;
                            while(i--){
                                theFighter = this.enemyFighters.pop();
                                theFighter.stopFire();
                                this.removeChild(theFighter);
                                game.Airport.reclaim(theFighter);
                            }
                        }
                        
                        public gamePause(): void {
                            this.bg.pause();
                            this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
                            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
                            this.myFighter.stopFire();
                            this.enemyFightersTimer.stop();
                            var theFighter: game.fighter.NormalEnemyFighter;
                            var i:number = this.enemyFighters.length;
                            while(i) {
                                i--;
                                theFighter = this.enemyFighters[i];
                                theFighter.stopFire();
                            }
                        }
	}
}
