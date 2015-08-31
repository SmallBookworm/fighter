module level {
	/**
	 *
	 * @author 
	 *
	 */
	export class Time extends egret.DisplayObjectContainer{
		public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage():void{
		    this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
	}
}
