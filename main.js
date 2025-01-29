
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
            // hier war ich zuletzt
        },
        result: function () {
            document.getElementById('output_v').innerHTML = this.v().toFixed(this.precision.value);
            document.getElementById('output_a0').innerHTML = this.a0().toFixed(this.precision.value);
            document.getElementById('output_aM').innerHTML = this.aM().toFixed(this.precision.value);
            document.getElementById('output_aG').innerHTML = this.aG().toFixed(this.precision.value);
        },
    };
    return quader;
}




