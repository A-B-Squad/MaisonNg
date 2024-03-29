export const typeDefs = `#graphql 
# Define the role enumeration
enum Role {
  USER
  ADMIN
  MODERATOR
}

# Define the status enumeration
enum Status {
  PENDING
  BACK
  EXCHANGE
  PROCESSING
  DELIVERED
}

# Define the cause enumeration
enum Cause {
  BROKEN
  COLOR
  CANCEL
}

# Define the User type
type User {
  id: ID!
  fullName: String!
  email: String!
  role: Role!
  number: String!
  baskets: [Basket]!
  reviews: [Review]!
  favoriteProducts: [FavoriteProducts]!
}

# Define the AuthPayload type
type AuthPayload {
  token: String!
  user: User!
}

# Define the Category type
type Category {
  id: ID!
  name: String!
  parentId: ID
  parent: Category
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
  solde: Int!
  images: [String!]
  createdAt: String!
  categories: [Category!]!
  productDiscount: [ProductDiscount!]
  baskets: [Basket!]
  reviews: [Review!]
  favoriteProducts: [FavoriteProducts!]
  attributes: [ProductAttribute!]!
  ProductColorImage: [ProductColorImage!]!
}

# Define the Colors type
type Colors {
  id: ID!
  color: String!
  Hex: String!
  ProductColorImage: [ProductColorImage!]!
}

type ProductColorImage {
  id:ID!
  Product: Product!
  Colors: Colors!
  images:[String!]!
}

# Define the Discount type
type Discount {
  id: ID!
  percentage: Int!
  productDiscounts: [ProductDiscount!]
}

# Define the ProductDiscount type
type ProductDiscount {
  id: ID!
  discountId: ID!
  productId: ID!
  price: Float!
  newPrice: Float!
  dateOfStart: String!
  dateOfEnd: String!
}

# Define the Basket type
type Basket {
  id: ID!
  userId: ID!
  quantity: Int!
  User: User!
  productId: ID!
  Product: Product!
  checkout: [Checkout!]!
}

# Define the Checkout type
type Checkout {
  id: ID!
  userId: ID!
  governorateId: ID!
  products: [ProductInCheckout]!
  phone: [Int!]!
  address: String!
  total: Int!
  createdAt: String!
}

# Define the ProductInCheckout type
type ProductInCheckout {
  id: ID!
  checkoutId: ID!
  productId: ID!
  productQuantity: Int!
}

# Define the input type for ProductInCheckout
input ProductInCheckoutInput {
  id: ID!
  checkoutId: ID!
  productId: ID!
  productQuantity: Int!
}

# Define the type for a product in a basket
type productInBasket {
  productId: ID!
  prductQuantity: Int!
}

# Define the Package type
type Package {
  id: ID!
  checkoutId: ID!
  status: Status!
  createdAt: String!
  Checkout: Checkout!
}

# Define the BackOrExchange type
type BackOrExchange {
  id: ID!
  cause: Cause!
  createdAt: String!
  description: String
  productId: String!
}


# Define the Review type
type Review {
  id: ID!
  rating: Float!
  userId: ID!
  user: User!
  productId: ID!
  product: Product!
}

# Define the FavoriteProducts type
type FavoriteProducts {
  id: ID!
  userId: ID!
  user: User!
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

# Define the Advertisement type
type Advertisement {
  id: ID!
  images: [String!]!
  position: String!
  link: String!
}

# Define the Governorate type
type Governorate {
  id: ID!
  name: String!
}

# Define the CompanyInfo type
type CompanyInfo {
  id: ID!
  phone: [Int!]!
  deliveringPrice: Int
  logo: String!
}

# Define the Moderator type
type Moderator {
  id: ID!
  fullName: String!
  email: String!
  number: String!
}

# Define the Query type
type Query {
  # Fetch all products
  products: [Product!]
  
  # Fetch products by category name
  productsByCategory(categoryName: String!): [Product!]

  # Fetch a product by its ID
  productById(id: ID!): Product!

  #Custom query to fetch images of products based on productId and colorId
  getProductImages(productId: String!, colorId: String!): [String!]!

  # Fetch all categories
  categories: [Category!]!

  # Fetch subcategories by parent category ID
  subcategoriesByParentId(parentId: ID!): [Category!]

  # Fetch a category by its name
  categoryByName(categoryName: String!): Category!

  # Fetch the basket of a user by user ID
  basketByUserId(userId: ID!): [Basket!]!

  # Fetch product discount information by product ID
  productDiscount(productId: ID!): ProductDiscount!

  # Fetch all product discounts
  productsDiscounts: [ProductDiscount!]

  # Fetch product review information by product ID
  productReview(productId: ID!): [Review!]
  
  # Fetch favorite products of a user by user ID
  favoriteProducts(userId: ID!): [FavoriteProducts!]

  # Fetch product colors by product ID
  productColors(productId: ID!): Colors!

  # Fetch All Governorate
  allGovernorate: [Governorate!]!

  # Fetch Advertisement By Type 
  advertismentByPosition(position: String!): Advertisement!

  # Fetch Package By ID
  packageById(packageId: ID!): Package!

  # Fetch All Package 
  getAllPackages: [Package!]

  # Fetch Company Info 
  companyInfo: CompanyInfo!
}

# Define the Mutation type
type Mutation {
  # User mutations
  signUp(input: SignUpInput!): AuthPayload!
  signIn(input: SignInInput!): AuthPayload!

  # Fetch Refresh Token
  refreshToken(Token: String!): String!
  
  # Product mutations
  createProduct(input: ProductInput!): Product!
  updateProduct(productId: ID!, input: ProductInput!): Product!
  deleteProduct(productId: ID!): String!

  # New mutation to undo product sale
  undoSellProduct(productId: ID!, quantityReturned: Int!): Product!
  
  # New mutation to handle product sale
  sellProduct(productId: ID!, quantitySold: Int!): Product

  # Product Discount mutations
  deleteProductDiscount(productId: ID!): String!
  
  # Basket mutations
  addToBasket(input: CreateToBasketInput!): Basket!
  removeProductFromBasket(productId: ID!): String!
  deleteBasketById(basketId: ID!): String!
  increaseQuantity(basketId: ID!): Basket!
  decreaseQuantity(basketId: ID!): Basket!
  
  # Checkout mutations
  createCheckout(input: CreateCheckoutInput!): Checkout!

  # Package mutations
  updatePackage(input: UpdatePackageInput!): String!
  exchangePackage(input: ExchangePackageInput!): String!
  exchangePackageProduct(input: ExchangePackageProductInput!): String!
  cancalPackage(input:CancelPackageInput! ): String!
  cancalPackageProduct(input:CancelProductPackageInput! ): String!
  
  # Category mutations
  createCategory(input: CreateCategoryInput!): Category
  updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
  deleteCategory(id: ID!): Category!

  # Mutation to add product to favorites
  addProductToFavorite(input: AddProductToFavoriteInput!): FavoriteProducts!

  # Mutation to add Company Info
  createCompanyInfo(input: CompanyInfoInput!): CompanyInfo!

  # Mutation to update Company Info
  updateCompanyInfo(input: CompanyInfoInput!, id: String!): CompanyInfo!

  # Admin mutation for creating a moderator
  createModerator(userId: ID!, input: CreateModeratorInput!): Moderator!
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

# Define the CreateProductInput input type
input ProductInput {
  name: String!
  price: Float!
  isVisible: Boolean!
  reference: String!
  description: String!
  inventory: Int!
  images: [String!]!
  categories: [ID!]!
  colorsId: ID
  attributeInputs: [ProductAttributeInput!]
  discount: [CreateProductDiscountInput]
}

# Define the AttributeInput input type
input ProductAttributeInput {
  name: String!
  value: String!
}

# Define the CreateCategoryInput input type
input CreateCategoryInput {
  name: String!
  parentId: ID
}

# Define the UpdateCategoryInput input type
input UpdateCategoryInput {
  name: String
}

# Define the BackOrExchange input type
input CancelPackageInput {
  packageId: String!
  cause: Cause!
  description: String
}
# Define the cancel package product input type
input CancelProductPackageInput {
  packageId: ID!
  cause: Cause!
  description: String
  productId:ID!
  productQuantity:Int!
}

# Define the AddProductToFavoriteInput input type
input AddProductToFavoriteInput {
  userId: ID!
  productId: ID!
}

# Define the Create Product Discount input type
input CreateProductDiscountInput {
  discountId: String!
  dateOfStart: String!
  dateOfEnd: String!
  newPrice: Float
}

# Define the Basket Input input type
input CreateToBasketInput {
  userId: ID!
  productId: ID!
  quantity: Int!
}

# Define the CreateCheckoutInput input type
input CreateCheckoutInput {
  userId: ID!
  governorateId: ID!
  products: [ProductInCheckoutInput!]
  phone: [Int!]
  address: String!
  total: Int!
}

# Define the CreatePackageInput input type
input UpdatePackageInput {
  packageId:ID!
  status: Status!
}



# Define the CompanyInfoInput input type
input CompanyInfoInput {
  phone: [Int!]
  deliveringPrice: Int
  logo: String
}

# Define the CreateModeratorInput input type
input CreateModeratorInput {
  fullName: String!
  email: String!
  password: String!
  number: String!
}


input ExchangePackageProductInput{
  packageId: String
  productId: String
  cause:Cause,
  description:String
  productQuantity:Int!
}
input ExchangePackageInput{
  packageId: String
  cause:Cause,
  description:String
}

`;
