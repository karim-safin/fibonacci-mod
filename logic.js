function initialize() {
	var canvas = document.getElementById("mainCanvas");
    var ratio = (window.devicePixelRatio ? window.devicePixelRatio : 1);
    canvas.width = 700 * ratio;
    canvas.height = 700 * ratio;

    var moduloInput = document.getElementById("modulo");
    moduloInput.addEventListener('change', (event) => {
        var modulo = parseInt(event.target.value);
        if (Number.isInteger(modulo)) {
            draw(modulo);
        }
    });
}

function getFibonacciLoop(modulo) {
    var f = [1, 1, 2 % modulo];
    while (f.length < 1000)
    {
        var n = f.length;
        var a = f[n - 1];
        var b = f[n - 2];
        if (a == 1 && b == 1)
        {
            // the cycle ended
            break;
        }
        f.push((a + b) % modulo);
    }
    return f;
}

function draw(modulo) {
    var f = getFibonacciLoop(modulo);
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    var w = canvas.width;
    ctx.translate(w / 2, w / 2);
    ctx.beginPath();
    ctx.moveTo(w / 2 * Math.cos(1 / modulo * 2 * Math.PI),
               w / 2 * Math.sin(1 / modulo * 2 * Math.PI));
    for (const p of f) {
        ctx.lineTo(w / 2 * Math.cos(p / modulo * 2 * Math.PI),
                   w / 2 * Math.sin(p / modulo * 2 * Math.PI));
    }
    ctx.stroke(); 
    ctx.restore();
}
