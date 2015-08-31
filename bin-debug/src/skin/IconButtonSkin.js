var skin;
(function (skin) {
    var IconButtonSkin = (function (_super) {
        __extends(IconButtonSkin, _super);
        function IconButtonSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["minWidth", "width"], [300, 300]);
            this.elementsContent = [this.__4_i(), this.labelDisplay_i(), this.icon_i()];
            this.states = [
                new egret.gui.State("up", [
                    new egret.gui.SetProperty("icon", "x", 30),
                    new egret.gui.SetProperty("icon", "y", 9)
                ]),
                new egret.gui.State("down", [
                    new egret.gui.SetProperty("__4", "source", "icon_down_png"),
                    new egret.gui.SetProperty("__4", "scale9Grid", egret.gui.getScale9Grid("106,32,22,25")),
                    new egret.gui.SetProperty("__4", "left", 0),
                    new egret.gui.SetProperty("__4", "right", 0),
                    new egret.gui.SetProperty("__4", "top", 0),
                    new egret.gui.SetProperty("__4", "bottom", 0),
                    new egret.gui.SetProperty("icon", "x", 30),
                    new egret.gui.SetProperty("icon", "y", 11)
                ]),
                new egret.gui.State("disabled", [
                    new egret.gui.SetProperty("icon", "x", 30),
                    new egret.gui.SetProperty("icon", "y", 9)
                ])
            ];
        }
        var __egretProto__ = IconButtonSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return IconButtonSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.icon_i = function () {
            var t = new egret.gui.UIAsset();
            this.icon = t;
            this.__s(t, ["source", "x", "y"], ["level_easy_png", 30, 9]);
            return t;
        };
        __egretProto__.labelDisplay_i = function () {
            var t = new egret.gui.Label();
            this.labelDisplay = t;
            this.__s(t, ["text", "verticalCenter", "x"], ["Normal", 0, 133]);
            return t;
        };
        __egretProto__.__4_i = function () {
            var t = new egret.gui.UIAsset();
            this.__4 = t;
            this.__s(t, ["bottom", "left", "right", "scale9Grid", "source", "top"], [1, 0, 0, egret.gui.getScale9Grid("107,34,20,22"), "icon_normal_png", -1]);
            return t;
        };
        IconButtonSkin._skinParts = ["labelDisplay", "icon"];
        return IconButtonSkin;
    })(egret.gui.Skin);
    skin.IconButtonSkin = IconButtonSkin;
    IconButtonSkin.prototype.__class__ = "skin.IconButtonSkin";
})(skin || (skin = {}));
