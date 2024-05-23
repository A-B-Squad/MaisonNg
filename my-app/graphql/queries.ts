import { gql } from "@apollo/client";

export const PRODUCT_BY_ID_QUERY = gql`
  query ProductById($productByIdId: ID!) {
    productById(id: $productByIdId) {
      id
      name
      price
      isVisible
      reference
      description
      inventory
      solde
      images
      createdAt
      productDiscounts {
        id
        price
        newPrice
        dateOfEnd
        dateOfStart
      }
      Colors {
        id
        id
        color
        Hex
      }

      attributes {
        id
        name
        value
      }
    }
  }
`;
export const GET_PRODUCT_IMAGES_QUERY = gql`
  query Query($productId: String!, $colorId: String!) {
    getProductImages(productId: $productId, colorId: $colorId)
  }
`;
export const GET_REVIEW_QUERY = gql`
  query ProductReview($productId: ID!) {
    productReview(productId: $productId) {
      id
      rating
      userId
    }
  }
`;
export const GET_USER_REVIEW_QUERY = gql`
query ProductReview($productId: ID!, $userId: ID) {
  productReview(productId: $productId, userId: $userId) {
    id
    rating
  }
}
`;
export const BASKET_QUERY = gql`
  query BasketByUserId($userId: ID!) {
    basketByUserId(userId: $userId) {
      id
      userId
      quantity
      Product {
        id
        name
        price
        images
        productDiscounts {
        price
        newPrice
        Discount {
          percentage
        }
      }
        categories {
          id
          name
          subcategories {
            id
            name
            subcategories {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const TAKE_10_PRODUCTS_BY_CATEGORY = gql`
  query productsByCategory($categoryName: String!,$limit: Int!) {
    productsByCategory(categoryName: $categoryName, limit: $limit) {
      id
      name
      price
      reference
      description
      createdAt
      inventory
      images
      categories {
        id
        name
        subcategories {
          id
          name
          parentId
          subcategories {
            id
            name
            parentId
          }
        }
      }
      Colors {
        id
        color
        Hex
      }
      attributes {
        id
        name
        value
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

export const TOP_DEALS = gql`
  query AllDeals {
    allDeals {
      product {
        id
        name
        price
        reference
        description
        createdAt
        inventory
        images
        attributes {
          name
          value
        }
        categories {
          id
          name
          subcategories {
            id
            name
            parentId
            subcategories {
              id
              name
              parentId
            }
          }
        }
        Colors {
          id
          color
          Hex
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
  }
`;
export const CLIENT_SERVICES = gql`
  query Query($position: String!) {
    advertismentByPosition(position: $position) {
      images
      link
    }
  }
`;
export const ADVERTISSMENT_QUERY = `
  query AdvertismentByPosition($position: String!) {
    advertismentByPosition(position: $position) {
      images
      link
    }
  }
`;
export const CATEGORY_QUERY = gql`
  query Categories {
    categories {
      id
      name
      subcategories {
        id
        name
        parentId
        subcategories {
          id
          name
          parentId
        }
      }
    }
  }
`;



export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($input: ProductSearchInput!) {
    searchProducts(input: $input) {
      results {
        products {
          id
          name
          price
          isVisible
          reference
          description
          inventory
          solde
          categories {
            id
            name
            subcategories {
              id
              name
              parentId
              subcategories {
                id
                name
                parentId
              }
            }
          }
          Colors {
            id
            color
            Hex
          }
          productDiscounts {
            price
            newPrice
            Discount {
              percentage
            }
          }
          images
          createdAt
        }
        categories {
          id
          name
        }
      }
      totalCount
    }
  }
`;

export const FAVORITE_PRODUCTS_QUERY = gql`
  query Product($userId: ID!) {
    favoriteProducts(userId: $userId) {
      Product {
        id
        name
        price
        isVisible
        reference
        description
        inventory
        solde
        images
        createdAt
        categories {
          id
          name
          subcategories {
            id
            name
            subcategories {
              id
              name
            }
          }
        }
        productDiscounts {
          id
          price
          newPrice
        }
      }
    }
  }
`;

export const BEST_SALES_QUERY = gql`
  query GetBestSales {
    getBestSales {
      Product {
        id
        name
        images
        description
        price
        productDiscounts {
          newPrice
          price
          Discount {
            id
            percentage
          }
        }
        categories {
          id
          name
          subcategories {
            id
            name
            parentId
            subcategories {
              id
              name
              parentId
            }
          }
        }
      }
      Category {
        id
        name
      }
    }
  }
`;
export const GET_FAVORITE_STATUS = gql`
  query FavoriteProducts($userId: ID!) {
    favoriteProducts(userId: $userId) {
      id
      productId
    }
  
}
`;
export const GET_BRANDS = gql`
query FetchBrands {
  fetchBrands {
  id
  logo
  }
}

`;
export const COMPANY_INFO_QUERY = gql`
  query CompanyInfo {
    companyInfo {
      id
      phone
      deliveringPrice
      logo
      facebook
      instagram
    }
  }
`;
export const GET_PACKAGES_BY_USER_ID = gql`
 query PackageByUserId($userId: ID!) {
  packageByUserId(userId: $userId) {
    id
    Checkout {
      products {
        productId
        product {
        name
      }
      }
    }
    status
    createdAt
  }
}

`;
export const GET_PACKAGES_BY_ID = gql`
 query PackageByUserId($packageId: ID!) {
  packageById(packageId: $packageId) {
    id
    Checkout {
      products {
        productId
        product {
        name
      }
      }
    }
    status
    createdAt
  }
}


`;

//  QUERY TO FETCH DIRECT WITHOUT GQL
export const TAKE_6_PRODUCTS_PRICE_20 = `
  query ProductsLessThen20($limit: Int!) {
    productsLessThen20(limit: $limit) {
      id
      name
      price
      reference
      description
      createdAt
      inventory
      images
      categories {
        id
        name
        subcategories {
          id
          name
          parentId
          subcategories {
            id
            name
            parentId
          }
        }
      }
      Colors {
        id
        color
        Hex
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
export const SIDE_ADS_NEW_PRODUCT = `
  query Query($position: String!) {
    advertismentByPosition(position: $position) {
      images
      link
    }
  }
`;
export const ALL_BRANDS = `
  query FetchBrands {
    fetchBrands {
      id
      name
      logo
      product {
        id
      }
    }
  }
`;
export const GET_GOVERMENT_INFO = `

query AllGovernorate {
  allGovernorate {
    id
    name
  }
}

`;
export const CONTENT_VISIBILITY = `

query GetSectionVisibility($section: String!) {
  getSectionVisibility(section: $section) {
  section
  visibility_status  
  }
}

`;
export const TAKE_6_PRODUCTS = `
  query Products($limit: Int!) {
    products(limit: $limit) {
      id
      name
      price
      reference
      description
      createdAt
      inventory
      images
      categories {
        id
        name
        subcategories {
          id
          name
          parentId
          subcategories {
            id
            name
            parentId
          }
        }
      }
      Colors {
        id
        color
        Hex
      }
      attributes {
        id
        name
        value
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
export const TAKE_6_PRODUCTS_IN_DISCOUNT = `
  query ProductsDiscounts($limit: Int) {
    productsDiscounts(limit: $limit) {
      id
      name
      price
      reference
      description
      createdAt
      inventory
      images
      categories {
        id
        name
        subcategories {
          id
          name
          parentId
          subcategories {
            id
            name
            parentId
          }
        }
      }
      attributes {
        id
        name
        value
      }
      Colors {
        id
        color
        Hex
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
export const COLORS_QUERY = `
  query Colors {
    colors {
      id
      color
      Hex
    }
  }
`;