var panel;
(function (panel) {
    /**
     *
     * @author
     *
     */
    var BulletsCountIcon = (function (_super) {
        __extends(BulletsCountIcon, _super);
        function BulletsCountIcon() {
            _super.call(this);
            this.skinName = skin.bulletsCountIconSkin;
        }
        var __egretProto__ = BulletsCountIcon.prototype;
        __egretProto__.setNumber = function (number) {
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return BulletsCountIcon;
    })(egret.gui.SkinnableComponent);
    panel.BulletsCountIcon = BulletsCountIcon;
    BulletsCountIcon.prototype.__class__ = "panel.BulletsCountIcon";
})(panel || (panel = {}));
//# sourceMappingURL=BulletsCountIcon.js.map