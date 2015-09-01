var skin;
(function (skin) {
    var bloodProgressBarSkin = (function (_super) {
        __extends(bloodProgressBarSkin, _super);
        function bloodProgressBarSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [21, 298]);
            this.elementsContent = [this.track_i(), this.thumb_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = bloodProgressBarSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return bloodProgressBarSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__3_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["bottom", "left", "right", "scale9Grid", "source", "top", "verticalCenter", "percentWidth"], [5, 1, 3, egret.gui.getScale9Grid("7,5,552,6"), "yl02_png", 5, 0, 100]);
            return t;
        };
        __egretProto__.thumb_i = function () {
            var t = new egret.gui.Group();
            this.thumb = t;
            this.__s(t, ["percentHeight", "width"], [100, 269]);
            t.elementsContent = [this.__3_i()];
            return t;
        };
        __egretProto__.track_i = function () {
            var t = new egret.gui.UIAsset();
            this.track = t;
            this.__s(t, ["bottom", "percentHeight", "left", "right", "scale9Grid", "source", "top"], [0, 100, 0, 0, egret.gui.getScale9Grid("11,11,567,7"), "yl0_png", 0]);
            return t;
        };
        bloodProgressBarSkin._skinParts = ["track", "thumb"];
        return bloodProgressBarSkin;
    })(egret.gui.Skin);
    skin.bloodProgressBarSkin = bloodProgressBarSkin;
    bloodProgressBarSkin.prototype.__class__ = "skin.bloodProgressBarSkin";
})(skin || (skin = {}));
//# sourceMappingURL=bloodProgressBarSkin.js.map