import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


type DrawerMobileCategoryStore = {
  isOpen: boolean;
  openCategoryDrawer: () => void;
  closeCategoryDrawer: () => void;
};

type DrawerBasketStore = {
  isOpen: boolean;
  openBasketDrawer: () => void;
  closeBasketDrawer: () => void;
};

type BasketStore = {
  isUpdated: boolean;
  toggleIsUpdated: () => void;
};

interface ProductData {
  id: string;
  name: string;
  price: number;
  reference: string;
  description: string;
  createdAt: Date;
  inventory: number;
  images: string[];
  categories: {
    name: string;
  }[];
  Colors: {
    color: string;
    Hex: string;
  };
  productDiscounts: {
    price: number;
    newPrice: number;
    Discount: {
      percentage: number;
    };
  }[];
}
type UseProductDetails = {
  isOpen: boolean;
  productData: ProductData | null;
  openProductDetails: (productData: ProductData) => void;
  closeProductDetails: () => void;
};

export const useProductDetails = create<UseProductDetails>((set) => ({
  isOpen: false,
  productData: null,
  openProductDetails: (productData) => set({ isOpen: true, productData }),
  closeProductDetails: () => set({ isOpen: false, productData: null }),
}));

export const useDrawerMobileStore = create<DrawerMobileCategoryStore>(
  (set) => ({
    isOpen: false,
    openCategoryDrawer: () => set({ isOpen: true }),
    closeCategoryDrawer: () => set({ isOpen: false }),
  }),
);

export const useDrawerBasketStore = create<DrawerBasketStore>((set) => ({
  isOpen: false,
  openBasketDrawer: () => set({ isOpen: true }),
  closeBasketDrawer: () => set({ isOpen: false }),
}));

export const useBasketStore = create<BasketStore>((set) => ({
  isUpdated: false,
  toggleIsUpdated: () => set((state) => ({ isUpdated: !state.isUpdated })),
}));

const comparedProductsStore = <ComparedProductsStore>(set: any, get: any) => ({
  products: [],
  addProductToCompare: (product: any) => {
    const currentProducts = get().products;
    // Check if the product already exists in the products array
    const isProductInStore = currentProducts.some(
      (p: any) => p.id === product.id,
    );
    if (!isProductInStore) {
      set((state: any) => ({ products: [...state.products, product] }));
    }
  },
  removeProductFromCompare: (productId: any) =>
    set((state: any) => ({
      products: state.products.filter(
        (product: any) => product.id !== productId,
      ),
    })),
});

const productsInBasketStore = <ProductsInBasketStore>(set: any) => ({
  products: [],
  quantityInBasket: 0,
  setQuantityInBasket: (quantity: number) => {
    set((state: any) => ({
      quantityInBasket: quantity,
    }));
  },
  addProductToBasket: (product: any) => {
    set((state: any) => ({
      products: [...state.products, product],
    }));
  },
  removeProductFromBasket: (productId: string) => {
    set((state: any) => ({
      products: state.products.filter(
        (product: any) => product.id !== productId,
      ),
    }));
  },
  clearBasket: () => {
    set((state: any) => ({
      products: [],
    }));
  },
});

export const useProductsInBasketStore = create(
  persist(productsInBasketStore, {
    name: "productsInBasket",
    storage: createJSONStorage(() => sessionStorage),
  }),
);

export const useComparedProductsStore = create(
  persist(comparedProductsStore, {
    name: "comparedProducts",
    storage: createJSONStorage(() => sessionStorage),
  }),
);

type SidebarStore = {
  isOpenSideBard: boolean;
  toggleOpenSidebar: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpenSideBard: false,
  toggleOpenSidebar: () =>
    set((state) => ({ isOpenSideBard: !state.isOpenSideBard })),
}));
interface AllProductViewStore {
  view: number;
  changeProductView: (gridNumber: number) => void;
}

export const useAllProductViewStore = create<AllProductViewStore>((set) => ({
  view: 3,
  changeProductView: (gridNumber) => set({ view: gridNumber }),
}));

interface SideBarFilterStore {
  filter: Record<string, any>;
  setFilter: (key: string, value: any) => void;
  deleteFilter: (key: string) => void;
}

export const useSideBarFilterWithStore = create<SideBarFilterStore>((set) => ({
  filter: {},
  setFilter: (key, value) =>
    set((state) => ({
      filter: {
        ...state.filter,
        [key]: value,
      },
    })),
  deleteFilter: (key) =>
    set((state) => {
      const { [key]: deletedKey, ...rest } = state.filter;
      return { filter: rest };
    }),
}));
