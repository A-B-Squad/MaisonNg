"use client";
import SideAds from "@/app/components/adverstissment/SideAds";
import AdsCarousel from "@/components/adverstissment/carousel";
import Left from "@/components/adverstissment/Left";
import Right from "@/components/adverstissment/Right";
import Services from "./_components/services";
import ProductTabs from "@/components/ProductCarousel/productTabs";
import { gql, useQuery } from "@apollo/client";
import FullWidth from "@/components/adverstissment/FullWidth";
const Home = () => {
  const TAKE_6_PRODUCTS = gql`
    query Products($limit: Int!) {
      products(limit: $limit) {
        id
        name
        price
        reference
        description
        createdAt
        categories {
          name
        }
        ProductColorImage {
          images
          Colors {
            color
            Hex
          }
        }
        productDiscounts {
          price
          newPrice
          Discount {
            percentage
          }
        }
      }
    }
  `;
  const { loading: loadingNewProduct, data } = useQuery(TAKE_6_PRODUCTS, {
    variables: { limit: 6 },
  });

  const SIDE_ADS_NEW_PRODUCT = gql`
    query Query($position: String!) {
      advertismentByPosition(position: $position) {
        images
        link
      }
    }
  `;
  const { loading: loadingAdsNewProduct, data: leftAds } = useQuery(
    SIDE_ADS_NEW_PRODUCT,
    { variables: { position: "left_new_product" } }
  );

  return (
    <div className="Home py-14 flex min-h-screen flex-col items-center px-8 ">
      <div className="container">
        <section className="flex justify-center  md:flex-row flex-col gap-6 items-center">
          <Left />
          <AdsCarousel />
          <Right />
        </section>
        <Services />
        <div className="nouveaux-product-parent-tabs  mt-10 flex gap-3 ">
          <SideAds
            adsLoaded={loadingAdsNewProduct}
            image={leftAds?.advertismentByPosition?.images[0]}
            link={leftAds?.advertismentByPosition?.link}
          />

          <ProductTabs
            title={"nouveaux Produits"}
            data={data}
            loadingNewProduct={loadingNewProduct}
          />
        </div>
        <FullWidth />
        <div className="A_20DT">
          <ProductTabs
            title={"l'essentiel a 20DT"}
            data={data}
            loadingNewProduct={loadingNewProduct}
          />
        </div>
        <FullWidth />
        <div className="Promotion mt-10 flex gap-3">
          <div className="flex flex-col w-1/3 gap-5">
            <SideAds
              adsLoaded={loadingAdsNewProduct}
              image={leftAds?.advertismentByPosition?.images[0]}
              link={leftAds?.advertismentByPosition?.link}
            />
            <SideAds
              adsLoaded={loadingAdsNewProduct}
              image={leftAds?.advertismentByPosition?.images[0]}
              link={leftAds?.advertismentByPosition?.link}
            />
          </div>
          <ProductTabs
            title={"offre de moment"}
            data={data}
            loadingNewProduct={loadingNewProduct}
          />
        </div>
        <div className="servise_client flex gap-5 py-10">
          <div className="bg-mediumBeige w-full h-52">
            Service clent image 1
          </div>
          <div className="bg-mediumBeige w-full h-52">
            Service clent image 2
          </div>
          <div className="bg-mediumBeige w-full h-52">
            Service clent image 3
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
