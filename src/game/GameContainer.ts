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
		    this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.createGameScene();
		}
		
        private level: egret.DisplayObjectContainer;
        private bloodBar: egret.gui.ProgressBar;
        
        
		private createGameScene():void{
            //加血条
            this.bloodBar = new egret.gui.ProgressBar;
            this.bloodBar.skinName = skin.bloodProgressBarSkin;
            this.bloodBar.value = 100;
            this.addChild(this.bloodBar);
            //set level
            this.level = new level.Number();
            this.addChildAt(this.level,0);
            this.level.addEventListener("bloodBarChange",this.bloodBarChange,this);
            this.level.addEventListener("gameStop",this.gameStop,this);
		}
		
		private bloodBarChange(event:egret.Event):void{
            this.bloodBar.value = event.data;
		}
		
		private gameStop():void{
            this.level.removeEventListener("bloodBarChange",this.bloodBarChange,this);
            this.level.removeEventListener("gameStop",this.gameStop,this);
            this.removeChildren();
            this.dispatchEventWith("gameStop");
		}
	}
}
