module game {
	/**
	 *主游戏容器
	 * @author peng
	 *
	 */
	export class GameContainer extends egret.DisplayObjectContainer{
		public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		
		private onAddToStage(event:egret.Event){
            this.createGameScene();
		}
		
        private level: level.Level;
        private bloodBar: egret.gui.ProgressBar;
        private curtain: egret.Shape;
        private levelText: egret.TextField;
        private levelName: egret.TextField;
        private icon: egret.Bitmap;
        private bulletsCountIcon: egret.Bitmap;
        private bulletsCount: egret.TextField;
		private createGameScene():void{
    		//放幕布 设置字体
            this.curtain = new egret.Shape();
            this.curtain.graphics.beginFill(0xffffff);
            this.curtain.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
            this.curtain.graphics.endFill();
            this.addChild(this.curtain);
            this.levelText = new egret.TextField();
            this.levelText.text = "level 1";
            this.levelText.textColor = 0xffffff;
            this.levelText.strokeColor = 0x000000;
            this.levelText.stroke = 3;
            this.levelText.size = 40;
            this.levelText.y = this.stage.stageHeight / 3-30;
            this.levelText.x = -280;
            this.addChild(this.levelText);
            this.levelName = new egret.TextField();
            this.levelName.text = "无尽的时间";
            this.levelName.textColor = 0xffffff;
            this.levelName.strokeColor = 0x000000;
            this.levelName.stroke = 3;
            this.levelName.size = 40;
            this.levelName.y = this.stage.stageHeight / 3+10;
            this.levelName.x = -280;
            this.addChild(this.levelName);
            this.icon = new egret.Bitmap(RES.getRes("level"));
            this.icon.scaleX = 0.7;
            this.icon.scaleY = 0.7;
            this.icon.y = this.stage.stageHeight / 3+100;
            this.icon.x = -400;
            this.addChild(this.icon);
            //加血条
            this.bloodBar = new egret.gui.ProgressBar();
            this.bloodBar.skinName = skin.bloodProgressBarSkin;
            this.bloodBar.value = 100;
            this.addChildAt(this.bloodBar,0);
            //显示子弹数量
            this.bulletsCount = new egret.TextField();
            this.bulletsCount.textColor = 0x000000;
            this.bulletsCount.text = "x100";
            this.bulletsCount.x = this.stage.stageWidth - this.bulletsCount.width-30;
            this.addChildAt(this.bulletsCount,0);
            this.bulletsCountIcon = new egret.Bitmap(RES.getRes("bullet_png"));
            this.bulletsCountIcon.x = this.bulletsCount.x-this.bulletsCountIcon.width-2;
            this.addChildAt(this.bulletsCountIcon,0);
            this.bulletsCount.y = (this.bulletsCountIcon.height - this.bulletsCount.height) / 2;
            //set level_1
            this.level = new level.Number();
            this.addChildAt(this.level,0);
            this.level.addEventListener("bloodBarChange",this.bloodBarChange,this);
            this.level.addEventListener("gameOver",this.gameOver,this);
            this.level.addEventListener("bulletsCountChange",this.bulletsCountChange,this);
            //full bitmapskeleton
            physical.GetBitmapSkeleton.init();
            //touch to start 
            this.touchEnabled = true;
            this.touchCount = 0;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touch,this);
		}
        private touchCount: number;
		private touch():void{
		    switch(this.touchCount){
                case 0: egret.Tween.get(this.levelText).to({ x: 135 },500,egret.Ease.cubicIn); break;
                case 1: egret.Tween.get(this.levelName).to({ x: 135 },500,egret.Ease.cubicIn); break;
                case 2: egret.Tween.get(this.icon).to({ x: 240-this.icon.width*0.35 },500,egret.Ease.cubicIn); break;
                case 3: this.gameStart(); break;
		    }
            this.touchCount++;
		}
		
		private gameStart():void{
            this.touchEnabled = false;
		    this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touch,this);
            this.removeChildAt(4);
            this.removeChildAt(4);
            this.removeChildAt(4);
            this.removeChildAt(4);
            this.level.gameStart();
		}
		
		private bloodBarChange(event:egret.Event):void{
            this.bloodBar.value = event.data;
		}
		
		private bulletsCountChange(evt:egret.Event):void{
            this.bulletsCount.text = "x" + evt.data;
		}
        private gameOver(evt: egret.Event): void {
            this.level.removeEventListener("bloodBarChange",this.bloodBarChange,this);
            this.level.removeEventListener("gameOver",this.gameOver,this);
            this.level.removeEventListener("bulletsCountChange",this.bulletsCountChange,this);
            this.removeChildren();
            this.addChild(this.curtain);
            var obj;
            egret_4399_h5api.submitScore(evt.data,function() { },this);
            egret_4399_h5api.getRank(function(obj) {
                if(obj.code == 10000) {
                    var data = obj.data;
                    for(var i = 0;i < data.length;i++) {
                        this.levelText.text += ("积分:" + data[i].score + ",排名:" + data[i].rank);
                }
            } else{
                console.log("获取失败");
            }},this); 
            this.levelText.text = "积分:";
            this.levelText.x = 135;
            this.addChild(this.levelText);
            this.levelName.x = 225;
            this.addChild(this.levelName);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.score,this);
		}
		private score():void{
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.score,this);
            this.removeChildren();
            this.dispatchEventWith("gameOver");
		}
	}
}
