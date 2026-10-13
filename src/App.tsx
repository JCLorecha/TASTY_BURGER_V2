import { useEffect, useState } from "react";
import "./App.css";

type Burger = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

type CartItem = {
  burger: Burger;
  quantity: number;
};

const burgers: Burger[] = [
  {
    id: 1,
    name: "Classic Smash",
    price: 149,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    description:
      "A juicy beef patty with cheese, lettuce, tomato, and our special sauce.",
  },
  {
    id: 2,
    name: "Double Trouble",
    price: 199,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
    description:
      "Two juicy beef patties stacked with melted cheese and fresh toppings.",
  },
  {
    id: 3,
    name: "Crispy Chicken",
    price: 159,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500",
    description: "Crispy chicken with fresh vegetables and creamy sauce.",
  },
  {
    id: 4,
    name: "Bacon Stack",
    price: 219,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    description: "A beef burger topped with crispy bacon and melted cheese.",
  },
  {
    id: 5,
    name: "Cheese Lover",
    price: 179,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
    description: "A delicious burger loaded with melted cheese.",
  },
  {
    id: 6,
    name: "BBQ Burger",
    price: 189,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    description: "A grilled beef burger covered in smoky barbecue sauce.",
  },
  {
    id: 7,
    name: "Mushroom Swiss",
    price: 199,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500",
    description: "A beef burger topped with mushrooms and Swiss cheese.",
  },
  {
    id: 8,
    name: "Spicy Burger",
    price: 169,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
    description: "A flavorful burger with a spicy kick.",
  },
  {
    id: 9,
    name: "Chicken Deluxe",
    price: 189,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500",
    description: "A hearty chicken burger with fresh toppings.",
  },
  {
    id: 10,
    name: "Ultimate Burger",
    price: 249,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
    description: "Our signature burger packed with delicious ingredients.",
  },
];

const heroSlides = [
  {
    label: "FRESHLY MADE EVERY DAY",
    title: "Welcome to Tasty Burger",
    description: "Fresh, juicy, and delicious burgers!",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",
  },
  {
    label: "DOUBLE THE FLAVOR",
    title: "Big Burgers, Bigger Cravings",
    description: "Treat yourself to your favorite burger today.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200",
  },
  {
    label: "MADE FOR BURGER LOVERS",
    title: "Your Next Favorite Awaits",
    description: "Explore our menu and find your perfect bite.",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200",
  },
];

function App() {
  const [selectedBurger, setSelectedBurger] = useState<Burger | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (previousSlide) => (previousSlide + 1) % heroSlides.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.burger.price * item.quantity,
    0
  );

  function openProduct(burger: Burger) {
    setSelectedBurger(burger);
    setQuantity(1);
    setShowCart(false);
    setShowAllProducts(false);
  }

  function addToCart() {
    if (selectedBurger === null) return;

    const existingItem = cart.find(
      (item) => item.burger.id === selectedBurger.id
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.burger.id === selectedBurger.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        { burger: selectedBurger, quantity },
      ]);
    }

    setPopupMessage(
      `${quantity} × ${selectedBurger.name} added to your cart.`
    );
    setShowPopup(true);
  }

  function removeFromCart(burgerId: number) {
    setCart(cart.filter((item) => item.burger.id !== burgerId));
  }

  function returnHome() {
    setSelectedBurger(null);
    setShowCart(false);
    setShowAllProducts(false);
    setShowPopup(false);
  }

  function openCart() {
    setSelectedBurger(null);
    setShowCart(true);
    setShowAllProducts(false);
    setShowPopup(false);
  }

  function openAllProducts() {
    setSelectedBurger(null);
    setShowCart(false);
    setShowAllProducts(true);
  }

  function renderProducts(productList: Burger[]) {
    return (
      <div className="product-grid">
        {productList.map((burger) => (
          <div className="product-card" key={burger.id}>
            <img
              src={burger.image}
              alt={burger.name}
              className="product-image"
            />

            <div className="product-info">
              <h3>{burger.name}</h3>
              <p>₱{burger.price}</p>

              <button
                className="view-button"
                onClick={() => openProduct(burger)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <button className="logo" onClick={returnHome}>
          <span className="logo-icon">🍔</span>
          <span className="logo-text">Tasty Burger</span>
        </button>

        <button className="cart-button" onClick={openCart}>
          🛒 Cart ({cartCount})
        </button>
      </header>

      {showCart ? (
        <main>
          <button className="back-button" onClick={returnHome}>
            ← Back to Home
          </button>

          <section className="cart-page">
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty.</p>
                <button className="add-button" onClick={returnHome}>
                  Browse Burgers
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.burger.id}>
                      <img
                        src={item.burger.image}
                        alt={item.burger.name}
                        className="cart-image"
                      />

                      <div className="cart-item-info">
                        <h3>{item.burger.name}</h3>
                        <p>Price: ₱{item.burger.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>
                          Subtotal: ₱
                          {item.burger.price * item.quantity}
                        </p>
                      </div>

                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.burger.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <h3>Total: ₱{cartTotal}</h3>

                  <button
                    className="checkout-button"
                    onClick={() => {
                      setPopupMessage(
                        "Thank you for checking out and placing your order!"
                      );
                      setShowPopup(true);
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </section>
        </main>
      ) : showAllProducts ? (
        <main>
          <button className="back-button" onClick={returnHome}>
            ← Back to Home
          </button>

          <section className="menu-section">
            <h2>All Burgers</h2>
            <p className="page-description">
              Explore our complete menu of 10 delicious burgers.
            </p>

            {renderProducts(burgers)}
          </section>
        </main>
      ) : selectedBurger === null ? (
        <main>
          <section
            className="hero"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("${heroSlides[currentSlide].image}")`,
            }}
          >
            <p className="hero-label">
              {heroSlides[currentSlide].label}
            </p>

            <h2>{heroSlides[currentSlide].title}</h2>

            <p>{heroSlides[currentSlide].description}</p>

            <div className="hero-dots">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  className={`hero-dot ${
                    currentSlide === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-pressed={currentSlide === index}
                />
              ))}
            </div>
          </section>

          <section className="menu-section" id="menu">
            <h2>Featured Burgers</h2>
            {renderProducts(burgers.slice(0, 8))}

            <div className="view-all-container">
              <button
                className="view-all-button"
                onClick={openAllProducts}
              >
                View All 10 Burgers →
              </button>
            </div>
          </section>
        </main>
      ) : (
        <main>
          <button className="back-button" onClick={returnHome}>
            ← Back to Menu
          </button>

          <section className="product-details">
            <img
              src={selectedBurger.image}
              alt={selectedBurger.name}
              className="details-image"
            />

            <div className="details-info">
              <h2>{selectedBurger.name}</h2>
              <p className="details-price">₱{selectedBurger.price}</p>
              <p className="details-description">
                {selectedBurger.description}
              </p>

              <div className="quantity-box">
                <p>Select Quantity</p>

                <div className="quantity-controls">
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>

                  <span>{quantity}</span>

                  <button
                    aria-label="Decrease quantity"
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                  >
                    −
                  </button>
                </div>

                <button className="add-button" onClick={addToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-icon">✓</div>

            <h2>
              {popupMessage.startsWith("Thank you")
                ? "Order Placed Successfully!"
                : "Added to Cart Successfully!"}
            </h2>

            <p>{popupMessage}</p>

            {popupMessage.startsWith("Thank you") ? (
              <button className="add-button" onClick={returnHome}>
                Return Home
              </button>
            ) : (
              <div className="popup-buttons">
                <button
                  className="secondary-button"
                  onClick={() => setShowPopup(false)}
                >
                  OK
                </button>

                <button className="add-button" onClick={openCart}>
                  View Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;