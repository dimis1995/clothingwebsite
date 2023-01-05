import ProductCard from '../product-card/product-card.component';
import {
    CategoryPreviewContainer, 
    CategoryPreviewTitle, 
    CategoryPreviewDiv
} from './category-preview.styles';


const CategoryPreview = ( {title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <CategoryPreviewTitle to={title}>{title.toUpperCase()}</CategoryPreviewTitle>
            </h2>
            <CategoryPreviewDiv>
                {
                    products
                    .filter((_, idx)=> idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </CategoryPreviewDiv>
        </CategoryPreviewContainer>
    )
};

export default CategoryPreview;