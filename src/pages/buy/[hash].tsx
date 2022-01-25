import ProductView from "../../components/productView"
import { mockBooks } from "../../types/mockMetadata"
import { useRouter } from 'next/router'

const BuyERC115 = () => {
    const router = useRouter()
    const { hash } = router.query; 

    const buy = async () => {
        //transfer erc1155 token
    }
    
    return (
        <ProductView book={mockBooks[0]} erc721={false} callback={buy}/>
    )
}
export default BuyERC115; 
