/**
 * @author DGL
 * Vector2 is a two dimension object to discribe movement of an object
 */
Vector2 = function() { this.x = 0; this.y = 0; };

Vector2.prototype = {
    length : function() { return Math.sqrt(this.x * this.x + this.y * this.y); },
    sqrLength : function() { return this.x * this.x + this.y * this.y; },
    normalize : function() { var inv = 1/this.length(); this.x *= inv; this.y *= inv; },
    normalizePara : function(length) { var inv = Math.sqrt(this.x*this.x+this.y*this.y)/length; if(inv != 0 ) {this.x /= inv; this.y /= inv;} },
    negate : function() { this.x = -this.x; this.y = -this.y; },
    scale: function(scale) { this.x *= scale; this.y *= scale; return this},
    setVect : function(v) { this.x = v.x; this.y = v.y; },
    set : function(x,y) {this.x = x; this.y = y; },
    add : function(v) { this.x += v.x; this.y += v.y; },
	sub : function(v) { this.x -= v.x; this.y -= v.y; },
    multiply : function(f) { this.x *= f, this.y *= f; },
    rotateLeft : function() { var tmpx = this.x ; var tmpy = this.y ; this.x = 0.707*tmpx + 0.707*tmpy ; this.y = 0.707*tmpx - 0.707*tmpy ;},
    rotateRight : function() { var tmpx = this.x ; var tmpy = this.y ; this.x = 0.707*tmpx - 0.707*tmpy ; this.y = 0.707*tmpx + 0.707*tmpy ;},
    returnX : function() {return this.x; },
    returnY : function() {return this.y; }, 
    divide : function(f) { var invf = 1/f; this.x *= invf; this.y *= invf; },
    dot : function(v) { return this.x * v.x + this.y * v.y; },
    toString: function() { var output="[ "+this.x+", "+this.y+" ]"; return output;},
    dist: function(v) { var tx = v.x - this.x ; var ty = v.y - this.y ; return Math.sqrt(tx * tx + ty * ty)  }
};


Box = function(){
	this.center = new Vector2();
	this.extents = new Vector2();
	this.isCircle = 0;
	this.radius = 0;
};

Box.prototype = {
	set: function(center,extents,isCircle,radius) { this.center = center; this.extents = extents; this.isCircle = isCircle; this.radius = radius;},
	setBox: function(b) {this.center = b.center; this.extents = b.extents;this.isCircle = b.isCircle; this.radius = b.radius;},
	setCircle: function(isCircle,radius){this.isCircle = isCircle; this.radius = radius; },
	intersects: function(box) {
		
		if(this.isCircle == 0 && box.isCircle == 0){
			var retVar = false;
			tmpVect = new Vector2();
			tmpVect.setVect(box.center);
			tmpVect.sub(this.center);
			retVar = ( Math.abs( tmpVect.x ) <= ( this.extents.x + box.extents.x ) )
				&& ( Math.abs( tmpVect.y ) <= ( this.extents.y + box.extents.y ) );
			return retVar;
		}
		
		if(this.isCircle == 1 && box.isCircle == 1){
			var retVar = false;
			tmpVect = new Vector2();
			tmpVect.setVect(box.center);
			tmpVect.sub(this.center);
			retVar = tmpVect.length() < (box,radius + this.radius) ; 
			return retVar;
		}
		
		if(this.isCircle == 1 && box.isCircle == 0){
			
			tmpVect = new Vector2();
			tmpVect.setVect(box.center);
			tmpVect.add(box.extents);
			tmpVect.sub(this.center);
			
			if ( tmpVect.length() < this.radius ) return true;
			
			tmpVect.setVect(box.center);
			tmpVect.sub(box.extents);
			tmpVect.sub(this.center);
			
			if ( tmpVect.length() < this.radius ) return true;
			
			tmpVect.setVect(box.center);
			tmpVect.x += box.extents.x;
			tmpVect.y -= box.extents.y;
			tmpVect.sub(this.center);

			if ( tmpVect.length() < this.radius ) return true;

			tmpVect.setVect(box.center);
			tmpVect.x += box.extents.x;
			tmpVect.y -= box.extents.y;
			tmpVect.sub(this.center);

			
			if ( tmpVect.length() < this.radius ) return true;
			
			return false;
			 
			
		}
		
		if(this.isCircle == 0 && box.isCircle == 1){
			
			tmpVect = new Vector2();
			tmpVect.setVect(this.center);
			tmpVect.add(this.extents);
			tmpVect.sub(box.center);
			
			if ( tmpVect.length() < box.radius ) return true;
			
			tmpVect.setVect(this.center);
			tmpVect.sub(this.extents);
			tmpVect.sub(box.center);
			
			if ( tmpVect.length() < box.radius ) return true;
			
			tmpVect.setVect(this.center);
			tmpVect.x += this.extents.x;
			tmpVect.y -= this.extents.y;
			tmpVect.sub(box.center);

			if ( tmpVect.length() < box.radius ) return true;

			tmpVect.setVect(this.center);
			tmpVect.x += this.extents.x;
			tmpVect.y -= this.extents.y;
			tmpVect.sub(box.center);

			
			if ( tmpVect.length() < box.radius ) return true;
			
			return false;
			 
		}
		
		
		
		
		
	},
	contains: function(point){
		var retVar = false;

		tmpVect = new Vector2();
		tmpVect.setVect(point);
		tmpVect.sub(this.center);
		tmpVect.x = Math.abs( tmpVect.x );
		tmpVect.y = Math.abs( tmpVect.y );
		if( tmpVect.x < this.extents.x && tmpVect.y < this.extents.y ) {
			retVar = true;
		}
		return retVar;
	},
	
	containsLink: function(point){
		var retVar = false;

		tmpVect = new Vector2();
		tmpVect.setVect(point);
		shift = new Vector2();
		shift.set(0,this.extents.y-10);
		shift.add(this.center);
		tmpVect.sub(shift);
		tmpVect.x = Math.abs( tmpVect.x );
		tmpVect.y = Math.abs( tmpVect.y );
		if( tmpVect.x < this.extents.x && tmpVect.y < 15 ) {
			retVar = true;
		}
		return retVar;		
		
		
	},
	
	toString: function(){
		var output = "box[ Center" + this.center.toString() + ", Extents" + this.extents.toString() + " ]";
		return output;
	}
	
};

Color = function(r,g,b){
	this.red = r;
	this.green = g;
	this.blue = b;
	this.alpha = 1.0;
};

Color.prototype = {
		toString: function(){
			var output = 'rgba(' + parseInt(this.red) + ',' + parseInt(this.green) + ',' + parseInt(this.blue) + ',' + this.alpha + ')';
			return output;
			},
		set: function(r,g,b){this.red = r; this.green = g; this.blue = b;},
		darker: function(){return new Color(parseInt(this.red / 3), parseInt(this.green / 3),parseInt(this.blue / 3)); },
		brighter: function(){return new Color(parseInt((255 - this.red) * 2 / 3 + this.red), parseInt((255 - this.green) * 2 / 3 + this.green), parseInt((255 - this.blue) * 2 / 3 + this.blue)); }
};