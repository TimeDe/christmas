$(function () {
   function Snowflake(elementName) {
       var snowElement = document.getElementById(elementName);
       var oGc = snowElement.getContext('2d');
       var width = config.clientWidth;
       var height = config.clientHeight;

       snowElement.width = width;
       snowElement.height = height;

       var snowNum = 50;

       var snowArrObjs = initSnow(snowNum, width, height);
       var snowArrNum = snowArrObjs.length;

       var render = function () {
           oGc.clearRect(0, 0, width, height);
           for(var i=0;i<snowArrNum;++i){
               snowArrObjs[i].render(oGc)
           }
       };

       var update = function () {
           for(var i=0;i<snowArrNum;++i){
               snowArrObjs[i].update();
           }
       };

       var renderAndUpdate = function () {
           render();
           update();
           requestAnimationFrame(renderAndUpdate);
       };

       renderAndUpdate();
   }

   function initSnow(snowNum, width, height) {
       var options = {
           'minRedius' : 3,
           'maxRedius' : 10,
           'maxX' : width,
           'maxY' : height,
           'minSpeedY' : 0.05,
           'maxSpeedY' : 2,
           'speedX' : 0.05,
           'minAlpha' : 0.5,
           'maxAlpha' : 1.0,
           'minMoveX' : 4,
           'maxMoveX' : 18
       };
       var snowArr = [];
       for(var i=0;i<snowNum;++i){
           snowArr[i] = new Snow(options);
       }
       return snowArr;
   }

   function Snow(snowSettings) {
       this.snowSettings = snowSettings;
       this.radius = randomInRange(snowSettings.minRedius, snowSettings.maxRedius);
       this.alpha = randomInRange(snowSettings.minAlpha, snowSettings.maxAlpha);

       this.initialX = Math.random() * snowSettings.maxX;

       this.speedX = snowSettings.speedX;
       this.speedY = randomInRange(snowSettings.minSpeedY, snowSettings.maxSpeedY);

       this.angle = Math.random(Math.PI * 2);

       this.x = this.initialX + Math.sin(this.angle);
       this.y = -(Math.random() * 500);

       this.moveX = randomInRange(snowSettings.minMoveX, snowSettings.maxMoveX);
   }

   function randomInRange(min, max) {
       var random = Math.random() * (max - min) + min;
       return random;
   }

   Snow.prototype.render = function (oGc) {
       oGc.beginPath();
       oGc.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')';
       oGc.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
       oGc.closePath();
       oGc.fill();
   };

   Snow.prototype.update = function () {
       this.y += this.speedY;
       if(this.y > this.snowSettings.maxY){
           this.y -= this.snowSettings.maxY;
       }

       this.angle += this.speedX;
       if(this.angle > Math.PI * 2){
           this.angle -= Math.PI * 2;
       }

       this.x = this.initialX + this.moveX * Math.sin(this.angle);
   };

   Snowflake('snowflake')
});







