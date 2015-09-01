var game;
(function (game) {
    /**
     *
     * @author
     *
     */
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(texture, textureName) {
            _super.call(this, texture);
            this.textureName = textureName;
        }
        var __egretProto__ = Bullet.prototype;
        Bullet.produce = function (textureName) {
            if (Bullet.cacheDict[textureName] == null)
                Bullet.cacheDict[textureName] = [];
            var dict = Bullet.cacheDict[textureName];
            var bullet;
            if (dict.length > 0) {
                bullet = dict.pop();
            }
            else {
                bullet = new Bullet(RES.getRes(textureName), textureName);
            }
            return bullet;
        };
        Bullet.reclaim = function (bullet) {
            var textureName = bullet.textureName;
            // if(Bullet.cacheDict[textureName] == null)
            //   Bullet.cacheDict[textureName] = [];
            var dict = Bullet.cacheDict[textureName];
            // if(dict.indexOf(bullet) == -1)
            dict.push(bullet);
        };
        Bullet.cacheDict = {};
        return Bullet;
    })(egret.Bitmap);
    game.Bullet = Bullet;
    Bullet.prototype.__class__ = "game.Bullet";
})(game || (game = {}));
//# sourceMappingURL=Bullet.js.map