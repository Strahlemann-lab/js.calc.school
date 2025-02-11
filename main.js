
// Initialization of the calc objects
switch(document.body.getAttribute("data-site")){
    case "quader":
        var quader = initQuader();
        quader.result();
        break;

    case "kugel":
        var kugel = initKugel();
        kugel.result();
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
    default:
        break;
}

function initQuader(){
    var quader = {
        a: document.getElementById('input_a'),
        b: document.getElementById('input_b'),
        c: document.getElementById('input_c'),
        precision: document.getElementById('inputPrecision'),
    
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
            return this.a.value * this.b.value
        },
        calcPrec: function () {
            if(!this.precision.value){return}
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
            document.getElementById('output_v').innerHTML = this.v().toFixed(this.calcPrec());
            document.getElementById('output_a0').innerHTML = this.a0().toFixed(this.calcPrec());
            document.getElementById('output_aM').innerHTML = this.aM().toFixed(this.calcPrec());
            document.getElementById('output_aG').innerHTML = this.aG().toFixed(this.calcPrec());
        },
    };
    return quader;
}

function initKugel(){
    var kugel = {
        r: document.getElementById('input_r'),
        d: document.getElementById('input_d'),
        precision: document.getElementById('inputPrecision'),
    
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
            document.getElementById('output_v').innerHTML = this.v().toFixed(this.calcPrec());
            document.getElementById('output_a0').innerHTML = this.a0().toFixed(this.calcPrec());
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
            document.getElementById('output_v').innerHTML = this.v().toFixed(this.calcPrec());
            document.getElementById('output_a0').innerHTML = this.a0().toFixed(this.calcPrec());
            document.getElementById('output_aM').innerHTML = this.aM().toFixed(this.calcPrec());
            document.getElementById('output_aG').innerHTML = this.aG().toFixed(this.calcPrec());
        },
    };
    return zylinder;
}

function initPrisma(){
    var prisma = {
        a: document.getElementById('input_a'),
        h: document.getElementById('input_h'),
        precision: document.getElementById('inputPrecision'),
    
        v: function () {
            return (this.a.value ** 2 / 4) * this.h.value * Math.sqrt(3)
        },
        a0: function () {
            return (this.a.value / 2) * (this.a.value * Math.sqrt(3) + 6 * this.h.value)
        },
        aM: function () {
            return 3 * this.a.value * this.h.value
        },
        aG: function () {
            return (this.a.value ** 2 / 4) * Math.sqrt(3)
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
            document.getElementById('output_v').innerHTML = this.v().toFixed(this.calcPrec());
            document.getElementById('output_a0').innerHTML = this.a0().toFixed(this.calcPrec());
            document.getElementById('output_aM').innerHTML = this.aM().toFixed(this.calcPrec());
            document.getElementById('output_aG').innerHTML = this.aG().toFixed(this.calcPrec());
        },
    };
    return prisma;
}

function initPyramide(){
    var pyramide = {
        a: document.getElementById('input_a'),
        h: document.getElementById('input_h'),
        precision: document.getElementById('inputPrecision'),
    
        hs: function () {
            return Math.sqrt((this.a.value / 2) ** 2 + this.h.value ** 2)
        },
        v: function () {
            return (1 / 3) * this.a.value ** 2 * this.h.value
        },
        a0: function () {
            return this.a.value * (this.a.value + 2 * this.hs())
        },
        aM: function () {
            return 2 * this.a.value * this.hs()
        },
        aG: function () {
            return this.a.value ** 2
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
            document.getElementById('output_v').innerHTML = this.v().toFixed(this.calcPrec());
            document.getElementById('output_a0').innerHTML = this.a0().toFixed(this.calcPrec());
            document.getElementById('output_aM').innerHTML = this.aM().toFixed(this.calcPrec());
            document.getElementById('output_aG').innerHTML = this.aG().toFixed(this.calcPrec());
        },
    };
    return pyramide;
}