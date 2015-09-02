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
            this.touchCount = 0;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = GameContainer.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };
        __egretProto__.createGameScene = function () {
            //放幕布 设置字体
            this.curtain = new egret.Shape();
            this.curtain.graphics.beginFill(0xffffff);
            this.curtain.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            this.curtain.graphics.endFill();
            this.addChild(this.curtain);
            this.levelText = new egret.TextField();
            this.levelText.text = "level 1";
            this.levelText.textColor = 0xffffff;
            this.levelText.strokeColor = 0x000000;
            this.levelText.stroke = 3;
            this.levelText.size = 40;
            this.levelText.y = this.stage.stageHeight / 3 - 30;
            this.levelText.x = -280;
            this.addChild(this.levelText);
            this.levelName = new egret.TextField();
            this.levelName.text = "无尽的时间";
            this.levelName.textColor = 0xffffff;
            this.levelName.strokeColor = 0x000000;
            this.levelName.stroke = 3;
            this.levelName.size = 40;
            this.levelName.y = this.stage.stageHeight / 3 + 10;
            this.levelName.x = -280;
            this.addChild(this.levelName);
            this.icon = new egret.Bitmap(RES.getRes("level"));
            this.icon.scaleX = 0.7;
            this.icon.scaleY = 0.7;
            this.icon.y = this.stage.stageHeight / 3 + 100;
            this.icon.x = -400;
            this.addChild(this.icon);
            //加血条
            this.bloodBar = new egret.gui.ProgressBar();
            this.bloodBar.skinName = skin.bloodProgressBarSkin;
            this.bloodBar.value = 100;
            this.addChildAt(this.bloodBar, 0);
            //set level_1
            this.level = new level.Number();
            this.addChildAt(this.level, 0);
            this.level.addEventListener("bloodBarChange", this.bloodBarChange, this);
            this.level.addEventListener("gameOver", this.gameOver, this);
            //touch to start 
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        };
        __egretProto__.touch = function () {
            switch (this.touchCount) {
                case 0:
                    egret.Tween.get(this.levelText).to({ x: 135 }, 500, egret.Ease.cubicIn);
                    break;
                case 1:
                    egret.Tween.get(this.levelName).to({ x: 135 }, 500, egret.Ease.cubicIn);
                    break;
                case 2:
                    egret.Tween.get(this.icon).to({ x: 240 - this.icon.width * 0.35 }, 500, egret.Ease.cubicIn);
                    break;
                case 3:
                    this.gameStart();
                    break;
            }
            this.touchCount++;
        };
        __egretProto__.gameStart = function () {
            this.touchEnabled = false;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
            this.removeChildAt(2);
            this.removeChildAt(2);
            this.removeChildAt(2);
            this.removeChildAt(2);
            this.level.gameStart();
        };
        __egretProto__.bloodBarChange = function (event) {
            this.bloodBar.value = event.data;
        };
        __egretProto__.gameOver = function () {
            this.level.removeEventListener("bloodBarChange", this.bloodBarChange, this);
            this.level.removeEventListener("gameOver", this.gameOver, this);
            this.removeChildren();
            this.dispatchEventWith("gameOver");
        };
        return GameContainer;
    })(egret.DisplayObjectContainer);
    game.GameContainer = GameContainer;
    GameContainer.prototype.__class__ = "game.GameContainer";
})(game || (game = {}));
