import { useEffect, useState } from 'react'; 
import { Action } from "../../components/book";
import MarketingLayout from "../../components/marketingLayout"
import ProductGrid from "../../components/productGrid"
import { mockBooks } from "../../types/mockMetadata";
import { useRouter } from 'next/router'

const Libarary = () => {
    let [user, setUser] = useState<string|undefined>()
    const router = useRouter()
    const { hash } = router.query;

       //fetch books from blockchain
    
    useEffect(() => {
        if (hash) {
            
        }
    }, [])

    return (
        <MarketingLayout>
            <ProductGrid books={[]} action={Action.read} />
        </MarketingLayout>
    )
}

export default Libarary; 