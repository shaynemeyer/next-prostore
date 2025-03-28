import ProductList from "@/components/shared/product/ProductList";
import sampleData from "@/db/sample-data";

function Homepage() {
  return (
    <div>
      <ProductList
        data={sampleData.products}
        title="Newest Arrivals"
        limit={4}
      />
    </div>
  );
}
export default Homepage;
