
var w = [], // ripple storage (global scope)
	gTr = [], // track 'g' wave functions (first)
	c, // ripple count (to track)
	rH = 1, // reference height percentile 
	mX = window.innerHeight * rH, // ripple max diameter (for potential(s))
	sMn = .25, // min speed (waves) - px. / ms.
	sMx = .4, // max speed (waves)  / default
	bF = [.05, .175], // buffer zone (min, max)
	rF = [.5175, .55], // release zone (min, max)
	wP = { // parameters
		cW : { // capillary wave
			w : .03 * mX, // wavelength
			p : function(A) { // potential (final - origin relative)
				return (mX + (2 * this.w)) + (A * 2 * this.w)
			},
			dM : function(A) { // get dimensions (initial standby)
				return A * 2 * this.w // 2x wavelength from diameter
			},
			oF : function(A) { // offset to centralise (initial)
				return A * this.w
			}, 
			s : sMx, // speed (px / ms.) 
			n : null, // qty. (to be set as per user click)
			o : 0, // opacity
			z_N : -1, // modifier (consecutive z-Idx increase/decrease)
			zD_ : 0 // activator 
		},
		gW : { // gravity
			w : .3 * mX,
			p : mX,
			s : sMx,
			n : 2,
			o : 100,
			z_N : 1,
			zD_ : 1,
			mZ : function(z_L, z_U) { // find gradient (with zone upper and zone lower)
				var m = (z_U - z_L) / (sMn - sMx)
				return m;
			},
			cZ : function(z_L, z_U) { // "" y-intercept
				var c = z_U - (this.mZ(z_L, z_U) * sMn) // reverse linear equation
				return c;
			},
			bZ : function() { // buffer zone max (derive linear relationship)
				var y = (this.mZ(bF[0], bF[1]) * this.s) + this.cZ(bF[0], bF[1]) // linear relationship btwn. zone and spd
				return y;
			},
			rZ : function() { // release zone max (same as above)
				var y = (this.mZ(rF[1], rF[0]) * this.s) + this.cZ(rF[1], rF[0]); 
				return y;
			}
		}
	},
	d = function(x, y, w, h, x_f, y_f, o_p, _L, _a, A) {  // ripple (wave) HTML/CSS proto (definition)
		var z = document.createElement("DIV"),
			p = _a === "cW" ? "width, height, transform" : "width, height, opacity, transform",
			t = _a === "cW" ? (wP[_a].p(A) - wP[_a].dM(A + 1)) / wP[_a].s : wP[_a].p / wP[_a].s; // trans. time (ms.) : t = d [p - dM] / s

		tD = t; // time to global ref.
		z.classList.add("rpSpcs");
		z.style.width = w + "px";
		z.style.height = h + "px";
		z.style.backgroundColor = co_L(169, _a, A);
		z.style.opacity = o_p; 
		z.style.zIndex = _L;
		z.style.transitionProperty = p;
		z.style.transitionDuration = (t / 1000) + "s"; // convert to s.
		z.style.transform = "translate(" + (x - x_f) + "px, " + (y - y_f) + "px)"; // offset applied 

		return z; 
	};

function co_L(n, _a, A) { // color gradient picker	- cW waves
	if (_a === "cW") { // colors gradient from base to 255 (white) - rgb reference
		var dF = 255 - n,  
			b = (dF / ((wP["cW"].n) + 1)), // interval (even colour distributor)
			m = n + b + (b * A);
		return "rgb(" + m + "," + m + "," + m + ")"; // variabling schemes
	} else {
		return "rgb(" + n + "," + n + "," + n + ")"; // n to default as gW color base
	}
}