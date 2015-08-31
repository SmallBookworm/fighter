var game;
(function (game) {
    var fighter;
    (function (fighter) {
        /**
         *
         * @author
         *
         */
        var MyFighter = (function (_super) {
            __extends(MyFighter, _super);
            function MyFighter(texture, fireDelay, blood) {
                _super.call(this, texture, blood);
                this.fireDelay = fireDelay;
                this.fireTimer = new egret.Timer(fireDelay);
                this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
            }
            var __egretProto__ = MyFighter.prototype;
            __egretProto__.fire = function () {
                this.fireTimer.start();
            };
            __egretProto__.stopFire = function () {
                this.fireTimer.stop();
            };
            __egretProto__.createBullet = function (event) {
                var theBullet = game.Bullet.produce("b1");
                theBullet.x = this.x + this.width / 2;
                theBullet.y = this.y + this.height;
                game.Airport.address.addChild(theBullet);
                MyFighter.bullets.push(theBullet);
            };
            MyFighter.moveBullets = function () {
                var bullet;
                var bulletsCount = MyFighter.bullets.length;
                for (var i = 0; i < bulletsCount; i++) {
                    bullet = MyFighter.bullets[i];
                    if (bullet.y < -bullet.height) {
                        game.Airport.address.removeChild(bullet);
                        game.Bullet.reclaim(bullet);
                        MyFighter.bullets.splice(i, 1);
                        i--;
                        bulletsCount--;
                    }
                    bullet.y -= 12 * game.Airport.speed;
                }
            };
            __egretProto__.getKindName = function () {
                return MyFighter.kindName;
            };
            MyFighter.kindName = "MyFighter";
            MyFighter.bullets = [];
            return MyFighter;
        })(game.Airplane);
        fighter.MyFighter = MyFighter;
        MyFighter.prototype.__class__ = "game.fighter.MyFighter";
    })(fighter = game.fighter || (game.fighter = {}));
})(game || (game = {}));
