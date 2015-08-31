var physical;
(function (physical) {
    /**
     *
     * @author
     *
     */
    var GameUtil = (function () {
        function GameUtil() {
        }
        var __egretProto__ = GameUtil.prototype;
        GameUtil.hitTest = function (obj1, obj2) {
            //形状
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            //位置
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        };
        return GameUtil;
    })();
    physical.GameUtil = GameUtil;
    GameUtil.prototype.__class__ = "physical.GameUtil";
})(physical || (physical = {}));
