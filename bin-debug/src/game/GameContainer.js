var game;
(function (game) {
    /**
     *主游戏容器
     * @author peng
     *
     */
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = GameContainer.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };
        __egretProto__.createGameScene = function () {
            //加血条
            this.bloodBar = new egret.gui.ProgressBar;
            this.bloodBar.skinName = skin.bloodProgressBarSkin;
            this.bloodBar.value = 100;
            this.addChild(this.bloodBar);
            //set level
            this.level = new level.Number();
            this.addChildAt(this.level, 0);
            this.level.addEventListener("bloodBarChange", this.bloodBarChange, this);
        };
        __egretProto__.bloodBarChange = function (event) {
            this.bloodBar.value = event.data;
        };
        return GameContainer;
    })(egret.DisplayObjectContainer);
    game.GameContainer = GameContainer;
    GameContainer.prototype.__class__ = "game.GameContainer";
})(game || (game = {}));
//# sourceMappingURL=GameContainer.js.map