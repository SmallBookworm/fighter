var skin;
(function (skin) {
    var bulletsCountIconSkin = (function (_super) {
        __extends(bulletsCountIconSkin, _super);
        function bulletsCountIconSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.width = 129;
            this.elementsContent = [this.__3_i(), this.number_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = bulletsCountIconSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return bulletsCountIconSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.number_i = function () {
            var t = new egret.gui.EditableText();
            this.number = t;
            this.__s(t, ["bottom", "left", "right", "text", "textColor", "top"], [0, 0, 0, " x100", 0x000000, 0]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["bottom", "source", "top"], [0, "bullet_png", 0]);
            return t;
        };
        bulletsCountIconSkin._skinParts = ["number"];
        return bulletsCountIconSkin;
    })(egret.gui.Skin);
    skin.bulletsCountIconSkin = bulletsCountIconSkin;
    bulletsCountIconSkin.prototype.__class__ = "skin.bulletsCountIconSkin";
})(skin || (skin = {}));
//# sourceMappingURL=bulletsCountIconSkin.js.map