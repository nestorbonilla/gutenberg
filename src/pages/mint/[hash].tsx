import ProductView from "../../components/productView"
import { mockBooks } from "../../types/mockMetadata"
import { useRouter } from 'next/router'


const MintERC721 = () => {
    const router = useRouter()
    const { hash } = router.query; 

    const mint = async () => {
        //transfer erc1155 token
    }
    
    return (
        <ProductView book={mockBooks[0]} erc721={true} callback={mint}/>
    )
}
export default MintERC721; 
