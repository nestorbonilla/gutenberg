import { Action } from "../components/book";
import MarketingLayout from "../components/marketingLayout"
import ProductGrid from "../components/productGrid"
import { mockBooks } from "../types/mockMetadata";

const Libarary = () => {
    //fetch books from blockchain
    
    return (
        <MarketingLayout>
            <ProductGrid books={[mockBooks[0], mockBooks[2]]} action={Action.read} />
        </MarketingLayout>
    )
}

export default Libarary; 