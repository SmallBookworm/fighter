var skin;
(function (skin) {
    var PlayButtonSkin = (function (_super) {
        __extends(PlayButtonSkin, _super);
        function PlayButtonSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.__4_i()];
            this.states = [
                new egret.gui.State("up", []),
                new egret.gui.State("down", [
                    new egret.gui.SetProperty("__4", "source", "play_down_png")
                ]),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = PlayButtonSkin.prototype;
        __egretProto__.__4_i = function () {
            var t = new egret.gui.UIAsset();
            this.__4 = t;
            this.__s(t, ["bottom", "left", "right", "source", "top"], [0, 0, 0, "play_normal_png", 0]);
            return t;
        };
        return PlayButtonSkin;
    })(egret.gui.Skin);
    skin.PlayButtonSkin = PlayButtonSkin;
    PlayButtonSkin.prototype.__class__ = "skin.PlayButtonSkin";
})(skin || (skin = {}));
//# sourceMappingURL=PlayButtonSkin.js.map