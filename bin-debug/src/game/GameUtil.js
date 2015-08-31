var game;
(function (game) {
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
    game.GameUtil = GameUtil;
    GameUtil.prototype.__class__ = "game.GameUtil";
})(game || (game = {}));
//# sourceMappingURL=GameUtil.js.map