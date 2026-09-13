import React, { useContext, useEffect, useState } from "react";
import type { Item, Comment, tGetUser } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProduct from "../../functions/DeleteProduct";
import "../../components/css/ProductPage.css";
import MyNavbar from "../../components/MyNavbar";
import AddToCart from "../../functions/ADD/AddToCart";
import AddRating from "../../functions/ADD/AddRating";
import GetRating from "../../functions/GET/GetRating";
import AddLike from "../../functions/ADD/AddLike";
import { FaHeart } from "react-icons/fa";
import GetComments from "../../functions/GET/GetComments";
import CommentsList from "../../components/comments/CommentList";
import GetUser from "../../functions/GET/GetUser";
import AddComment from "../../functions/ADD/AddComment";
import GetProduct from "../../functions/GET/GetProduct";
import GetChat from "../../functions/MESSAGES/GetChat";
import GetUserById from "../../functions/POST/GetUserById";
const ProductPage = () => {
  const [product, setProduct] = useState<Item>({
    name:'',
    price:0,
    category:'All',
    is_liked:false,
    image:'',
    id:1,
    currency:'eur',
    quantity:1,
    description:'',
    user_id:0,
    likes:0
  });
  const [success, setSuccess] = useState("");
  const { id } = useParams();

  const [rating, setRating] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const navigate = useNavigate();
  const [avrating, setAvRating] = useState(null);
  const [count, setCount] = useState(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [user_name, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const[seller,setSeller]=useState<tGetUser>({
    id:0,
    user_name:'',
    login:'',
    password:'',
    image:''
  })
  const handleDelete = async () => {
    const response = await DeleteProduct(Number(id));
    if (response.success) {
      navigate("/main");
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetProduct(Number(id));

      console.log(response.data);

      if (response.success) {
        setProduct(response.data);
      }
      if (!response.success) {
        navigate("/products");
      }
    };

    FetchData();
  }, []);

  useEffect(() => {
    if (rating === 0) return;

    const FetchData = async () => {
      await AddRating(Number(id), rating);
    };

    FetchData();
  }, [rating]);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetRating(Number(id));

      if (response.success) {
        setAvRating(response.data.rating);
        setCount(response.data.count);
      }
      if (!response.success) {
        setError(response.data.detail);
      }
    };
    FetchData();
  }, []);

  const handleCart = async () => {
    const response = await AddToCart(Number(id));

    if (response.success) {
      setSuccess(`${product.name} added to cart`);
    }
  };
  const handleLike = async () => {
    const response = await AddLike(Number(id));

    if (response.success) {
      const resp = await GetProduct(Number(id));
      setProduct(resp.data);
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetComments(Number(id));

      if (response.success) {
        setComments(response.data);
      }
    };
    FetchData();
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetUser();

      console.log(response.data);

      if (response.success) {
        setUserName(response.data.user_name);
        setImage(response.data.image);
        setUserId(response.data.id);
      }
    };
    FetchData();
  }, []);

  const handleComment = async () => {
    const response = await AddComment(Number(id), text);

    if (response.success) {
      setSuccess("comment added");
      const resp = await GetComments(Number(id));
      setComments(resp.data);
    }
  };

  const handleChat = async () => {
    const response = await GetChat(product.user_id);

    if (response.success) {
      navigate(`/chat/${response.data.id}/${product.user_id}`);
    }
  };

  useEffect(()=>{
    const FetchData=async ()=>{
      const response=await GetUserById(product.user_id)

      if(response.success){
        setSeller(response.data)
        console.log(seller)
      }
    }
    FetchData()
  },[])

  if (!product) {
    return <h1>Loading...</h1>;
  }
  let simbol: string;
  if (product.currency === "rub") {
    simbol = "₽";
  }
  if (product.currency === "eur") {
    simbol = "€";
  }
  if (product.currency === "usd") {
    simbol = "$";
  }
  console.log(isOpen);

  return (
    <>
      <MyNavbar />
      <img src={`/${seller.image}`} id="seller" alt="bgrtbybyhyhyj" onClick={()=>navigate(`/user/${seller.id}`)}/>
      <div className="product-page">
        <div className="product-image-section">
          <img
            src={`/${product.image}`}
            alt={product.name}
            className="product-image"
          />
          <button onClick={handleLike}>
            <FaHeart
              color={product.is_liked ? "red" : "gray"}
              size={24}
              style={{ border: "0px" }}
            />
          </button>
          <h4>{product.likes}</h4>
          <div>
            <h2>quantity:{product.quantity}</h2>
          </div>
        </div>

        <div className="product-details">
          <h1>{product.name}</h1>

          <div className="product-category">{product.category}</div>

          <p className="description">{product.description}</p>
        </div>

        <div className="buy-card">
          <h2>
            <span>{simbol}</span>
            {product.price}
          </h2>

          <button className="add-btn" onClick={handleCart}>
            Add to Cart
          </button>
          {success && <p style={{ color: "green" }}>{success}</p>}

          {userId === product.user_id && (
            <button className="delete-btn" onClick={handleDelete}>
              Delete Product
            </button>
          )}
          {userId !== product.user_id && (
            <button className="add-btn" onClick={handleChat}>
              Text to seller
            </button>
          )}
          <h4>Rating:</h4>
          <h4>{avrating}</h4>
          <h4>({count} people)</h4>
          <h2>Rate this Item</h2>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "gold" : "gray",
                fontSize: "30px",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          console.log("clicked");
          setIsOpen(true);
        }}
      >
        Create Comment
      </button>

      {isOpen && (
        <div className="my-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="my-modal" onClick={(e) => e.stopPropagation()}>
            <h1>Create comment</h1>
            <input
              type="text"
              placeholder="Enter your comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleComment}>Enter</button>
          </div>
        </div>
      )}

      <CommentsList comments={comments} />
    </>
  );
};

export default ProductPage;
