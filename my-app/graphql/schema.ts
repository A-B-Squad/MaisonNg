export const typeDefs = `#graphql 
# Define the role enumeration
enum Role {
  USER
  ADMIN
}

# Define the User type
type User {
  id: ID!
  fullName: String!
  password: String!
  email: String!
  role: Role!
  number: String!
  baskets: [Basket]!
  reviews: [Review]!
  favoriteProducts: [FavoriteProducts]!
}

# Define the Category type
type Category {
  id: ID!
  name: String!
  parentId: ID!
  parent: Category!
  products: [Product!]!
  subcategories: [Category!]!
}

# Define the Product type
type Product {
  id: ID!
  name: String!
  price: Float!
  isVisible: Boolean!
  reference: String!
  description: String!
  inventory: Int!
  images: [String!]!
  createdAt: String!
  categories: [Category!]!
  productDiscounts: [ProductDiscount!]!
  baskets: [Basket!]!
  reviews: [Review!]!
  favoriteProducts: [FavoriteProducts!]!
  colors: Colors!
  variants: [Variant!]!
  attributes: [ProductAttribute!]!
}

# Define the Colors type
type Colors {
  id: ID!
  color: String!
  product: [Product!]!
}

# Define the Discount type
type Discount {
  id: ID!
  price: Float!
  discount: Int!
  newPrice: Float!
  productDiscounts: [ProductDiscount!]!
  dateOfStart: String!
  dateOfEnd: String!
}

# Define the ProductDiscount type
type ProductDiscount {
  id: ID!
  discount: Discount!
  discountId: ID!
  product: Product!
  productId: ID!
}

# Define the Basket type
type Basket {
  id: ID!
  userId: ID!
  user: User!
  products: [Product!]!
  checkout: [Checkout!]!
}

# Define the Checkout type
type Checkout {
  id: ID!
  basketId: ID!
  basket: Basket!
  status: String!
}

# Define the Review type
type Review {
  id: ID!
  rating: Float!
  userId: ID!
  user: User!
  productId: ID!
  Product: Product!
}

# Define the FavoriteProducts type
type FavoriteProducts {
  id: ID!
  userId: ID!
  user: User!
  productId: ID!
  product: Product!
}

# Define the Variant type
type Variant {
  id: ID!
  name: String!
  description: String!
  productId: ID!
  product: Product!
}

# Define the ProductAttribute type
type ProductAttribute {
  id: ID!
  name: String!
  value: String!
  productId: ID!
  product: Product!
}

# Define the Query type
type Query {
  # Fetch all products
  products: [Product!]!
  
  # Fetch products by category name
  productsByCategory(categoryName: String!): [Product!]!

  # Fetch a product by its ID
  productById(id: ID!): Product!

  # Fetch all categories
  categories: [Category!]!

  # Fetch subcategories by parent category ID
  subcategoriesByParentId(parentId: ID!): [Category!]!

  # Fetch a category by its name
  categoryByName(categoryName: String!): Category!

  # Fetch the basket of a user by user ID
  basketByUserId(userId: ID!): Basket!

  # Fetch the checkout information by basket ID
  checkoutById(basketId: ID!): Checkout!

  # Fetch product discount information by product ID
  productDiscount(productId: ID!): ProductDiscount!

  # Fetch all product discounts
  productsDiscounts: [ProductDiscount!]!

  # Fetch product review information by product ID
  productReview(productId: ID!): Review!

  # Fetch favorite products of a user by user ID
  favoriteProducts(userId: ID!): FavoriteProducts!

  # Fetch product variants by product ID
  productVariants(productId: ID!): Variant!

  # Fetch product colors by product ID
  productColors(productId: ID!): Colors!

  # Fetch product attributes by product ID
  productAttributes(productId: ID!): ProductAttribute!
}

# Define the Mutation type
type Mutation {
  # User mutations
  signUp(input: SignUpInput!): AuthPayload!
  signIn(input: SignInInput!): AuthPayload!

  # Product mutations
  createProduct(input: CreateProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
  deleteProduct(id: ID!): Product!

  # Basket mutations
  addToBasket(userId: ID!, productId: ID!): Basket!
  removeProductFromBasket(userId: ID!, productId: ID!): Basket!

  # Category mutations
  createCategory(input: CreateCategoryInput!): Category!
  updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
  deleteCategory(id: ID!): Category!

  # Subcategory mutations
  createSubcategory(input: CreateSubcategoryInput!): Category!
  updateSubcategory(id: ID!, input: UpdateCategoryInput!): Category!
  deleteSubcategory(id: ID!): Category!
}

# Define the SignUpInput input type
input SignUpInput {
  fullName: String!
  email: String!
  password: String!
  number: String!
}

# Define the SignInInput input type
input SignInInput {
  email: String!
  password: String!
}

# Define the AuthPayload type
type AuthPayload {
  token: String!
  user: User!
}

# Define the CreateProductInput input type
input CreateProductInput {
  name: String!
  price: Float!
  isVisible: Boolean!
  reference: String!
  description: String!
  inventory: Int!
  images: [String!]!
  categoryIds: [ID!]!
}

# Define the UpdateProductInput input type
input UpdateProductInput {
  name: String
  price: Float
  isVisible: Boolean
  reference: String
  description: String
  inventory: Int
  images: [String!]
  categoryIds: [ID!]
}

# Define the CreateCategoryInput input type
input CreateCategoryInput {
  name: String!
  parentId: ID
}

# Define the UpdateCategoryInput input type
input UpdateCategoryInput {
  name: String
  parentId: ID
}

# Define the SubcategoryInput input type
input CreateSubcategoryInput {
  name: String!
  parentId: ID!
}


`;