"use client";
import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import {
  useDrawerBasketStore,
  useProductsInBasketStore,
  useBasketStore,
} from "../store/zustand";
import prepRoute from "../components/_prepRoute";
import { BASKET_QUERY } from "../../graphql/queries";
import { DELETE_BASKET_BY_ID_MUTATION } from "../../graphql/mutations";
interface DecodedToken extends JwtPayload {
  userId: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  quantity: number;
  basketId: string;
  categories: string[];
}

const BasketDrawer = () => {
  const { isOpen, closeBasketDrawer } = useDrawerBasketStore();

  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [productsInBasket, setProductsInBasket] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { products, removeProductFromBasket } = useProductsInBasketStore(
    (state) => ({
      products: state.products,
      removeProductFromBasket: state.removeProductFromBasket,
    })
  );
  const { isUpdated, toggleIsUpdated } = useBasketStore((state) => ({
    isUpdated: state.isUpdated,
    toggleIsUpdated: state.toggleIsUpdated,
  }));

  useEffect(() => {
    const token = Cookies.get("Token");
    if (token) {
      const decoded = jwt.decode(token) as DecodedToken;
      setDecodedToken(decoded);
      fetchProducts({
        variables: { userId: decodedToken?.userId },
        onCompleted: (data) => {
          const fetchedProducts = data.basketByUserId.map((basket: any) => ({
            ...basket.Product,
            quantity: basket.quantity,
            basketId: basket.id,
          }));

          setProductsInBasket(fetchedProducts);
          const total = fetchedProducts.reduce((acc: number, curr: Product) => {
            return acc + curr.price * curr.quantity;
          }, 0);
          setTotalPrice(total);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    } else {
      setProductsInBasket(products);
      const total = products.reduce((acc: number, curr: Product) => {
        return acc + curr.price * curr.quantity;
      }, 0);
      setTotalPrice(total);
    }
  }, [isUpdated, isOpen]);

 
  const [fetchProducts, { loading }] = useLazyQuery(BASKET_QUERY);

  const [deleteBasketById, { loading: deletingLoading }] =
    useMutation(DELETE_BASKET_BY_ID_MUTATION);

  const handleRemoveProduct = (basketId: string) => {
    const updatedProducts = productsInBasket.filter(
      (product) => product.basketId !== basketId
    );
    const updatedTotalPrice = updatedProducts.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    setTotalPrice(updatedTotalPrice);
    setProductsInBasket(updatedProducts);
    deleteBasketById({
      variables: { basketId },
      update: (cache, { data }) => {
        // Assuming `data` contains the response from your deleteBasketById mutation
        if (data?.deleteBasketById) {
          // Read the current cache data
          const existingData = cache.readQuery({
            query: BASKET_QUERY,
            variables: { userId: decodedToken?.userId },
          });

          // Manipulate the cached data to reflect the deleted product
          const updatedData = {
            ...existingData,
            basketByUserId: existingData.basketByUserId.filter(
              (basket) => basket.id !== basketId
            ),
          };

          // Write the updated data back to the cache
          cache.writeQuery({
            query: BASKET_QUERY,
            variables: { userId: decodedToken?.userId },
            data: updatedData,
          });
        }
      },
    });
  };

  return (
    <Drawer
      placement="right"
      open={isOpen}
      onClose={closeBasketDrawer}
      className="p-4 fixed"
      size={400}
      placeholder={""}
    >
      <div className="mb-6 flex items-center justify-between ">
        <Typography placeholder={""} variant="h5" color="blue-gray">
          Panier
        </Typography>
        <IconButton
          placeholder={""}
          variant="text"
          color="blue-gray"
          onClick={closeBasketDrawer}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      {productsInBasket.length > 0 ? (
        deletingLoading ? (
          <div>loading</div>
        ) : (
          <div className="flex  flex-col justify-between h-full overflow-hidden hover:overflow-y-auto">
            <div className="product-details">
              <div className="flow-root">
                <ul role="list" className=" divide-y divide-gray-200">
                  {productsInBasket.map((product, index) => (
                    <li className="flex py-6 " key={index}>
                      <div className="h-24 w-20 flex-shrink-0 rounded-md ">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex  flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link
                                href={{
                                  pathname: `productsInBasket/tunisie/${prepRoute(
                                    product.name
                                  )}`,
                                  query: {
                                    productId: product.id,
                                  },
                                }}
                              >
                                {product.name}
                              </Link>
                            </h3>
                            <p className=" ">{product.price.toFixed(3)} TND</p>
                          </div>

                          <p className="mt-1 text-sm text-gray-500">
                            {
                              (
                                product?.categories?.[
                                  product.categories.length - 1
                                ] as { name?: string }
                              )?.name
                            }
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Qty {product.quantity}
                          </p>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-strongBeige hover:text-amber-200"
                              onClick={() => {
                                if (decodedToken) {
                                  handleRemoveProduct(product.basketId);
                                } else {
                                  removeProductFromBasket(product.id);
                                  const updatedProducts = products.filter(
                                    (pr: any) => pr.id !== product.id
                                  );
                                  const updatedTotalPrice =
                                    updatedProducts.reduce((acc, curr) => {
                                      return acc + curr.price * curr.quantity;
                                    }, 0);
                                  setProductsInBasket(updatedProducts);
                                  setTotalPrice(updatedTotalPrice);
                                }
                              }}
                            >
                              Retirer
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className=" border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p> {totalPrice.toFixed(3)} TND</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Frais de port et taxes calculés à la Vérification.
              </p>
              <div className="mt-6">
                <Link
                  href={decodedToken ? "/Checkout" : "/signup"}
                  className="flex items-center justify-center transition-all rounded-md border border-transparent bg-strongBeige px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-500"
                >
                  Vérifier
                </Link>
                <Link
                  onClick={closeBasketDrawer}
                  href={decodedToken ? "/Basket" : "/signup"}
                  className="flex items-center transition-all justify-center rounded-md border border-transparent bg-lightBeige px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-500 mt-4"
                >
                  Voir Panier
                </Link>
              </div>
              <div className="mt-6 flex gap-2 justify-center text-center text-sm text-gray-500">
                <p>ou</p>
                <Link
                  href={"/Touts-Les-Produits"}
                  type="button"
                  className="font-medium text-strongBeige transition-all hover:text-mediumBeige"
                >
                  Continuer vos achats
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-xl font-semibold">Votre panier est vide</h1>
          <MdOutlineRemoveShoppingCart color="grey" size={100} />
          <button
            type="button"
            className="font-medium text-strongBeige hover:text-amber-200 mt-20"
          >
            Continuer vos achats
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </div>
      )}
    </Drawer>
  );
};

export default BasketDrawer;
