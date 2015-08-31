var panel;
(function (panel) {
    /**
     *
     * @author Peng
     * 8/22
     *
     */
    var StartScreen = (function (_super) {
        __extends(StartScreen, _super);
        function StartScreen() {
            _super.call(this);
            this.skinName = skin.StartScreenSkin;
        }
        var __egretProto__ = StartScreen.prototype;
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return StartScreen;
    })(egret.gui.SkinnableComponent);
    panel.StartScreen = StartScreen;
    StartScreen.prototype.__class__ = "panel.StartScreen";
})(panel || (panel = {}));
