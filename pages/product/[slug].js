import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, status, _id } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  console.log(product)

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }

  const mutations = [{
    createOrReplace: {
      _id: product._id,
      _type: 'product',
      status: 'TESTE',
      details: product.details,
      image: product.image,
      name: product.name,
      slug: product.slug
    }
  }]


  const teste = (mutations) => {
    fetch(`https://3yun1dl7.api.sanity.io/v2022-09-10/data/mutate/production`, {
    method: 'post',
    headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer skVkmzVFSsgsXMpkfQWdXweJSm0mzN4hE0M5giHyy4BEmzSG8uaYHB6E2NeDYmoa9vs5mRSdSkRFrunMfZV5ywhIZezgPhVfgVbw44LZvZH1ypSV0OuOMnbfVlVzY6x5p7fonb6td6psb5yH1yXWqWaN0S9HlhBwyJbaCpbMo6S43deqbhzJ`
  },
  body: JSON.stringify({mutations})
})
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.error(error))
   
  }



  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          {status !== 'VENDIDO' ?
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div> : 
          <div className="buttons">
            {/* <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button> */}
            <button type="button" className="buy-now" onClick={() => teste(mutations)}>PRODUTO INDISPONÍVEL</button>
          </div> 
          }
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                item.status !== 'VENDIDO'?<Product key ={item._id} product={item}/>:''
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product }
  }
}

export default ProductDetails