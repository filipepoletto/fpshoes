import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const isProductInCart = cart.find(product => product.id === productId);

      if (!isProductInCart) {
        const { data: product } = await api.get<Product>(`products/${productId}`);
        const { data: stock } = await api.get<Stock>(`stock/${productId}`);

        if (stock.amount > 0) {
          setCart([...cart, { ...product, amount: 1 }]);
          localStorage.setItem("@RocketShoes:cart", JSON.stringify([...cart, { ...product, amount: 1 }]));
          toast("Adicionado");
          return;
        }
      }

      if (isProductInCart) {
        const { data: stock } = await api.get<Stock>(`stock/${productId}`);

        if (stock.amount > isProductInCart.amount) {
          const increaseCartItem = cart.map(cartItem => cartItem.id === productId ? {
            ...cartItem,
            amount: Number(cartItem.amount) + 1
          } : cartItem);
          setCart(increaseCartItem);
          localStorage.setItem("@RocketShoes:cart", JSON.stringify(increaseCartItem));
          toast("Adicionado");
          return;
        } else {
          toast.error("Quantidade solicitada fora de estoque");
        }
      }
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productExists = cart.some(product => product.id === productId);
      if (!productExists) {
        toast.error("Erro na remoção do produto");
        return;
      }

      const decreaseCartItem = cart.filter(cartItem => cartItem.id !== productId);
      setCart(decreaseCartItem);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(decreaseCartItem));
      toast("Removido");
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount < 1) {
        toast.error("Erro na alteração de quantidade do produto");
        return;
      }

      const { data: stock } = await api.get<Stock>(`stock/${productId}`);

      const productExists = cart.some(product => product.id === productId);
      if (!productExists) {
        toast.error("Erro na alteração de quantidade do produto");
        return;
      }

      if (stock.amount > amount) {
        const updateCartItem = cart.map(cartItem => cartItem.id === productId ? {
          ...cartItem,
          amount: amount
        } : cartItem);
        setCart(updateCartItem);
        localStorage.setItem("@RocketShoes:cart", JSON.stringify(updateCartItem));
        toast("Atualizado");
        return;
      } else {
        toast.error("Quantidade solicitada fora de estoque");
      }
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
