module panel {
	/**
	 *
	 * @author Peng
	 * 8/22
	 *
	 */
    
    export class StartScreen extends egret.gui.SkinnableComponent {
        
        public constructor() {
            super();
            this.skinName = skin.StartScreenSkin;
        }
        
       
        
        public playButton:egret.gui.Button;
        public settingButton:egret.gui.Button;
        public levelButton:egret.gui.Button;
        
        
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
        }
    }
    
}
