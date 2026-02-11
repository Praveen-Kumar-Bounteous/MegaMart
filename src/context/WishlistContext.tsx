import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../services/api";
import toast from "react-hot-toast";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    if (!wishlist.find((p) => p.id === product.id)) {
      setWishlist([...wishlist, product]);
      toast.success(`${product.title} added to wishlist`);
    }
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(wishlist.filter((p) => p.id !== productId));
    toast.success(`Removed from wishlist`);
  };

  const isInWishlist = (productId: number) => wishlist.some((p) => p.id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("WishlistContext not found");
  return context;
};
