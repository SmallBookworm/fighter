var skin;
(function (skin) {
    var SettingButtonSkin = (function (_super) {
        __extends(SettingButtonSkin, _super);
        function SettingButtonSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.__4_i()];
            this.states = [
                new egret.gui.State("up", []),
                new egret.gui.State("down", [
                    new egret.gui.SetProperty("__4", "source", "setting_down_png")
                ]),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = SettingButtonSkin.prototype;
        __egretProto__.__4_i = function () {
            var t = new egret.gui.UIAsset();
            this.__4 = t;
            this.__s(t, ["bottom", "left", "right", "source", "top"], [0, 0, 0, "setting_normal_png", 0]);
            return t;
        };
        return SettingButtonSkin;
    })(egret.gui.Skin);
    skin.SettingButtonSkin = SettingButtonSkin;
    SettingButtonSkin.prototype.__class__ = "skin.SettingButtonSkin";
})(skin || (skin = {}));
