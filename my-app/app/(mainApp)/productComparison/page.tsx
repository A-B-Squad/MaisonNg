"use client";
import React, { useEffect, useState } from "react";
import { useComparedProductsStore } from "@/app/store/zustand";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { gql, useMutation } from "@apollo/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";

interface DecodedToken extends JwtPayload {
  userId: string;
}

const ProductComparison = () => {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const { products, removeProductFromCompare } = useComparedProductsStore(
    (state) => ({
      products: state.products,
      removeProductFromCompare: state.removeProductFromCompare,
    })
  );

  useEffect(() => {
    const token = Cookies.get("Token");
    if (token) {
      const decoded = jwt.decode(token) as DecodedToken;
      setDecodedToken(decoded);
    }
  }, []);

  const ADD_TO_BASKET = gql`
    mutation AddToBasket($input: CreateToBasketInput!) {
      addToBasket(input: $input) {
        id
        userId
        quantity
        productId
      }
    }
  `;

  const [addToBasket] = useMutation(ADD_TO_BASKET);

  return (
    <>
      {products.length > 0 ? (
        <div className="relative overflow-x-auto p-8">
          <h1 className="font-bold text-2xl">
            Compare Produits ({products?.length})
          </h1>
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-gray-700 uppercase  ">
              <tr>
                {products.map((product: any) => (
                  <th scope="col" className="px-2 py-1">
                    <div className="relative m-2 flex w-[40rem] max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                      <a
                        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                        href="#"
                      >
                        <img
                          className="object-cover"
                          src={product.images[0]}
                          alt="product image"
                        />
                      </a>
                      <div className="mt-4 px-5 pb-5">
                        <a href="#">
                          <h5 className="text-xl tracking-tight text-slate-900">
                            {product.name}
                          </h5>
                        </a>
                        <div className="mt-2 mb-5 flex items-center justify-between">
                          <p>
                            <span className="text-3xl font-bold text-slate-900">
                              {product.productDiscounts
                                ? product.productDiscounts[0].newPrice
                                : product.price}{" "}
                              DT
                            </span>
                            {product.productDiscounts && (
                              <span className="text-sm text-slate-900 line-through">
                                {product.price} DT
                              </span>
                            )}
                          </p>
                          <p
                            className="text-red-700 flex items-center justify-center gap-2 cursor-pointer"
                            onClick={() => {
                              removeProductFromCompare(product.id);
                            }}
                          >
                            {" "}
                            <FaRegTrashAlt />
                            Supprimer
                          </p>
                        </div>
                        <button
                          className="flex items-center justify-center rounded-md bg-strongBeige px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-mediumBeige focus:outline-none focus:ring-4 focus:ring-blue-300"
                          onClick={() => {
                            addToBasket({
                              variables: {
                                input: {
                                  userId: "aaa",
                                  quantity: 1,
                                  productId: product.id,
                                },
                              },
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          Ajouter au panier
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-200 border-b">
                <th
                  scope="row"
                  className="px-6 py-4  font-bold text-gray-900 whitespace-nowrap "
                >
                  Prix
                </th>
                {products.map((product: any) => (
                  <td className="px-6 py-4">{product?.price} DT</td>
                ))}
              </tr>
              <tr className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap"
                >
                  Description
                </th>
                {products.map((product: any) => (
                  <td className="px-6 py-4">{product?.description}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <HiX  className="text-red-400 text-[10rem]"/>
            <h1 className="text-red-400 text-2xl">Aucun  produit à comparé !</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductComparison;