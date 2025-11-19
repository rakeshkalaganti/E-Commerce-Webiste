// Basic interactions: menu toggle, carousel, product injection, cart counter, modal
{id:7,name:'Sunglasses',price:799,img:'https://source.unsplash.com/600x400/?sunglasses'},
{id:8,name:'Gaming Mouse',price:1299,img:'https://source.unsplash.com/600x400/?gaming-mouse'}
];


const grid = document.getElementById('productGrid');
const cartCountEl = document.getElementById('cartCount');
let cartCount = 0;


function renderProducts(){
grid.innerHTML = '';
products.forEach(p=>{
const card = document.createElement('article');
card.className = 'card';
card.innerHTML = `\
<img src="${p.img}" alt="${p.name}">\
<h3>${p.name}</h3>\
<p>₹ ${p.price.toLocaleString()}</p>\
<div class="actions">\
<button class="addBtn" data-id="${p.id}">Add to Cart</button>\
<button class="viewBtn" data-id="${p.id}">Quick View</button>\
</div>`;
grid.appendChild(card);
});
}


renderProducts();


document.addEventListener('click', (e)=>{
if(e.target.matches('.addBtn')){
cartCount++; cartCountEl.textContent = cartCount;
e.target.textContent = 'Added';
e.target.disabled = true;
}
if(e.target.matches('.viewBtn')){
const id = +e.target.dataset.id;
openModal(products.find(x=>x.id===id));
}
});


// Modal
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
function openModal(product){
modalContent.innerHTML = `\
<div style="display:flex;gap:12px;flex-wrap:wrap">\
<img src="${product.img}" alt="${product.name}" style="width:260px;height:220px;object-fit:cover;border-radius:8px">\
<div>\
<h3>${product.name}</h3>\
<p>Price: ₹ ${product.price.toLocaleString()}</p>\
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, eveniet.</p>\
<div style="display:flex;gap:8px;margin-top:10px">\
<button id="modalAdd">Add to Cart</button>\
<button id="modalCloseBtn">Close</button>\
</div>\
</div>\
</div>`;
modal.classList.remove('hidden');
modal.setAttribute('aria-hidden','false');
modal.querySelector('#modalAdd').addEventListener('click', ()=>{ cartCount++; cartCoun