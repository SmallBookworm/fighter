var game;
(function (game) {
    /**
     *@飞机基类
     *
     *@小伙子有对象池不用？注意textureName在池中缺少飞机时会作为创建飞机时的图像资源名
     */
    var Airplane = (function (_super) {
        __extends(Airplane, _super);
        function Airplane(texture, blood) {
            _super.call(this);
            this.blood = 10;
            this.bmp = new egret.Bitmap(texture);
            this.addChild(this.bmp);
            if (blood != null && blood != 0) {
                this.blood = blood;
            }
        }
        var __egretProto__ = Airplane.prototype;
        //返回飞机类型（对象池使用）
        __egretProto__.getKindName = function () {
            return Airplane.className;
        };
        Airplane.className = "Airplane";
        return Airplane;
    })(egret.DisplayObjectContainer);
    game.Airplane = Airplane;
    Airplane.prototype.__class__ = "game.Airplane";
})(game || (game = {}));
