var game;
(function (game) {
    var fighter;
    (function (fighter) {
        /**
         *
         * @author peng
         *
         *
         */
        var NormalEnemyFighter = (function (_super) {
            __extends(NormalEnemyFighter, _super);
            function NormalEnemyFighter(texture, fireDelay, blood) {
                _super.call(this, texture, blood);
                this.fireDelay = fireDelay;
                this.fireTimer = new egret.Timer(fireDelay);
                this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
            }
            var __egretProto__ = NormalEnemyFighter.prototype;
            __egretProto__.fire = function () {
                this.fireTimer.start();
            };
            __egretProto__.stopFire = function () {
                this.fireTimer.stop();
            };
            __egretProto__.createBullet = function (event) {
                var theBullet = game.Bullet.produce("b2");
                theBullet.x = this.x + this.width / 2;
                theBullet.y = this.y + this.height;
                game.Airport.address.addChild(theBullet);
                NormalEnemyFighter.bullets.push(theBullet);
            };
            NormalEnemyFighter.moveBullets = function () {
                var bullet;
                var bulletsCount = NormalEnemyFighter.bullets.length;
                for (var i = 0; i < bulletsCount; i++) {
                    bullet = NormalEnemyFighter.bullets[i];
                    if (bullet.y > game.Airport.address.stage.stageHeight) {
                        game.Airport.address.removeChild(bullet);
                        game.Bullet.reclaim(bullet);
                        NormalEnemyFighter.bullets.splice(i, 1);
                        i--;
                        bulletsCount--;
                    }
                    else {
                        bullet.y += 10 * game.Airport.speed;
                    }
                }
            };
            __egretProto__.getKindName = function () {
                return NormalEnemyFighter.kindName;
            };
            NormalEnemyFighter.kindName = "NormalEnemyFighter";
            NormalEnemyFighter.bullets = [];
            return NormalEnemyFighter;
        })(game.Airplane);
        fighter.NormalEnemyFighter = NormalEnemyFighter;
        NormalEnemyFighter.prototype.__class__ = "game.fighter.NormalEnemyFighter";
    })(fighter = game.fighter || (game.fighter = {}));
})(game || (game = {}));
//# sourceMappingURL=NormalEnemyFighter.js.map