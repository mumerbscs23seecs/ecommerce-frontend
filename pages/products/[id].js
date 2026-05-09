import { useState } from 'react';
 
export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3001/products/${params.id}`);
  if (!res.ok) return { notFound: true };
  const product = await res.json();
  return { props: { product } };
}
 
export default function ProductPage({ product }) {
  const [added, setAdded] = useState(false);
 
  function addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i._id === product._id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }
 
  return (
    <main style={{ maxWidth: 640, margin: '40px auto', padding: 24 }}>
      <a href='/' style={{ color:'#666', fontSize:14 }}>Back to products</a>
      <h1 style={{ margin:'16px 0 8px' }}>{product.name}</h1>
      <p style={{ color:'#666', marginBottom:8 }}>{product.category}</p>
      <p style={{ marginBottom:16 }}>{product.description}</p>
      <p style={{ fontSize:24, fontWeight:600, marginBottom:24 }}>${product.price}</p>
      <p style={{ color:'#666', marginBottom:16 }}>In stock: {product.stock}</p>
      <button onClick={addToCart} style={{ padding:'12px 24px', fontSize:16 }}>
        {added ? 'Added to cart!' : 'Add to Cart'}
      </button>
    </main>
  );
}
