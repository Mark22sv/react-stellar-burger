import { ReactNode } from 'react';


export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqueId: number;
  id?: string;
  index?: number;
}

export type OrderRequest = {
  ingredients: Array<string>;
};

export type Style = {
  isActive: boolean;
};

export type Headers = {
  authorization: string | null;
  "Content-Type": string;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export type ResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
  refreshToken: string;
  accessToken: string;
};

export type RefreshData = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
}

export type BurgerConstructorProps = {
  ingredient: Ingredient;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  removeElement: (ingridient: Ingredient)  => void;
};

export type BurgerIngredientsProps = {
  ingredient: Ingredient;
};

export type OrderData = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}






export type IngredientCard = {
  item: Ingredient
}

export type ConstructorItem = {
  id: number;
  index: number;
  key: number;
  children: ReactNode;
}

export type IngredientPage = {
  title: string | number | null;
}

export type Order = {
  name: string;
  number: number;
  success: boolean;
}



export type OrderDataContainer = {
  order: OrderData;
}

export type OrderResponse = {
  name: string;
  order: Order;
  success: boolean;
}

export type PasswordResponse = {
  success: boolean;
  message: string;
}

export type IngredientResponse = {
  data: Ingredient[];
  success: boolean;
}


export type UserResponse = {
  success: boolean;
  user: User;
}

export type LoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type LogoutResponse = {
  success: boolean;
  message: string;
}

export type RefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export type FeedOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export type FeedOrders = {
  total: number;
  totalToday: number;
  orders: FeedOrder[];
}

export type IngredientsResponse = {
  data: Ingredient[];
  success: boolean;
}

export type CookieProps = {
  [name: string]: string | number | boolean | Date | undefined;
  expires?: Date | number | string;
}

export type Location = {
  hash: string;
  pathname: string;
  search: string;
  state: object | null;
}

export type Modal = {
  onCloseClick: () => void;
  title?: string;
  children?: ReactNode;
}

export type ModalOverlay = {
  onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

export type ProtectedRoute = {
  children: ReactNode;
  path: string;
  exact: boolean;
}

export type OrderInfo = {
  headerStyle?: string;
}

export type IngredientDetails = {
  title?: string | number;
}

export type Gallery = {
  ingredientsType: string;
  data: Ingredient[];
}

export type OrderIngredient = {
  item: {
    _id: string;
  }
}

export type Error = {
  success: boolean;
  message: string;
}
