import { Action } from "../../components/book";
import MarketingLayout from "../../components/marketingLayout";
import ProductGrid from "../../components/productGrid";

const Library = () => {
    return (
        <MarketingLayout>
            <ProductGrid books={[]} action={Action.read} />
        </MarketingLayout>
    )
}

export default Library; 