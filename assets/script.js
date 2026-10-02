function saveVCard(el){
  const d = el.dataset;
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${d.last};${d.first};;;
FN:${d.full}
ORG:${d.org}
TITLE:${d.role}
TEL;TYPE=CELL:${d.phone}
EMAIL:${d.email}
ADR;TYPE=WORK:;;${d.address};;;;
END:VCARD`;
  const blob = new Blob([vcard],{type:'text/vcard;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${d.last}_${d.first}.vcf`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

async function shareCard(btn){
  const data = {title:btn.dataset.title, text:btn.dataset.text, url:location.href};
  if(navigator.share){
    try{await navigator.share(data);}catch(e){}
  }else{
    await navigator.clipboard.writeText(location.href);
    const t = btn.textContent;
    btn.textContent = 'Ссылка скопирована ✓';
    setTimeout(()=>btn.textContent = t, 1200);
  }
}

/* Раскрытие списка категории */
function toggleCat(el){
  const list = el.nextElementSibling;
  el.classList.toggle('open');
  list.classList.toggle('open');
}
