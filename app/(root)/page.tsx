import ProductCarousel from "@/components/shared/product/ProductCarousel";
import ProductList from "@/components/shared/product/ProductList";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/product.actions";

async function Homepage() {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </div>
  );
}
export default Homepage;
