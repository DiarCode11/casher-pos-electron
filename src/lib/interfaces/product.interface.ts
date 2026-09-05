export interface ProductInterface {
  id: number;
  nama: string;
  description?: string;
  harga: number;
  stok: number;
  unit: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

declare global {
  interface Window {
    posAPI: {
      getProducts: () => Promise<ProductInterface[]>;
      addProduct: (data: Partial<ProductInterface>) => Promise<{ success: boolean }>;
      updateProduct: (data: ProductInterface) => Promise<{ success: boolean }>;
      deleteProduct: (id: number) => Promise<{ success: boolean }>;
    };
  }
}

export {};