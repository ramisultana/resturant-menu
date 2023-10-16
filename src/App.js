// import React from "react";
import { useState } from "react";

const menuAb = [
  {
    id: 0,
    name: "bzenjan",
    image: "/images/bzenjan.png",
    price: 200,
  },
  {
    id: 1,
    name: "fries",
    image: "/images/fries.png",
    price: 50,
  },
  {
    id: 2,
    name: "homs",
    image: "/images/homs.png",
    price: 200,
  },

  {
    id: 3,
    name: "argela",
    image: "/images/arg.png",
    price: 100,
  },
];
const menuMainDish = [
  {
    id: 0,
    name: "fish",
    image: "/images/fish.png",
    price: 1000,
  },

  {
    id: 1,
    name: "kabab",
    image: "/images/kabab.png",
    price: 700,
  },

  {
    id: 2,
    name: "shesh",
    image: "/images/shesh.png",
    price: 500,
  },
];
export default function App() {
  const [finalBilt, setFinalBilt] = useState([]);
  function handleAddItemToFinalBilt(obj) {
    setFinalBilt((finalBilt) => [...finalBilt, obj]);
  }
  function deletItem(obj) {
    setFinalBilt(finalBilt.filter((item) => obj?.id !== item?.id));
  }
  return (
    <div>
      <h1>Welcome to our resturant</h1>
      <Apitizers handleAddItemToFinalBilt={handleAddItemToFinalBilt} />
      <Total finalBilt={finalBilt} deletItem={deletItem} />
    </div>
  );
}
function Apitizers({ handleAddItemToFinalBilt }) {
  return (
    <ul className="ab">
      {menuAb.map((el) => (
        <Apitizer
          apitizer={el}
          key={el.id}
          handleAddItemToFinalBilt={handleAddItemToFinalBilt}
        />
      ))}
    </ul>
  );
}
function Apitizer({ apitizer, handleAddItemToFinalBilt }) {
  const [apitizerQuant, setapitizerQuant] = useState("");
  function handleabitizerQuanAndprice(e) {
    e.preventDefault();
    const itemPrice = apitizer.price * apitizerQuant;
    const id = crypto.randomUUID();
    if (!apitizerQuant) return;
    const abItem = {
      id,
      itemPrice,
      name: apitizer.name,
      quantity: apitizerQuant,
    };
    handleAddItemToFinalBilt(abItem);
    setapitizerQuant("");
  }
  return (
    <li>
      <img src={apitizer.image} alt={apitizer.name} />
      <h2>{apitizer.name}</h2>
      <p>price for one item {apitizer.price}</p>
      <form onSubmit={handleabitizerQuanAndprice}>
        <input
          type="text"
          value={apitizerQuant}
          onChange={(e) => setapitizerQuant(Number(e.target.value))}
          placeholder="Quantity"
        />
        <Button>Add</Button>
      </form>
    </li>
  );
}

function Total({ finalBilt, deletItem }) {
  const totalBill = finalBilt
    .map((it) => it.itemPrice)
    .reduce((acc, el) => acc + el, 0);
  console.log(totalBill);
  return (
    <>
      <ul className="final">
        {finalBilt.map((item) => (
          <Finalitem fitem={item} key={item.name} deletItem={deletItem} />
        ))}
      </ul>
      {finalBilt?.length > 0 && <span>final Bill {totalBill}</span>}
    </>
  );
}
function Finalitem({ fitem, deletItem }) {
  return (
    <li>
      <p>{fitem.name}</p>
      <p>{fitem.quantity} Item</p>
      <p>Price: {fitem.itemPrice} </p>
      <Button onClick={() => deletItem(fitem)}>X</Button>
    </li>
  );
}
function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
