/* =========================================================
   Asistente de Aurea Sherry
   Chat con respuestas preparadas. Para cambiar textos,
   edita el bloque "TEMAS" de abajo.
   ========================================================= */
(function () {
  var WHATSAPP = '34690753472';
  var TEL = '+34 690 753 472';
  var EMAIL = 'info@aureasherry.com';
  var DIRECCION = 'C/ Manuel de la Quintana, 2 · 11402 Jerez de la Frontera';
  /* Pega aquí la dirección de tu Google Apps Script (termina en /exec) */
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw77xxp-MOo_Pn0Ekp_dNisBh5YjSee2-FFXKZpsm0qlyHSn6_1RnSWijk6gYpqLFE9/exec';
  var MAPS = 'https://www.google.com/maps/search/?api=1&query=Calle+Manuel+de+la+Quintana+2%2C+11402+Jerez+de+la+Frontera';

  function wa(texto) { return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto); }

  /* ---------- Horario (hora de Jerez) ---------- */
  function estadoHorario() {
    try {
      var p = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      var d = '', h = 0, m = 0;
      p.forEach(function (x) { if (x.type === 'weekday') d = x.value; if (x.type === 'hour') h = +x.value; if (x.type === 'minute') m = +x.value; });
      var min = h * 60 + m;
      var laborable = !/sáb|dom/i.test(d);
      var abierto = laborable && ((min >= 570 && min < 780) || (min >= 960 && min < 1080));
      return abierto ? '🟢 Ahora mismo estamos abiertos.' : '🔴 Ahora mismo estamos cerrados, pero escríbenos y te respondemos en cuanto abramos.';
    } catch (e) { return ''; }
  }

  var yaSaludo = false;
  function saludo() {
    try {
      var h = +new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', hour12: false }).format(new Date());
      if (h >= 6 && h < 14) return '¡Buenos días! ☀️';
      if (h >= 14 && h < 21) return '¡Buenas tardes! 👋';
      return '¡Buenas noches! 🌙';
    } catch (e) { return '¡Hola! 👋'; }
  }

  /* ---------- TEMAS ---------- */
  var TEMAS = {
    inicio: {
      texto: function () {
        if (yaSaludo) return '¿Te ayudo con algo más? Aquí sigo 😊';
        yaSaludo = true;
        return saludo() + ' Soy <b>Aurea</b>, la asistente virtual de Aurea Sherry. Estoy aquí para echarte una mano con lo que necesites, y si prefieres hablar con alguien del equipo, te paso enseguida. ¿Qué te trae por aquí?';
      },
      opciones: ['obra', 'comprar', 'vender', 'gestion', 'invertir', 'donde', 'datos', 'persona']
    },
    obra: {
      boton: '🏢 Obra nueva',
      texto: '¡Me encanta que preguntes por ella! 😊 <b>Méndez Núñez Homes</b> es nuestra promoción de obra nueva en pleno centro de Jerez: 13 viviendas de 2 dormitorios con <b>garaje y trastero incluidos</b> y una piscina en la azotea con vistas a los tejados del centro. Las entregas empiezan en diciembre de 2026, así que ya se puede visitar.',
      enlaces: [['Ver la promoción', 'mendez-nunez.html'], ['Comparativa de obra nueva en Jerez', 'antes-de-invertir.html']],
      wa: 'Hola, me interesa Méndez Núñez Homes. ¿Me podéis dar precios y disponibilidad?',
      waTexto: 'Pedir precios y visita'
    },
    comprar: {
      boton: '🔑 Quiero comprar',
      texto: '¡Qué ilusión, buscar casa! 🏡 Te ayudamos a encontrarla y, sobre todo, a hacer las cuentas reales antes de decidir: impuestos, gastos e hipoteca, sin sorpresas. Si me cuentas qué buscas (zona, dormitorios, presupuesto), el equipo te avisa de lo que encaje contigo.',
      enlaces: [['Ver propiedades', 'index.html#propiedades'], ['Lo que cuesta de verdad comprar', 'coste-comprar-jerez.html']],
      wa: 'Hola, estoy buscando vivienda en Jerez. Busco: ',
      waTexto: 'Contar lo que busco'
    },
    vender: {
      boton: '🏠 Quiero vender',
      texto: 'Vender una casa es una decisión importante, y lo primero es saber cuánto vale de verdad. Te hacemos una <b>valoración gratuita y sin compromiso</b> con datos reales del mercado, para que vendas al precio justo: ni regalarla, ni ponerla tan alta que no se venda.',
      enlaces: [['Pedir valoración gratuita', 'index.html#valoracion']],
      wa: 'Hola, quiero vender mi vivienda y me gustaría una valoración gratuita. Está en: ',
      waTexto: 'Pedir valoración por WhatsApp'
    },
    gestion: {
      boton: '🛠️ Gestionar mi inmueble',
      texto: 'Te entiendo perfectamente: tener un inmueble alquilado da más trabajo del que parece. Nosotros nos ocupamos de todo: <b>buscar buenos inquilinos, contratos, cobros, mantenimiento e incidencias</b>. Tú solo tienes una persona de contacto y la tranquilidad de que alguien lo cuida.',
      enlaces: [['Ver el servicio de gestión', 'index.html#gestion']],
      wa: 'Hola, me interesa que gestionéis mi inmueble.',
      waTexto: 'Hablar sobre la gestión'
    },
    invertir: {
      boton: '📊 Invertir',
      texto: 'Hablemos claro, que es como nos gusta trabajar: con inversores y patrimonios familiares movemos edificios, hoteles y operaciones <i>off market</i>. Y tenemos una regla: <b>no te recomendamos nada en lo que no invertiríamos nosotros</b>. Siempre con números reales.',
      enlaces: [['Casos de éxito', 'index.html#vendidas'], ['Obra nueva: precios reales por m²', 'antes-de-invertir.html'], ['El auge turístico de Jerez', 'turismo-jerez.html']],
      wa: 'Hola, me interesan oportunidades de inversión en Jerez.',
      waTexto: 'Hablar de inversión'
    },
    donde: {
      boton: '📍 Dónde estamos',
      texto: function () {
        return 'Nos encantará conocerte en persona ☕<br><br><b>Oficina:</b> ' + DIRECCION + '<br><b>Horario:</b> lunes a viernes, de 09:30 a 13:00 y de 16:00 a 18:00.<br><b>Teléfono:</b> ' + TEL + '<br><b>Email:</b> ' + EMAIL + '<br><br>' + estadoHorario();
      },
      enlaces: [['Cómo llegar (Google Maps)', MAPS]],
      wa: 'Hola, me gustaría pasar por la oficina. ¿Cuándo os viene bien?',
      waTexto: 'Concertar una cita'
    },
    persona: {
      boton: '💬 Hablar con una persona',
      texto: function () { return '¡Por supuesto! Nada como hablar con alguien del equipo. Escríbenos por WhatsApp o llámanos al <b>' + TEL + '</b> y te atendemos encantados.<br><br>' + estadoHorario(); },
      wa: 'Hola, vengo de la web y quería hacer una consulta.',
      waTexto: 'Abrir WhatsApp'
    },
    datos: {
      boton: '📝 Que me llaméis',
      texto: '¡Encantados! Déjame tus datos y alguien del equipo te contactará personalmente. Solo te pido lo imprescindible 😊',
      formulario: true
    }
  };

  /* Palabras clave para lo que el visitante escribe a mano */
  var CLAVES = [
    ['datos', /ll[aá]m(adme|enme|ame)|mis datos|dejar.*(datos|tel[eé]fono)|contact(adme|enme)|que me llam/],
    ['obra', /m[eé]ndez|n[uú][ñn]ez|obra nueva|promoci|garaje|piscina|trastero|nuev/],
    ['vender', /vend|valora|tasa|cu[aá]nto vale|precio de mi/],
    ['gestion', /gesti|inquilin|alquilar mi|administr|impago|mantenim/],
    ['invertir', /invert|inversi|rentab|off.?market|edificio|hotel/],
    ['donde', /d[oó]nde|direcci|oficina|horario|abiert|hora|tel[eé]fono|email|correo|llegar|visitar/],
    ['comprar', /compr|busco|piso|casa|vivienda|hipoteca|dormitorio|alquil/],
    ['persona', /persona|hablar|llam|whats|contact|ayuda/]
  ];

  /* ---------- Estilos ---------- */
  var css = '' +
    '#as-bot,#as-bot *{box-sizing:border-box;font-family:Inter,system-ui,-apple-system,sans-serif}' +
    '#as-btn{position:fixed;right:20px;bottom:20px;z-index:9999;width:62px;height:62px;border-radius:50%;border:0;cursor:pointer;background:#1D2F1F;box-shadow:0 10px 30px rgba(0,0,0,.3);display:grid;place-items:center;transition:transform .2s}' +
    '#as-btn:hover{transform:scale(1.06)}' +
    '#as-btn img{width:36px;height:auto}' +
    '#as-btn .dot{position:absolute;top:4px;right:4px;width:14px;height:14px;border-radius:50%;background:#C9A24E;border:2px solid #fff}' +
    '#as-tip{position:fixed;right:92px;bottom:32px;z-index:9999;background:#fff;color:#141414;font-size:14px;padding:10px 14px;border-radius:14px 14px 4px 14px;box-shadow:0 8px 24px rgba(0,0,0,.15);cursor:pointer;display:none;max-width:220px}' +
    '#as-win{position:fixed;right:20px;bottom:94px;z-index:9999;width:370px;max-width:calc(100vw - 24px);height:560px;max-height:calc(100vh - 120px);background:#F7F5F0;border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.28);display:none;flex-direction:column;overflow:hidden;border:1px solid #e4dfd5}' +
    '#as-win.open{display:flex}' +
    '#as-head{background:#1D2F1F;color:#fff;padding:14px 16px;display:flex;align-items:center;gap:12px}' +
    '#as-head img{width:34px;height:auto}' +
    '#as-head b{display:block;font-size:15px;font-weight:600}' +
    '#as-head small{font-size:12px;color:#c9c2b2}' +
    '#as-close{margin-left:auto;background:none;border:0;color:#fff;font-size:22px;cursor:pointer;line-height:1}' +
    '#as-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}' +
    '.as-msg{max-width:88%;padding:11px 14px;border-radius:16px;font-size:14px;line-height:1.5;animation:asIn .25s ease}' +
    '.as-bot{background:#fff;border:1px solid #e4dfd5;color:#141414;border-bottom-left-radius:4px;align-self:flex-start}' +
    '.as-user{background:#1D2F1F;color:#fff;border-bottom-right-radius:4px;align-self:flex-end}' +
    '.as-msg a{color:#8a6a2c}' +
    '.as-opts{display:flex;flex-wrap:wrap;gap:7px;align-self:flex-start;max-width:100%}' +
    '.as-opt{background:#fff;border:1px solid #d9cfbb;color:#141414;font-size:13px;padding:8px 12px;border-radius:100px;cursor:pointer;text-decoration:none;transition:.2s}' +
    '.as-opt:hover{border-color:#B8914A;background:#fbf6ea}' +
    '.as-link{background:#fbf6ea;border-color:#e5d3a8}' +
    '.as-wa{background:#1D2F1F;color:#fff;border-color:#1D2F1F}' +
    '.as-wa:hover{background:#B8914A;border-color:#B8914A;color:#fff}' +
    '#as-form{display:flex;gap:8px;padding:12px;border-top:1px solid #e4dfd5;background:#fff}' +
    '#as-in{flex:1;border:1px solid #e4dfd5;border-radius:100px;padding:10px 14px;font-size:14px;outline:none;background:#F7F5F0}' +
    '#as-in:focus{border-color:#B8914A}' +
    '#as-send{border:0;background:#B8914A;color:#fff;width:40px;height:40px;border-radius:50%;cursor:pointer;font-size:16px}' +
    '#as-foot{font-size:11px;color:#8a857c;text-align:center;padding:0 12px 10px;background:#fff}' +
    '.as-typing{display:inline-flex;gap:4px}.as-typing i{width:6px;height:6px;border-radius:50%;background:#b9b4aa;animation:asDot 1s infinite}.as-typing i:nth-child(2){animation-delay:.15s}.as-typing i:nth-child(3){animation-delay:.3s}' +
    '.as-form{background:#fff;border:1px solid #e4dfd5;border-radius:16px;padding:14px;display:grid;gap:8px;align-self:stretch;animation:asIn .25s ease}' +
    '.as-form input,.as-form select,.as-form textarea{width:100%;border:1px solid #e4dfd5;border-radius:10px;padding:9px 11px;font-size:13.5px;background:#F7F5F0;outline:none;font-family:inherit}' +
    '.as-form input:focus,.as-form select:focus,.as-form textarea:focus{border-color:#B8914A}' +
    '.as-form label.ck{display:flex;gap:8px;align-items:flex-start;font-size:12px;line-height:1.45;color:#3d3a35}' +
    '.as-form label.ck input{width:auto;margin-top:2px;flex:none}' +
    '.as-form .legal{font-size:11px;line-height:1.5;color:#6f6a62;background:#F7F5F0;border-radius:10px;padding:9px 10px}' +
    '.as-form .legal a{color:#8a6a2c}' +
    '.as-form .err{color:#9a3b2b;font-size:12px;display:none}' +
    '.as-form button{background:#1D2F1F;color:#fff;border:0;border-radius:100px;padding:11px;font-size:14px;cursor:pointer}' +
    '.as-form button:disabled{opacity:.6}' +
    '.as-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}' +
    '@keyframes asIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}' +
    '@keyframes asDot{0%,80%,100%{opacity:.3}40%{opacity:1}}' +
    '@media(max-width:480px){#as-win{right:12px;bottom:86px;height:calc(100vh - 110px)}#as-btn{right:14px;bottom:14px}#as-tip{right:84px;bottom:26px}}';

  /* ---------- Estructura ---------- */
  function montar() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var root = document.createElement('div'); root.id = 'as-bot';
    root.innerHTML =
      '<div id="as-tip">¡Hola! Soy Aurea 👋 ¿Te echo una mano?</div>' +
      '<button id="as-btn" aria-label="Hablar con Aurea, la asistente virtual"><img src="logo-as.png" alt=""><span class="dot"></span></button>' +
      '<div id="as-win" role="dialog" aria-label="Aurea, asistente virtual de Aurea Sherry">' +
        '<div id="as-head"><img src="logo-as.png" alt=""><div><b>Aurea</b><small><span style="color:#7fd28f">●</span> Asistente virtual de Aurea Sherry</small></div><button id="as-close" aria-label="Cerrar">×</button></div>' +
        '<div id="as-body"></div>' +
        '<form id="as-form"><input id="as-in" placeholder="Escribe tu pregunta…" autocomplete="off"><button id="as-send" aria-label="Enviar">➤</button></form>' +
        '<div id="as-foot">Aurea es una asistente virtual. Para lo que necesites, el equipo te atiende por WhatsApp.</div>' +
      '</div>';
    document.body.appendChild(root);

    var btn = document.getElementById('as-btn'), win = document.getElementById('as-win'),
        body = document.getElementById('as-body'), tip = document.getElementById('as-tip'),
        form = document.getElementById('as-form'), input = document.getElementById('as-in');
    var iniciado = false;

    function abrir() {
      win.classList.add('open'); tip.style.display = 'none';
      var d = btn.querySelector('.dot'); if (d) d.remove();
      if (!iniciado) { iniciado = true; responder('inicio'); }
      setTimeout(function () { input.focus(); }, 200);
    }
    function cerrar() { win.classList.remove('open'); }
    btn.onclick = function () { win.classList.contains('open') ? cerrar() : abrir(); };
    tip.onclick = abrir;
    document.getElementById('as-close').onclick = cerrar;

    function bajar() { body.scrollTop = body.scrollHeight; }
    function burbuja(html, quien) {
      var m = document.createElement('div'); m.className = 'as-msg ' + (quien === 'user' ? 'as-user' : 'as-bot');
      if (quien === 'user') m.textContent = html; else m.innerHTML = html;
      body.appendChild(m); bajar(); return m;
    }
    function botones(lista) {
      var c = document.createElement('div'); c.className = 'as-opts';
      lista.forEach(function (b) { c.appendChild(b); });
      body.appendChild(c); bajar();
    }
    function opcion(clave) {
      var b = document.createElement('button'); b.className = 'as-opt'; b.type = 'button';
      b.textContent = TEMAS[clave].boton;
      b.onclick = function () { burbuja(TEMAS[clave].boton, 'user'); responder(clave); };
      return b;
    }
    function enlace(txt, url, cls) {
      var a = document.createElement('a'); a.className = 'as-opt ' + (cls || 'as-link'); a.textContent = txt; a.href = url;
      if (/^https?:/.test(url)) { a.target = '_blank'; a.rel = 'noopener'; }
      return a;
    }
    function volver() {
      var b = document.createElement('button'); b.className = 'as-opt'; b.type = 'button'; b.textContent = '↩ Tengo otra consulta';
      b.onclick = function () { responder('inicio'); };
      return b;
    }


    var ultimoTema = '';
    function mostrarFormulario() {
      var f = document.createElement('form'); f.className = 'as-form'; f.noValidate = true;
      var opciones = ['Obra nueva (Méndez Núñez Homes)', 'Comprar vivienda', 'Vender / valoración', 'Gestión de mi inmueble', 'Inversión', 'Otra consulta'];
      var pre = ({'🏢 Obra nueva':0,'🔑 Quiero comprar':1,'🏠 Quiero vender':2,'🛠️ Gestionar mi inmueble':3,'📊 Invertir':4})[ultimoTema];
      f.innerHTML =
        '<input name="nombre" placeholder="Tu nombre *" autocomplete="name" maxlength="80">' +
        '<input name="telefono" type="tel" placeholder="Teléfono *" autocomplete="tel" maxlength="20">' +
        '<input name="email" type="email" placeholder="Email (opcional)" autocomplete="email" maxlength="120">' +
        '<select name="interes">' + opciones.map(function (o, i) { return '<option' + (i === pre ? ' selected' : '') + '>' + o + '</option>'; }).join('') + '</select>' +
        '<select name="prefiere"><option>Prefiero una llamada</option><option>Prefiero WhatsApp</option><option>Prefiero email</option></select>' +
        '<select name="horario"><option>Cualquier hora</option><option>Por la mañana</option><option>Por la tarde</option></select>' +
        '<textarea name="mensaje" rows="2" placeholder="Cuéntanos brevemente (opcional)" maxlength="500"></textarea>' +
        '<div class="as-hp" aria-hidden="true"><input name="web" tabindex="-1" autocomplete="off"></div>' +
        '<div class="legal"><b>Información básica sobre protección de datos.</b> <b>Responsable:</b> Aurea Sherry S.L. <b>Finalidad:</b> atender tu solicitud y contactarte sobre ella. <b>Legitimación:</b> tu consentimiento. <b>Destinatarios:</b> no se cederán a terceros salvo obligación legal; se almacenan en Google Workspace como proveedor tecnológico. <b>Conservación:</b> mientras sea necesario para atender tu solicitud y, como máximo, 12 meses sin contacto. <b>Derechos:</b> acceso, rectificación, supresión, oposición, limitación y portabilidad en ' + EMAIL + ', y reclamación ante la AEPD. <a href="privacidad.html" target="_blank">Más información en nuestra política de privacidad</a>.</div>' +
        '<label class="ck"><input type="checkbox" name="privacidad"> <span>He leído la información sobre protección de datos y consiento el tratamiento de mis datos para que me contactéis sobre mi consulta. *</span></label>' +
        '<label class="ck"><input type="checkbox" name="comercial"> <span>Además, quiero recibir información sobre nuevas promociones y oportunidades de Aurea Sherry (opcional).</span></label>' +
        '<div class="err"></div>' +
        '<button type="submit">Enviar mis datos</button>';
      body.appendChild(f); bajar();
      var err = f.querySelector('.err');
      f.onsubmit = function (e) {
        e.preventDefault();
        var d = {
          nombre: f.nombre.value.trim(), telefono: f.telefono.value.trim(), email: f.email.value.trim(),
          interes: f.interes.value, prefiere: f.prefiere.value, horario: f.horario.value, mensaje: f.mensaje.value.trim(),
          privacidad: f.privacidad.checked, comercial: f.comercial.checked, web: f.web.value,
          pagina: location.pathname.split('/').pop() || 'index.html'
        };
        var fallo = '';
        if (d.nombre.length < 2) fallo = 'Dime tu nombre, por favor.';
        else if (!/^[+0-9 ()-]{9,20}$/.test(d.telefono)) fallo = 'Revisa el teléfono, por favor.';
        else if (d.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) fallo = 'Revisa el email, por favor.';
        else if (!d.privacidad) fallo = 'Para poder contactarte necesitamos que aceptes el tratamiento de tus datos.';
        if (fallo) { err.textContent = fallo; err.style.display = 'block'; return; }
        err.style.display = 'none';
        var b = f.querySelector('button'); b.disabled = true; b.textContent = 'Enviando…';
        function hecho() {
          f.remove();
          burbuja('📝 ' + d.nombre + ' · ' + d.telefono, 'user');
          var esc = burbuja('<span class="as-typing"><i></i><i></i><i></i></span>', 'bot');
          setTimeout(function () {
            esc.innerHTML = '¡Gracias, ' + d.nombre.split(' ')[0] + '! 🙌 Ya tenemos tus datos. Alguien del equipo te contactará ' + (d.horario === 'Cualquier hora' ? 'lo antes posible' : d.horario.toLowerCase()) + '. Si te corre prisa, también puedes escribirnos ahora mismo por WhatsApp.';
            botones([enlace('💬 Escribir ahora por WhatsApp', wa('Hola, soy ' + d.nombre + '. Acabo de dejar mis datos en la web sobre: ' + d.interes + '.'), 'as-wa'), volver()]);
          }, 900);
        }
        if (!SCRIPT_URL) {
          f.remove();
          var esc = burbuja('Ahora mismo no puedo guardar tus datos desde aquí, pero puedes enviárnoslos por WhatsApp con un clic:', 'bot');
          botones([enlace('💬 Enviar mis datos por WhatsApp', wa('Hola, soy ' + d.nombre + ' (tel. ' + d.telefono + '). Me interesa: ' + d.interes + '. ' + d.mensaje), 'as-wa'), volver()]);
          return;
        }
        fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(d) })
          .then(hecho)
          .catch(function () { b.disabled = false; b.textContent = 'Enviar mis datos'; err.textContent = 'No se ha podido enviar. Inténtalo de nuevo o escríbenos por WhatsApp.'; err.style.display = 'block'; });
      };
    }

    function responder(clave) {
      var t = TEMAS[clave];
      if (clave !== 'datos' && clave !== 'inicio') ultimoTema = TEMAS[clave].boton;
      var esc = burbuja('<span class="as-typing"><i></i><i></i><i></i></span>', 'bot');
      setTimeout(function () {
        esc.innerHTML = typeof t.texto === 'function' ? t.texto() : t.texto;
        var lista = [];
        if (t.opciones) t.opciones.forEach(function (k) { lista.push(opcion(k)); });
        if (t.enlaces) t.enlaces.forEach(function (e) { lista.push(enlace(e[0] + ' →', e[1])); });
        if (t.formulario) { mostrarFormulario(); return; }
        if (t.wa) lista.push(enlace('💬 ' + t.waTexto, wa(t.wa), 'as-wa'));
        if (clave !== 'inicio' && clave !== 'persona') lista.push(opcion('datos'));
        if (clave !== 'inicio') lista.push(volver());
        botones(lista);
      }, pausa(t.texto));
    }
    /* Tiempo de "escribiendo…" según lo largo del mensaje, como una persona */
    function pausa(tx) {
      var n = (typeof tx === 'function' ? 300 : String(tx).length);
      return Math.min(1600, 500 + n * 4);
    }

    form.onsubmit = function (e) {
      e.preventDefault();
      var q = input.value.trim(); if (!q) return;
      burbuja(q, 'user'); input.value = '';
      var low = q.toLowerCase(), tema = null;
      for (var i = 0; i < CLAVES.length; i++) { if (CLAVES[i][1].test(low)) { tema = CLAVES[i][0]; break; } }
      if (/^(hola|buenas|buenos|hey|qu[eé] tal)/.test(low) && !tema) tema = 'inicio';
      if (/gracias|genial|perfecto|vale|ok\b/.test(low) && !tema) { var g = burbuja('<span class="as-typing"><i></i><i></i><i></i></span>', 'bot'); setTimeout(function () { g.innerHTML = '¡A ti! 😊 Si te surge cualquier otra duda, aquí me tienes. Y recuerda que el equipo está a un WhatsApp de distancia.'; botones([enlace('💬 Escribir al equipo', wa('Hola, vengo de la web y quería hacer una consulta.'), 'as-wa'), volver()]); }, 700); return; }
      if (tema) { responder(tema); return; }
      var esc = burbuja('<span class="as-typing"><i></i><i></i><i></i></span>', 'bot');
      setTimeout(function () {
        esc.innerHTML = 'Uy, creo que no te he entendido bien 😅 Soy una asistente virtual y todavía estoy aprendiendo. Lo mejor es que te conteste alguien del equipo directamente, o si quieres, elige uno de estos temas:';
        botones([enlace('💬 Preguntarlo por WhatsApp', wa('Hola, tengo una consulta: ' + q), 'as-wa')]
          .concat(['obra', 'comprar', 'vender', 'invertir', 'donde'].map(opcion)));
      }, 900);
    };

    /* Aviso suave a los 10 segundos, una vez por visita */
    var visto = false;
    try { visto = sessionStorage.getItem('asTip') === '1'; } catch (e) {}
    if (!visto) setTimeout(function () {
      if (!win.classList.contains('open')) { tip.style.display = 'block'; try { sessionStorage.setItem('asTip', '1'); } catch (e) {} }
    }, 10000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
