module game.fighter {
	/**
	 *
	 * @author 
	 *
	 */
	export class MyFighter extends Airplane implements Fighter{
    	private static kindName: string = "MyFighter";
    	//创建子弹的时间间隔
    	private fireDelay: number;
    	//定时shooting
    	private fireTimer: egret.Timer;
    	                 
    	public constructor(texture:egret.Texture,fireDelay:number,blood?:number) {
        	super(texture,blood);
        	this.fireDelay = fireDelay;
        	this.fireTimer = new egret.Timer(fireDelay);
        	this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
    	}
    	public fire(): void{
        	this.fireTimer.start();
    	}
    	                 
    	public stopFire(): void{
        	this.fireTimer.stop();
    	}
    	        
    	public static bullets: Bullet[] = [];
    	private createBullet(event:egret.TimerEvent):void{
        	var theBullet: Bullet = Bullet.produce("b1");
        	theBullet.x = this.x + this.width / 2;
        	theBullet.y = this.y + this.height;
        	Airport.address.addChild(theBullet);
            MyFighter.bullets.push(theBullet);
    	}
    	        
    	public static moveBullets():void{
        	var bullet: Bullet;
        	var bulletsCount: number = MyFighter.bullets.length;
        	for(var i: number = 0;i < bulletsCount;i++){
            	bullet = MyFighter.bullets[i];
            	if(bullet.y < -bullet.height){
                	Airport.address.removeChild(bullet);
                	Bullet.reclaim(bullet);
                    MyFighter.bullets.splice(i,1);
                	i--;
                	bulletsCount--;
            	} 
                bullet.y -= 12*Airport.speed;
        	}
    	}
    	        
    	public getKindName():string{
        	return MyFighter.kindName;
    	}
	}
	}
	