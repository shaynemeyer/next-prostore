import ProductList from "@/components/shared/product/ProductList";
import { getLatestProducts } from "@/lib/actions/product.actions";

async function Homepage() {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </div>
  );
}
export default Homepage;
