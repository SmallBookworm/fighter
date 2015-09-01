var game;
(function (game) {
    /**
     *
     * @author peng
     *
     */
    var Airport = (function () {
        function Airport() {
        }
        var __egretProto__ = Airport.prototype;
        //create
        Airport.produceAirplane = function () {
            var dict = Airport.cacheDict["Airplane"];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new game.Airplane(RES.getRes("f1"));
            }
            theFighter.blood = 10; //回血
            return theFighter;
        };
        Airport.produceNormalEnemyFighter = function (fireDelay) {
            var dict = Airport.cacheDict["NormalEnemyFighter"];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new game.fighter.NormalEnemyFighter(RES.getRes("f2"), fireDelay);
            }
            theFighter.blood = 10; //回血
            return theFighter;
        };
        Airport.produceMyFighter = function (fireDelay) {
            var dict = Airport.cacheDict["MyFighter"];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new game.fighter.MyFighter(RES.getRes("f1"), fireDelay);
            }
            theFighter.blood = 10; //回血
            return theFighter;
        };
        Airport.reclaim = function (theFighter) {
            // if(Airplane.cacheDict[textureName]==null){
            //     Airplane.cacheDict[textureName] = [];}
            var kindName = theFighter.getKindName();
            var dict = Airport.cacheDict[kindName];
            //  if(dict.indexOf(theFighter) == -1)
            dict.push(theFighter);
        };
        Airport.speed = 1;
        //对象池
        Airport.cacheDict = {
            "Airplane": new Array(),
            "NormalEnemyFighter": new Array(),
            "MyFighter": new Array()
        };
        return Airport;
    })();
    game.Airport = Airport;
    Airport.prototype.__class__ = "game.Airport";
})(game || (game = {}));
//# sourceMappingURL=Airport.js.map