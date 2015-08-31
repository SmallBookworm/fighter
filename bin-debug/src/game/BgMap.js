var game;
(function (game) {
    /**
     *
     * @author peng
     *
     */
    var BgMap = (function (_super) {
        __extends(BgMap, _super);
        function BgMap() {
            _super.call(this);
            this.speed = 2;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = BgMap.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            var texture = RES.getRes("bgImage");
            this.textureHeight = texture.textureHeight;
            this.rowCount = Math.ceil(this.stageH / this.textureHeight) + 1;
            this.bmpArr = [];
            for (var i = 0; i < this.rowCount; i++) {
                var bgBmp = new egret.Bitmap();
                bgBmp.texture = RES.getRes("bgImage");
                bgBmp.y = this.textureHeight * i - (this.textureHeight * this.rowCount - this.stageH);
                if (i != (this.rowCount - 1))
                    bgBmp.y++;
                this.bmpArr.push(bgBmp);
                this.addChild(bgBmp);
            }
        };
        //滚动
        __egretProto__.start = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        __egretProto__.enterFrameHandler = function (event) {
            for (var i = 0; i < this.rowCount; i++) {
                var bgBmp = this.bmpArr[i];
                bgBmp.y += this.speed;
                if (bgBmp.y > this.stageH) {
                    bgBmp.y = this.bmpArr[0].y - this.textureHeight + 1;
                    this.bmpArr.pop();
                    this.bmpArr.unshift(bgBmp);
                }
            }
        };
        __egretProto__.pause = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        return BgMap;
    })(egret.DisplayObjectContainer);
    game.BgMap = BgMap;
    BgMap.prototype.__class__ = "game.BgMap";
})(game || (game = {}));
//# sourceMappingURL=BgMap.js.map