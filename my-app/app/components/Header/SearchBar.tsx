import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PRODUCTS_QUERY } from "@/graphql/queries";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";
import prepRoute from "../_prepRoute";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchProducts, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY
  );

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    searchProducts({
      variables: {
        input: {
          query: inputValue,
          page: 1,
          pageSize: 20,
        },
      },
    });
  };

  useEffect(() => {
    const handleMouseLeave = () => {
      if (!inputRef.current?.contains(document.activeElement) && !searching) {
        setSearchQuery("");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [searching]);

  useEffect(() => {
    if (!!data?.searchProducts?.results?.categories) {
      setCategories(data.searchProducts.results.categories);
    }
  }, [data]);

  return (
    <div
      className="search z-50 flex items-center border-2 px-4 w-full relative max-w-md h-11 border-[#e0d7d0] rounded-lg pl-4"
      onMouseEnter={() => setSearching(true)}
      onMouseLeave={() => setSearching(false)}
    >
      <input
        ref={inputRef}
        className="h-full w-full outline-none"
        type="text"
        placeholder="Rechercher..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <span
        className="flex items-center right-0 absolute justify-center cursor-pointer h-full w-20 bg-mediumBeige"
        onClick={() => {
          router.push(`/Collections?query=${searchQuery}`, { scroll: false });
        }}
      >
        <CiSearch className="size-7 text-white" />
      </span>
      {data && searching && (
        <div className="bg-white border w-full left-0 absolute top-11 z-50 overflow-y-scroll max-h-80 py-2 pl-4">
          {categories && (
            <ul className="border-b-black mb-5">
              <h3 className="font-bold tracking-wider ">
                Catégories ({categories.length})
              </h3>

              {categories.length ? (
                categories.map((category: any) => (
                  <Link href={`/Collections/tunisie?category=${category.id}`}>
                    <li
                      key={category.id}
                      className="py-2  border-b hover:opacity-75 h-full w-full transition-opacity border-b-gray-300  cursor-pointer"
                    >
                      {category.name}
                    </li>
                  </Link>
                ))
              ) : (
                <p className="font-light pt-2 w-64 md:w-full">
                  Aucune catégorie correspondant à ce nom n'est disponible.{" "}
                </p>
              )}
            </ul>
          )}

          <ul className="border-b-black  mb-5">
            <h3 className="font-bold tracking-wider">
              Produits ({data.searchProducts.results.products.length})
            </h3>

            {data.searchProducts.results.products.length ? (
              data.searchProducts.results.products.map((result: Product) => (
                <div>
                  <Link
                    key={result.id}
                    href={{
                      pathname: `/products/tunisie/${prepRoute(result?.name)}`,
                      query: {
                        productId: result?.id,
                        collection: [
                          result?.categories[0]?.name,
                          result?.categories[0]?.id,
                          result?.categories[0]?.subcategories[0]?.name,
                          result?.categories[0]?.subcategories[0]?.id,
                          result?.categories[0]?.subcategories[0]
                            ?.subcategories[1]?.name,
                          result?.categories[0]?.subcategories[0]
                            ?.subcategories[1]?.id,
                          result?.name,
                        ],
                      },
                    }}
                    className="flex items-center relative  border-b hover:opacity-75 h-full w-full transition-opacity border-b-gray-300  cursor-pointer"
                  >
                    {result.productDiscounts.length > 0 && (
                      <p className="bg-red-500 py-1 px-2 absolute right-1 top-1 text-white text-xs">
                        PROMO!
                      </p>
                    )}
                    <Image
                      width={80}
                      height={80}
                      src={result.images[0]}
                      alt="product img"
                    />
                    <div className="text-sm flex flex-col">
                      <p className="w-4/5">{result.name}</p>
                      <div className="flex gap-3">
                        <span className="font-bold">
                          {result.productDiscounts.length > 0
                            ? `À partir de : ${result.productDiscounts[0].newPrice.toFixed(3)}`
                            : result.price.toFixed(3)}
                          TND
                        </span>
                        {result.productDiscounts.length > 0 && (
                          <span className="font-bold line-through">
                            {result.price.toFixed(3)} TND
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="font-light pt-2 w-64 md:w-full ">
                Désolé, aucun produit n'est répertorié sous cette catégorie ou
                ce nom.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
