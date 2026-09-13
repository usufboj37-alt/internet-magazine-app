export type Category =
  | "Food"
  | "Electronic"
  | "Clothing"
  | "Sports"
  | "Books"
  | "Home"
  | "All";

export type Currency=
  | 'rub'
  | 'eur'
  | 'usd'

export type Item = {
  name: string;
  price: number;
  category: Category;
  description:string
  id: number;
  user_id: number;
  image: string;
  likes:number;
  is_liked:boolean;
  currency:Currency;
  quantity:number
};

export type User = {
  login: string;
  password: string;
  id: number;
  user_name:string;
  image:File
};

export type Props = {
  Item: Item;
};

export type CreateItem = {
  name: string;
  price: number;
  category: Category;
  description:string;
  image:File
  currency:Currency
  quantity:number
};

export type CartItem={
  name: string;
  price: number;
  category: Category;
  description:string;
  image:string,
  quantity:number,
  currency:Currency
  product_id:number
}

export type CartProps={
  Item: CartItem;
}


export type CommentProps={
  user_name:string
  text:string
  image:string
}

export type tGetUser={
  login: string;
  password: string;
  id: number;
  user_name:string;
  image:string
}



export type Comment={
  product_id:number,
  user_id:number,
  text:string
  image:string,
  user_name:string
}

export type Wallet={
  wallet_name:string
  balance:number
  currency:Currency
  id:number
}

export type OperationType=
  |'buy'
  |'from_transfer'
  |'transfer'

export type Operation={
  wallet_id:number,
  type:OperationType,
  amount:number,
  currency:Currency
  id:number
  user_id:number
  product_id:number
}

export type Message={
  id:number
  sender_id:number
  chat_id:number
  text:string
  createdAt:string
  formatted_time:string
}

export type tGetChat={
  id:number

  user:{
    id:number
    user_name:string
    image:string
  }
  last_message:Message | null
  
}

export type Promocode={
  id:number
  code:string
  sale:number
  isActive:boolean
  product_id:number
}