"use client";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { FaPlus, FaRegHeart, FaStar } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import {
  BASKET_QUERY,
  GET_REVIEW_QUERY,
  GET_USER_REVIEW_QUERY,
  TAKE_10_PRODUCTS_BY_CATEGORY,
} from "../../../../graphql/queries";
import { AiTwotoneAlert } from "react-icons/ai";

import ProductTabs from "@/app/components/ProductCarousel/productTabs";
import { GoAlertFill, GoGitCompare } from "react-icons/go";
import {
  ADD_RATING_MUTATION,
  ADD_TO_BASKET_MUTATION,
  ADD_TO_FAVORITE_MUTATION,
} from "../../../../graphql/mutations";
import Breadcumb from "../../../components/Breadcumb";
import PopHover from "../../../components/PopHover";
import ProductDetailsDrawer from "./Components/productDetailsDrawer";
import { useToast } from "@/components/ui/use-toast";
import Loading from "./loading";
import {
  useBasketStore,
  useComparedProductsStore,
  useDrawerBasketStore,
  useProductsInBasketStore,
} from "../../../store/zustand";
import Image from "next/legacy/image";
import moment from "moment-timezone";
import TitleProduct from "@/app/components/ProductCarousel/titleProduct";
import { HiOutlineBellAlert } from "react-icons/hi2";
interface DecodedToken extends JwtPayload {
  userId: string;
}

const ProductDetails = ({ productDetails, productId }: any) => {
  const DEFAULT_TIMEZONE = "Africa/Tunis";
  const { toast } = useToast();
  const [bigImage, setBigImage] = useState<any>(null);
  const [smallImages, setSmallImages] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<any>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [discount, setDiscount] = useState<any>(null);
  const [reviews, setReviews] = useState<number>(0);
  const [userReviews, setUserReviews] = useState<number>(0);
  const [oneStar, setOneStar] = useState<number>(0);
  const [twoStar, setTwoStar] = useState<number>(0);
  const [threeStar, setThreeStar] = useState<number>(0);
  const [fourStar, setFourStar] = useState<number>(0);
  const [fiveStar, setFiveStar] = useState<number>(0);
  const [actualQuantity, setActualQuantity] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(0);
  const [attributes, setAttributes] = useState<any>(null);
  const [showPopover, setShowPopover] = useState<Boolean>(false);
  const [popoverTitle, setPopoverTitle] = useState("");
  const [isBottom, setIsBottom] = useState<Boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const { openBasketDrawer } = useDrawerBasketStore();
  const [getReviews] = useLazyQuery(GET_REVIEW_QUERY);
  const [getUserReviews] = useLazyQuery(GET_USER_REVIEW_QUERY);
  const [addToBasket] = useMutation(ADD_TO_BASKET_MUTATION);
  const [addToFavorite] = useMutation(ADD_TO_FAVORITE_MUTATION);

  const { loading: loadingNewProduct, data: Products_10_by_category } =
    useQuery(TAKE_10_PRODUCTS_BY_CATEGORY, {
      variables: {
        limit: 10,
        categoryName:
          productDetails?.categories?.[0]?.subcategories?.[0]
            ?.subcategories?.[1]?.name || "",
      },
    });

  useEffect(() => {
    setBigImage(productDetails.images[0]);
    setSmallImages(productDetails.images);
    setDiscount(productDetails.productDiscounts[0]);
    setAttributes(productDetails.attributes);
    setQuantity(productDetails.inventory);
  }, []);

  const [addRating] = useMutation(ADD_RATING_MUTATION);

  const handleMouseEnter = (title: any) => {
    setShowPopover(true);
    setPopoverTitle(title);
  };

  const handleMouseLeave = () => {
    setShowPopover(false);
    setPopoverTitle("");
  };
  const toggleIsUpdated = useBasketStore((state) => state.toggleIsUpdated);

  const { addProductToCompare, productsInCompare } = useComparedProductsStore(
    (state) => ({
      addProductToCompare: state.addProductToCompare,
      productsInCompare: state.products,
    })
  );

  const { addProductToBasket, products } = useProductsInBasketStore(
    (state) => ({
      addProductToBasket: state.addProductToBasket,
      products: state.products,
    })
  );

  const AddToBasket = (product: any) => {
    if (decodedToken) {
      addToBasket({
        variables: {
          input: {
            userId: decodedToken?.userId,
            quantity: actualQuantity,
            productId: product.id,
          },
        },
        refetchQueries: [
          {
            query: BASKET_QUERY,
            variables: { userId: decodedToken?.userId },
          },
        ],
      });
    } else {
      const isProductAlreadyInBasket = products.some(
        (p: any) => p.id === product?.id
      );
      if (!isProductAlreadyInBasket) {
        addProductToBasket({
          ...product,
          price:
            product.productDiscounts.length > 0
              ? product?.productDiscounts[0]?.newPrice
              : product?.price,
          actualQuantity: 1,
        });
      } else {
        console.log("Product is already in the basket");
      }
    }
    toggleIsUpdated();
    openBasketDrawer();
  };

  useEffect(() => {
    getReviews({
      variables: { productId: productId },
      onCompleted: (data) => {
        setReviews(data.productReview.length);
        setOneStar(
          data.productReview.filter(
            (review: { rating: number }) => review?.rating === 1
          ).length
        );
        setTwoStar(
          data.productReview.filter(
            (review: { rating: number }) => review?.rating === 2
          ).length
        );
        setThreeStar(
          data.productReview.filter(
            (review: { rating: number }) => review?.rating === 3
          ).length
        );
        setFourStar(
          data.productReview.filter(
            (review: { rating: number }) => review?.rating === 4
          ).length
        );
        setFiveStar(
          data.productReview.filter(
            (review: { rating: number }) => review?.rating === 5
          ).length
        );
      },
    });
    getUserReviews({
      variables: { productId: productId, userId: decodedToken?.userId },
      onCompleted: (data) => {
        setUserReviews(data.productReview[0]?.rating);
      },
    });
  }, [rating]);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = smallImages?.indexOf(bigImage);
      if (currentIndex !== -1 && currentIndex < smallImages?.length - 1) {
        setBigImage(smallImages[currentIndex + 1]);
      } else {
        setBigImage(smallImages[0]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [bigImage, smallImages]);

  useEffect(() => {
    const token = Cookies.get("Token");
    if (token) {
      const decoded = jwt.decode(token) as DecodedToken;
      setDecodedToken(decoded);
    }
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      // Calculate the position halfway through the window
      const halfwayPosition = windowHeight / 2;

      // Check if the scroll position is greater than or equal to halfway
      const isHalfway = scrollPosition >= halfwayPosition;

      setIsBottom(isHalfway);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Detach the scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      if (discount) {
        const now = moment().tz(DEFAULT_TIMEZONE);
        const targetDate = moment.tz(
          parseInt(discount.dateOfEnd),
          DEFAULT_TIMEZONE
        );
        targetDate.subtract(1, "hours");

        const timeUntilTarget = targetDate.diff(now);
        setCountdown(timeUntilTarget > 0 ? timeUntilTarget : 0);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [discount]);

  const addToCompare = (product: any) => {
    const isProductAlreadyInCompare = productsInCompare.some(
      (p: any) => p.id === product.id
    );

    if (!isProductAlreadyInCompare) {
      addProductToCompare(product);
    } else {
      toast({
        title: "Produit ajouté à la comparaison",
        description: `Le produit "${productDetails?.name}" a été ajouté à la comparaison.`,
        className: "bg-primaryColor text-white",
      });
    }
  };
  const handleToggleFavorite = () => {
    if (!decodedToken?.userId) {
      toast({
        title: "Produit ajouté aux favoris",
        description:
          "Vous devez vous connecter pour ajouter un produit aux favoris.",
        className: "bg-red-800 text-white",
      });
      return;
    }
    addToFavorite({
      variables: {
        input: {
          userId: decodedToken?.userId,
          productId: productId,
        },
      },
      onCompleted: () => {
        toast({
          title: "Produit ajouté aux favoris",
          description: `Le produit "${productDetails?.name}" a été ajouté à vos favoris.`,
          className: "bg-primaryColor text-white",
        });
      },
    });
  };

  return (
    <div className="productDetails">
      <div className="container relative  ">
        {!productDetails ? (
          <Loading />
        ) : (
          <div>
            <Breadcumb />

            <div className="grid items-start mx-auto grid-cols-12 w-full md:w-11/12 place-items-center lg:place-content-between bg-white md:p-4 border rounded-sm  ">
              <div className=" flex lg:flex-row flex-col  items-center bg-white col-span-12 lg:col-span-6 w-full text-center">
                <div className="relative shadow-sm overflow-hidden    flex items-center justify-center w-full md:w-[556px] h-[400px] md:h-[556px] rounded-sm">
                  <InnerImageZoom
                    className=" h-fit flex items-center justify-center rounded "
                    zoomSrc={bigImage || ""}
                    src={bigImage || ""}
                    zoomType="hover"
                  />
                  <span
                    className={
                      "absolute top-2 right-0 p-2  bg-green-500 text-xs font-400 text-white"
                    }
                  >
                    {productDetails?.inventory > 0
                      ? "EN STOCK"
                      : "RUPTURE DE STOCK  "
                        ? productDetails?.inventory == 1
                        : "DERNIER ARTICLE EN STOCK"}
                  </span>
                </div>
                <div className="mt-6 flex lg:flex-col items-center justify-center gap-3 px-2 py-2 ">
                  {smallImages?.map((image: string, index: number) => (
                    <div
                      key={index}
                      className={`${image === bigImage ? "border-secondaryColor" : ""} cursor-pointer border-b-2  h-fit   flex p-1`}
                    >
                      <Image
                        width={90}
                        height={90}
                        objectFit="contain"
                        src={image}
                        alt="Product2"
                        onMouseEnter={() => {
                          setBigImage(image);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="product lg:col-span-6 col-span-12 p-3 w-full ">
                <h2 className="product_name tracking-wider text-2xl w-fit font-semibold ">
                  {productDetails?.name}
                </h2>

                <div className="discount flex    flex-col  gap-1 mt-4">
                  <p className="text-primaryColor tracking-wide text-3xl font-bold">
                    {discount
                      ? discount.newPrice.toFixed(3)
                      : productDetails?.price.toFixed(3)}{" "}
                    <span className="text-2xl ">TND</span>
                    {!discount && (
                      <span className="text-sm text-gray-400 ml-2 font-medium">
                        TTC
                      </span>
                    )}
                  </p>

                  {discount && countdown && (
                    <>
                      <div className="text-gray-400 tracking-wide flex items-center text-xl gap-2">
                        <p className="line-through text-gray-700 font-semibold">
                          {discount.price.toFixed(3)} TND
                        </p>{" "}
                        <p className="text-sm bg-blue-800 text-white p-1">
                          Économisez
                          <span className="font-bold ml-1 ">
                            {(discount.price - discount.newPrice).toFixed(3)}{" "}
                            TND
                          </span>
                        </p>
                        <span className="text-sm">TTC</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {countdown ? (
                          <>
                            La réduction se termine dans :{" "}
                            <span className="font-semibold">
                              {Math.floor(countdown / (1000 * 60 * 60 * 24))}{" "}
                              jrs,{" "}
                              {Math.floor(
                                (countdown % (1000 * 60 * 60 * 24)) /
                                  (1000 * 60 * 60)
                              )}{" "}
                              hrs,{" "}
                              {Math.floor(
                                (countdown % (1000 * 60 * 60)) / (1000 * 60)
                              )}{" "}
                              mins,{" "}
                              {Math.floor((countdown % (1000 * 60)) / 1000)}{" "}
                              secs
                            </span>
                          </>
                        ) : (
                          "La réduction a expiré"
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="Infomation_Details ">
                  <div className="Reference mt-3 flex items-center gap-1">
                    <h3 className="text-base tracking-wider font-semibold  capitalize  ">
                      Reference :
                    </h3>
                    <p className="text-gray-600">{productDetails?.reference}</p>
                  </div>

                  <div className="Description">
                    <h3 className="text-lg tracking-wider font-bold capitalize  text-primaryColor mt-5">
                      Description
                    </h3>

                    <div
                      className="product-description"
                      dangerouslySetInnerHTML={{
                        __html: productDetails?.description,
                      }}
                    />
                  </div>
                </div>

                <div className={` user_interaction flex flex-col gap-2 mt-8`}>
                  {actualQuantity === quantity && (
                    <div className="flex items-center text-sm gap-3 ">
                      <GoAlertFill color="red" size={20} />
                      <p className="text-red-600 font-semibold tracking-wider">
                        La quantité maximale de produits est de {actualQuantity}
                        .
                      </p>
                    </div>
                  )}
                  {quantity == 1 && (
                    <div className="flex text-sm items-center gap-3">
                      <HiOutlineBellAlert color="orange" size={20} />
                      <p className="text-red-600 font-semibold tracking-wider">
                        Attention: Il ne reste qu'un 1 article en stock.
                      </p>
                    </div>
                  )}
                  <div className="Quantity flex items-center mt-3   space-x-2">
                    <h3 className=" tracking-wider font-normal text-sm  capitalize text-primaryColor">
                      Quantité:{" "}
                    </h3>

                    <div className="flex  items-center gap-2  divide-x-0  overflow-hidden ">
                      <button
                        type="button"
                        className="bg-lightBeige hover:bg-secondaryColor transition-all w-fit h-fit  p-2  text-sm font-semibold cursor-pointer"
                        onClick={() => {
                          setActualQuantity(
                            actualQuantity > 1 ? actualQuantity - 1 : 1
                          );
                        }}
                      >
                        <RiSubtractFill />
                      </button>

                      <button
                        type="button"
                        className="bg-transparent px-4  py-2 h-full border shadow-md font-semibold  text-[#333] text-md"
                      >
                        {actualQuantity}
                      </button>
                      <button
                        type="button"
                        className={`${actualQuantity === quantity && "opacity-45"} w-fit h-fit  bg-primaryColor text-white p-2 text-sm  font-semibold cursor-pointer`}
                        disabled={actualQuantity === productDetails?.inventory}
                        onClick={() => {
                          setActualQuantity(
                            actualQuantity < productDetails?.inventory
                              ? actualQuantity + 1
                              : actualQuantity
                          );
                        }}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="addToBasket flex items-center mt-4  gap-4  ">
                    <button
                      type="button"
                      className="min-w-[250px] transition-colors  py-4  shadow-lg bg-primaryColor hover:bg-secondaryColor text-white text-sm font-bold "
                      onClick={() => {
                        AddToBasket(productDetails);
                        toast({
                          title: "Notification de Panier",
                          description: `Le produit "${productDetails?.name}" a été ajouté au panier.`,
                          className: "bg-primaryColor text-white",
                        });
                      }}
                    >
                      Ajouter au panier
                    </button>

                    <div
                      className="relative"
                      onMouseEnter={() =>
                        handleMouseEnter("Ajouter au favoris")
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      {showPopover && popoverTitle === "Ajouter au favoris" && (
                        <PopHover title={popoverTitle} />
                      )}

                      <button
                        type="button"
                        className="transition-colors bg-transparent text-primaryColor text-xl hover:text-black font-bold rounded"
                        onClick={handleToggleFavorite}
                      >
                        <FaRegHeart />
                      </button>
                    </div>

                    <div
                      className="relative"
                      onMouseEnter={() =>
                        handleMouseEnter("Ajouter au comparatif")
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      {showPopover &&
                        popoverTitle === "Ajouter au comparatif" && (
                          <PopHover title={popoverTitle} />
                        )}
                      <button
                        type="button"
                        className=" text-primaryColor hover:text-black transition-colors text-xl font-bold rounded"
                        onClick={() => {
                          addToCompare(productDetails);

                          toast({
                            title: "Produit ajouté à la comparaison",
                            description: `Le produit "${productDetails?.name}" a été ajouté à la comparaison.`,
                            className: "bg-primaryColor text-white",
                          });
                        }}
                      >
                        <GoGitCompare className="font-bold" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="Rating_stars flex  space-x-2 mt-4 items-center">
                  {[...Array(5)].map((_, index) => {
                    const currentIndex = index + 1;
                    return (
                      <label key={currentIndex}>
                        <input
                          className="hidden  "
                          type="radio"
                          name="rating"
                          value={currentIndex}
                          onClick={() => {
                            if (decodedToken?.userId) {
                              setRating(currentIndex);
                              addRating({
                                variables: {
                                  productId: productId,
                                  userId: decodedToken.userId,
                                  rating: currentIndex,
                                },
                              });
                              toast({
                                title: "Notification d'ajout d'évaluation",
                                description: `Merci d'avoir ajouté une évaluation.`,
                                className: "bg-primaryColor text-white",
                              });
                            } else {
                              toast({
                                title: "Notification d'ajout d'évaluation",
                                description: `Vous devez vous connecter pour ajouter une évaluation.`,
                                className: "bg-red-800 text-white",
                              });
                            }
                          }}
                        />
                        <FaStar
                          size={18}
                          className="cursor-pointer"
                          color={
                            currentIndex <= (hover || rating || userReviews)
                              ? "#f17e7e"
                              : "grey"
                          }
                          onMouseEnter={() => setHover(currentIndex)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                  <h4 className="text-primaryColor text-sm">
                    {reviews} Commentaires
                  </h4>
                </div>

                <div className="Rating mt-8 w-4/5">
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-primaryColor">
                      Note globale ({reviews})
                    </h3>
                    <div className="space-y-4 mt-6 w-[340px] md:w-full">
                      {[
                        { rating: 5, value: fiveStar },
                        { rating: 4, value: fourStar },
                        { rating: 3, value: threeStar },
                        { rating: 2, value: twoStar },
                        { rating: 1, value: oneStar },
                      ].map(({ rating, value }) => (
                        <div className="flex items-center gap-3" key={rating}>
                          <div className="flex items-center ">
                            <p className="text-sm font-bold">{rating}.0</p>
                            <FaStar
                              size={20}
                              className="text-primaryColor ml-1"
                            />
                          </div>
                          <div className="relative bg-gray-400 rounded-md w-full h-2 ml-3">
                            <div
                              style={{
                                width: `${(value / reviews) * 100 || 0}%`,
                              }}
                              className="h-full rounded bg-primaryColor"
                            ></div>
                          </div>
                          <p className="text-sm font-bold ">
                            {(value / reviews) * 100 || 0}%
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {attributes && (
              <div className=" my-10 mx-5 lg:mx-auto w-11/12 m-auto bg-white  shadow-md ">
                <h3 className="text-lg font-bold  text-white w-fit p-3 bg-primaryColor">
                  Information de produit
                </h3>
                <ul className="mt-6 space-y-6 text-[#333] p-6">
                  {attributes?.map((attribute: any, index: number) => (
                    <li key={index} className="text-sm pb-2 border-b">
                      {attribute.name.toUpperCase()}{" "}
                      <span className="ml-4 float-right">
                        {attribute.value.toUpperCase()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="Carousel voir aussi px-10 mb-[15%] ">
          <TitleProduct title={"Produits apparentés"} />
          <div>
            <ProductTabs
              data={Products_10_by_category?.productsByCategory}
              loadingNewProduct={loadingNewProduct}
              carouselWidthClass={
                Products_10_by_category?.productsByCategory?.length < 5
                  ? " basis-full   md:basis-1/2  "
                  : " basis-full  md:basis-1/2 lg:basis-1/3 xl:basis-1/4   xxl:basis-1/5"
              }
            />
          </div>
        </div>
        <ProductDetailsDrawer
          isBottom={isBottom}
          productId={productId}
          productDetails={productDetails}
          addToBasket={addToBasket}
          discount={discount}
          actualQuantity={actualQuantity}
          setActualQuantity={setActualQuantity}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
