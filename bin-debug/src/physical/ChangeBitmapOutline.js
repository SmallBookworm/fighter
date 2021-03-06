var physical;
(function (physical) {
    /**
     *
     * @author
     *
     */
    var GetBitmapSkeleton = (function () {
        function GetBitmapSkeleton() {
        }
        var __egretProto__ = GetBitmapSkeleton.prototype;
        //full bitmapSkeleton(图片b1有尾气，没修改)
        GetBitmapSkeleton.init = function () {
            GetBitmapSkeleton.bitmapSkeleton["f2"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("f2")));
            GetBitmapSkeleton.bitmapSkeleton["f3"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("f3")));
            GetBitmapSkeleton.bitmapSkeleton["b1"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("b1")));
            GetBitmapSkeleton.bitmapSkeleton["b2"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("b2")));
            GetBitmapSkeleton.bitmapSkeleton["bullets"] = GetBitmapSkeleton.getBitmapSkeleton(new egret.Bitmap(RES.getRes("bullets")));
        };
        GetBitmapSkeleton.hitTest = function (obj1, name1, obj2, name2) {
            var bs1 = GetBitmapSkeleton.bitmapSkeleton[name1];
            var bs2 = GetBitmapSkeleton.bitmapSkeleton[name2];
            if (obj1.y > obj2.y)
                return GetBitmapSkeleton.realTest(obj2, obj1, bs2, bs1);
            else
                return GetBitmapSkeleton.realTest(obj1, obj2, bs1, bs2);
        };
        //1在2的上方
        GetBitmapSkeleton.realTest = function (obj1, obj2, bs1, bs2) {
            var fs = (obj1.y + obj1.height - obj2.y) / 10; //obj2头和obj1尾在y轴上的距离差
            var l = Math.ceil(fs);
            var count = l;
            var h1 = bs1.length;
            var h2 = bs2.length;
            var bs2x1;
            var bs2x2;
            var bs1x1;
            var bs1x2;
            //一般情况，如头对头l；若obj2长度小于l选h2
            if (l > h2)
                count = h2;
            //不偶合
            if (l > fs) {
                bs1x1 = bs1[h1 - l]["x1"] + obj1.x;
                bs1x2 = bs1[h1 - l]["x2"] + obj1.x;
                for (var i = 0; i < count; i++) {
                    bs2x1 = bs2[i]["x1"] + obj2.x;
                    bs2x2 = bs2[i]["x2"] + obj2.x;
                    //忽略包含关系
                    if ((bs2x1 >= bs1x1 && bs2x1 <= bs1x2) || (bs2x2 >= bs1x1 && bs2x2 <= bs1x2))
                        return true;
                    if (i == count - 1)
                        return false;
                    bs1x1 = bs1[h1 - l + i + 1]["x1"] + obj1.x;
                    bs1x2 = bs1[h1 - l + i + 1]["x2"] + obj1.x;
                    if ((bs2x1 >= bs1x1 && bs2x1 <= bs1x2) || (bs2x2 >= bs1x1 && bs2x2 <= bs1x2))
                        return true;
                }
            }
            else {
                for (var i = 0; i < count; i++) {
                    bs2x1 = bs2[i]["x1"] + obj2.x;
                    bs2x2 = bs2[i]["x2"] + obj2.x;
                    bs1x1 = bs1[h1 - l + i]["x1"] + obj1.x;
                    bs1x2 = bs1[h1 - l + i]["x2"] + obj1.x;
                    if ((bs2x1 >= bs1x1 && bs2x1 <= bs1x2) || (bs2x2 >= bs1x1 && bs2x2 <= bs1x2))
                        return true;
                }
            }
            return false;
        };
        //刻画骨骼，在y轴上每隔一段距离测出图像在x轴上宽度,x1和x2都是图像内边界点 
        GetBitmapSkeleton.getBitmapSkeleton = function (bmp) {
            bmp.x = 0;
            bmp.y = 0;
            var rule = 10;
            var data = [];
            var x;
            var y = bmp.y + 10;
            var i;
            for (i = 0; y < (bmp.y + bmp.height); y += rule) {
                data[i] = [];
                x = bmp.x;
                while (1) {
                    if (bmp.hitTestPoint(x, y, true)) {
                        data[i]["x1"] = x;
                        break;
                    }
                    x++;
                }
                while (2) {
                    x++;
                    if (!bmp.hitTestPoint(x, y, true)) {
                        data[i]["x2"] = x - 1;
                        break;
                    }
                }
                i++;
            }
            //防止图像像素小于10，暂时没用到
            if (i == 0) {
                data[0] = [];
                data[0]["x1"] = bmp.x;
                data[0]["x2"] = bmp.x + bmp.width;
                i++;
            }
            //底部再加上一个
            data[i] = [];
            x = bmp.x;
            y = (bmp.y + bmp.height - i * 10) / 2;
            while (1) {
                if (bmp.hitTestPoint(x, y, true)) {
                    data[i]["x1"] = x;
                    break;
                }
                x++;
            }
            while (2) {
                x++;
                if (!bmp.hitTestPoint(x, y, true)) {
                    data[i]["x2"] = x - 1;
                    break;
                }
            }
            return data;
        };
        GetBitmapSkeleton.bitmapSkeleton = [];
        return GetBitmapSkeleton;
    })();
    physical.GetBitmapSkeleton = GetBitmapSkeleton;
    GetBitmapSkeleton.prototype.__class__ = "physical.GetBitmapSkeleton";
})(physical || (physical = {}));
//# sourceMappingURL=ChangeBitmapOutline.js.map