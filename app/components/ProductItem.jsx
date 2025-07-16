import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { AddToCartButton } from './AddToCartButton';

/**
 * @param {{
 *   product:
 *     | CollectionItemFragment
 *     | ProductItemFragment
 *     | RecommendedProductFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
export function ProductItem({ product, loading }) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  // Try to get the first variant ID (if available)
  const firstVariant = product.variants?.nodes?.[0];
  const canAddToCart = Boolean(firstVariant && firstVariant.id && firstVariant.availableForSale !== false);
  return (
    <div className="product-item-card">
      <Link
        className="product-item"
        key={product.id}
        prefetch="intent"
        to={variantUrl}
      >
        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        )}
      </Link>
      <div className='product-item-text'>
        <h4>{product.title}</h4>
        <small className='product-item-price-atc'>
          <Money className='card-price' data={product.priceRange.minVariantPrice} />
          <AddToCartButton
            disabled={!canAddToCart}
            lines={canAddToCart ? [{ merchandiseId: firstVariant.id, quantity: 1 }] : []}
          >
            {canAddToCart ? 'Add to cart' : 'Unavailable'}
          </AddToCartButton>
        </small>
      </div>
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */
