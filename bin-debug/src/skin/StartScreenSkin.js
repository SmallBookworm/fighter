var skin;
(function (skin) {
    var StartScreenSkin = (function (_super) {
        __extends(StartScreenSkin, _super);
        function StartScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [800, 480]);
            this.elementsContent = [this.__3_i(), this.levelButton_i(), this.playButton_i(), this.settingButton_i(), this.__4_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = StartScreenSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return StartScreenSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__4_i = function () {
            var t = new egret.gui.Label();
            this.__s(t, ["bold", "bottom", "fontFamily", "horizontalCenter", "text", "textColor"], [true, 24, "Arial", 0, "Powered By Egret Engine", 4860458]);
            return t;
        };
        __egretProto__.levelButton_i = function () {
            var t = new egret.gui.Button();
            this.levelButton = t;
            this.__s(t, ["horizontalCenter", "icon", "label", "skinName", "width", "y"], [58, "level_easy_png", "Easy", skin.IconButtonSkin, 342, 398]);
            return t;
        };
        __egretProto__.playButton_i = function () {
            var t = new egret.gui.Button();
            this.playButton = t;
            this.__s(t, ["horizontalCenter", "label", "skinName", "y"], [-13.5, "按钮", skin.PlayButtonSkin, 204]);
            return t;
        };
        __egretProto__.settingButton_i = function () {
            var t = new egret.gui.Button();
            this.settingButton = t;
            this.__s(t, ["label", "skinName", "x", "y"], ["按钮", skin.SettingButtonSkin, 19, 398]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["bottom", "left", "right", "source", "top"], [0, 0, 0, "backtround2_png", 0]);
            return t;
        };
        StartScreenSkin._skinParts = ["levelButton", "playButton", "settingButton"];
        return StartScreenSkin;
    })(egret.gui.Skin);
    skin.StartScreenSkin = StartScreenSkin;
    StartScreenSkin.prototype.__class__ = "skin.StartScreenSkin";
})(skin || (skin = {}));
