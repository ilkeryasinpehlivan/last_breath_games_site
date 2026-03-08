document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = window.innerWidth < 768 ? 50 : 150; // Adjust for mobile

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active'); // Fixed classList.add typo
            }
        });
    };

    // Custom cursor glow effect
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Initial check and scroll listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Form submission (Netlify AJAX)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
                .then(() => {
                    showToast("Mesajın başarıyla gönderildi! Teşekkürler.", "success");
                    contactForm.reset();
                })
                .catch((error) => showToast("Bir hata oluştu: " + error, "error"));
        });
    }

    // Toast Function
    function showToast(message, type = "success") {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        toast.innerHTML = `
            <div class="toast-icon">${type === "success" ? "✓" : "!"}</div>
            <div class="toast-message">${message}</div>
        `;

        container.appendChild(toast);

        // Slide in
        setTimeout(() => toast.classList.add('show'), 100);

        // Slide out and remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 600);
        }, 4000);
    }

    // Smooth navigation reveal fix
    reveals.forEach((el, index) => {
        setTimeout(() => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('active');
            }
        }, 300 + (index * 100));
    });
    const coins = [
        "btcusdt", "ethusdt", "bnbusdt", "xrpusdt", "solusdt",
        "adausdt", "dogeusdt", "trxusdt", "dotusdt", "maticusdt",
        "ltcusdt", "linkusdt", "avaxusdt", "atomusdt", "etcusdt",
        "xlmusdt", "nearusdt", "filusdt", "aptusdt", "sandusdt"
    ];

    const container = document.getElementById("crypto");

    coins.forEach(c => {

        const div = document.createElement("div");
        div.className = "card";
        div.id = c;

        div.innerHTML = `
<div class="symbol">${c.toUpperCase()}</div>
<div class="price">-</div>
`;

        container.appendChild(div);

    });

    const stream = coins.map(c => `${c}@trade`).join("/");

    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${stream}`);

    const last = {};

    ws.onmessage = (event) => {

        const data = JSON.parse(event.data);
        const symbol = data.data.s.toLowerCase();
        const price = parseFloat(data.data.p);

        const el = document.querySelector(`#${symbol} .price`);

        if (last[symbol]) {

            if (price > last[symbol]) el.className = "price up";
            else if (price < last[symbol]) el.className = "price down";

        }

        el.innerText = price.toFixed(4);

        last[symbol] = price;

    };
    const forex = [
        "EURUSD", "USDTRY", "GBPUSD", "USDJPY", "AUDUSD",
        "USDCAD", "USDCHF", "NZDUSD", "EURTRY", "GBPTRY"
    ];

    const forexBox = document.getElementById("forex");

    forex.forEach(p => {

        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
<div class="symbol">${p}</div>
<div class="price">-</div>
`;

        forexBox.appendChild(div);

    });

    async function loadForex() {

        const r = await fetch("https://open.er-api.com/v6/latest/USD");
        const d = await r.json();

        document.querySelectorAll("#forex .card").forEach(card => {

            const pair = card.querySelector(".symbol").innerText;

            const base = pair.slice(0, 3);
            const quote = pair.slice(3);

            let baseRate = base === "USD" ? 1 : d.rates[base];
            let quoteRate = quote === "USD" ? 1 : d.rates[quote];

            if (baseRate && quoteRate) {

                const price = (quoteRate / baseRate).toFixed(4);

                card.querySelector(".price").innerText = price;

            }

        });

    }

    loadForex();

    setInterval(loadForex, 15000);

    const commodities = [
        "GOLD", "SILVER", "OIL", "NATGAS", "PLATINUM", "COPPER"
    ];

    const box = document.getElementById("commodities");

    commodities.forEach(c => {

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
<div class="symbol">${c}</div>
<div class="price">LIVE</div>
`;

        box.appendChild(div);

    });
    const indexes = [
        "S&P500", "NASDAQ", "DOW", "DAX", "FTSE",
        "CAC40", "NIKKEI", "HANGSENG", "BIST100", "IBEX"
    ];

    const box2 = document.getElementById("indexes");

    indexes.forEach(i => {

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
<div class="symbol">${i}</div>
<div class="price">LIVE</div>
`;

        box2.appendChild(div);

    });
    async function loadCommodities() {

        const map = {
            "GOLD": "XAU",
            "SILVER": "XAG",
            "OIL": "CL",
            "NATGAS": "NG",
            "PLATINUM": "XPT",
            "COPPER": "HG"
        };

        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();

        document.querySelectorAll("#commodities .card").forEach(card => {

            const symbol = card.querySelector(".symbol").innerText;

            const random = (Math.random() * 100 + 10).toFixed(2); // demo price

            card.querySelector(".price").innerText = random;

        });

    }

    loadCommodities();
    setInterval(loadCommodities, 15000);

    async function loadIndexes() {

        document.querySelectorAll("#indexes .card").forEach(card => {

            const price = (Math.random() * 10000 + 1000).toFixed(2);

            card.querySelector(".price").innerText = price;

        });

    }

    loadIndexes();
    setInterval(loadIndexes, 20000);
});
