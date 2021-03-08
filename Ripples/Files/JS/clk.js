
// mouse click settings

var t_i = 0, // time init.
    t_f = 0, // time final
    t_d = 0, // "" difference
    cBv = [], // calibrate value(s)
    cBa = 0, // calibrate val. average
    mC = false, // mousedown check
    pB = {
        w : document.getElementById("pBw"), // percentile bar (whole)
        d : mX * .2 // 20% width
    },
    pBi = document.getElementById("pBi"), // "" (part)
    cb = document.getElementById("cb"),
    pL_ = document.getElementsByClassName("pp").length, // no. of test apparatuses
    dT; // date/time (live)


function tL() { // live time
    dT = new Date();
    var t_L = dT.getTime(), _D;
    if (mC) {
        _D = (t_L - t_i) / 1000; // live time diff. with initial time
        pB_i(_D);
    }
}

function pB_i(_D) { // get percentile (visual output)
    var pT = 2 // time for full percentile (sec.)
        a = _D / (cBa + pT) <= 1 ? _D / (cBa + pT) : 1, // percentile
        rS = sMx - (a * (sMx - sMn)), // relative (new) wave speeds
        b = a * 100;
    pB.w.style.display = "block"; // become visible on mouse down and hold
    pBi.style.width = b + "%";

    wP["cW"].s = rS; // change relative wave speeds
    wP["gW"].s = rS;
}

function cB(el) { // calibrate
    if (el.classList.contains("cK") === false) { // if not clicked
        el.classList.add("cK"); // add class to checked clicked
        el.style.cursor = "default";
        cBv[cBv.length] = t_d; // to array
        el.style.backgroundColor = "#006400";
        if (cBv.length === pL_) { // after test check
            var _L = pL_ - 1;
            for (i = 0; i <= _L; i++) { // average values out
                cBa += cBv[i];
                if (i === _L) {
                    cBa = cBa / pL_;
                }
            }
            setTimeout(function() { // proceed
                cb.style.display = "none";
                setTimeout(function() {
                    pB.w.style.width = pB.d + "px"; // percentile bar width
                    pB.w.style.height = (pB.d * .04) + "px"; // "" height
                    document.body.addEventListener("mouseup", function(event) { // start new ripple effect
                        wP["cW"].n = qTy(mX, wP["cW"].s); // set appropriate wave qty.
                        c = w.length === 0 ? 0 : c; // set count to 0 if no executed ripples for a while
                        w[c] = []; // multi-dim array - track indiv. wave count - set array up
                        rE_d(event.clientX, event.clientY, "cW", c); // define waves - start effect
                        c++; // increment ripple count
                    });
                    setInterval(tL, 1000/60); // start live timing
                    cBv = []; // empty array
                }, 10);
            }, 500); // delays to avoid click activation
        } 
    }
}

function mD(x, y) { // mouse down 
    if (cBa) { // if click calibrated
        t_i = dT.getTime();
        mC = true;
        pB.w.style.transform = "translate(" + (x - (pB.d / 2)) + "px, " + (y - 20) + "px)"; // at cursor
        wP["cW"].s = sMx; // reset speed(s) back to original max (unextended click)
        wP["gW"].s = sMx;
    } else {
        dT = new Date();
        t_i = dT.getTime();
    }
}

function mU() { // mouse up
    if (cBa) {
        pB.w.style.display = "none"; // percentile become invisible
        mC = false;
    }
    dT = new Date();
    t_f = dT.getTime();
    t_d = (t_f - t_i) / 1000; // convert to s.
}

function qTy(_p, v) { // find appropriate wave qty.
    var y = Math.floor((_p * v) / 50); // v - velocity, _p - potential
    return y; // divides by presumed coefficient (modifier)
}


document.body.addEventListener("mousedown", function(event) {
    mD(event.clientX, event.clientY);
});

document.body.addEventListener("mouseup", mU);