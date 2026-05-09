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
  // get or create a session ID — persists in localStorage
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = Math.random().toString(36).slice(2);
    localStorage.setItem('sessionId', sessionId);
  }

  fetch(`http://localhost:3002/cart/${sessionId}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: product._id,
      name: product.name,
      price: product.price
    })
  })
    .then(res => res.json())
    .then(() => {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    });
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
