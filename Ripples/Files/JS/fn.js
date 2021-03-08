
// functions
var g = [], // gWaves (indexes)
    pM = [], // percentile markers array (see buffer and release zones)
    tD = 0, // transition Duration (for global ref. - always updating)
    cWp, // cW opacity control
    pCv = { // parabolic curve (cW opacity)
        a : 0, // "y = a(x-h)^2 + k" parameters
        h : 0,
        k : 0,
        xIn : 0 // x-intercept (smaller)
    };

function rE_d(x, y, _a, c) {
    var _cI = w[c].length, // get current index in ripple array (count)
        _Fi = (_cI + wP[_a].n) - 1, // expected final index of array (in current wave type formation) - for looping end
        _L = wP["cW"].n, 
        _fL = wP["cW"].n + wP["gW"].n,
        s = _a !== "cW" ? 0 : 1, // 0 or 1 binary activation btwn. varied/normal wave types
        _Lb = 5, // layering base value (z-index intervals)
        aR = wP["gW"].rZ() - wP["gW"].bZ(), // diff. btwn. release zone max and buffer zone max
        pMr = aR / (_L - 1); // percentile-marker interval

    pM[c] = []; // define array value type

    for (i = _cI, j = 1; i <= _Fi; i++, j++) { // iterate 2 variables 
        var m = _a === "cW" ? wP[_a].dM(j) : 0, // dimensions (for capillary)
            f = _a === "cW" ? wP[_a].oF(j) : 0, // offset ""
            jM = j - 1, 
            z = (_Lb * _L) + (wP[_a].z_N * (jM * _Lb)) + (_Lb * wP[_a].zD_); // get z-index  

        w[c][i] = d(x, y, m, m, f, f, wP[_a].o, z, _a, jM); // define wave proto
        document.body.appendChild(w[c][i]); // add to HTML body
    }
    if (s) {
        rE_d(x, y, "gW", c); // define next wave type
    } else {
        for (i = 0; i <= (_L - 1); i++) {
            pM[c][i] = wP["gW"].bZ() + (pMr * i); // set intervals to array (define intervals)
        }
        cWp = function(u, i) { // define function definition using intervals (as parameters)
            pCv.k = (wP["gW"].rZ() + wP["gW"].bZ()) / Math.pow(2, i + 1); // middle point btwn. buffer and release zones (divisor halves itself as cW waves pass on)            
            pCv.h = (wP["cW"].p(i) - pCv.xIn) / 2; // vertex x-coord (half of 2 x-in values) ((x1 - x2) / 2)
            pCv.a = (0 - pCv.k) / Math.pow((pCv.xIn - pCv.h), 2); // 'a' coefficient
            if (u >= pCv.xIn) { // implement opacity after respective interval (per cW wave)
                y = pCv.a * Math.pow((u - pCv.h), 2) + pCv.k; // y = a(x-h)^2 + k - parabolic function
            }  else {
                y = 0;
            }
            return y;
        }; 
        e_Arr(w[c], _L, c); // modify array 
        gTr[c] = setInterval(function() { // live track dimensions of first g-wave
            fG_tr(c)
        }, 1);  
        rE_r(x, y, c); // radiate gW waves 
        rE_c(x, y, c); // "" cW waves

        setTimeout(function() { // remove waves after use
            for (i = 0; i <= (_fL - 1); i++) {
                w[c][i].classList.add("noVis"); // notify 'no visibility' status to each wave in ripple
            }
            setTimeout(function() {  // delete each wave that has noVis class
                for (i = 0; i <= (_fL - 1); i++) {
                    if (w[c][i].classList.contains("noVis")) {
                        w[c][i].remove(); // remove wave element (HTML)
                    }
                }
            }, tD * .5); // delay time
        }, tD * 1.5); // after ripple transitionDuration time + processing delay time
    }
}

function fG_tr(c) { // track height (for cW opacity)
    var f_gB = w[c][0].getBoundingClientRect(), // bounding properties of gW wave el.
        u = f_gB.height,
        _H = wP["gW"].p,
        _L = wP["cW"].n;
    if (u < _H) { // loop control till first gW radiation (complete)
        for (i = 0; i <= (_L - 1); i++) {
            pCv.xIn = pM[c][i] * wP["gW"].p;
            w[c][i + 1].style.opacity = cWp(u, i); 
        }
    } else {
        clearInterval(gTr[c]);
    }
}

function rE_c(x, y, c) { // radiate cW waves
    var k = 1;
    setTimeout(function() {
        cW_r(x, y, c, k);
    }, 10);
}

function cW_r(x, y, c, k) { // radiate cW waves
    var e = wP["cW"].p(k - 1),
        eF = e / 2;
    w[c][k].style.width = e + "px";
    w[c][k].style.height = e + "px";
    w[c][k].style.transform = "translate(" + (x - eF) + "px, " + (y - eF) + "px)"; 
    k++;
    if (k <= wP["cW"].n) { // continue next
        setTimeout(function() {
            cW_r(x, y, c, k);
        }, 10);
    }
}

function rE_r(x, y, c) { // radiate gW waves
    var e = wP["gW"].p,
        eF = e / 2;
        k = 0;

    setTimeout(function() {
        gW_r(x, y, e, eF, k, c);
    }, 10); // short delay to space the process out
}

function gW_r(x, y, e, eF, k, c) {
    w[c][g[k]].style.width = e + "px";
    w[c][g[k]].style.height = e + "px";
    w[c][g[k]].style.transform = "translate(" + (x - eF) + "px, " + (y - eF) + "px)"; 
    w[c][g[k]].style.opacity = 0; // fade out / disperse
    k++;
    if (k <= g.length - 1) { // continue next
        setTimeout(function() {
            gW_r(x, y, e, eF, k, c);
        }, wP["gW"].w / wP["gW"].s); // maintain wavelength
    }
}

function e_Arr(arr, n, c) { // edit array (bring 1st 'g' wave to front)
    var u = arr,
        y = u.splice(n, 1); // take out (remove) 'g' wave - return as array
    u.unshift(y[0]); // add to beginning of original array

    g[0] = 0; // get indexes of gWaves
    for (k = 1, i = u.length - 1, j = (wP["gW"].n) - 1; j > 0; k++, j--) {
        g[k] = (i - j) + 1; // last (n - 1) index el. from w[c] added here
    } 
}

