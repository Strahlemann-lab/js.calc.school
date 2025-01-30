
// Initialization of the calc objects
switch(document.body.getAttribute("data-site")){
    case "quader":
        var quader = initQuader();
        break;

    case "kugel":
        var kugel = initKugel();
        break;

    case "zylinder":
        var zylinder = initZylinder();
        break;

    case "prisma":
        var prisma = initPrisma();
        break;

    case "pyramide":
        var pyramide = initPyramide();
        break;
}

function initQuader(){
    var quader = {
        a: document.getElementById('input_a'),
        b: document.getElementById('input_b'),
        c: document.getElementById('input_c'),
        precision: document.getElementById('inputPrecision'),
        units: document.getElementById('inputUnits'),
    
        v: function () {
            return this.a.value * this.b.value * this.c.value
        },
        a0: function () {
            return 2 * (this.a.value * this.b.value + this.a.value * this.c.value + this.b.value * this.c.value)
        },
        aM: function () {
            return 2 * (this.a.value * this.c.value + this.b.value * this.c.value)
        },
        aG: function () {
            return a.value * b.value
        },
        calcPrec: function () {
            if(this.precision.value < 0 || this.precision.value > 5){
                if(this.precision.value < 0){
                    this.precision.value = 0;
                }else{
                    this.precision.value = 5;
                }
            }
            return this.precision.value;
        },
        result: function () {
            document.getElementById('output_v').innerHTML = this.v().toFixed(this.calcPrec()) + " " + this.units;
            document.getElementById('output_a0').innerHTML = this.a0().toFixed(this.calcPrec()) + " " + this.units;
            document.getElementById('output_aM').innerHTML = this.aM().toFixed(this.calcPrec()) + " " + this.units;
            document.getElementById('output_aG').innerHTML = this.aG().toFixed(this.calcPrec()) + " " + this.units;
        },
    };
    return quader;
}

function initKugel(){
    var kugel = {
        r: document.getElementById('input_r'),
        d: document.getElementById('input_d'),
        precision: document.getElementById('inputPrecision'),
        units: document.getElementById('inputUnits'),
    
        v: function () {
            return (4 / 3) * Math.PI * this.r.value ** 3
        },
        a0: function () {
            return 4 * Math.PI * this.r.value ** 2
        },
        calcPrec: function () {
            if(this.precision.value < 0 || this.precision.value > 5){
                if(this.precision.value < 0){
                    this.precision.value = 0;
                }else{
                    this.precision.value = 5;
                }
            }
            return this.precision.value;
        },
        calcR: function () {
            this.d.value = this.r.value * 2;
            this.result();
        },
        calcD: function () {
            this.r.value = this.d.value / 2;
            this.result();
        },
        result: function () {
            document.getElementById('output_v').innerHTML = this.v().toFixed(this.calcPrec()) + " " + this.units;
            document.getElementById('output_a0').innerHTML = this.a0().toFixed(this.calcPrec()) + " " + this.units;
        },
    };
    return kugel;
}

function initZylinder(){
    var zylinder = {
        r: document.getElementById('input_r'),
        d: document.getElementById('input_d'),
        h: document.getElementById('input_h'),
        precision: document.getElementById('inputPrecision'),
        units: document.getElementById('inputUnits'),
    
        v: function () {
            return Math.PI * this.r.value ** 2 *this.h.value
        },
        a0: function () {
            return 2 * Math.PI * this.r.value * (this.r.value + this.h.value)
        },
        aM: function () {
            return 2 * Math.PI * this.r.value * this.h.value
        },
        aG: function () {
            return Math.PI * this.r.value ** 2
        },
        calcPrec: function () {
            if(this.precision.value < 0 || this.precision.value > 5){
                if(this.precision.value < 0){
                    this.precision.value = 0;
                }else{
                    this.precision.value = 5;
                }
            }
            return this.precision.value;
        },
        calcR: function () {
            this.d.value = this.r.value * 2;
            this.result();
        },
        calcD: function () {
            this.r.value = this.d.value / 2;
            this.result();
        },
        result: function () {
            document.getElementById('output_v').innerHTML = this.v().toFixed(this.calcPrec()) + " " + this.units;
            document.getElementById('output_a0').innerHTML = this.a0().toFixed(this.calcPrec()) + " " + this.units;
            document.getElementById('output_aM').innerHTML = this.aM().toFixed(this.calcPrec()) + " " + this.units;
            document.getElementById('output_aG').innerHTML = this.aG().toFixed(this.calcPrec()) + " " + this.units;
        },
    };
    return zylinder;
}
