export async function getServerSideProps() {
  const res = await fetch('http://localhost:3001/products');
  const products = await res.json();
  return { props: { products } };
}

export default function Home({ products }) {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
      <h1>Products</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 20,
        marginTop: 24
      }}>
        {products.map(p => (
          <a key={p._id} href={`/products/${p._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
              <h3 style={{ marginBottom: 8 }}>{p.name}</h3>
              <p style={{ color: '#666', fontSize: 14, marginBottom: 8 }}>{p.category}</p>
              <strong>${p.price}</strong>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}