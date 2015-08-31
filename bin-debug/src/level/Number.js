var level;
(function (level) {
    /**
     *
     * @author
     *
     */
    var Number = (function (_super) {
        __extends(Number, _super);
        function Number() {
            _super.call(this);
            this.enemyFighters = [];
            this.enemyFightersTimer = new egret.Timer(1000);
            this._lastTime = egret.getTimer();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = Number.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            game.Airport.address = this;
            this.gameStart();
        };
        __egretProto__.gameStart = function () {
            //put the background
            this.bg = new game.BgMap();
            this.addChild(this.bg);
            this.bg.start();
            //put the airplane
            this.myFighter = game.Airport.produceMyFighter(200);
            this.myFighter.y = this.stage.stageHeight - this.myFighter.height - 30;
            this.addChild(this.myFighter);
            //开火
            this.myFighter.fire();
            //操纵飞机
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            //产生敌机
            this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
            this.enemyFightersTimer.start();
            //每帧变化
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        };
        __egretProto__.createEnemyFighter = function () {
            var enemyFighter = game.Airport.produceNormalEnemyFighter(1000);
            enemyFighter.x = Math.random() * (this.stage.stageWidth - enemyFighter.width);
            enemyFighter.y = -enemyFighter.height - Math.random() * 300;
            enemyFighter.fire();
            this.addChildAt(enemyFighter, this.numChildren - 1);
            this.enemyFighters.push(enemyFighter);
        };
        //move my airplane
        __egretProto__.touchHandler = function (evt) {
            if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
                var tx = evt.localX;
                tx = Math.max(0, tx);
                tx = Math.min(this.stage.stageWidth - this.myFighter.width, tx);
                this.myFighter.x = tx;
            }
        };
        //更新
        __egretProto__.gameViewUpdate = function (evt) {
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            var nowTime = egret.getTimer();
            var fps = 1000 / (nowTime - this._lastTime);
            this._lastTime = nowTime;
            var speedOffset = 60 / fps;
            var i = 0;
            var bullet;
            //my bullets
            game.fighter.MyFighter.moveBullets();
            //enemy bullets
            game.fighter.NormalEnemyFighter.moveBullets();
            //enemyFighter
            var theFighter;
            var enemyFighterCount = this.enemyFighters.length;
            for (i = 0; i < enemyFighterCount; i++) {
                theFighter = this.enemyFighters[i];
                if (theFighter.y > this.stage.stageHeight) {
                    this.removeChild(theFighter);
                    game.Airport.reclaim(theFighter);
                    theFighter.stopFire();
                    this.enemyFighters.splice(i, 1);
                    i--;
                    enemyFighterCount--; //数组长度已经改变
                }
                theFighter.y += 4 * speedOffset;
            }
            this.gameHitTest();
            this.bloodBarChange();
        };
        //血条变化
        __egretProto__.bloodBarChange = function () {
            this.dispatchEventWith("bloodBarChange", false, this.myFighter.blood * 10);
        };
        //碰撞测试
        __egretProto__.gameHitTest = function () {
            var i, j;
            var bullet;
            var theFighter;
            var myBullets = game.fighter.MyFighter.bullets;
            var enemyBullets = game.fighter.NormalEnemyFighter.bullets;
            var myBulletsCount = myBullets.length;
            var enemyFightersCount = this.enemyFighters.length;
            var enemyBulletsCount = enemyBullets.length;
            for (i = 0; i < enemyBulletsCount; i++) {
                bullet = enemyBullets[i];
                if (physical.GameUtil.hitTest(this.myFighter, bullet)) {
                    this.myFighter.blood -= 1;
                    this.removeChild(bullet);
                    game.Bullet.reclaim(bullet);
                    enemyBullets.splice(i, 1);
                    i--;
                    enemyBulletsCount--;
                }
            }
            for (i = 0; i < enemyFightersCount; i++) {
                theFighter = this.enemyFighters[i];
                if (physical.GameUtil.hitTest(this.myFighter, theFighter)) {
                    this.myFighter.blood -= 10;
                    break;
                }
            }
            if (this.myFighter.blood <= 0) {
                this.gameStop();
                return;
            }
            for (i = 0; i < myBulletsCount; i++) {
                bullet = myBullets[i];
                for (j = 0; j < enemyFightersCount; j++) {
                    theFighter = this.enemyFighters[j];
                    if (physical.GameUtil.hitTest(theFighter, bullet)) {
                        theFighter.blood -= 2;
                        this.removeChild(bullet);
                        game.Bullet.reclaim(bullet);
                        myBullets.splice(i, 1);
                        i--;
                        myBulletsCount--;
                        if (theFighter.blood <= 0) {
                            theFighter.stopFire();
                            this.removeChild(theFighter);
                            game.Airport.reclaim(theFighter);
                            this.enemyFighters.splice(j, 1);
                            enemyFightersCount--;
                        }
                        break;
                    }
                }
            }
        };
        __egretProto__.gameStop = function () {
            this.dispatchEventWith("gameStop");
            this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.myFighter.stopFire();
            this.removeChild(this.myFighter);
            game.Airport.reclaim(this.myFighter);
            this.enemyFightersTimer.removeEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
            this.enemyFightersTimer.stop();
            var bullet;
            while (game.fighter.MyFighter.bullets.length > 0) {
                bullet = game.fighter.MyFighter.bullets.pop();
                this.removeChild(bullet);
                game.Bullet.reclaim(bullet);
            }
            while (game.fighter.NormalEnemyFighter.bullets.length > 0) {
                bullet = game.fighter.NormalEnemyFighter.bullets.pop();
                this.removeChild(bullet);
                game.Bullet.reclaim(bullet);
            }
            var theFighter;
            while (this.enemyFighters.length > 0) {
                theFighter = this.enemyFighters.pop();
                theFighter.stopFire();
                this.removeChild(theFighter);
                game.Airport.reclaim(theFighter);
            }
        };
        return Number;
    })(egret.DisplayObjectContainer);
    level.Number = Number;
    Number.prototype.__class__ = "level.Number";
})(level || (level = {}));
//# sourceMappingURL=Number.js.map